<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmationMail;
use App\Models\Booking;
use App\Models\Cleaner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Store a newly created booking in database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:50',
            'service_type' => 'required|string',
            'bedrooms' => 'required|integer|min:1',
            'bathrooms' => 'required|integer|min:1',
            'frequency' => 'required|string',
            'add_ons' => 'nullable|array',
            'total_price' => 'required|numeric',
            'booking_date' => 'required|date',
            'booking_time' => 'required|string',
            'address' => 'required|string',
            'city' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
            'special_instructions' => 'nullable|string',
            'cleaner_id' => 'nullable|exists:cleaners,id',
            'stripe_token' => 'required|string',
        ]);

        // Process Stripe Payment
        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            \Stripe\Charge::create([
                'amount' => round($validated['total_price'] * 100), // Stripe expects cents
                'currency' => 'usd',
                'source' => $request->stripe_token,
                'description' => 'MintyFresh Cleaning Service for ' . $validated['customer_name'],
                'metadata' => [
                    'email' => $validated['customer_email'],
                    'phone' => $validated['customer_phone'] ?? 'N/A',
                    'date' => $validated['booking_date'],
                    'time' => $validated['booking_time'],
                ]
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['stripe_token' => 'Payment failed: ' . $e->getMessage()]);
        }

        // Associate user if authenticated
        $validated['user_id'] = auth()->check() ? auth()->id() : null;
        
        // If a specific cleaner was preferred, check if active and set it
        if (!empty($validated['cleaner_id'])) {
            $validated['status'] = 'assigned';
        } else {
            $validated['status'] = 'pending';
        }

        $booking = Booking::create($validated);

        // Send confirmation email to the customer
        try {
            Mail::to($booking->customer_email)->send(new BookingConfirmationMail($booking->load('cleaner')));
        } catch (\Exception $e) {
            // Log email failure but don't block the booking confirmation
            \Log::warning('Booking confirmation email failed: ' . $e->getMessage());
        }

        if (auth()->check()) {
            return redirect()->route('dashboard')->with('success', 'Your cleaning booking has been scheduled successfully!');
        }

        // For guests, redirect to the booking confirmation page (safe to refresh)
        return redirect()->route('booking.confirmed', $booking->id);
    }

    /**
     * Assign a cleaner to a booking (Admin only).
     */
    public function assignCleaner(Request $request, Booking $booking)
    {
        $this->authorizeAdmin();

        $request->validate([
            'cleaner_id' => 'nullable|exists:cleaners,id',
        ]);

        $cleanerId = $request->input('cleaner_id');
        
        $booking->update([
            'cleaner_id' => $cleanerId,
            'status' => $cleanerId ? 'assigned' : 'pending',
        ]);

        return back()->with('success', 'Cleaner assigned successfully.');
    }

    /**
     * Update booking status (Admin/Cleaner).
     */
    public function updateStatus(Request $request, Booking $booking)
    {
        $user = auth()->user();
        
        // Authorization check: Admin can do anything; Cleaner can only update if assigned to them.
        if ($user->role !== 'admin') {
            $cleaner = Cleaner::where('email', $user->email)->first();
            if (!$cleaner || $booking->cleaner_id !== $cleaner->id) {
                abort(403, 'Unauthorized action.');
            }
        }

        $request->validate([
            'status' => 'required|string|in:pending,assigned,completed,cancelled',
        ]);

        $booking->update([
            'status' => $request->input('status'),
        ]);

        return back()->with('success', 'Booking status updated successfully.');
    }

    /**
     * Delete a booking (Admin only).
     */
    public function destroy(Booking $booking)
    {
        $this->authorizeAdmin();
        $booking->delete();
        return back()->with('success', 'Booking deleted successfully.');
    }

    /**
     * Helper to enforce admin role.
     */
    protected function authorizeAdmin()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
    }
}
