<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CleanerController;
use App\Models\Cleaner;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing Page: Fetch active cleaners to pass to the booking wizard's preference list
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'cleaners' => Cleaner::where('status', 'active')->get(),
    ]);
});

// Guest Booking Success Page (uses route model binding)
Route::get('/booking-confirmed/{booking}', function (\App\Models\Booking $booking) {
    return Inertia::render('BookingConfirmed', [
        'booking' => $booking->load('cleaner'),
    ]);
})->name('booking.confirmed');

// New Book Page Route
Route::get('/book', function () {
    return Inertia::render('Book', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'cleaners' => Cleaner::where('status', 'active')->get(),
        'stripeKey' => env('STRIPE_KEY'),
    ]);
})->name('book');

// Booking Submission
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

// Protected Dashboard and Account Routes
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    // User Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin & Cleaner Booking management
    Route::patch('/bookings/{booking}/assign', [BookingController::class, 'assignCleaner'])->name('bookings.assign');
    Route::patch('/bookings/{booking}/status', [BookingController::class, 'updateStatus'])->name('bookings.status');
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');

    // Admin Cleaner management
    Route::get('/cleaners', [CleanerController::class, 'index'])->name('cleaners.index');
    Route::post('/cleaners', [CleanerController::class, 'store'])->name('cleaners.store');
    Route::patch('/cleaners/{cleaner}', [CleanerController::class, 'update'])->name('cleaners.update');
    Route::delete('/cleaners/{cleaner}', [CleanerController::class, 'destroy'])->name('cleaners.destroy');
});

require __DIR__.'/auth.php';
