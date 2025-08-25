<?php

namespace Database\Factories;

use App\Models\ExpenseCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'expense_date' => fake()->dateTimeThisYear(),
            'expense_category_id' => ExpenseCategory::factory(),
            'amount' => fake()->randomFloat(2, 10000, 500000),
            'description' => fake()->sentence(10),
            'user_id' => User::factory(),
        ];
    }
}