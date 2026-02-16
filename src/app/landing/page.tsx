'use client';

export const runtime = 'edge';

// Build Refresh ID: 2026-02-16-01-35
import React from 'react';
import { Building2, Sparkles, Zap, Clock, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
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
                    <Link href="/" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-50">
                        Get Started Free
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center lg:text-left lg:grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 max-w-2xl mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold tracking-wide uppercase">
                            <Sparkles className="w-4 h-4" />
                            Built for Keller Williams Agents
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                            Write Real Estate Listings in <span className="text-blue-600">10 Seconds.</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Generate MLS descriptions, social media posts, and email announcements instantly. Stop wasting hours on marketing copy and focus on closing deals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/" className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                                Start Generating Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <div className="flex items-center gap-4 px-6">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                            <img src={`https://i.pravatar.cc/150?u=agent\${i}`} alt="Agent" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="flex text-yellow-500 mb-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <span className="font-bold text-slate-900">500+</span> <span className="text-slate-500">KW Agents</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 lg:mt-0 relative">
                        <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-3xl"></div>
                        <div className="relative bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden p-2 lg:rotate-2">
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <div className="h-2 w-32 bg-slate-200 rounded-full ml-4"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-4 w-3/4 bg-blue-100 rounded-lg"></div>
                                    <div className="h-24 w-full bg-white border border-slate-100 rounded-xl p-4">
                                        <div className="h-2 w-full bg-slate-50 rounded mb-2"></div>
                                        <div className="h-2 w-5/6 bg-slate-50 rounded mb-2"></div>
                                        <div className="h-2 w-full bg-slate-50 rounded"></div>
                                    </div>
                                    <div className="h-10 w-full bg-blue-600 rounded-xl"></div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-4 w-24 bg-slate-200 rounded-full"></div>
                                        <div className="h-4 w-12 bg-blue-100 rounded-full"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-slate-100 rounded"></div>
                                        <div className="h-2 w-full bg-slate-100 rounded"></div>
                                        <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Barra */}
            <div className="bg-slate-50 py-12 border-y border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 opacity-40 grayscale flex justify-around items-center">
                    <span className="text-2xl font-bold italic tracking-tighter">ZILLOW</span>
                    <span className="text-2xl font-bold italic tracking-tighter">MLS</span>
                    <span className="text-2xl font-bold italic tracking-tighter">COMPASS</span>
                    <span className="text-2xl font-bold italic tracking-tighter">RE/MAX</span>
                    <span className="text-2xl font-bold italic tracking-tighter">KELLER WILLIAMS</span>
                </div>
            </div>

            {/* Features Grid */}
            <section id="features" className="py-32 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Everything you need to market a listing.</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">From MLS to social media, we&apos;ve got your entire workflow covered with professional-grade AI.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Zap,
                            title: "Instant Generation",
                            desc: "Get a full marketing package in under 30 seconds. No more writers block."
                        },
                        {
                            icon: Clock,
                            title: "Save 3+ Hours",
                            desc: "Writing across different platforms takes time. We consolidate it into one click."
                        },
                        {
                            icon: ShieldCheck,
                            title: "MLS Compliant",
                            desc: "Our AI is trained on MLS rules to ensure your descriptions are always compliant."
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

            {/* Call to Action */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-12 shadow-2xl shadow-blue-200">
                    <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                        Ready to spend less time typing and more time selling?
                    </h2>
                    <div className="space-y-6">
                        <Link href="/" className="px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-2xl hover:bg-slate-50 transition-all inline-flex items-center gap-3">
                            Get Started for Free
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                        <p className="text-blue-100 font-medium italic opacity-80 italic">&quot;The absolute best tool I&apos;ve used this year. A game changer for my workflow.&quot; — Keller Williams Agent</p>
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
