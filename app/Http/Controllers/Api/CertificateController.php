<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkStoreCertificateRequest;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CertificateController extends Controller
{
    public function __construct(
        private CertificateService $certificateService
    ) {}

    /**
     * GET /api/certificates
     * Paginated list of certificates (admin, requires auth).
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Certificate::class);

        $query = Certificate::query()->latest();

        // Search by recipient name or webinar title
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('recipient_name', 'like', "%{$search}%")
                  ->orWhere('webinar_title', 'like', "%{$search}%");
            });
        }

        $certificates = $query->paginate(
            $request->input('per_page', 15)
        );

        return CertificateResource::collection($certificates);
    }

    /**
     * POST /api/certificates
     * Create a single certificate (requires auth).
     */
    public function store(StoreCertificateRequest $request)
    {
        Gate::authorize('create', Certificate::class);

        $certificate = $this->certificateService->create(
            $request->validated(),
            $request->user()->id
        );

        return new CertificateResource($certificate);
    }

    /**
     * POST /api/certificates/bulk
     * Bulk-create certificates from CSV (requires auth).
     */
    public function bulkStore(BulkStoreCertificateRequest $request)
    {
        Gate::authorize('create', Certificate::class);

        $defaults = $request->only([
            'webinar_title',
            'webinar_date',
            'speaker_name',
            'speaker_signature',
            'speaker_role',
            'coordinator_name',
            'coordinator_signature',
            'coordinator_role',
        ]);

        // File uploads are not automatically handled by only() if they aren't scalar, actually only() works for files too in Laravel. 
        // But to be safe we can use validated() which returns all validated data including files.
        $defaults = $request->validated();

        $result = $this->certificateService->bulkCreateFromCsv(
            $request->file('csv_file'),
            $defaults,
            $request->user()->id
        );

        $status = count($result['errors']) > 0 ? 207 : 201;

        return response()->json([
            'message' => "{$result['created']} certificate(s) created successfully.",
            'created' => $result['created'],
            'errors'  => $result['errors'],
        ], $status);
    }

    /**
     * GET /api/certificates/{certificate}
     * Show a single certificate by UUID (public, no auth).
     */
    public function show(Certificate $certificate)
    {
        return new CertificateResource($certificate);
    }

    /**
     * PUT /api/certificates/{certificate}
     * Update a certificate (requires auth).
     */
    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {
        Gate::authorize('update', $certificate);

        $certificate = $this->certificateService->update(
            $certificate,
            $request->validated()
        );

        return new CertificateResource($certificate);
    }

    /**
     * DELETE /api/certificates/{certificate}
     * Delete a certificate (requires auth).
     */
    public function destroy(Certificate $certificate)
    {
        Gate::authorize('delete', $certificate);

        $this->certificateService->delete($certificate);

        return response()->json(null, 204);
    }
}
