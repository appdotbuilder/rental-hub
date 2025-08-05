<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\RentalItem;
use App\Models\RentalRequest;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create rental types first
        $this->call(RentalTypeSeeder::class);

        // Create test users with profiles
        $lister = User::factory()->create([
            'name' => 'John Lister',
            'email' => 'lister@example.com',
        ]);

        $renter = User::factory()->create([
            'name' => 'Jane Renter',
            'email' => 'renter@example.com',
        ]);

        // Create user profiles
        UserProfile::create([
            'user_id' => $lister->id,
            'role' => 'lister',
            'phone' => '+1234567890',
            'bio' => 'Experienced lister with quality rental items',
            'language' => 'en',
            'is_verified' => true,
            'verified_at' => now(),
        ]);

        UserProfile::create([
            'user_id' => $renter->id,
            'role' => 'renter',
            'phone' => '+0987654321',
            'bio' => 'Reliable renter looking for quality items',
            'language' => 'en',
            'is_verified' => true,
            'verified_at' => now(),
        ]);

        // Create sample rental items
        $carItem = RentalItem::create([
            'user_id' => $lister->id,
            'title' => '2020 Toyota Camry - Comfortable Sedan',
            'description' => 'Clean, reliable sedan perfect for city driving and longer trips. Features include automatic transmission, air conditioning, Bluetooth connectivity, and excellent fuel economy.',
            'rental_type' => 'car',
            'price_per_day' => 45.00,
            'currency' => 'USD',
            'location' => 'Downtown Jakarta',
            'latitude' => -6.2088,
            'longitude' => 106.8456,
            'minimum_rental_days' => 1,
            'maximum_rental_days' => 30,
            'specifications' => [
                'year' => 2020,
                'make' => 'Toyota',
                'model' => 'Camry',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'seats' => 5,
                'features' => ['Air Conditioning', 'Bluetooth', 'Backup Camera']
            ],
            'terms_and_conditions' => 'Valid driver license required. No smoking. Return with same fuel level.',
        ]);

        RentalItem::create([
            'user_id' => $lister->id,
            'title' => 'Honda CBR150R - Sport Motorcycle',
            'description' => 'Perfect motorcycle for city commuting. Well-maintained with recent service. Great fuel efficiency and smooth ride.',
            'rental_type' => 'motorcycle',
            'price_per_day' => 15.00,
            'currency' => 'USD',
            'location' => 'South Jakarta',
            'latitude' => -6.2614,
            'longitude' => 106.8106,
            'minimum_rental_days' => 1,
            'maximum_rental_days' => 14,
            'specifications' => [
                'year' => 2019,
                'make' => 'Honda',
                'model' => 'CBR150R',
                'engine' => '150cc',
                'fuel_type' => 'Gasoline',
                'features' => ['Electric Start', 'Digital Display', 'LED Lights']
            ],
            'terms_and_conditions' => 'Valid motorcycle license required. Helmet provided. No modifications allowed.',
        ]);

        RentalItem::create([
            'user_id' => $lister->id,
            'title' => 'Secure Storage Unit - 10x10 feet',
            'description' => 'Climate-controlled storage unit perfect for furniture, boxes, and personal items. 24/7 access with security cameras.',
            'rental_type' => 'storage',
            'price_per_day' => 8.00,
            'currency' => 'USD',
            'location' => 'Central Jakarta',
            'latitude' => -6.1744,
            'longitude' => 106.8294,
            'minimum_rental_days' => 7,
            'maximum_rental_days' => 365,
            'specifications' => [
                'size' => '10x10 feet',
                'features' => ['Climate Controlled', '24/7 Access', 'Security Cameras', 'Ground Floor']
            ],
            'terms_and_conditions' => 'No hazardous materials. Monthly payment required for rentals over 30 days.',
        ]);

        // Create sample rental request
        RentalRequest::create([
            'rental_item_id' => $carItem->id,
            'renter_id' => $renter->id,
            'lister_id' => $lister->id,
            'start_date' => now()->addDays(5),
            'end_date' => now()->addDays(8),
            'total_days' => 4,
            'price_per_day' => $carItem->price_per_day,
            'total_amount' => $carItem->price_per_day * 4,
            'currency' => $carItem->currency,
            'status' => 'pending',
            'message' => 'Hi! I would like to rent your Toyota Camry for a weekend trip. I am an experienced driver with a clean record.',
        ]);

        // Create additional sample users
        User::factory(8)->create()->each(function ($user) {
            UserProfile::create([
                'user_id' => $user->id,
                'role' => random_int(1, 10) <= 7 ? 'renter' : 'lister', // 70% renters, 30% listers
                'phone' => '+' . random_int(1000000000, 9999999999),
                'language' => random_int(1, 10) <= 8 ? 'en' : 'id', // 80% English, 20% Indonesian
                'is_verified' => random_int(1, 10) <= 6, // 60% verified
                'verified_at' => random_int(1, 10) <= 6 ? now() : null,
            ]);
        });
    }
}
