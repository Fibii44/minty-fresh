<?php

namespace Database\Seeders;

use App\Models\Cleaner;
use Illuminate\Database\Seeder;

class CleanerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cleaners = [
            [
                'name' => 'Elena Rostova',
                'email' => 'elena@sparkleclean.com',
                'phone' => '+1 (555) 019-2834',
                'rating' => 4.95,
                'status' => 'active',
                'avatar_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
                'bio' => 'Expert in deep cleaning and home organization with 5+ years of experience. Elena has a sharp eye for detail and leaves every corner sparkling.',
            ],
            [
                'name' => 'Marcus Vance',
                'email' => 'marcus@sparkleclean.com',
                'phone' => '+1 (555) 014-9876',
                'rating' => 4.88,
                'status' => 'active',
                'avatar_url' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
                'bio' => 'Detail-oriented specialist in post-construction and move-in/move-out cleans. Fast, efficient, and exceptionally reliable.',
            ],
            [
                'name' => 'Aisha Johnson',
                'email' => 'aisha@sparkleclean.com',
                'phone' => '+1 (555) 017-4321',
                'rating' => 4.92,
                'status' => 'active',
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
                'bio' => 'Green-cleaning advocate specializing in allergen-free, eco-friendly products. Aisha is highly requested by pet owners and families.',
            ],
            [
                'name' => 'Yuki Tanaka',
                'email' => 'yuki@sparkleclean.com',
                'phone' => '+1 (555) 012-5555',
                'rating' => 4.97,
                'status' => 'active',
                'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
                'bio' => 'Meticulous cleaning technician focusing on premium residences and high-end kitchens/bathrooms. Yuki is known for his calm, quiet, and thorough work ethic.',
            ],
        ];

        foreach ($cleaners as $cleaner) {
            Cleaner::updateOrCreate(['email' => $cleaner['email']], $cleaner);
        }
    }
}
