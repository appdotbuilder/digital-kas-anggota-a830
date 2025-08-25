import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    cash_balance: number;
    created_at: string;
}

interface PaginatedMembers {
    data: Member[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    members: PaginatedMembers;
    [key: string]: unknown;
}

export default function MembersIndex({ members }: Props) {
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

    return (
        <AppShell>
            <Head title="Members Management" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            👥 Members Management
                        </h1>
                        <p className="text-gray-600">
                            Manage member information, status, and contribution tracking.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link href="/members/create">
                            <Button className="w-full sm:w-auto">
                                ➕ Add New Member
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-blue-600">👥</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Total Members</p>
                                <p className="text-lg font-semibold text-gray-900">{members.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-green-600">✅</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Active Members</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {members.data.filter(m => m.status === 'active').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <span className="text-orange-600">⏸️</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Inactive Members</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {members.data.filter(m => m.status === 'inactive').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <span className="text-emerald-600">💰</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Total Cash</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {formatCurrency(members.data.reduce((sum, m) => sum + m.cash_balance, 0))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Members Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">All Members</h2>
                    </div>
                    
                    {members.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Member
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Cash Balance
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {members.data.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-medium">
                                                            {member.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {member.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ID: #{member.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{member.email}</div>
                                                <div className="text-sm text-gray-500">{member.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    member.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {member.status === 'active' ? '✅ Active' : '⏸️ Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="font-medium">
                                                    {formatCurrency(member.cash_balance)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(member.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <Link href={`/members/${member.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        👁️ View
                                                    </Button>
                                                </Link>
                                                <Link href={`/members/${member.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
                            <p className="text-gray-500 mb-6">Get started by adding your first member.</p>
                            <Link href="/members/create">
                                <Button>➕ Add First Member</Button>
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {members.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <Button
                                    variant="outline"
                                    disabled={members.current_page === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={members.current_page === members.last_page}
                                >
                                    Next
                                </Button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing{' '}
                                        <span className="font-medium">
                                            {(members.current_page - 1) * members.per_page + 1}
                                        </span>{' '}
                                        to{' '}
                                        <span className="font-medium">
                                            {Math.min(members.current_page * members.per_page, members.total)}
                                        </span>{' '}
                                        of{' '}
                                        <span className="font-medium">{members.total}</span>{' '}
                                        results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={members.current_page === 1}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={members.current_page === members.last_page}
                                        >
                                            Next
                                        </Button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}