<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChatMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Public endpoint — no auth required
    }

    public function rules(): array
    {
        return [
            'messages'              => ['required', 'array', 'min:1', 'max:20'],
            'messages.*.role'       => ['required', 'string', 'in:user,assistant'],
            'messages.*.content'   => ['required', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'messages.required'          => 'A message is required.',
            'messages.max'               => 'Conversation history is too long.',
            'messages.*.role.in'         => 'Invalid message role.',
            'messages.*.content.max'     => 'A single message cannot exceed 1000 characters.',
        ];
    }
}
