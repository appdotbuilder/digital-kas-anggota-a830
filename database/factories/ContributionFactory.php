<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contribution>
 */
class ContributionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isPaid = fake()->boolean(70); // 70% chance of being paid

        return [
            'member_id' => Member::factory(),
            'month' => fake()->numberBetween(1, 12),
            'year' => fake()->numberBetween(2023, 2024),
            'amount' => 30000,
            'status' => $isPaid ? 'paid' : 'unpaid',
            'paid_at' => $isPaid ? fake()->dateTimeThisYear() : null,
        ];
    }

    /**
     * Indicate that the contribution is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'paid_at' => fake()->dateTimeThisYear(),
        ]);
    }

    /**
     * Indicate that the contribution is unpaid.
     */
    public function unpaid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'unpaid',
            'paid_at' => null,
        ]);
    }
}