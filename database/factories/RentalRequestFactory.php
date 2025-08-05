<?php

namespace Database\Factories;

use App\Models\RentalItem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentalRequest>
 */
class RentalRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rentalItem = RentalItem::factory()->create();
        $startDate = Carbon::now()->addDays(random_int(1, 30));
        $endDate = $startDate->copy()->addDays(random_int(1, 10));
        $totalDays = $startDate->diffInDays($endDate) + 1;
        
        return [
            'rental_item_id' => $rentalItem->id,
            'renter_id' => User::factory(),
            'lister_id' => $rentalItem->user_id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'total_days' => $totalDays,
            'price_per_day' => $rentalItem->price_per_day,
            'total_amount' => $rentalItem->price_per_day * $totalDays,
            'currency' => $rentalItem->currency,
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'message' => $this->faker->optional(0.7)->paragraph(),
            'response_message' => $this->faker->optional(0.3)->sentence(),
            'responded_at' => $this->faker->optional(0.3)->dateTimeThisMonth(),
        ];
    }
}