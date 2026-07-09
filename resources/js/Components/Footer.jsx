import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-[#FAF9F5] border-t border-[#3FAD00]/10 py-12 px-6 md:px-12 text-[#3B5E2B]/80 text-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-[#3FAD00]/10">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#3FAD00]/10 rounded-full blur-[1px]"></div>
                        <svg className="w-6 h-6 text-[#3FAD00] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 7-10s2.5 3.5 2.5 6.5c0 3-2.5 4.5-2.5 6.5" fill="#3FAD00" fillOpacity="0.85" stroke="none" />
                            <path d="M19 4.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" fill="#FFD200" stroke="none" />
                        </svg>
                    </div>
                    <span className="sparkle-heading font-black text-lg tracking-wider uppercase">
                        <span className="text-[#1F3612]">Minty</span>
                        <span className="text-[#3FAD00]">Fresh</span>
                    </span>
                </div>

                {/* Simple Horizontal Links */}
                <div className="flex flex-wrap justify-center gap-8 text-xs font-semibold tracking-wide">
                    <a href="/#services" className="text-[#3B5E2B] hover:text-[#1F3612] transition-colors duration-200">Services</a>
                    <a href="/#before-after" className="text-[#3B5E2B] hover:text-[#1F3612] transition-colors duration-200">Results</a>
                    <Link href="/book" className="text-[#3B5E2B] hover:text-[#1F3612] transition-colors duration-200">Pricing</Link>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#728F63]">
                <p>© {new Date().getFullYear()} MintyFresh Cleaning. All rights reserved. Vetted. Insured. Clean.</p>
                <a 
                    href="https://felicesfeby.tech/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-bold text-[#728F63] hover:text-[#1F3612] transition-colors duration-200"
                >
                    <span>Developed by</span>
                    <span className="text-[#3FAD00] font-black">Feby</span>
                </a>
            </div>
        </footer>
    );
}
