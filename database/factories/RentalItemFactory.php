<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentalItem>
 */
class RentalItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rentalTypes = ['car', 'motorcycle', 'storage', 'property', 'equipment'];
        $type = $this->faker->randomElement($rentalTypes);
        
        return [
            'user_id' => User::factory(),
            'title' => $this->getTitleByType($type),
            'description' => $this->getDescriptionByType($type),
            'rental_type' => $type,
            'price_per_day' => $this->getPriceByType($type),
            'currency' => 'USD',
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'latitude' => $this->faker->latitude(-10, 10),
            'longitude' => $this->faker->longitude(90, 140),
            'is_available' => $this->faker->boolean(85), // 85% available
            'minimum_rental_days' => $this->getMinDaysByType($type),
            'maximum_rental_days' => $this->getMaxDaysByType($type),
            'specifications' => $this->getSpecificationsByType($type),
            'terms_and_conditions' => 'Standard rental terms apply. Valid ID required. No damages allowed.',
            'status' => $this->faker->boolean(75) ? 'active' : 'inactive',
        ];
    }

    protected function getTitleByType(string $type): string
    {
        return match($type) {
            'car' => $this->faker->randomElement([
                '2020 Toyota Camry - Reliable Sedan',
                '2019 Honda Civic - Fuel Efficient',
                '2021 Nissan Altima - Comfortable Drive',
                'BMW 3 Series - Luxury Experience',
                'Hyundai Elantra - Budget Friendly'
            ]),
            'motorcycle' => $this->faker->randomElement([
                'Honda CBR150R - Sport Bike',
                'Yamaha NMAX - City Scooter',
                'Kawasaki Ninja 250 - Performance',
                'Honda PCX - Premium Scooter',
                'Suzuki GSX-R150 - Racing Style'
            ]),
            'storage' => $this->faker->randomElement([
                'Climate Controlled Storage - 10x10',
                'Secure Storage Unit - 8x12 feet',
                'Indoor Storage Space - Large',
                'Mini Storage - Perfect for Boxes',
                '24/7 Access Storage Unit'
            ]),
            'property' => $this->faker->randomElement([
                'Cozy 2BR Apartment - City Center',
                'Modern Studio - Furnished',
                'Spacious House - Family Friendly',
                'Luxury Condo - Ocean View',
                'Budget Room - Clean & Safe'
            ]),
            'equipment' => $this->faker->randomElement([
                'Professional Camera Kit',
                'Power Tools Set - Complete',
                'Camping Equipment Bundle',
                'DJ Equipment - Party Ready',
                'Construction Tools - Heavy Duty'
            ]),
            default => $this->faker->sentence(4),
        };
    }

    protected function getDescriptionByType(string $type): string
    {
        return match($type) {
            'car' => 'Well-maintained vehicle perfect for your transportation needs. Regular maintenance, clean interior, and reliable performance guaranteed.',
            'motorcycle' => 'Excellent motorcycle for city commuting or weekend adventures. Recently serviced with good tires and smooth engine.',
            'storage' => 'Secure storage space for your belongings. Clean, dry, and monitored facility with easy access and flexible terms.',
            'property' => 'Comfortable accommodation in a great location. All amenities included with easy check-in process.',
            'equipment' => 'High-quality equipment in excellent condition. Perfect for your project needs with all accessories included.',
            default => $this->faker->paragraph(),
        };
    }

    protected function getPriceByType(string $type): float
    {
        return match($type) {
            'car' => $this->faker->randomFloat(2, 25, 150),
            'motorcycle' => $this->faker->randomFloat(2, 10, 50),
            'storage' => $this->faker->randomFloat(2, 5, 25),
            'property' => $this->faker->randomFloat(2, 40, 300),
            'equipment' => $this->faker->randomFloat(2, 15, 100),
            default => $this->faker->randomFloat(2, 10, 100),
        };
    }

    protected function getMinDaysByType(string $type): int
    {
        return match($type) {
            'car' => 1,
            'motorcycle' => 1,
            'storage' => 7,
            'property' => 1,
            'equipment' => 1,
            default => 1,
        };
    }

    protected function getMaxDaysByType(string $type): int
    {
        return match($type) {
            'car' => 30,
            'motorcycle' => 14,
            'storage' => 365,
            'property' => 90,
            'equipment' => 7,
            default => 30,
        };
    }

    protected function getSpecificationsByType(string $type): array
    {
        return match($type) {
            'car' => [
                'year' => $this->faker->numberBetween(2015, 2023),
                'make' => $this->faker->randomElement(['Toyota', 'Honda', 'Nissan', 'Hyundai']),
                'transmission' => $this->faker->randomElement(['Automatic', 'Manual']),
                'fuel_type' => 'Gasoline',
                'seats' => $this->faker->numberBetween(4, 7),
            ],
            'motorcycle' => [
                'year' => $this->faker->numberBetween(2016, 2023),
                'make' => $this->faker->randomElement(['Honda', 'Yamaha', 'Kawasaki', 'Suzuki']),
                'engine' => $this->faker->randomElement(['125cc', '150cc', '250cc']),
                'fuel_type' => 'Gasoline',
            ],
            'storage' => [
                'size' => $this->faker->randomElement(['5x5 feet', '8x10 feet', '10x10 feet', '10x15 feet']),
                'features' => ['Climate Controlled', 'Security Cameras', '24/7 Access'],
            ],
            'property' => [
                'bedrooms' => $this->faker->numberBetween(1, 4),
                'bathrooms' => $this->faker->numberBetween(1, 3),
                'amenities' => ['WiFi', 'Kitchen', 'Parking', 'Air Conditioning'],
            ],
            'equipment' => [
                'condition' => 'Excellent',
                'accessories' => 'Included',
                'warranty' => 'Covered',
            ],
            default => [],
        };
    }
}