'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PropertyForm } from '@/components/PropertyForm';
import { OutputDisplay } from '@/components/OutputDisplay';
import { PricingModal } from '@/components/PricingModal';
import { ListingInput, ListingOutput } from '@/types/listing';
import { Region, getRegionConfig } from '@/config/regions';
import { Sparkles, Building2, Zap, LayoutDashboard, LogOut, User, Crown, History, Calendar, Gift, Copy, Check } from 'lucide-react';
import { logout } from '@/app/login/actions';
import { cn } from '@/lib/utils';

interface SavedListing {
    id: string;
    address: string;
    created_at: string;
    generated_output: ListingOutput;
    tone: string;
    price: string;
}

export default function DashboardClient({
    userEmail,
    subscriptionStatus = 'free',
    trialUsed = 0,
    referralCode = ''
}: {
    userEmail: string,
    subscriptionStatus?: string,
    trialUsed?: number,
    referralCode?: string
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState<ListingOutput | null>(null);
    const [currentRegion, setCurrentRegion] = useState<Region>('ZA');
    const [error, setError] = useState<string | null>(null);
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const [history, setHistory] = useState<SavedListing[]>([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const isPro = subscriptionStatus === 'pro';
    const trialLimit = 3;

    const fetchHistory = useCallback(async () => {
        setIsHistoryLoading(true);
        try {
            const response = await fetch('/api/listings');
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setIsHistoryLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleGenerate = async (input: ListingInput) => {
        // Client-side guard (server also enforces this)
        if (!isPro && trialUsed >= trialLimit && !output) {
            setError(`Trial limit reached (\${trialLimit} unique listings). Upgrade to Pro for unlimited access.`);
            setIsPricingOpen(true);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to generate listing package');
            }

            const data = await response.json();
            setOutput(data);
            setCurrentRegion(input.region || 'ZA');

            fetchHistory();

            if (window.innerWidth < 1024) {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        } catch (err: any) {
            setError(err.message);
            if (err.message.includes('Trial limit')) {
                setIsPricingOpen(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyReferral = () => {
        const link = `\${window.location.origin}/login?ref=\${referralCode}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const selectFromHistory = (listing: SavedListing) => {
        setOutput(listing.generated_output);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">Listing<span className="text-blue-600">Mate</span></span>
                    </div>
                    <nav className="flex items-center gap-4 sm:gap-6">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                            {isPro ? <Crown className="w-4 h-4 text-amber-500" /> : <User className="w-4 h-4 text-slate-400" />}
                            <span className="text-xs font-semibold text-slate-600 truncate max-w-[150px]">{userEmail}</span>
                        </div>

                        {!isPro && (
                            <button
                                onClick={() => setIsPricingOpen(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                            >
                                <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                                Upgrade
                            </button>
                        )}

                        <button
                            onClick={() => logout()}
                            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
                                    <Sparkles className="w-4 h-4" />
                                    AI Property Listing Writer
                                </div>
                                {!isPro && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{trialUsed}/{trialLimit} Trial Uses</span>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                                Generate your entire property listing package in 30 seconds.
                            </h1>

                            {!isPro && (
                                <div className="relative overflow-hidden p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[1.5rem] border border-amber-200/50 shadow-sm border-dashed">
                                    <div className="relative z-10 flex gap-4 items-center">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-amber-100 flex items-center justify-center shrink-0">
                                            <Gift className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-amber-900">Invite an agent, get 1 month FREE</h4>
                                            <p className="text-xs text-amber-700 mt-0.5">Share your link and earn Pro status when they upgrade.</p>
                                            <button
                                                onClick={handleCopyReferral}
                                                className="mt-3 flex items-center gap-2 py-1.5 px-3 bg-white border border-amber-200 rounded-lg text-[10px] font-bold text-amber-900 hover:border-amber-400 transition-all shadow-xs active:scale-95"
                                            >
                                                {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                                                {copied ? 'Link Copied!' : 'Copy Referral Link'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <PropertyForm onSubmit={handleGenerate} isLoading={isLoading} />

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex flex-col gap-2 shadow-sm">
                                <p>{error}</p>
                                {!isPro && error.includes('limit') && (
                                    <button
                                        onClick={() => setIsPricingOpen(true)}
                                        className="text-left font-bold underline hover:text-red-800"
                                    >
                                        View Pricing Options →
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <History className="w-5 h-5 text-slate-400" />
                                    <h3 className="font-bold text-slate-900">Recent Listings</h3>
                                </div>
                            </div>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {isHistoryLoading ? (
                                    <div className="py-8 text-center text-slate-400 italic text-sm">Loading history...</div>
                                ) : history.length === 0 ? (
                                    <div className="py-8 text-center text-slate-400 italic text-sm">No history yet. Start generating!</div>
                                ) : (
                                    history.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => selectFromHistory(item)}
                                            className="w-full text-left p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-md hover:shadow-blue-50/50 transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.tone}</span>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium opacity-60">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-700">{item.address}</p>
                                            <p className="text-xs text-slate-500 mt-1 font-medium font-mono opacity-80">{item.price}</p>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                        {!output && !isLoading ? (
                            <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-slate-200 p-12 text-center group relative overflow-hidden shadow-sm">
                                <div className="absolute inset-0 bg-slate-50/50 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                                <div className="w-20 h-20 bg-white shadow-xl shadow-slate-200 rounded-[1.5rem] flex items-center justify-center mb-8 border border-slate-50 group-hover:scale-110 transition-transform duration-500">
                                    <LayoutDashboard className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Your Dashboard is ready.</h3>
                                <p className="text-slate-500 max-w-xs mx-auto leading-relaxed font-medium">
                                    Fill out the form on the left to start generating professional marketing copy instantly.
                                </p>
                            </div>
                        ) : isLoading ? (
                            <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-slate-100 p-12 text-center shadow-sm">
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 border-4 border-slate-50 border-t-blue-600 rounded-full animate-spin"></div>
                                    <Sparkles className="w-10 h-10 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                </div>
                                <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Crafting Excellence...</h3>
                                <p className="text-slate-500 leading-relaxed max-w-sm px-4 font-medium italic">Our AI is analyzing your property details to write high-converting copy across all channels.</p>
                            </div>
                        ) : (
                            <OutputDisplay output={output!} region={currentRegion} />
                        )}
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center sm:items-start gap-2">
                        <div className="flex items-center gap-2 grayscale brightness-50 opacity-40">
                            <Building2 className="w-5 h-5" />
                            <span className="text-lg font-bold">ListingMate</span>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">
                            Helping top agents win more listings since 2026.
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">Privacy</a>
                        <a href="#" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">Terms</a>
                        <a href="#" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">Support</a>
                    </div>
                </div>
            </footer>

            <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} region={currentRegion} />
        </div>
    );
}
