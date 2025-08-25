<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Member;
use App\Models\ExpenseCategory;
use App\Models\Expense;
use App\Models\Contribution;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '081234567890',
        ]);

        // Create member users
        User::factory()->create([
            'name' => 'John Member',
            'email' => 'member@example.com',
            'password' => Hash::make('password'),
            'role' => 'member',
            'phone' => '081234567891',
        ]);

        // Create expense categories
        $categories = [
            ['name' => 'Office Supplies', 'description' => 'Stationery, printing materials, and office equipment'],
            ['name' => 'Maintenance', 'description' => 'Building and equipment maintenance costs'],
            ['name' => 'Utilities', 'description' => 'Electricity, water, and internet bills'],
            ['name' => 'Events', 'description' => 'Community events and celebrations'],
            ['name' => 'Transportation', 'description' => 'Travel and transportation expenses'],
            ['name' => 'Food & Beverages', 'description' => 'Catering and refreshments for meetings'],
            ['name' => 'Communications', 'description' => 'Phone, internet, and messaging services'],
            ['name' => 'Miscellaneous', 'description' => 'Other general expenses'],
        ];

        foreach ($categories as $category) {
            ExpenseCategory::create($category);
        }

        // Create members
        $members = Member::factory(15)->active()->create();

        // Create contributions for current year
        $currentYear = now()->year;
        foreach ($members as $member) {
            for ($month = 1; $month <= 12; $month++) {
                $isPaid = $month < now()->month ? fake()->boolean(80) : false;
                
                Contribution::create([
                    'member_id' => $member->id,
                    'month' => $month,
                    'year' => $currentYear,
                    'amount' => 30000,
                    'status' => $isPaid ? 'paid' : 'unpaid',
                    'paid_at' => $isPaid ? fake()->dateTimeBetween("$currentYear-$month-01", "$currentYear-$month-28") : null,
                ]);

                if ($isPaid) {
                    $member->increment('cash_balance', 30000);
                }
            }
        }

        // Create some expenses
        Expense::factory(20)->create([
            'user_id' => $admin->id,
            'expense_category_id' => fn() => ExpenseCategory::inRandomOrder()->first()->id,
        ]);
    }
}