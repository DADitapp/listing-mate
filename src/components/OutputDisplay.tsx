'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ListingOutput } from '@/types/listing';
import { Copy, Check, Facebook, Instagram, Share2, Mail, FileText, Layout } from 'lucide-react';

interface OutputDisplayProps {
    output: ListingOutput;
}

type TabType = 'MLS' | 'Social' | 'Email' | 'Zillow' | 'Headlines';

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
    const [activeTab, setActiveTab] = useState<TabType>('MLS');
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const getTabContent = () => {
        switch (activeTab) {
            case 'MLS':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">MLS Description</h3>
                            <button
                                onClick={() => handleCopy(output.mlsDescription, 'mls')}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {copied === 'mls' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied === 'mls' ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                        </div>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100 whitespace-pre-wrap">
                            {output.mlsDescription}
                        </p>
                    </div>
                );
            case 'Social':
                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Facebook className="w-5 h-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-slate-900">Facebook Post</h3>
                                </div>
                                <button
                                    onClick={() => handleCopy(output.socialMediaPost.facebook, 'fb')}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    {copied === 'fb' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    Copy
                                </button>
                            </div>
                            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                                {output.socialMediaPost.facebook}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Instagram className="w-5 h-5 text-pink-600" />
                                    <h3 className="text-lg font-semibold text-slate-900">Instagram Post</h3>
                                </div>
                                <button
                                    onClick={() => handleCopy(output.socialMediaPost.instagram, 'ig')}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    {copied === 'ig' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    Copy
                                </button>
                            </div>
                            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                                {output.socialMediaPost.instagram}
                            </p>
                        </div>
                    </div>
                );
            case 'Email':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Email Announcement</h3>
                            <button
                                onClick={() => handleCopy(`Subject: \${output.emailAnnouncement.subject}\n\n\${output.emailAnnouncement.body}`, 'email')}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {copied === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                Copy Full Email
                            </button>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
                            <div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject Line</span>
                                <p className="text-slate-900 font-medium mt-1">{output.emailAnnouncement.subject}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-200">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message Body</span>
                                <p className="text-slate-700 leading-relaxed mt-2 whitespace-pre-wrap">{output.emailAnnouncement.body}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'Zillow':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Short Description (Zillow/Portal)</h3>
                            <button
                                onClick={() => handleCopy(output.shortDescription, 'short')}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {copied === 'short' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                Copy
                            </button>
                        </div>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100 whitespace-pre-wrap">
                            {output.shortDescription}
                        </p>
                    </div>
                );
            case 'Headlines':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Suggested Headlines</h3>
                        <div className="grid gap-3">
                            {output.headlines.map((headline, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 group">
                                    <p className="text-slate-700 font-medium">{headline}</p>
                                    <button
                                        onClick={() => handleCopy(headline, `headline-\${idx}`)}
                                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    >
                                        {copied === `headline-\${idx}` ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const tabs: { type: TabType; label: string; icon: any }[] = [
        { type: 'MLS', label: 'MLS', icon: FileText },
        { type: 'Social', label: 'Social', icon: Share2 },
        { type: 'Email', label: 'Email', icon: Mail },
        { type: 'Zillow', label: 'Zillow', icon: Layout },
        { type: 'Headlines', label: 'Headlines', icon: Layout },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex border-b border-slate-100 bg-slate-50/50">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.type}
                            onClick={() => setActiveTab(tab.type)}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-4 px-2 text-sm font-medium transition-all border-b-2",
                                activeTab === tab.type
                                    ? "bg-white border-blue-600 text-blue-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                            )}
                        >
                            <Icon className="w-4 h-4 hidden sm:block" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            <div className="p-6 min-h-[400px]">
                {getTabContent()}
            </div>
        </div>
    );
};
