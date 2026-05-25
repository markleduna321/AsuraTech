<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are intended for RTK Query endpoints and must return JSON.
|
*/

// Public — rate limited to 10 requests/min per IP
Route::post('/chat', [ChatController::class, 'send'])->middleware('throttle:chat');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'me']);
    Route::put('/user', [UserController::class, 'update']);
});
