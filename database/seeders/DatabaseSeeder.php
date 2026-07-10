<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Cleaner;
use App\Models\Booking;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@sparkleclean.com'],
            [
                'name' => 'Sarah Connor',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Seed Feby Admin (Sparkle Clean domain)
        User::updateOrCreate(
            ['email' => 'feby@sparkleclean.com'],
            [
                'name' => 'feby admin',
                'password' => Hash::make('admin@123'),
                'role' => 'admin',
            ]
        );

        // Seed Feby Admin (MintyFresh domain)
        User::updateOrCreate(
            ['email' => 'feby@mintyfresh.com'],
            [
                'name' => 'feby admin',
                'password' => Hash::make('admin@123'),
                'role' => 'admin',
            ]
        );

        // 3. Run CleanerSeeder
        $this->call(CleanerSeeder::class);

        // Get cleaners
        $cleaners = Cleaner::all();

        // 4. Seed Mock Bookings
        $bookings = [
            [
                'user_id' => null,
                'customer_name' => 'John Doe',
                'customer_email' => 'client@sparkleclean.com',
                'customer_phone' => '+1 (555) 123-4567',
                'service_type' => 'deep',
                'bedrooms' => 3,
                'bathrooms' => 2,
                'frequency' => 'monthly',
                'add_ons' => ['oven', 'fridge'],
                'total_price' => 285.00,
                'booking_date' => now()->addDays(2)->format('Y-m-d'),
                'booking_time' => '09:00 AM',
                'status' => 'assigned',
                'cleaner_id' => $cleaners->first()->id, // Elena
                'address' => '742 Evergreen Terrace',
                'city' => 'Springfield',
                'zip_code' => '97477',
                'special_instructions' => 'Key is under the flowerpot. Watch out for the dog, he is friendly but jumps.',
            ],
            [
                'user_id' => null,
                'customer_name' => 'John Doe',
                'customer_email' => 'client@sparkleclean.com',
                'customer_phone' => '+1 (555) 123-4567',
                'service_type' => 'standard',
                'bedrooms' => 2,
                'bathrooms' => 1,
                'frequency' => 'bi_weekly',
                'add_ons' => ['windows'],
                'total_price' => 185.00,
                'booking_date' => now()->subDays(5)->format('Y-m-d'),
                'booking_time' => '11:30 AM',
                'status' => 'completed',
                'cleaner_id' => $cleaners->skip(1)->first()->id, // Marcus
                'address' => '742 Evergreen Terrace',
                'city' => 'Springfield',
                'zip_code' => '97477',
                'special_instructions' => 'Please focus on the kitchen baseboards.',
            ],
            [
                'user_id' => null, // Guest booking
                'customer_name' => 'Alice Smith',
                'customer_email' => 'alice@gmail.com',
                'customer_phone' => '+1 (555) 987-6543',
                'service_type' => 'move_out',
                'bedrooms' => 4,
                'bathrooms' => 3,
                'frequency' => 'one_time',
                'add_ons' => ['oven', 'fridge', 'windows', 'baseboards'],
                'total_price' => 510.00,
                'booking_date' => now()->addDays(4)->format('Y-m-d'),
                'booking_time' => '09:00 AM',
                'status' => 'pending',
                'cleaner_id' => null,
                'address' => '123 Pinecrest Lane',
                'city' => 'Shelbyville',
                'zip_code' => '97478',
                'special_instructions' => 'Empty house, electricity and water are still turned on. Code to lockbox is 4821.',
            ],
            [
                'user_id' => null, // Guest booking
                'customer_name' => 'Robert Davis',
                'customer_email' => 'robert.d@outlook.com',
                'customer_phone' => '+1 (555) 456-7890',
                'service_type' => 'commercial',
                'bedrooms' => 1, // offices count
                'bathrooms' => 2,
                'frequency' => 'weekly',
                'add_ons' => [],
                'total_price' => 385.00,
                'booking_date' => now()->addDays(1)->format('Y-m-d'),
                'booking_time' => '06:00 PM',
                'status' => 'assigned',
                'cleaner_id' => $cleaners->skip(2)->first()->id, // Aisha
                'address' => '456 Financial Plaza, Suite 200',
                'city' => 'Springfield',
                'zip_code' => '97477',
                'special_instructions' => 'Office cleaning. Trash removal and vacuuming are main priorities. Access card is at security desk.',
            ],
            [
                'user_id' => null,
                'customer_name' => 'John Doe',
                'customer_email' => 'client@sparkleclean.com',
                'customer_phone' => '+1 (555) 123-4567',
                'service_type' => 'deep',
                'bedrooms' => 2,
                'bathrooms' => 2,
                'frequency' => 'one_time',
                'add_ons' => [],
                'total_price' => 220.00,
                'booking_date' => now()->subDays(12)->format('Y-m-d'),
                'booking_time' => '02:00 PM',
                'status' => 'completed',
                'cleaner_id' => $cleaners->last()->id, // Yuki
                'address' => '742 Evergreen Terrace',
                'city' => 'Springfield',
                'zip_code' => '97477',
                'special_instructions' => 'Meticulous cleaning of bathrooms please.',
            ],
            [
                'user_id' => null, // Guest
                'customer_name' => 'Michael Scott',
                'customer_email' => 'mscott@dundermifflin.com',
                'customer_phone' => '+1 (555) 888-9999',
                'service_type' => 'standard',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'frequency' => 'one_time',
                'add_ons' => [],
                'total_price' => 125.00,
                'booking_date' => now()->subDays(2)->format('Y-m-d'),
                'booking_time' => '09:00 AM',
                'status' => 'cancelled',
                'cleaner_id' => null,
                'address' => '1725 Slough Avenue',
                'city' => 'Scranton',
                'zip_code' => '18505',
                'special_instructions' => 'Cancelled last minute due to office party conflict.',
            ],
        ];

        foreach ($bookings as $booking) {
            Booking::create($booking);
        }
    }
}
