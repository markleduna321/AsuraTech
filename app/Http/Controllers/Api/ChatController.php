<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChatMessageRequest;
use App\Services\AsuraTechContextService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    /**
     * Proxy a chat request to OpenAI, injecting the AsuraTECH system prompt.
     * The frontend sends the full conversation history; we prepend the system
     * prompt server-side so it is never exposed to the client.
     */
    public function send(ChatMessageRequest $request): JsonResponse
    {
        $apiKey = config('services.openai.key');

        if (empty($apiKey)) {
            return response()->json(['error' => 'AI service is not configured.'], 503);
        }

        // Build the message array: system prompt first, then conversation history
        $messages = array_merge(
            [['role' => 'system', 'content' => AsuraTechContextService::systemPrompt()]],
            $request->validated('messages')
        );

        $response = Http::withToken($apiKey)
            ->timeout(30)
            ->post('https://api.openai.com/v1/chat/completions', [
                'model'       => 'gpt-4o-mini',
                'messages'    => $messages,
                'max_tokens'  => 500,
                'temperature' => 0.5,
            ]);

        if ($response->failed()) {
            Log::error('OpenAI API error', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

            return response()->json(
                ['error' => 'The AI service encountered an error. Please try again shortly.'],
                502
            );
        }

        $content = $response->json('choices.0.message.content');

        return response()->json(['reply' => trim($content)]);
    }
}
