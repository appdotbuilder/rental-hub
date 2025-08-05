import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { 
    Clock, 
    CheckCircle, 
    XCircle,
    Calendar,
    DollarSign,
    User,
    Package,
    MessageSquare,
    Eye
} from 'lucide-react';

interface RentalRequest {
    id: number;
    start_date: string;
    end_date: string;
    total_days: number;
    total_amount: number;
    currency: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    message?: string;
    response_message?: string;
    responded_at?: string;
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
        rental_type: string;
    };
    created_at: string;
}

interface Props {
    myRequests: {
        data: RentalRequest[];
        links: { url: string | null; label: string; active: boolean }[];
        meta: { total: number };
    };
    receivedRequests: {
        data: RentalRequest[];
        links: { url: string | null; label: string; active: boolean }[];
        meta: { total: number };
    };
    [key: string]: unknown;
}

export default function RentalRequestsIndex({ myRequests, receivedRequests }: Props) {
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

    const RequestCard = ({ request, isReceived = false }: { request: RentalRequest; isReceived?: boolean }) => (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <Link
                        href={route('rental-requests.show', request.id)}
                        className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                        {request.rental_item?.title}
                    </Link>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {request.rental_item?.rental_type}
                        </span>
                        <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {isReceived 
                                ? `Request from ${request.renter?.name}`
                                : `Listed by ${request.lister?.name}`
                            }
                        </span>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    {request.status}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(request.start_date)} - {formatDate(request.end_date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    <span>{formatPrice(request.total_amount, request.currency)} ({request.total_days} days)</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                    Requested {formatDate(request.created_at)}
                </div>
            </div>

            {request.message && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <MessageSquare className="w-4 h-4" />
                        Message:
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">{request.message}</p>
                </div>
            )}

            {request.response_message && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-1">
                        <MessageSquare className="w-4 h-4" />
                        Response:
                    </div>
                    <p className="text-sm text-blue-900 dark:text-blue-100">{request.response_message}</p>
                    {request.responded_at && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            Responded on {formatDate(request.responded_at)}
                        </p>
                    )}
                </div>
            )}

            <div className="flex justify-end">
                <Link href={route('rental-requests.show', request.id)}>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );

    return (
        <AppShell>
            <Head title="Rental Requests" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        📝 Rental Requests
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your rental requests and responses
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Requests */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📤 My Requests ({myRequests.meta.total})
                            </h2>
                            <Link href={route('rental-items.index')}>
                                <Button size="sm" variant="outline">
                                    Browse Items
                                </Button>
                            </Link>
                        </div>

                        {myRequests.data.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm text-center">
                                <div className="text-4xl mb-4">📤</div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    No requests yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    You haven't made any rental requests
                                </p>
                                <Link href={route('rental-items.index')}>
                                    <Button>Browse Items to Rent</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {myRequests.data.map((request) => (
                                    <RequestCard key={request.id} request={request} />
                                ))}
                            </div>
                        )}

                        {/* Pagination for My Requests */}
                        {myRequests.links && myRequests.links.length > 3 && (
                            <div className="flex justify-center items-center space-x-2">
                                {myRequests.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                className="px-3 py-2 text-sm text-gray-400 dark:text-gray-600"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Received Requests */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📥 Received Requests ({receivedRequests.meta.total})
                            </h2>
                            <Link href={route('rental-items.create')}>
                                <Button size="sm" variant="outline">
                                    List New Item
                                </Button>
                            </Link>
                        </div>

                        {receivedRequests.data.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm text-center">
                                <div className="text-4xl mb-4">📥</div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    No requests received
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    List items to start receiving rental requests
                                </p>
                                <Link href={route('rental-items.create')}>
                                    <Button>List Your First Item</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {receivedRequests.data.map((request) => (
                                    <RequestCard key={request.id} request={request} isReceived={true} />
                                ))}
                            </div>
                        )}

                        {/* Pagination for Received Requests */}
                        {receivedRequests.links && receivedRequests.links.length > 3 && (
                            <div className="flex justify-center items-center space-x-2">
                                {receivedRequests.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                className="px-3 py-2 text-sm text-gray-400 dark:text-gray-600"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
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