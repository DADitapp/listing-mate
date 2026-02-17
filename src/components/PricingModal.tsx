'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Zap, Sparkles, Building2, X } from 'lucide-react';
import { Region, getRegionConfig } from '@/config/regions';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
    region?: Region;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, region = 'ZA' }) => {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const config = getRegionConfig(region);

    const handleUpgrade = async (tier: 'basic' | 'pro') => {
        setIsLoading(tier);
        try {
            const priceId = tier === 'basic'
                ? config.stripePriceIds.basic
                : config.stripePriceIds.pro;

            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId, region, tier }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Failed to initiate checkout');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">

                {/* Left: Branding */}
                <div className="md:w-5/12 bg-blue-600 p-8 lg:p-12 text-white flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">ListingMate</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">
                            Unlock the full power of AI.
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Join the top agents saving hours every week with automated property marketing.
                        </p>
                    </div>

                    <div className="space-y-4 mt-8">
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                            <Sparkles className="w-6 h-6 text-blue-200" />
                            <span className="font-semibold">Professional AI-generated copy</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                            <Zap className="w-6 h-6 text-blue-200" />
                            <span className="font-semibold">All formats: Listing, Social, Email</span>
                        </div>
                        <div className="text-sm text-blue-200 mt-4">
                            {config.flag} Pricing shown in {config.currency}
                        </div>
                    </div>
                </div>

                {/* Right: Plan Selection */}
                <div className="md:w-7/12 p-8 lg:p-12 bg-white flex flex-col justify-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-900">Choose your plan</h3>
                            <p className="text-slate-500">Cancel anytime. No hidden fees.</p>
                        </div>

                        {/* Basic Tier */}
                        <div className="p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Basic</h4>
                                    <p className="text-sm text-slate-500">10 listings per month</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-extrabold text-slate-900">{config.pricing.basic.price}</span>
                                    <span className="text-slate-500 font-medium">/mo</span>
                                </div>
                            </div>
                            <ul className="space-y-2 mb-4 text-sm text-slate-600">
                                {['10 listing packages/month', 'All output formats', 'Listing history'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button
                                disabled={isLoading !== null}
                                onClick={() => handleUpgrade('basic')}
                                className={cn(
                                    "w-full py-3 px-4 rounded-xl font-bold text-sm transition-all",
                                    isLoading === 'basic'
                                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                        : "border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                                )}
                            >
                                {isLoading === 'basic' ? 'Processing...' : 'Choose Basic'}
                            </button>
                        </div>

                        {/* Pro Tier */}
                        <div className="p-5 rounded-2xl border-2 border-blue-600 bg-blue-50/50 relative">
                            <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                                Most Popular
                            </div>
                            <div className="flex items-center justify-between mb-4 mt-1">
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Pro</h4>
                                    <p className="text-sm text-slate-500">Unlimited listings</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-extrabold text-slate-900">{config.pricing.pro.price}</span>
                                    <span className="text-slate-500 font-medium">/mo</span>
                                </div>
                            </div>
                            <ul className="space-y-2 mb-4 text-sm text-slate-600">
                                {['Unlimited listing packages', 'All output formats', 'Listing history & archive', 'Priority support'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button
                                disabled={isLoading !== null}
                                onClick={() => handleUpgrade('pro')}
                                className={cn(
                                    "w-full py-3 px-4 rounded-xl text-white font-bold text-sm transition-all shadow-lg",
                                    isLoading === 'pro'
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-200"
                                )}
                            >
                                {isLoading === 'pro' ? 'Processing...' : 'Choose Pro'}
                            </button>
                        </div>

                        <p className="text-center text-sm text-slate-400">
                            Your subscription is locked to {config.flag} {config.name} listings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
