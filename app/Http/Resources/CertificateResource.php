<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid'             => $this->uuid,
            'recipient_name'   => $this->recipient_name,
            'email'            => $this->email,
            'webinar_title'    => $this->webinar_title,
            'webinar_date'     => $this->webinar_date->toDateString(),
            'speaker_name'     => $this->speaker_name,
            'speaker_signature_url' => $this->speaker_signature_path ? \Illuminate\Support\Facades\Storage::disk('public')->url($this->speaker_signature_path) : null,
            'speaker_role'     => $this->speaker_role,
            'coordinator_name' => $this->coordinator_name,
            'coordinator_signature_url' => $this->coordinator_signature_path ? \Illuminate\Support\Facades\Storage::disk('public')->url($this->coordinator_signature_path) : null,
            'coordinator_role' => $this->coordinator_role,
            'verification_url' => url("/certificates/{$this->uuid}"),
            'created_at'       => $this->created_at->toISOString(),
            'updated_at'       => $this->updated_at->toISOString(),
        ];
    }
}
