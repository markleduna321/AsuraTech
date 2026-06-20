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

    public function rules(): array
    {
        return [
            'name'                   => ['required', 'string', 'max:255'],
            'email'                  => ['required', 'email', 'max:255'],
            'phone'                  => ['nullable', 'string', 'max:30'],
            'company'                => ['nullable', 'string', 'max:255'],
            'service_interest'       => ['required', 'string', 'in:network,web,cctv,starlink,timesync,gymasura,general'],
            'requirements'           => ['nullable', 'string', 'max:5000'],
            'conversation'           => ['nullable', 'array', 'max:30'],
            'conversation.*.role'    => ['required_with:conversation', 'in:user,assistant'],
            'conversation.*.content' => ['required_with:conversation', 'string', 'max:2000'],
        ];
    }
}
