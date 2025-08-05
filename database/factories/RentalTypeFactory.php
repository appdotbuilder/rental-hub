<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentalType>
 */
class RentalTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $key = $this->faker->unique()->randomElement(['car', 'motorcycle', 'storage', 'property', 'equipment']);
        
        return [
            'key' => $key,
            'name' => $this->getNameByKey($key),
            'description' => $this->getDescriptionByKey($key),
            'icon' => $this->getIconByKey($key),
            'is_active' => $this->faker->boolean(90), // 90% active
            'sort_order' => $this->faker->numberBetween(1, 100),
        ];
    }

    protected function getNameByKey(string $key): array
    {
        return match($key) {
            'car' => ['en' => 'Car', 'id' => 'Mobil'],
            'motorcycle' => ['en' => 'Motorcycle', 'id' => 'Motor'],
            'storage' => ['en' => 'Storage', 'id' => 'Penyimpanan'],
            'property' => ['en' => 'Property', 'id' => 'Properti'],
            'equipment' => ['en' => 'Equipment', 'id' => 'Peralatan'],
            default => ['en' => ucfirst($key), 'id' => ucfirst($key)],
        };
    }

    protected function getDescriptionByKey(string $key): array
    {
        return match($key) {
            'car' => [
                'en' => 'Rent cars for transportation',
                'id' => 'Sewa mobil untuk transportasi'
            ],
            'motorcycle' => [
                'en' => 'Rent motorcycles for quick trips',
                'id' => 'Sewa motor untuk perjalanan cepat'
            ],
            'storage' => [
                'en' => 'Rent storage spaces for your items',
                'id' => 'Sewa ruang penyimpanan untuk barang Anda'
            ],
            'property' => [
                'en' => 'Rent properties for accommodation',
                'id' => 'Sewa properti untuk akomodasi'
            ],
            'equipment' => [
                'en' => 'Rent tools and equipment',
                'id' => 'Sewa alat dan peralatan'
            ],
            default => [
                'en' => "Rent {$key} items",
                'id' => "Sewa {$key}"
            ],
        };
    }

    protected function getIconByKey(string $key): string
    {
        return match($key) {
            'car' => 'car',
            'motorcycle' => 'motorcycle',
            'storage' => 'package',
            'property' => 'home',
            'equipment' => 'tool',
            default => 'circle',
        };
    }
}