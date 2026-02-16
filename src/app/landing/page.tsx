'use client';

import React, { useState } from 'react';
import { Building2, Sparkles, Zap, Clock, ShieldCheck, ArrowRight, Star, Globe } from 'lucide-react';
import Link from 'next/link';
import { Region, REGION_CONFIGS, getRegionConfig } from '@/config/regions';
import { cn } from '@/lib/utils';

const REGIONS: Region[] = ['ZA', 'US', 'UK', 'AU'];

export default function LandingPage() {
    const [pricingRegion, setPricingRegion] = useState<Region>('ZA');
    const pricingConfig = getRegionConfig(pricingRegion);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Listing<span className="text-blue-600">Mate</span></span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                    <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                    <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
                    <Link href="/login" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-50">
                        Get Started Free
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center lg:text-left lg:grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 max-w-2xl mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold tracking-wide uppercase">
                            <Globe className="w-4 h-4" />
                            AI-Powered Property Listings
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                            Write Property Listings in <span className="text-blue-600">10 Seconds.</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Generate listing descriptions, social media posts, and email announcements instantly. Stop wasting hours on marketing copy and focus on closing deals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/login" className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                                Start Generating Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <div className="flex items-center gap-4 px-6">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                            <img src={`https://i.pravatar.cc/150?u=agent${i}`} alt="Agent" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="flex text-yellow-500 mb-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <span className="font-bold text-slate-900">500+</span> <span className="text-slate-500">Agents Worldwide</span>
                                </div>
                            </div>
                        </div>
                        {/* Region flags */}
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-sm text-slate-400 font-medium">Available in</span>
                            <div className="flex gap-2">
                                {['🇿🇦', '🇺🇸', '🇬🇧', '🇦🇺'].map((flag, i) => (
                                    <span key={i} className="text-2xl">{flag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 lg:mt-0 relative">
                        <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-3xl"></div>
                        <div className="relative bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden p-2 lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                                {/* Browser chrome */}
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-100/80 border-b border-slate-200">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <div className="flex-1 mx-4 h-6 bg-white rounded-lg flex items-center px-3">
                                        <span className="text-[10px] text-slate-400 font-mono">listingmate.ai</span>
                                    </div>
                                </div>

                                {/* Property header */}
                                <div className="px-5 pt-4 pb-3 border-b border-slate-100 bg-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">✨ AI Generated</p>
                                            <h4 className="text-sm font-bold text-slate-900">12 Ocean View Drive, Camps Bay</h4>
                                            <p className="text-[11px] text-slate-500 mt-0.5">4 Bed · 3 Bath · 320 m² · R8,500,000</p>
                                        </div>
                                        <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-1 rounded-lg border border-green-100">Luxury</span>
                                    </div>
                                </div>

                                {/* Output tabs */}
                                <div className="flex bg-white border-b border-slate-100">
                                    <div className="px-4 py-2 text-[11px] font-bold text-blue-600 border-b-2 border-blue-600">Listing</div>
                                    <div className="px-4 py-2 text-[11px] font-medium text-slate-400">Social</div>
                                    <div className="px-4 py-2 text-[11px] font-medium text-slate-400">Email</div>
                                    <div className="px-4 py-2 text-[11px] font-medium text-slate-400">Portal</div>
                                    <div className="px-4 py-2 text-[11px] font-medium text-slate-400">Headlines</div>
                                </div>

                                {/* Example listing content */}
                                <div className="p-5 bg-white">
                                    <p className="text-xs text-slate-700 leading-relaxed">
                                        Perched above Camps Bay&apos;s iconic coastline, this exceptional 4-bedroom residence offers an unrivalled fusion of contemporary luxury and Atlantic Ocean panoramas. Floor-to-ceiling glass frames the sweep of beach and mountain, flooding the open-plan living areas with natural light.
                                    </p>
                                    <p className="text-xs text-slate-700 leading-relaxed mt-3">
                                        The chef&apos;s kitchen features imported Caesarstone countertops, integrated Miele appliances, and a generous island perfect for entertaining. The private master suite boasts a walk-in wardrobe and
                                        <span className="inline-block w-1.5 h-3.5 bg-blue-500 rounded-sm ml-0.5 animate-pulse"></span>
                                    </p>

                                    {/* Copy button hint */}
                                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5 text-[10px] text-blue-600 font-semibold">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                                            Copy to Clipboard
                                        </div>
                                        <span className="text-[10px] text-slate-300 ml-auto">247 words</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <div className="bg-slate-50 py-12 border-y border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 opacity-40 grayscale flex justify-around items-center">
                    <span className="text-2xl font-bold italic tracking-tighter">PROPERTY24</span>
                    <span className="text-2xl font-bold italic tracking-tighter">ZILLOW</span>
                    <span className="text-2xl font-bold italic tracking-tighter">RIGHTMOVE</span>
                    <span className="text-2xl font-bold italic tracking-tighter">DOMAIN</span>
                    <span className="text-2xl font-bold italic tracking-tighter">RE/MAX</span>
                </div>
            </div>

            {/* Features Grid */}
            <section id="features" className="py-32 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Everything you need to market a listing.</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">From property portals to social media, we&apos;ve got your entire workflow covered with professional-grade AI.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Zap,
                            title: "Instant Generation",
                            desc: "Get a full marketing package in under 30 seconds. No more writer's block."
                        },
                        {
                            icon: Clock,
                            title: "Save 3+ Hours",
                            desc: "Writing across different platforms takes time. We consolidate it into one click."
                        },
                        {
                            icon: Globe,
                            title: "Multi-Region Support",
                            desc: "Built for agents in South Africa, USA, UK, and Australia. Correct currency, units, and terminology automatically."
                        }
                    ].map((feat, i) => (
                        <div key={i} className="p-8 bg-slate-50 rounded-3xl space-y-4 hover:shadow-lg transition-all border border-transparent hover:border-slate-100 group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <feat.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{feat.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 bg-slate-50 border-y border-slate-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Simple, transparent pricing.</h2>
                        <p className="text-lg text-slate-500">Start with 3 free listings. Upgrade when you&apos;re ready.</p>

                        {/* Region Toggle for Pricing */}
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <span className="text-sm text-slate-400 font-medium">Show prices in</span>
                            <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                                {REGIONS.map((r) => {
                                    const config = getRegionConfig(r);
                                    return (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setPricingRegion(r)}
                                            className={cn(
                                                "flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-all",
                                                pricingRegion === r
                                                    ? "bg-blue-50 text-blue-700 font-semibold"
                                                    : "text-slate-500 hover:text-slate-700"
                                            )}
                                        >
                                            <span>{config.flag}</span>
                                            <span className="hidden sm:inline">{r}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {/* Free Trial */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 shadow-sm">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Free Trial</h3>
                                <p className="text-sm text-slate-500 mt-1">Try it out, no card needed</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-slate-900">{pricingConfig.currencySymbol}0</span>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> 3 listing packages</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> All output formats</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Multi-region support</li>
                            </ul>
                            <Link href="/login" className="block w-full py-3 text-center border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-slate-300 transition-all">
                                Get Started
                            </Link>
                        </div>

                        {/* Basic Tier */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 shadow-sm">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Basic</h3>
                                <p className="text-sm text-slate-500 mt-1">For part-time agents</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-slate-900">{pricingConfig.pricing.basic.price}</span>
                                <span className="text-slate-400 font-medium">/month</span>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> <strong>10</strong> listings per month</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> All output formats</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Multi-region support</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Listing history</li>
                            </ul>
                            <Link href="/login" className="block w-full py-3 text-center border-2 border-blue-200 text-blue-700 font-bold rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all">
                                Choose Basic
                            </Link>
                        </div>

                        {/* Pro Tier */}
                        <div className="bg-white rounded-3xl p-8 border-2 border-blue-500 space-y-6 shadow-xl shadow-blue-100 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Pro</h3>
                                <p className="text-sm text-slate-500 mt-1">For active agents</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-slate-900">{pricingConfig.pricing.pro.price}</span>
                                <span className="text-slate-400 font-medium">/month</span>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Unlimited</strong> listings</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> All output formats</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Multi-region support</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Listing history &amp; archive</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Priority support</li>
                            </ul>
                            <Link href="/login" className="block w-full py-3 text-center bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                Choose Pro
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-12 shadow-2xl shadow-blue-200">
                    <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                        Ready to spend less time typing and more time selling?
                    </h2>
                    <div className="space-y-6">
                        <Link href="/login" className="px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-2xl hover:bg-slate-50 transition-all inline-flex items-center gap-3">
                            Get Started for Free
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                        <p className="text-blue-100 font-medium italic opacity-80">&quot;The absolute best tool I&apos;ve used this year. A game changer for my workflow.&quot; — Estate Agent, Cape Town</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-50 bg-slate-50/30">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">ListingMate</span>
                    </div>
                    <div className="flex gap-12 text-sm font-semibold text-slate-500">
                        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600">Terms of Service</a>
                        <a href="#" className="hover:text-blue-600">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
