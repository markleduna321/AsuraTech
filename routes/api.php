<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\CertificateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are intended for RTK Query endpoints and must return JSON.
|
*/

// Public — chat: 10 requests/min per IP; leads: 5/min and 30/day per IP (see AppServiceProvider)
Route::post('/chat', [ChatController::class, 'send'])->middleware('throttle:chat');
Route::post('/leads', [LeadController::class, 'store'])->middleware('throttle:leads');

// Public certificate verification — no auth (QR code scans)
Route::get('/certificates/{certificate}', [CertificateController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'me']);
    Route::put('/user', [UserController::class, 'update']);

    // Certificate management (admin)
    Route::get('/certificates', [CertificateController::class, 'index']);
    Route::post('/certificates', [CertificateController::class, 'store']);
    Route::post('/certificates/bulk', [CertificateController::class, 'bulkStore']);
    Route::put('/certificates/{certificate}', [CertificateController::class, 'update']);
    Route::delete('/certificates/{certificate}', [CertificateController::class, 'destroy']);
});
