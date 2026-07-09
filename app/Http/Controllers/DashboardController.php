<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Cleaner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'admin') {
            // Admin stats
            $bookings = Booking::with('cleaner')->orderBy('booking_date', 'desc')->get();
            $cleaners = Cleaner::all();
            
            $completedBookings = Booking::where('status', 'completed')->get();
            $totalRevenue = $completedBookings->sum('total_price');
            $completedCount = $completedBookings->count();
            $pendingCount = Booking::where('status', 'pending')->count();
            $activeCount = Booking::where('status', 'assigned')->count();
            
            return Inertia::render('Dashboard', [
                'role' => 'admin',
                'bookings' => $bookings,
                'cleaners' => $cleaners,
                'stats' => [
                    'totalRevenue' => $totalRevenue,
                    'completedCount' => $completedCount,
                    'pendingCount' => $pendingCount,
                    'activeCount' => $activeCount,
                ]
            ]);
        }

        if ($user->role === 'cleaner') {
            // Cleaner view
            // Find cleaner matched by user email
            $cleaner = Cleaner::where('email', $user->email)->first();
            
            if (!$cleaner) {
                // Auto create cleaner record if missing
                $cleaner = Cleaner::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'rating' => 5.0,
                    'status' => 'active',
                ]);
            }

            $jobs = Booking::where('cleaner_id', $cleaner->id)
                ->orderBy('booking_date', 'desc')
                ->get();

            return Inertia::render('Dashboard', [
                'role' => 'cleaner',
                'cleaner' => $cleaner,
                'jobs' => $jobs,
            ]);
        }

        // Default: client view
        $bookings = Booking::where('user_id', $user->id)
            ->with('cleaner')
            ->orderBy('booking_date', 'desc')
            ->get();

        $cleaners = Cleaner::where('status', 'active')->get();

        return Inertia::render('Dashboard', [
            'role' => 'client',
            'bookings' => $bookings,
            'cleaners' => $cleaners,
        ]);
    }
}
