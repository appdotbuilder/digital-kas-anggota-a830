<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpenseCategory>
 */
class ExpenseCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Office Supplies' => 'Stationery, printing materials, and office equipment',
            'Maintenance' => 'Building and equipment maintenance costs',
            'Utilities' => 'Electricity, water, and internet bills',
            'Events' => 'Community events and celebrations',
            'Transportation' => 'Travel and transportation expenses',
            'Food & Beverages' => 'Catering and refreshments for meetings',
            'Communications' => 'Phone, internet, and messaging services',
            'Miscellaneous' => 'Other general expenses',
        ];

        $name = fake()->randomElement(array_keys($categories));

        return [
            'name' => $name,
            'description' => $categories[$name],
        ];
    }
}