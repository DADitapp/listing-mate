'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Zap, Sparkles, Building2, X } from 'lucide-react';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId: 'price_listingmate_pro_monthly' }), // Placeholder Price ID
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
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">

                {/* Left: Branding/Preview */}
                <div className="md:w-5/12 bg-blue-600 p-8 lg:p-12 text-white flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">ListingMate Pro</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">
                            Unlock the full power of AI.
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Join the top 1% of agents saving hours every week with automated marketing.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                            <Sparkles className="w-6 h-6 text-blue-200" />
                            <span className="font-semibold">Unlimited generations</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                            <Zap className="w-6 h-6 text-blue-200" />
                            <span className="font-semibold">Priority AI support</span>
                        </div>
                    </div>
                </div>

                {/* Right: Pricing Details */}
                <div className="md:w-7/12 p-8 lg:p-12 bg-white flex flex-col justify-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-900">Choose your plan</h3>
                            <p className="text-slate-500">Cancel anytime. No hidden fees.</p>
                        </div>

                        <div className="p-6 rounded-3xl border-2 border-blue-600 bg-blue-50/50 relative">
                            <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                                Most Popular
                            </div>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-extrabold text-slate-900">$39</span>
                                <span className="text-slate-500 font-medium">/month</span>
                            </div>

                            <ul className="space-y-4 mb-8 text-slate-600 font-medium">
                                {[
                                    'Unlimited Listing Packages',
                                    'Social Media Content Bundle',
                                    'Email Marketing Templates',
                                    'Luxury & Investor Tones',
                                    'History & Draft Saving'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                disabled={isLoading}
                                onClick={handleUpgrade}
                                className={cn(
                                    "w-full py-4 px-6 rounded-2xl text-white font-bold text-lg transition-all shadow-xl",
                                    isLoading
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-200"
                                )}
                            >
                                {isLoading ? 'Processing...' : 'Upgrade to Pro'}
                            </button>
                        </div>

                        <p className="text-center text-sm text-slate-400">
                            Trusted by agents at Keller Williams, RE/MAX, and Compass.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
