<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCertificateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization handled by CertificatePolicy
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'recipient_name'   => ['sometimes', 'required', 'string', 'max:255'],
            'email'            => ['nullable', 'email', 'max:255'],
            'webinar_title'    => ['sometimes', 'required', 'string', 'max:500'],
            'webinar_date'     => ['sometimes', 'required', 'date'],
            'speaker_name'     => ['sometimes', 'required', 'string', 'max:255'],
            'speaker_signature'=> ['nullable', 'image', 'mimes:png,jpg,jpeg', 'max:2048'],
            'speaker_role'     => ['sometimes', 'required', 'string', 'max:255'],
            'coordinator_name' => ['sometimes', 'required', 'string', 'max:255'],
            'coordinator_signature'=> ['nullable', 'image', 'mimes:png,jpg,jpeg', 'max:2048'],
            'coordinator_role' => ['sometimes', 'required', 'string', 'max:255'],
        ];
    }

    /**
     * Custom attribute names for validation messages.
     */
    public function attributes(): array
    {
        return [
            'recipient_name'   => 'recipient name',
            'webinar_title'    => 'webinar title',
            'webinar_date'     => 'webinar date',
            'speaker_name'     => 'speaker name',
            'speaker_role'     => 'speaker role',
            'coordinator_name' => 'coordinator name',
            'coordinator_role' => 'coordinator role',
        ];
    }
}
