import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin, Star, Plus } from 'lucide-react';

interface RentalItem {
    id: number;
    title: string;
    description: string;
    rental_type: string;
    price_per_day: number;
    currency: string;
    images: string[] | null;
    location: string;
    is_available: boolean;
    minimum_rental_days: number;
    owner: {
        id: number;
        name: string;
        profile?: {
            rating: number | null;
            total_reviews: number;
        };
    };
    created_at: string;
}

interface RentalType {
    id: number;
    key: string;
    name: { en: string; id: string };
    icon: string | null;
}

interface Props {
    rentalItems: {
        data: RentalItem[];
        links: { url: string | null; label: string; active: boolean }[];
        meta: { total: number };
    };
    rentalTypes: RentalType[];
    filters: {
        type?: string;
        search?: string;
    };
    [key: string]: unknown;
}

export default function RentalItemsIndex({ rentalItems, rentalTypes, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('rental-items.index'), { search, type: selectedType }, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedType('');
        router.get(route('rental-items.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AppShell>
            <Head title="Browse Rental Items" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🔍 Browse Rental Items
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Find the perfect item for your needs
                        </p>
                    </div>
                    <Link href={route('rental-items.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            List Your Item
                        </Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search by title, description, or location..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="lg:w-48">
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="">All Categories</option>
                                    {rentalTypes.map((type) => (
                                        <option key={type.id} value={type.key}>
                                            {type.name.en}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Search
                                </Button>
                                {(search || selectedType) && (
                                    <Button type="button" variant="outline" onClick={clearFilters}>
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            {rentalItems.meta.total} items found
                        </p>
                    </div>

                    {rentalItems.data.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No items found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Try adjusting your search criteria or browse all categories
                            </p>
                            <Button onClick={clearFilters}>
                                View All Items
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rentalItems.data.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('rental-items.show', item.id)}
                                    className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    {/* Image placeholder */}
                                    <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center">
                                        {item.images && item.images.length > 0 ? (
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-4xl">
                                                {item.rental_type === 'car' && '🚗'}
                                                {item.rental_type === 'motorcycle' && '🏍️'}
                                                {item.rental_type === 'storage' && '📦'}
                                                {!['car', 'motorcycle', 'storage'].includes(item.rental_type) && '🏠'}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2 flex-shrink-0 dark:bg-blue-900 dark:text-blue-200">
                                                {item.rental_type}
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                            {item.description}
                                        </p>
                                        
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {item.location}
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {formatPrice(item.price_per_day, item.currency)}/day
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Min {item.minimum_rental_days} days
                                                </div>
                                            </div>
                                            
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    by {item.owner.name}
                                                </div>
                                                {item.owner.profile?.rating && (
                                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                        <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                                                        {item.owner.profile.rating.toFixed(1)} ({item.owner.profile.total_reviews})
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {rentalItems.links && rentalItems.links.length > 3 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            {rentalItems.links.map((link, index) => (
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
        </AppShell>
    );
}