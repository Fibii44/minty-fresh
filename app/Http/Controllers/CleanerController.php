<?php

namespace App\Http\Controllers;

use App\Models\Cleaner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CleanerController extends Controller
{
    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('Cleaners/Index', [
            'cleaners' => Cleaner::all(),
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:cleaners,email',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'avatar_url' => 'nullable|string|max:2048',
        ]);

        // Provide a default beautiful avatar if none specified
        $avatar = $request->avatar_url ?: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80';

        Cleaner::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'bio' => $request->bio,
            'status' => $request->status,
            'avatar_url' => $avatar,
            'rating' => 5.0,
        ]);

        return redirect()->back()->with('success', 'Cleaner added successfully.');
    }

    public function update(Request $request, Cleaner $cleaner)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:cleaners,email,' . $cleaner->id,
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'avatar_url' => 'nullable|string|max:2048',
            'rating' => 'required|numeric|min:0|max:5',
        ]);

        $cleaner->update($request->only(['name', 'email', 'phone', 'bio', 'status', 'avatar_url', 'rating']));

        return redirect()->back()->with('success', 'Cleaner updated successfully.');
    }

    public function destroy(Cleaner $cleaner)
    {
        // Set cleaner_id in bookings to null before deleting
        \App\Models\Booking::where('cleaner_id', $cleaner->id)->update(['cleaner_id' => null]);
        
        $cleaner->delete();

        return redirect()->back()->with('success', 'Cleaner removed successfully.');
    }
}
