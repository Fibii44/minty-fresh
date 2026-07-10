import React from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="sparkle-body min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Background Blobs */}
            <div className="glow-blob glow-blob-1 opacity-25"></div>
            <div className="glow-blob glow-blob-2 opacity-25"></div>

            <div className="w-full max-w-md relative z-10 space-y-8 animate-fade-in">
                {/* Logo and Brand Header */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                            <div className="absolute inset-0 bg-[#3FAD00]/15 rounded-full blur-[2px]"></div>
                            <svg className="w-9 h-9 text-[#3FAD00] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                {/* Mint leaf vector */}
                                <path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 7-10s2.5 3.5 2.5 6.5c0 3-2.5 4.5-2.5 6.5" fill="#3FAD00" fillOpacity="0.85" stroke="none" />
                                {/* Sparkling Clean star */}
                                <path d="M19 4.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" fill="#FFD200" stroke="none" />
                            </svg>
                        </div>
                        <span className="sparkle-heading font-black text-2xl tracking-wider uppercase whitespace-nowrap">
                            <span className="text-[#1F3612]">Minty</span>
                            <span className="text-[#3FAD00]">Fresh</span>
                        </span>
                    </Link>
                    <div>
                        <h2 className="sparkle-heading text-lg font-bold text-[#1F3612] tracking-wide">
                            Admin Portal
                        </h2>
                        <p className="text-xs text-[#728F63] mt-1">
                            Secure sign-in for platform management
                        </p>
                    </div>
                </div>

                {/* Glassmorphic Card */}
                <div className="bg-white/80 backdrop-blur-md px-8 py-8 shadow-xl border border-[#3FAD00]/15 rounded-3xl space-y-6">
                    {children}
                </div>

                {/* Footer Link / Copyright */}
                <div className="text-center">
                    <p className="text-xs text-[#728F63]">
                        &copy; {new Date().getFullYear()} MintyFresh Cleaning. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
