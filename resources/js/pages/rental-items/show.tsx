import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
    MapPin, 
    Star, 
    Calendar, 
    User, 
    Edit,
    Car,
    Package,
    Home,
    Settings
} from 'lucide-react';

interface RentalItem {
    id: number;
    title: string;
    description: string;
    rental_type: string;
    price_per_day: number;
    currency: string;
    images: string[] | null;
    specifications: Record<string, string | number> | null;
    location: string;
    latitude: number | null;
    longitude: number | null;
    is_available: boolean;
    minimum_rental_days: number;
    maximum_rental_days: number | null;
    terms_and_conditions: string | null;
    status: string;
    owner: {
        id: number;
        name: string;
        profile?: {
            rating: number | null;
            total_reviews: number;
            bio: string | null;
        };
    };
    created_at: string;
}

interface Props {
    rentalItem: RentalItem;
    canRequest: boolean;
    [key: string]: unknown;
}

export default function RentalItemShow({ rentalItem, canRequest }: Props) {
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        message: '',
    });
    
    const page = usePage();
    const auth = (page.props as unknown as { auth: { user?: { id: number } } }).auth;

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'car': return <Car className="w-5 h-5" />;
            case 'motorcycle': return <Settings className="w-5 h-5" />;
            case 'storage': return <Package className="w-5 h-5" />;
            case 'property': return <Home className="w-5 h-5" />;
            case 'equipment': return <Settings className="w-5 h-5" />;
            default: return <Package className="w-5 h-5" />;
        }
    };

    const handleSubmitRequest = (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = {
            rental_item_id: rentalItem.id,
            ...formData,
        };

        router.post(route('rental-requests.store'), data, {
            onSuccess: () => {
                setShowRequestForm(false);
                setFormData({ start_date: '', end_date: '', message: '' });
            },
        });
    };

    const calculateTotal = () => {
        if (!formData.start_date || !formData.end_date) return 0;
        
        const start = new Date(formData.start_date);
        const end = new Date(formData.end_date);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        return Math.max(0, days * rentalItem.price_per_day);
    };

    return (
        <AppShell>
            <Head title={rentalItem.title} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <Link 
                            href={route('rental-items.index')}
                            className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
                        >
                            ← Back to Browse Items
                        </Link>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                                {getTypeIcon(rentalItem.rental_type)}
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                    {rentalItem.rental_type}
                                </span>
                            </div>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                                rentalItem.is_available 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                                {rentalItem.is_available ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {rentalItem.title}
                        </h1>
                    </div>
                    
                    <div className="flex gap-2">
                        {auth.user?.id === rentalItem.owner.id && (
                            <Link href={route('rental-items.edit', rentalItem.id)}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                        {canRequest && rentalItem.is_available && (
                            <Button 
                                onClick={() => setShowRequestForm(true)}
                                className="flex items-center gap-2"
                            >
                                <Calendar className="w-4 h-4" />
                                Request Rental
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                            <div className="h-64 md:h-96 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center">
                                {rentalItem.images && rentalItem.images.length > 0 ? (
                                    <img
                                        src={rentalItem.images[0]}
                                        alt={rentalItem.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-6xl">
                                        {rentalItem.rental_type === 'car' && '🚗'}
                                        {rentalItem.rental_type === 'motorcycle' && '🏍️'}
                                        {rentalItem.rental_type === 'storage' && '📦'}
                                        {rentalItem.rental_type === 'property' && '🏠'}
                                        {rentalItem.rental_type === 'equipment' && '🔧'}
                                        {!['car', 'motorcycle', 'storage', 'property', 'equipment'].includes(rentalItem.rental_type) && '📦'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📝 Description
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {rentalItem.description}
                            </p>
                        </div>

                        {/* Specifications */}
                        {rentalItem.specifications && Object.keys(rentalItem.specifications).length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    ⚙️ Specifications
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(rentalItem.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                                                {key.replace('_', ' ')}:
                                            </span>
                                            <span className="text-sm text-gray-900 dark:text-white">
                                                {Array.isArray(value) ? value.join(', ') : String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Terms and Conditions */}
                        {rentalItem.terms_and_conditions && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📋 Terms & Conditions
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {rentalItem.terms_and_conditions}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <div className="text-center mb-4">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {formatPrice(rentalItem.price_per_day, rentalItem.currency)}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">per day</div>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Minimum rental:</span>
                                    <span className="text-gray-900 dark:text-white">{rentalItem.minimum_rental_days} days</span>
                                </div>
                                {rentalItem.maximum_rental_days && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Maximum rental:</span>
                                        <span className="text-gray-900 dark:text-white">{rentalItem.maximum_rental_days} days</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Location
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{rentalItem.location}</p>
                        </div>

                        {/* Owner Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Listed by
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {rentalItem.owner.name}
                                    </div>
                                    {rentalItem.owner.profile?.rating && (
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                                            {rentalItem.owner.profile.rating.toFixed(1)} ({rentalItem.owner.profile.total_reviews} reviews)
                                        </div>
                                    )}
                                </div>
                                {rentalItem.owner.profile?.bio && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {rentalItem.owner.profile.bio}
                                    </p>
                                )}
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                    Member since {formatDate(rentalItem.created_at)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rental Request Modal */}
                {showRequestForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📅 Request Rental
                            </h3>
                            
                            <form onSubmit={handleSubmitRequest} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Start Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        End Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                        min={formData.start_date || new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                                
                                {calculateTotal() > 0 && (
                                    <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-blue-800 dark:text-blue-200">
                                                Estimated Total:
                                            </span>
                                            <span className="font-semibold text-blue-900 dark:text-blue-100">
                                                {formatPrice(calculateTotal(), rentalItem.currency)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Message (Optional)
                                    </label>
                                    <Textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell the owner about your rental needs..."
                                        className="h-20"
                                    />
                                </div>
                                
                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="flex-1">
                                        Send Request
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => setShowRequestForm(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}