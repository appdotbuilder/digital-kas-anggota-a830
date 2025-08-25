import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Digital Member Contributions" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-xl">
                                    <span className="text-white text-xl font-bold">💰</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">KasBulanan</h1>
                                    <p className="text-sm text-gray-600">Digital Member Contributions</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <Link href="/login">
                                    <Button variant="outline" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-medium mb-6">
                                <span>🚀</span>
                                <span>Modern Digital Solution</span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            💰 Digital Monthly 
                            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                {' '}Member Contributions
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Streamline your organization's monthly contributions with our modern, 
                            mobile-first platform. Track payments, manage members, and monitor expenses 
                            with ease.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/register">
                                <Button size="lg" className="px-8 py-3 text-lg">
                                    🎯 Get Started Free
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                    📱 Member Login
                                </Button>
                            </Link>
                        </div>

                        {/* Feature Preview */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Member Management</h3>
                                    <p className="text-sm text-gray-600">Add, edit, and track member information with payment status</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Real-time Dashboard</h3>
                                    <p className="text-sm text-gray-600">Monitor cash flow, expenses, and member contributions instantly</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🔔</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Smart Notifications</h3>
                                    <p className="text-sm text-gray-600">Automated reminders and updates for members and admins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                ✨ Everything You Need to Manage Contributions
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                From admin dashboards to member portals, our platform covers all aspects 
                                of digital contribution management.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Admin Features */}
                            <div>
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-600 p-3 rounded-xl mr-4">
                                        <span className="text-white text-xl">👨‍💼</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Admin Features</h3>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-emerald-500 mt-1">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Complete Dashboard</h4>
                                            <p className="text-gray-600">Track total cash, active members, income, and expenses</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-emerald-500 mt-1">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Member Management</h4>
                                            <p className="text-gray-600">Add, edit, delete members with payment tracking</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-emerald-500 mt-1">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Expense Tracking</h4>
                                            <p className="text-gray-600">Record and categorize all organizational expenses</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-emerald-500 mt-1">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Reports & Analytics</h4>
                                            <p className="text-gray-600">Generate detailed reports and export to PDF/Excel</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Member Features */}
                            <div>
                                <div className="flex items-center mb-6">
                                    <div className="bg-emerald-600 p-3 rounded-xl mr-4">
                                        <span className="text-white text-xl">👤</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Member Features</h3>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-blue-500 mt-1">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Personal Dashboard</h4>
                                            <p className="text-gray-600">View payment status and contribution history</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-blue-500 mt-1">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Payment History</h4>
                                            <p className="text-gray-600">Track all monthly contributions and payments</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-blue-500 mt-1">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Profile Management</h4>
                                            <p className="text-gray-600">Update personal information and profile photo</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-blue-500 mt-1">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Push Notifications</h4>
                                            <p className="text-gray-600">Receive reminders and important updates</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12">
                            🎯 Built for Modern Organizations
                        </h2>
                        
                        <div className="grid sm:grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl font-bold mb-2">Rp 30,000</div>
                                <div className="text-blue-100">Default Monthly Contribution</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">📱</div>
                                <div className="text-blue-100">Mobile-First Design</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">🔐</div>
                                <div className="text-blue-100">Secure & Reliable</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            🚀 Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join thousands of organizations already using our platform to manage 
                            their monthly contributions efficiently.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="px-8 py-4 text-lg">
                                    🎯 Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                                    📱 Member Access
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-xl">
                                    <span className="text-white text-xl font-bold">💰</span>
                                </div>
                                <span className="text-xl font-bold">KasBulanan</span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Modern digital solution for monthly member contributions
                            </p>
                            <div className="border-t border-gray-800 pt-6">
                                <p className="text-sm text-gray-500">
                                    © 2024 KasBulanan. Built with ❤️ for modern organizations.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}