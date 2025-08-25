<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page showcasing the app
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard (role-based)
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Admin-only routes
    Route::middleware(App\Http\Middleware\EnsureUserIsAdmin::class)->group(function () {
        // Member management
        Route::resource('members', MemberController::class);
        
        // Contribution recording
        Route::resource('contributions', ContributionController::class)
            ->except(['create', 'edit', 'destroy']);
        
        // Expense management
        Route::resource('expenses', ExpenseController::class);
    });
    
    // Member routes (accessible by member role users)
    Route::middleware(App\Http\Middleware\EnsureUserIsMember::class)->group(function () {
        Route::get('/profile', function () {
            return Inertia::render('member/profile');
        })->name('member.profile');
        
        Route::get('/payment-history', function () {
            return Inertia::render('member/payment-history');
        })->name('member.payment-history');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';