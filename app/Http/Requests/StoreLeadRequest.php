<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public const BUSINESS_TYPES = ['fitness', 'healthcare', 'professional', 'retail', 'agency', 'enterprise', 'other'];

    public function rules(): array
    {
        return [
            'name'                   => ['required', 'string', 'max:255'],
            'email'                  => ['required', 'email', 'max:255'],
            'phone'                  => ['nullable', 'string', 'max:30'],
            'company'                => ['nullable', 'string', 'max:255'],
            'business_type'          => ['required_if:service_interest,audit', 'nullable', 'string', 'in:' . implode(',', self::BUSINESS_TYPES)],
            'service_interest'       => ['required', 'string', 'in:automation,network,web,cctv,starlink,timesync,gymasura,general,audit'],
            'source'                 => ['nullable', 'string', 'max:50', 'regex:/^[a-z0-9_-]+$/'],
            'utm_source'             => ['nullable', 'string', 'max:100'],
            'utm_medium'             => ['nullable', 'string', 'max:100'],
            'utm_campaign'           => ['nullable', 'string', 'max:100'],
            'utm_term'               => ['nullable', 'string', 'max:100'],
            'utm_content'            => ['nullable', 'string', 'max:100'],
            'requirements'           => ['nullable', 'string', 'max:5000'],
            'consent'                => ['exclude_unless:service_interest,audit', 'accepted'],
            // Honeypot: hidden from people, so any value means a bot filled the form.
            'website'                => ['prohibited'],
            'conversation'           => ['nullable', 'array', 'max:60'],
            'conversation.*.role'    => ['required_with:conversation', 'in:user,assistant'],
            'conversation.*.content' => ['required_with:conversation', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'             => 'Please tell us your name.',
            'email.required'            => 'Please enter your work email.',
            'email.email'               => 'That email address doesn’t look right.',
            'business_type.required_if' => 'Please choose your business type.',
            'business_type.in'          => 'Please choose your business type.',
            'consent.accepted'          => 'Please confirm we can contact you about your audit.',
            'website.prohibited'        => 'Something went wrong. Please try again.',
        ];
    }

    /**
     * Validated data mapped onto Lead columns: the consent checkbox becomes a timestamp.
     */
    public function leadAttributes(): array
    {
        $data = collect($this->validated())->except(['consent', 'website'])->all();

        if ($this->boolean('consent') && $this->input('service_interest') === 'audit') {
            $data['consented_at'] = now();
        }

        return $data;
    }
}
