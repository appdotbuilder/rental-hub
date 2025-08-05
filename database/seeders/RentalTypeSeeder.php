<?php

namespace Database\Seeders;

use App\Models\RentalType;
use Illuminate\Database\Seeder;

class RentalTypeSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $rentalTypes = [
            [
                'key' => 'car',
                'name' => [
                    'en' => 'Car',
                    'id' => 'Mobil'
                ],
                'description' => [
                    'en' => 'Rent cars for transportation',
                    'id' => 'Sewa mobil untuk transportasi'
                ],
                'icon' => 'car',
                'sort_order' => 1,
            ],
            [
                'key' => 'motorcycle',
                'name' => [
                    'en' => 'Motorcycle',
                    'id' => 'Motor'
                ],
                'description' => [
                    'en' => 'Rent motorcycles for quick trips',
                    'id' => 'Sewa motor untuk perjalanan cepat'
                ],
                'icon' => 'motorcycle',
                'sort_order' => 2,
            ],
            [
                'key' => 'storage',
                'name' => [
                    'en' => 'Storage',
                    'id' => 'Penyimpanan'
                ],
                'description' => [
                    'en' => 'Rent storage spaces for your items',
                    'id' => 'Sewa ruang penyimpanan untuk barang Anda'
                ],
                'icon' => 'package',
                'sort_order' => 3,
            ],
            [
                'key' => 'property',
                'name' => [
                    'en' => 'Property',
                    'id' => 'Properti'
                ],
                'description' => [
                    'en' => 'Rent properties for accommodation',
                    'id' => 'Sewa properti untuk akomodasi'
                ],
                'icon' => 'home',
                'sort_order' => 4,
            ],
            [
                'key' => 'equipment',
                'name' => [
                    'en' => 'Equipment',
                    'id' => 'Peralatan'
                ],
                'description' => [
                    'en' => 'Rent tools and equipment',
                    'id' => 'Sewa alat dan peralatan'
                ],
                'icon' => 'tool',
                'sort_order' => 5,
            ],
        ];

        foreach ($rentalTypes as $type) {
            RentalType::create($type);
        }
    }
}