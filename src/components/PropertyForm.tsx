'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ListingInput, ListingTone } from '@/types/listing';

interface PropertyFormProps {
    onSubmit: (data: ListingInput) => void;
    isLoading?: boolean;
}

const TONES: ListingTone[] = ['Standard', 'Luxury', 'Family', 'Investor'];

export const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState<ListingInput>({
        address: '',
        beds: '',
        baths: '',
        sqft: '',
        price: '',
        features: '',
        tone: 'Standard',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToneChange = (tone: ListingTone) => {
        setFormData((prev) => ({ ...prev, tone }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold text-slate-900">Property Details</h2>
                <p className="text-sm text-slate-500">Enter the core information about the property.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium text-slate-700">Property Address</label>
                    <input
                        required
                        type="text"
                        id="address"
                        name="address"
                        placeholder="e.g. 123 Luxury Lane, Beverly Hills"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="beds" className="text-sm font-medium text-slate-700">Beds</label>
                        <input
                            required
                            type="text"
                            id="beds"
                            name="beds"
                            placeholder="3"
                            value={formData.beds}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="baths" className="text-sm font-medium text-slate-700">Baths</label>
                        <input
                            required
                            type="text"
                            id="baths"
                            name="baths"
                            placeholder="2.5"
                            value={formData.baths}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="sqft" className="text-sm font-medium text-slate-700">Sq Ft</label>
                        <input
                            required
                            type="text"
                            id="sqft"
                            name="sqft"
                            placeholder="2500"
                            value={formData.sqft}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="price" className="text-sm font-medium text-slate-700">Price</label>
                        <input
                            required
                            type="text"
                            id="price"
                            name="price"
                            placeholder="850,000"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="features" className="text-sm font-medium text-slate-700">Key Features</label>
                    <textarea
                        id="features"
                        name="features"
                        rows={4}
                        placeholder="e.g. Modern kitchen with quartz counters, hardwood floors, large backyard pool, solar panels..."
                        value={formData.features}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Listing Tone</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {TONES.map((tone) => (
                            <button
                                key={tone}
                                type="button"
                                onClick={() => handleToneChange(tone)}
                                className={cn(
                                    "px-3 py-2 text-sm rounded-lg border transition-all",
                                    formData.tone === tone
                                        ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                )}
                            >
                                {tone}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                disabled={isLoading}
                type="submit"
                className={cn(
                    "w-full py-4 px-6 rounded-xl text-white font-semibold transition-all shadow-lg",
                    isLoading
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-200"
                )}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Package...
                    </div>
                ) : (
                    "Generate Marketing Package"
                )}
            </button>
        </form>
    );
};
