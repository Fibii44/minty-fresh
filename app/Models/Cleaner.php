<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cleaner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'rating',
        'status',
        'avatar_url',
        'bio',
    ];

    /**
     * Get the bookings assigned to this cleaner.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
