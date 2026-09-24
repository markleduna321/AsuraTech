<?php

namespace App\Services;

use App\Models\Certificate;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CertificateService
{
    /**
     * Create a single certificate.
     */
    public function create(array $data, int $issuedBy): Certificate
    {
        $data['issued_by'] = $issuedBy;
        $data['uuid'] = Str::uuid()->toString();

        if (isset($data['speaker_signature']) && $data['speaker_signature'] instanceof UploadedFile) {
            $data['speaker_signature_path'] = $data['speaker_signature']->store('signatures', 'public');
            unset($data['speaker_signature']);
        }

        if (isset($data['coordinator_signature']) && $data['coordinator_signature'] instanceof UploadedFile) {
            $data['coordinator_signature_path'] = $data['coordinator_signature']->store('signatures', 'public');
            unset($data['coordinator_signature']);
        }

        $certificate = Certificate::create($data);

        if ($certificate->email) {
            \Illuminate\Support\Facades\Mail::to($certificate->email)
                ->send(new \App\Mail\CertificateIssued($certificate));
        }

        return $certificate;
    }

    /**
     * Update an existing certificate.
     */
    public function update(Certificate $certificate, array $data): Certificate
    {
        if (isset($data['speaker_signature']) && $data['speaker_signature'] instanceof UploadedFile) {
            // Delete old if exists
            if ($certificate->speaker_signature_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($certificate->speaker_signature_path);
            }
            $data['speaker_signature_path'] = $data['speaker_signature']->store('signatures', 'public');
            unset($data['speaker_signature']);
        }

        if (isset($data['coordinator_signature']) && $data['coordinator_signature'] instanceof UploadedFile) {
            if ($certificate->coordinator_signature_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($certificate->coordinator_signature_path);
            }
            $data['coordinator_signature_path'] = $data['coordinator_signature']->store('signatures', 'public');
            unset($data['coordinator_signature']);
        }

        $certificate->update($data);

        return $certificate->fresh();
    }

    /**
     * Delete a certificate.
     */
    public function delete(Certificate $certificate): void
    {
        $certificate->delete();
    }

    /**
     * Bulk-create certificates from a CSV file.
     *
     * The CSV must contain a `recipient_name` column (one name per row).
     * Shared webinar details are passed via $defaults.
     *
     * @param  UploadedFile  $file      The uploaded CSV file
     * @param  array         $defaults  Shared fields (webinar_title, webinar_date, etc.)
     * @param  int           $issuedBy  The authenticated user's ID
     * @return array{created: int, errors: array}
     */
    public function bulkCreateFromCsv(UploadedFile $file, array $defaults, int $issuedBy): array
    {
        $created = 0;
        $errors = [];

        $handle = fopen($file->getRealPath(), 'r');

        if ($handle === false) {
            return ['created' => 0, 'errors' => ['Unable to read CSV file.']];
        }

        // Read header row
        $header = fgetcsv($handle);

        if ($header === false) {
            fclose($handle);
            return ['created' => 0, 'errors' => ['CSV file is empty.']];
        }

        // Normalize headers (trim whitespace, lowercase, remove UTF-8 BOM)
        $header = array_map(function ($col) {
            $col = preg_replace('/[\xef\xbb\xbf]/', '', $col);
            return strtolower(trim($col));
        }, $header);

        // Find the recipient_name column index
        $nameIndex = array_search('recipient_name', $header);

        if ($nameIndex === false) {
            // Also try common alternatives
            $nameIndex = array_search('name', $header);
        }

        if ($nameIndex === false) {
            fclose($handle);
            return [
                'created' => 0,
                'errors' => ['CSV must contain a "recipient_name" or "name" column header.'],
            ];
        }

        // Find the email column index (optional)
        $emailIndex = array_search('email', $header);

        // Store shared signature files if provided
        if (isset($defaults['speaker_signature']) && $defaults['speaker_signature'] instanceof UploadedFile) {
            $defaults['speaker_signature_path'] = $defaults['speaker_signature']->store('signatures', 'public');
        }

        if (isset($defaults['coordinator_signature']) && $defaults['coordinator_signature'] instanceof UploadedFile) {
            $defaults['coordinator_signature_path'] = $defaults['coordinator_signature']->store('signatures', 'public');
        }

        $rowNumber = 1; // Start after header

        DB::beginTransaction();

        try {
            while (($row = fgetcsv($handle)) !== false) {
                $rowNumber++;

                // Skip empty rows
                if (!isset($row[$nameIndex]) || trim($row[$nameIndex]) === '') {
                    $errors[] = "Row {$rowNumber}: recipient_name is empty — skipped.";
                    continue;
                }

                $recipientName = trim($row[$nameIndex]);
                $email = ($emailIndex !== false && isset($row[$emailIndex])) ? trim($row[$emailIndex]) : null;

                // Validate name length
                if (mb_strlen($recipientName) > 255) {
                    $errors[] = "Row {$rowNumber}: recipient_name exceeds 255 characters — skipped.";
                    continue;
                }

                // Basic email validation
                if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $errors[] = "Row {$rowNumber}: invalid email format — skipped.";
                    continue;
                }

                $certificate = Certificate::create([
                    'uuid'             => Str::uuid()->toString(),
                    'recipient_name'   => $recipientName,
                    'email'            => $email,
                    'webinar_title'    => $defaults['webinar_title'],
                    'webinar_date'     => $defaults['webinar_date'],
                    'speaker_name'     => $defaults['speaker_name'],
                    'speaker_signature_path' => $defaults['speaker_signature_path'] ?? null,
                    'speaker_role'     => $defaults['speaker_role'],
                    'coordinator_name' => $defaults['coordinator_name'],
                    'coordinator_signature_path' => $defaults['coordinator_signature_path'] ?? null,
                    'coordinator_role' => $defaults['coordinator_role'],
                    'issued_by'        => $issuedBy,
                ]);

                if ($certificate->email) {
                    \Illuminate\Support\Facades\Mail::to($certificate->email)
                        ->later(now()->addSeconds($created * 5), new \App\Mail\CertificateIssued($certificate));
                }

                $created++;
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            fclose($handle);

            return [
                'created' => 0,
                'errors'  => ["Bulk import failed: {$e->getMessage()}"],
            ];
        }

        fclose($handle);

        return [
            'created' => $created,
            'errors'  => $errors,
        ];
    }
}
