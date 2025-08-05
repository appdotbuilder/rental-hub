import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Car, Home, Package, Shield, Star, Users, Settings } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const rentalTypes = [
        { icon: Car, name: 'Cars', description: 'Rent vehicles for any journey' },
        { icon: Settings, name: 'Motorcycles', description: 'Quick and efficient transport' },
        { icon: Package, name: 'Storage', description: 'Secure storage solutions' },
        { icon: Home, name: 'Properties', description: 'Temporary accommodations' },
    ];

    const features = [
        {
            icon: Users,
            title: 'Multi-tenant Platform',
            description: 'Separate spaces for listers and renters with dedicated management tools'
        },
        {
            icon: Shield,
            title: 'Secure Transactions',
            description: 'Safe and verified rental requests with built-in approval system'
        },
        {
            icon: Star,
            title: 'Rating System',
            description: 'Build trust through user reviews and verified profiles'
        }
    ];

    return (
        <>
            <Head title="RentHub - Multi-Tenant Rental Platform">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
                {/* Header */}
                <header className="relative z-10 px-6 py-4">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">RentHub</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 hover:text-blue-600 px-4 py-2 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="relative px-6 pt-14 pb-20">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            🏠 The Complete
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                                Rental Platform
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Multi-tenant rental marketplace supporting cars, motorcycles, storage, and more. 
                            Connect listers with renters in a secure, multilingual environment.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        🚀 Start Renting Today
                                    </Link>
                                    <Link
                                        href={route('rental-items.index')}
                                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                                    >
                                        🔍 Browse Items
                                    </Link>
                                </>
                            )}
                            {auth.user && (
                                <>
                                    <Link
                                        href={route('rental-items.index')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        🔍 Browse Items
                                    </Link>
                                    <Link
                                        href={route('rental-items.create')}
                                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                                    >
                                        📋 List Your Item
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Rental Types Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            {rentalTypes.map((type, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <type.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{type.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white dark:bg-gray-800 py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                ⭐ Platform Features
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Built for scalability with enterprise-grade features and multi-language support
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="text-center p-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                🔄 How It Works
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Simple process for both listers and renters
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* For Listers */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    🏪 For Listers
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Create Your Listing</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Add photos, descriptions, and pricing for your rental items</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Receive Requests</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Get notifications when renters request your items</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Approve & Earn</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Review requests and start earning from your assets</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* For Renters */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    🛒 For Renters
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-green-600 dark:text-green-400 font-semibold">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Browse & Search</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Find the perfect rental item using our advanced filters</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-green-600 dark:text-green-400 font-semibold">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Send Request</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Select your dates and send a rental request with a message</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-green-600 dark:text-green-400 font-semibold">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Get Approved</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Receive confirmation and enjoy your rental experience</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            🚀 Ready to Start Your Rental Journey?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of users already using RentHub to rent and list items
                        </p>
                        {!auth.user && (
                            <Link
                                href={route('register')}
                                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg inline-block"
                            >
                                Create Free Account
                            </Link>
                        )}
                        {auth.user && (
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href={route('rental-items.index')}
                                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Start Browsing
                                </Link>
                                <Link
                                    href={route('rental-items.create')}
                                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                                >
                                    List Your First Item
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 dark:bg-black py-12">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">RentHub</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Multi-tenant rental platform built with Laravel & React
                        </p>
                        <p className="text-sm text-gray-500">
                            Built with ❤️ for the rental economy
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}