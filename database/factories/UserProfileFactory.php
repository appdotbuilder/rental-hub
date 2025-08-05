<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isVerified = $this->faker->boolean(60); // 60% verified
        
        return [
            'user_id' => User::factory(),
            'role' => $this->faker->randomElement(['lister', 'renter']),
            'phone' => $this->faker->phoneNumber(),
            'bio' => $this->faker->optional(0.7)->paragraph(),
            'language' => $this->faker->randomElement(['en', 'id']),
            'timezone' => $this->faker->timezone(),
            'notification_preferences' => [
                'email_notifications' => $this->faker->boolean(),
                'sms_notifications' => $this->faker->boolean(),
                'push_notifications' => $this->faker->boolean(),
            ],
            'rating' => $this->faker->optional(0.4)->randomFloat(2, 3.0, 5.0),
            'total_reviews' => $this->faker->numberBetween(0, 50),
            'is_verified' => $isVerified,
            'verified_at' => $isVerified ? $this->faker->dateTimeThisYear() : null,
        ];
    }
}