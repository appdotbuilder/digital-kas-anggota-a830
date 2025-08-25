import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    cash_balance: number;
    profile_photo: string | null;
}

interface Contribution {
    id: number;
    month: number;
    year: number;
    amount: number;
    status: 'paid' | 'unpaid';
    paid_at: string | null;
}

interface Expense {
    id: number;
    amount: number;
    description: string;
    expense_date: string;
    category: {
        name: string;
    };
}

interface Props {
    member?: Member;
    currentContribution?: Contribution;
    totalCash: number;
    recentExpenses: Expense[];
    paymentHistory: Contribution[];
    error?: string;
    [key: string]: unknown;
}

export default function MemberDashboard({ 
    member, 
    currentContribution, 
    totalCash, 
    recentExpenses, 
    paymentHistory,
    error 
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

    const getMonthName = (month: number) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1];
    };

    if (error) {
        return (
            <AppShell>
                <Head title="Member Dashboard" />
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Button>Contact Administrator</Button>
                    </div>
                </div>
            </AppShell>
        );
    }

    if (!member) {
        return (
            <AppShell>
                <Head title="Member Dashboard" />
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <div className="text-6xl mb-4">⏳</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
                        <p className="text-gray-600">Please wait while we load your dashboard.</p>
                    </div>
                </div>
            </AppShell>
        );
    }

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const isCurrentMonthPaid = currentContribution?.status === 'paid';

    return (
        <AppShell>
            <Head title="Member Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            {member.profile_photo ? (
                                <img 
                                    src={member.profile_photo} 
                                    alt={member.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl">👤</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Welcome back, {member.name}! 👋</h1>
                            <p className="text-blue-100">
                                Here's your contribution overview for {getMonthName(currentMonth)} {currentYear}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Status */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            📅 Current Month Status
                        </h2>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isCurrentMonthPaid 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                        }`}>
                            {isCurrentMonthPaid ? '✅ Paid' : '⏳ Unpaid'}
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Month</span>
                                    <span className="font-medium">{getMonthName(currentMonth)} {currentYear}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Amount</span>
                                    <span className="font-medium">{formatCurrency(currentContribution?.amount || 30000)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status</span>
                                    <span className={`font-medium ${
                                        isCurrentMonthPaid ? 'text-green-600' : 'text-orange-600'
                                    }`}>
                                        {isCurrentMonthPaid ? 'Paid' : 'Pending Payment'}
                                    </span>
                                </div>
                                {isCurrentMonthPaid && currentContribution?.paid_at && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Paid On</span>
                                        <span className="font-medium text-green-600">
                                            {formatDate(currentContribution.paid_at)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${
                            isCurrentMonthPaid ? 'bg-green-50' : 'bg-orange-50'
                        }`}>
                            <div className="text-center">
                                <div className="text-3xl mb-2">
                                    {isCurrentMonthPaid ? '🎉' : '💳'}
                                </div>
                                <div className={`font-semibold ${
                                    isCurrentMonthPaid ? 'text-green-600' : 'text-orange-600'
                                }`}>
                                    {isCurrentMonthPaid 
                                        ? 'Thank you for your contribution!' 
                                        : 'Payment reminder sent'}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    {isCurrentMonthPaid 
                                        ? 'Your payment has been recorded successfully.' 
                                        : 'Please make your monthly contribution soon.'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-xl text-blue-600">💰</span>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalCash)}
                                </div>
                                <div className="text-sm text-gray-600">Total Collected</div>
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Organization Cash</h3>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-xl text-green-600">📈</span>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                    {paymentHistory.filter(p => p.status === 'paid').length}
                                </div>
                                <div className="text-sm text-gray-600">Months Paid</div>
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Your Contributions</h3>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-xl text-purple-600">🏆</span>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                    {Math.round((paymentHistory.filter(p => p.status === 'paid').length / paymentHistory.length) * 100)}%
                                </div>
                                <div className="text-sm text-gray-600">Payment Rate</div>
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Contribution Score</h3>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Payment History */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                🗓️ Recent Payment History
                            </h2>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {paymentHistory.slice(0, 5).map((payment) => (
                                <div key={payment.id} className={`flex items-center justify-between p-3 rounded-lg ${
                                    payment.status === 'paid' ? 'bg-green-50' : 'bg-gray-50'
                                }`}>
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {getMonthName(payment.month)} {payment.year}
                                        </div>
                                        {payment.paid_at && (
                                            <div className="text-sm text-gray-600">
                                                Paid: {formatDate(payment.paid_at)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-semibold ${
                                            payment.status === 'paid' ? 'text-green-600' : 'text-gray-600'
                                        }`}>
                                            {formatCurrency(payment.amount)}
                                        </div>
                                        <div className={`text-xs ${
                                            payment.status === 'paid' ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                            {payment.status === 'paid' ? '✅ Paid' : '⏳ Pending'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Expenses */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                💸 Recent Organization Expenses
                            </h2>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {recentExpenses.length > 0 ? (
                                recentExpenses.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {expense.category.name}
                                            </div>
                                            <div className="text-sm text-gray-600 truncate max-w-48">
                                                {expense.description}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {formatDate(expense.expense_date)}
                                            </div>
                                        </div>
                                        <div className="font-semibold text-blue-600">
                                            {formatCurrency(expense.amount)}
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
                <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-6 text-white">
                    <h2 className="text-lg font-semibold mb-4">🚀 Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Button variant="secondary" className="h-auto p-4 flex-col space-y-2">
                            <span className="text-2xl">👤</span>
                            <span className="text-sm">Update Profile</span>
                        </Button>
                        <Button variant="secondary" className="h-auto p-4 flex-col space-y-2">
                            <span className="text-2xl">🗓️</span>
                            <span className="text-sm">Payment History</span>
                        </Button>
                        <Button variant="secondary" className="h-auto p-4 flex-col space-y-2">
                            <span className="text-2xl">🔔</span>
                            <span className="text-sm">Notifications</span>
                        </Button>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}