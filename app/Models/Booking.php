<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'service_type',
        'bedrooms',
        'bathrooms',
        'frequency',
        'add_ons',
        'total_price',
        'booking_date',
        'booking_time',
        'status',
        'cleaner_id',
        'address',
        'city',
        'zip_code',
        'special_instructions',
    ];

    protected $casts = [
        'add_ons' => 'array',
        'booking_date' => 'date',
    ];

    /**
     * Get the user who made the booking.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the cleaner assigned to the booking.
     */
    public function cleaner()
    {
        return $this->belongsTo(Cleaner::class);
    }
}
