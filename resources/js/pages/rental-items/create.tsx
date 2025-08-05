import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

interface RentalType {
    id: number;
    key: string;
    name: { en: string; id: string };
    description?: { en: string; id: string };
    icon: string | null;
}

interface Props {
    rentalTypes: RentalType[];
    [key: string]: unknown;
}

export default function CreateRentalItem({ rentalTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        rental_type: '',
        price_per_day: '',
        currency: 'USD',
        location: '',
        latitude: '',
        longitude: '',
        minimum_rental_days: '1',
        maximum_rental_days: '',
        terms_and_conditions: '',
        specifications: {} as Record<string, string>,
    });

    const [specifications, setSpecifications] = useState<Array<{ key: string; value: string }>>([
        { key: '', value: '' }
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Convert specifications array to object
        const specsObject = specifications.reduce((acc, spec) => {
            if (spec.key && spec.value) {
                acc[spec.key] = spec.value;
            }
            return acc;
        }, {} as Record<string, string>);

        // Update the form data with specifications
        setData('specifications', specsObject);
        
        post(route('rental-items.store'));
    };

    const addSpecification = () => {
        setSpecifications([...specifications, { key: '', value: '' }]);
    };

    const removeSpecification = (index: number) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
        const updated = [...specifications];
        updated[index][field] = value;
        setSpecifications(updated);
    };

    const getSpecificationPlaceholders = (type: string) => {
        switch (type) {
            case 'car':
                return [
                    { key: 'year', value: '2020' },
                    { key: 'make', value: 'Toyota' },
                    { key: 'model', value: 'Camry' },
                    { key: 'fuel_type', value: 'Gasoline' },
                    { key: 'transmission', value: 'Automatic' },
                    { key: 'seats', value: '5' },
                ];
            case 'motorcycle':
                return [
                    { key: 'year', value: '2019' },
                    { key: 'make', value: 'Honda' },
                    { key: 'model', value: 'CBR150R' },
                    { key: 'engine', value: '150cc' },
                    { key: 'fuel_type', value: 'Gasoline' },
                ];
            case 'storage':
                return [
                    { key: 'size', value: '10x10 feet' },
                    { key: 'climate_controlled', value: 'Yes' },
                    { key: 'access_hours', value: '24/7' },
                    { key: 'security', value: 'Camera surveillance' },
                ];
            case 'property':
                return [
                    { key: 'bedrooms', value: '2' },
                    { key: 'bathrooms', value: '1' },
                    { key: 'furnished', value: 'Yes' },
                    { key: 'wifi', value: 'Included' },
                ];
            case 'equipment':
                return [
                    { key: 'condition', value: 'Like new' },
                    { key: 'brand', value: 'Professional grade' },
                    { key: 'accessories', value: 'All included' },
                ];
            default:
                return [{ key: 'condition', value: 'Excellent' }];
        }
    };

    const fillExampleSpecs = () => {
        if (data.rental_type) {
            const examples = getSpecificationPlaceholders(data.rental_type);
            setSpecifications(examples);
        }
    };

    return (
        <AppShell>
            <Head title="List New Item" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        📋 List Your Item
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Create a rental listing to start earning from your assets
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            📝 Basic Information
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Title *
                                </label>
                                <Input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g., 2020 Toyota Camry - Comfortable Sedan"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description *
                                </label>
                                <Textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe your item in detail. What makes it special? What condition is it in?"
                                    className="h-32"
                                    required
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={data.rental_type}
                                        onChange={(e) => setData('rental_type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {rentalTypes.map((type) => (
                                            <option key={type.id} value={type.key}>
                                                {type.name.en}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.rental_type} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Location *
                                    </label>
                                    <Input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="e.g., Downtown Jakarta"
                                        required
                                    />
                                    <InputError message={errors.location} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            💰 Pricing & Terms
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Daily Price *
                                    </label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        value={data.price_per_day}
                                        onChange={(e) => setData('price_per_day', e.target.value)}
                                        placeholder="25.00"
                                        required
                                    />
                                    <InputError message={errors.price_per_day} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Currency
                                    </label>
                                    <select
                                        value={data.currency}
                                        onChange={(e) => setData('currency', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="USD">USD</option>
                                        <option value="IDR">IDR</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                    <InputError message={errors.currency} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Minimum Rental Days *
                                    </label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={data.minimum_rental_days}
                                        onChange={(e) => setData('minimum_rental_days', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.minimum_rental_days} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Maximum Rental Days
                                    </label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={data.maximum_rental_days}
                                        onChange={(e) => setData('maximum_rental_days', e.target.value)}
                                        placeholder="Optional"
                                    />
                                    <InputError message={errors.maximum_rental_days} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Terms & Conditions
                                </label>
                                <Textarea
                                    value={data.terms_and_conditions}
                                    onChange={(e) => setData('terms_and_conditions', e.target.value)}
                                    placeholder="e.g., Valid driver license required. No smoking. Return with same fuel level."
                                    className="h-24"
                                />
                                <InputError message={errors.terms_and_conditions} />
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                ⚙️ Specifications
                            </h2>
                            {data.rental_type && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={fillExampleSpecs}
                                >
                                    Fill Examples
                                </Button>
                            )}
                        </div>
                        
                        <div className="space-y-3">
                            {specifications.map((spec, index) => (
                                <div key={index} className="flex gap-3">
                                    <Input
                                        type="text"
                                        value={spec.key}
                                        onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                                        placeholder="Property (e.g., year, make, size)"
                                        className="flex-1"
                                    />
                                    <Input
                                        type="text"
                                        value={spec.value}
                                        onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                        placeholder="Value (e.g., 2020, Toyota, 10x10)"
                                        className="flex-1"
                                    />
                                    {specifications.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeSpecification(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                            
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addSpecification}
                            >
                                Add Specification
                            </Button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit(route('dashboard'))}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex-1"
                        >
                            {processing ? 'Creating...' : 'Create Listing'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}