<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['reminder', 'info', 'news', 'expense', 'income'];
        $type = fake()->randomElement($types);

        $titles = [
            'reminder' => 'Payment Reminder',
            'info' => 'Important Information',
            'news' => 'Organization News',
            'expense' => 'New Expense Recorded',
            'income' => 'Payment Received',
        ];

        return [
            'title' => $titles[$type],
            'message' => fake()->sentence(10),
            'type' => $type,
            'recipient_ids' => [1, 2, 3], // Sample recipient IDs
            'sent_at' => fake()->boolean(70) ? fake()->dateTimeThisMonth() : null,
            'user_id' => User::factory(),
        ];
    }
}