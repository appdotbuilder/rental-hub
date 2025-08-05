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
        Schema::create('rental_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('rental_type');
            $table->decimal('price_per_day', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->json('images')->nullable();
            $table->json('specifications')->nullable();
            $table->string('location');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->boolean('is_available')->default(true);
            $table->integer('minimum_rental_days')->default(1);
            $table->integer('maximum_rental_days')->nullable();
            $table->text('terms_and_conditions')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('rental_type');
            $table->index('is_available');
            $table->index('status');
            $table->index(['rental_type', 'is_available']);
            $table->index(['location', 'rental_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_items');
    }
};