import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface DashboardStats {
    totalCash: number;
    activeMembers: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    membersInArrears: number;
}

interface ChartDataPoint {
    month: string;
    income: number;
    expenses: number;
}

interface Contribution {
    id: number;
    member: {
        name: string;
    };
    amount: number;
    paid_at: string;
}

interface Expense {
    id: number;
    amount: number;
    description: string;
    expense_date: string;
    category: {
        name: string;
    };
    user: {
        name: string;
    };
}

interface Props {
    stats: DashboardStats;
    recentContributions: Contribution[];
    recentExpenses: Expense[];
    chartData: ChartDataPoint[];
    [key: string]: unknown;
}

export default function AdminDashboard({ 
    stats, 
    recentContributions, 
    recentExpenses, 
    chartData 
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const StatCard = ({ title, value, icon, color, subtitle }: {
        title: string;
        value: string | number;
        icon: string;
        color: string;
        subtitle?: string;
    }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                    <span className="text-xl">{icon}</span>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                        {typeof value === 'number' ? formatCurrency(value) : value}
                    </div>
                    {subtitle && (
                        <div className="text-sm text-gray-600">{subtitle}</div>
                    )}
                </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
    );

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            📊 Admin Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Welcome back! Here's an overview of your organization's contributions.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Button className="w-full sm:w-auto">
                            📈 View Reports
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                    <StatCard
                        title="Total Cash Balance"
                        value={stats.totalCash}
                        icon="💰"
                        color="bg-emerald-100 text-emerald-600"
                    />
                    <StatCard
                        title="Active Members"
                        value={stats.activeMembers}
                        icon="👥"
                        color="bg-blue-100 text-blue-600"
                        subtitle="members"
                    />
                    <StatCard
                        title="Monthly Income"
                        value={stats.monthlyIncome}
                        icon="📈"
                        color="bg-green-100 text-green-600"
                    />
                    <StatCard
                        title="Monthly Expenses"
                        value={stats.monthlyExpenses}
                        icon="📉"
                        color="bg-red-100 text-red-600"
                    />
                    <StatCard
                        title="Members in Arrears"
                        value={stats.membersInArrears}
                        icon="⚠️"
                        color="bg-orange-100 text-orange-600"
                        subtitle="unpaid"
                    />
                </div>

                {/* Charts Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        📊 Income vs Expenses (Last 6 Months)
                    </h2>
                    <div className="space-y-4">
                        {chartData.map((data, index) => {
                            const netIncome = data.income - data.expenses;
                            const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expenses)));
                            const incomePercent = (data.income / maxValue) * 100;
                            const expensePercent = (data.expenses / maxValue) * 100;

                            return (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-gray-700">{data.month}</span>
                                        <span className={`font-semibold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            Net: {formatCurrency(netIncome)}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-green-600 w-16">Income</span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${incomePercent}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-600 w-20 text-right">
                                                {formatCurrency(data.income)}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-red-600 w-16">Expenses</span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${expensePercent}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-600 w-20 text-right">
                                                {formatCurrency(data.expenses)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Contributions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                💳 Recent Contributions
                            </h2>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {recentContributions.length > 0 ? (
                                recentContributions.map((contribution) => (
                                    <div key={contribution.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {contribution.member.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {formatDate(contribution.paid_at)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-green-600">
                                                {formatCurrency(contribution.amount)}
                                            </div>
                                            <div className="text-xs text-green-600">Paid</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    No recent contributions
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Expenses */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                💸 Recent Expenses
                            </h2>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {recentExpenses.length > 0 ? (
                                recentExpenses.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {expense.category.name}
                                            </div>
                                            <div className="text-sm text-gray-600 truncate max-w-32">
                                                {expense.description}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {formatDate(expense.expense_date)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-red-600">
                                                {formatCurrency(expense.amount)}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                by {expense.user.name}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    No recent expenses
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white">
                    <h2 className="text-lg font-semibold mb-4">🚀 Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="secondary" className="h-auto p-4 flex-col space-y-2">
                            <span className="text-2xl">👥</span>
                            <span className="text-sm">Add Member</span>
                        </Button>
                        <Button variant="secondary" className="h-auto p-4 flex-col space-y-2">
                            <span className="text-2xl">💳</span>
                            <span className="text-sm">Record Payment</span>
                        </Button>
                        <Button variant="secondary" className="h-auto p-4 flex-col space-y-2">
                            <span className="text-2xl">💸</span>
                            <span className="text-sm">Add Expense</span>
                        </Button>
                        <Button variant="secondary" className="h-auto p-4 flex-col space-y-2">
                            <span className="text-2xl">📊</span>
                            <span className="text-sm">View Reports</span>
                        </Button>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}