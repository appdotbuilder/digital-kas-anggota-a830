<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Contribution;
use App\Models\Expense;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index()
    {
        if (auth()->user()->isAdmin()) {
            return $this->renderAdminDashboard();
        }

        return $this->renderMemberDashboard();
    }

    /**
     * Display the admin dashboard.
     */
    protected function renderAdminDashboard()
    {
        $currentMonth = now()->month;
        $currentYear = now()->year;

        // Calculate total cash from all members
        $totalCash = Member::sum('cash_balance');

        // Count active members
        $activeMembers = Member::active()->count();

        // Calculate monthly income (paid contributions this month)
        $monthlyIncome = Contribution::where('month', $currentMonth)
            ->where('year', $currentYear)
            ->where('status', 'paid')
            ->sum('amount');

        // Calculate monthly expenses
        $monthlyExpenses = Expense::whereMonth('expense_date', $currentMonth)
            ->whereYear('expense_date', $currentYear)
            ->sum('amount');

        // Count members in arrears (unpaid for current month)
        $membersInArrears = Contribution::where('month', $currentMonth)
            ->where('year', $currentYear)
            ->where('status', 'unpaid')
            ->count();

        // Get recent activities
        $recentContributions = Contribution::with('member')
            ->where('status', 'paid')
            ->latest('paid_at')
            ->limit(5)
            ->get();

        $recentExpenses = Expense::with(['category', 'user'])
            ->latest('expense_date')
            ->limit(5)
            ->get();

        // Monthly income/expense chart data for the past 6 months
        $chartData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $month = $date->month;
            $year = $date->year;

            $income = Contribution::where('month', $month)
                ->where('year', $year)
                ->where('status', 'paid')
                ->sum('amount');

            $expenses = Expense::whereMonth('expense_date', $month)
                ->whereYear('expense_date', $year)
                ->sum('amount');

            $chartData[] = [
                'month' => $date->format('M Y'),
                'income' => (float) $income,
                'expenses' => (float) $expenses,
            ];
        }

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalCash' => (float) $totalCash,
                'activeMembers' => $activeMembers,
                'monthlyIncome' => (float) $monthlyIncome,
                'monthlyExpenses' => (float) $monthlyExpenses,
                'membersInArrears' => $membersInArrears,
            ],
            'recentContributions' => $recentContributions,
            'recentExpenses' => $recentExpenses,
            'chartData' => $chartData,
        ]);
    }

    /**
     * Display the member dashboard.
     */
    protected function renderMemberDashboard()
    {
        $user = auth()->user();
        $member = Member::where('email', $user->email)->first();

        if (!$member) {
            return Inertia::render('member/dashboard', [
                'error' => 'Member profile not found. Please contact administrator.',
            ]);
        }

        $currentMonth = now()->month;
        $currentYear = now()->year;

        // Get current month contribution status
        $currentContribution = Contribution::where('member_id', $member->id)
            ->where('month', $currentMonth)
            ->where('year', $currentYear)
            ->first();

        // Get total collected cash
        $totalCash = Member::sum('cash_balance');

        // Get recent expenses
        $recentExpenses = Expense::with('category')
            ->latest('expense_date')
            ->limit(5)
            ->get();

        // Get payment history
        $paymentHistory = Contribution::where('member_id', $member->id)
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->limit(12)
            ->get();

        return Inertia::render('member/dashboard', [
            'member' => $member,
            'currentContribution' => $currentContribution,
            'totalCash' => (float) $totalCash,
            'recentExpenses' => $recentExpenses,
            'paymentHistory' => $paymentHistory,
        ]);
    }
}