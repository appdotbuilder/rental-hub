import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { 
    Package, 
    Plus, 
    Clock, 
    CheckCircle, 
    XCircle, 
    Eye,
    Calendar,
    DollarSign,
    Users,
    TrendingUp
} from 'lucide-react';

interface RentalItem {
    id: number;
    title: string;
    rental_type: string;
    price_per_day: number;
    currency: string;
    is_available: boolean;
    created_at: string;
    rental_requests?: RentalRequest[];
}

interface RentalRequest {
    id: number;
    start_date: string;
    end_date: string;
    total_amount: number;
    currency: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    message?: string;
    renter?: {
        id: number;
        name: string;
    };
    lister?: {
        id: number;
        name: string;
    };
    rental_item?: {
        id: number;
        title: string;
    };
    created_at: string;
}

interface Stats {
    totalItems: number;
    activeItems: number;
    pendingRequests: number;
    myRequests: number;
}

interface Props {
    myItems: RentalItem[];
    pendingRequests: RentalRequest[];
    myRequests: RentalRequest[];
    stats: Stats;
    [key: string]: unknown;
}

export default function Dashboard({ myItems, pendingRequests, myRequests, stats }: Props) {
    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'approved': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🏠 Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your rental items and requests
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('rental-items.index')}>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                Browse Items
                            </Button>
                        </Link>
                        <Link href={route('rental-items.create')}>
                            <Button className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                List Item
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalItems}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Active Items</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeItems}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Requests</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingRequests}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">My Requests</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.myRequests}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Items */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    📦 My Items
                                </h2>
                                <Link href={route('rental-items.create')}>
                                    <Button size="sm" className="flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Item
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {myItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">📦</div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        You haven't listed any items yet
                                    </p>
                                    <Link href={route('rental-items.create')}>
                                        <Button>List Your First Item</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {myItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex-1">
                                                <Link
                                                    href={route('rental-items.show', item.id)}
                                                    className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {item.title}
                                                </Link>
                                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="capitalize">{item.rental_type}</span>
                                                    <span>{formatPrice(item.price_per_day, item.currency)}/day</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        item.is_available 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                        {item.is_available ? 'Available' : 'Unavailable'}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={route('rental-items.show', item.id)}>
                                                <Button size="sm" variant="outline">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pending Requests */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    ⏳ Pending Requests
                                </h2>
                                <Link href={route('rental-requests.index')}>
                                    <Button size="sm" variant="outline">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {pendingRequests.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">⏳</div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        No pending requests
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {pendingRequests.map((request) => (
                                        <div key={request.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <Link
                                                    href={route('rental-requests.show', request.id)}
                                                    className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {request.rental_item?.title}
                                                </Link>
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                                                    {request.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center gap-4">
                                                    <span>by {request.renter?.name}</span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(request.start_date)} - {formatDate(request.end_date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign className="w-4 h-4" />
                                                        {formatPrice(request.total_amount, request.currency)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* My Requests */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📝 My Recent Requests
                            </h2>
                            <Link href={route('rental-requests.index')}>
                                <Button size="sm" variant="outline">
                                    View All
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        {myRequests.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">📝</div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    You haven't made any rental requests yet
                                </p>
                                <Link href={route('rental-items.index')}>
                                    <Button>Browse Items</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {myRequests.map((request) => (
                                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex-1">
                                            <Link
                                                href={route('rental-requests.show', request.id)}
                                                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {request.rental_item?.title}
                                            </Link>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                <span>by {request.lister?.name}</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatDate(request.start_date)} - {formatDate(request.end_date)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4" />
                                                    {formatPrice(request.total_amount, request.currency)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(request.status)}`}>
                                                {getStatusIcon(request.status)}
                                                {request.status}
                                            </span>
                                            <Link href={route('rental-requests.show', request.id)}>
                                                <Button size="sm" variant="outline">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}