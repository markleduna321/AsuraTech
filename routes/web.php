<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home-page/page', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/products/timesync', function () {
    return Inertia::render('products/timesync/page', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('products.timesync');

Route::get('/products/gymasura', function () {
    return Inertia::render('products/gymasura/page', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('products.gymasura');

Route::get('/dashboard', function () {
    return redirect()->route('certificates.admin');
})->middleware(['auth', 'verified'])->name('dashboard');

// Public certificate verification — accessible via QR code scan (no auth)
Route::get('/certificates/{uuid}', function (string $uuid) {
    return Inertia::render('certificates/view/page', [
        'uuid' => $uuid,
    ]);
})->name('certificates.view');

// Admin certificate management (requires auth)
Route::get('/admin/certificates', function () {
    return Inertia::render('certificates/admin/page');
})->middleware(['auth', 'verified'])->name('certificates.admin');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
