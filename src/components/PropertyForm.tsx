'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ListingInput, ListingTone } from '@/types/listing';

interface PropertyFormProps {
    onSubmit: (data: ListingInput) => void;
    isLoading?: boolean;
}

const TONES: ListingTone[] = ['Standard', 'Luxury', 'Family', 'Investor'];

const FEATURE_CATEGORIES = {
    'Kitchen & Dining': [
        'Updated Kitchen', 'Granite Countertops', 'Quartz Countertops',
        'Stainless Steel Appliances', 'Kitchen Island', 'Breakfast Nook',
        'Pantry', 'Open to Living Area', 'Gas Range'
    ],
    'Interior': [
        'Hardwood Floors', 'New Carpet', 'Tile Flooring',
        'Crown Molding', 'Vaulted Ceilings', 'Fireplace',
        'Walk-in Closet', 'Laundry Room', 'Bonus Room',
        'Home Office', 'Finished Basement', 'New Paint'
    ],
    'Primary Suite': [
        'Primary on Main', 'Ensuite Bathroom', 'Double Vanity',
        'Walk-in Shower', 'Soaking Tub', 'Large Walk-in Closet'
    ],
    'Exterior & Lot': [
        'Fenced Yard', 'Covered Patio', 'Deck',
        'Pool', 'Sprinkler System', 'Mature Trees',
        'Corner Lot', 'Cul-de-sac', 'Landscaped',
        'Outdoor Kitchen', 'Shed/Workshop', 'Garden Area'
    ],
    'Garage & Parking': [
        'Attached Garage', '2-Car Garage', '3-Car Garage',
        'Driveway', 'EV Charger', 'Oversized Garage'
    ],
    'Systems & Updates': [
        'New Roof', 'New HVAC', 'New Water Heater',
        'New Windows', 'Solar Panels', 'Smart Home Features',
        'Security System', 'Tankless Water Heater', 'Energy Efficient'
    ]
};

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
    const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Kitchen & Dining', 'Interior']));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToneChange = (tone: ListingTone) => {
        setFormData((prev) => ({ ...prev, tone }));
    };

    const toggleFeature = (feature: string) => {
        setSelectedFeatures((prev) => {
            const next = new Set(prev);
            if (next.has(feature)) {
                next.delete(feature);
            } else {
                next.add(feature);
            }
            return next;
        });
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }
            return next;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Combine selected feature chips + additional free-text details
        const featureList = Array.from(selectedFeatures);
        const combined = additionalDetails.trim()
            ? [...featureList, additionalDetails.trim()].join(', ')
            : featureList.join(', ');

        onSubmit({ ...formData, features: combined });
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
                        placeholder="e.g. 123 Main St, Anytown, NC 27000"
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
                            placeholder="250,000"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Feature Checkboxes */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">Property Features</label>
                        {selectedFeatures.size > 0 && (
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                {selectedFeatures.size} selected
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-400">Select features that apply — only these will be mentioned in the listing.</p>

                    <div className="space-y-2">
                        {Object.entries(FEATURE_CATEGORIES).map(([category, features]) => (
                            <div key={category} className="border border-slate-100 rounded-xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => toggleCategory(category)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <span className="text-sm font-medium text-slate-700">{category}</span>
                                    <div className="flex items-center gap-2">
                                        {features.filter(f => selectedFeatures.has(f)).length > 0 && (
                                            <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                                                {features.filter(f => selectedFeatures.has(f)).length}
                                            </span>
                                        )}
                                        <svg
                                            className={cn("w-4 h-4 text-slate-400 transition-transform", expandedCategories.has(category) && "rotate-180")}
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {expandedCategories.has(category) && (
                                    <div className="px-4 py-3 flex flex-wrap gap-2">
                                        {features.map((feature) => (
                                            <button
                                                key={feature}
                                                type="button"
                                                onClick={() => toggleFeature(feature)}
                                                className={cn(
                                                    "px-3 py-1.5 text-xs rounded-full border transition-all font-medium",
                                                    selectedFeatures.has(feature)
                                                        ? "bg-blue-50 border-blue-300 text-blue-700"
                                                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                                                )}
                                            >
                                                {selectedFeatures.has(feature) && (
                                                    <span className="mr-1">✓</span>
                                                )}
                                                {feature}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-2">
                    <label htmlFor="additionalDetails" className="text-sm font-medium text-slate-700">
                        Additional Details <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                        id="additionalDetails"
                        rows={3}
                        placeholder="Any other details: recent renovations, community amenities, school district, nearby attractions..."
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-sm"
                    />
                </div>

                {/* Tone Selector */}
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
