<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Resources\LeadResource;
use App\Mail\LeadConfirmationMail;
use App\Mail\NewLeadMail;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request): JsonResponse
    {
        $lead = Lead::create($request->validated());

        try {
            Mail::to(config('services.mail.team_address'))->send(new NewLeadMail($lead));
        } catch (\Throwable $e) {
            Log::error('Failed to send team lead notification', ['lead_id' => $lead->id, 'error' => $e->getMessage()]);
        }

        try {
            Mail::to($lead->email)->send(new LeadConfirmationMail($lead));
        } catch (\Throwable $e) {
            Log::error('Failed to send client confirmation email', ['lead_id' => $lead->id, 'error' => $e->getMessage()]);
        }

        return (new LeadResource($lead))
            ->response()
            ->setStatusCode(201);
    }
}
