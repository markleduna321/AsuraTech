<?php

namespace App\Mail;

use App\Models\Certificate;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Facades\View;

class CertificateIssued extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $certificate;
    public $qrCodeSvg;
    public $qrCodeDataUri;

    /**
     * Create a new message instance.
     */
    public function __construct(Certificate $certificate)
    {
        $this->certificate = $certificate;
        
        $verificationUrl = url("/certificates/{$this->certificate->uuid}");
        
        // External API URL for Browsershot
        $this->qrCodeDataUri = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' . urlencode($verificationUrl);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your AsuraTECH Certificate: ' . $this->certificate->webinar_title,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.certificate-issued',
            with: [
                'certificate' => $this->certificate,
                'qrCode' => $this->qrCodeDataUri,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // 1. Render the HTML for the certificate PNG
        $html = View::make('certificates.png-template', [
            'certificate' => $this->certificate,
            'qrCode' => $this->qrCodeDataUri,
        ])->render();

        // 2. Generate PNG via Browsershot in memory
        $pngData = Browsershot::html($html)
            ->windowSize(1200, 850)
            ->deviceScaleFactor(2) // Retina quality
            ->waitUntilNetworkIdle() // Wait for Tailwind CDN and fonts
            ->noSandbox()
            ->screenshot();

        return [
            Attachment::fromData(fn () => $pngData, 'Certificate.png')
                ->withMime('image/png'),
        ];
    }
}
