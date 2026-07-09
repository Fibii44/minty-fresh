<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            $table->string('service_type'); // standard, deep, move_out, commercial
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->string('frequency'); // one_time, weekly, bi_weekly, monthly
            $table->json('add_ons')->nullable(); // e.g. ["oven", "fridge", "windows"]
            $table->decimal('total_price', 8, 2);
            $table->date('booking_date');
            $table->string('booking_time'); // e.g. "09:00 AM"
            $table->string('status')->default('pending'); // pending, assigned, completed, cancelled
            $table->foreignId('cleaner_id')->nullable()->constrained('cleaners')->onDelete('set null');
            $table->text('address');
            $table->string('city')->nullable();
            $table->string('zip_code')->nullable();
            $table->text('special_instructions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
