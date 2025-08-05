<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RentalItemController;
use App\Http\Controllers\RentalRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public routes
Route::get('/rental-items', [RentalItemController::class, 'index'])->name('rental-items.index');
Route::get('/rental-items/{rentalItem}', [RentalItemController::class, 'show'])->name('rental-items.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Rental Items (authenticated users only for create/edit/delete)
    Route::get('/rental-items/create', [RentalItemController::class, 'create'])->name('rental-items.create');
    Route::post('/rental-items', [RentalItemController::class, 'store'])->name('rental-items.store');
    Route::get('/rental-items/{rentalItem}/edit', [RentalItemController::class, 'edit'])->name('rental-items.edit');
    Route::put('/rental-items/{rentalItem}', [RentalItemController::class, 'update'])->name('rental-items.update');
    Route::delete('/rental-items/{rentalItem}', [RentalItemController::class, 'destroy'])->name('rental-items.destroy');
    
    // Rental Requests
    Route::resource('rental-requests', RentalRequestController::class)->except(['create', 'edit', 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
