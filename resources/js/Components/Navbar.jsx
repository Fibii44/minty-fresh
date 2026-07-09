import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <header className="sticky top-0 z-50 bg-[#FAF9F5]/80 backdrop-blur-md border-b border-[#3FAD00]/15 py-4 px-6 md:px-12 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-[#3FAD00]/15 rounded-full blur-[2px]"></div>
                    <svg className="w-8 h-8 text-[#3FAD00] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Mint leaf vector */}
                        <path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 7-10s2.5 3.5 2.5 6.5c0 3-2.5 4.5-2.5 6.5" fill="#3FAD00" fillOpacity="0.85" stroke="none" />
                        {/* Sparkling Clean star */}
                        <path d="M19 4.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" fill="#FFD200" stroke="none" />
                    </svg>
                </div>
                <span className="sparkle-heading font-black text-xl tracking-wider uppercase whitespace-nowrap">
                    <span className="text-[#1F3612]">Minty</span>
                    <span className="text-[#3FAD00]">Fresh</span>
                    <span className="text-[#728F63] text-sm font-medium ml-1.5 tracking-normal lowercase first-letter:uppercase">cleaning</span>
                </span>
            </Link>

            <nav className="flex items-center gap-6">
                <a href="/#who-we-are" className="relative py-1 text-[#3B5E2B] hover:text-[#1F3612] transition-colors text-sm font-semibold hidden md:inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#3FAD00] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">About</a>
                <a href="/#services" className="relative py-1 text-[#3B5E2B] hover:text-[#1F3612] transition-colors text-sm font-semibold hidden md:inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#3FAD00] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">Services</a>
                <a href="/#before-after" className="relative py-1 text-[#3B5E2B] hover:text-[#1F3612] transition-colors text-sm font-semibold hidden md:inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#3FAD00] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">Transformations</a>
                
                {auth?.user ? (
                    <Link href={route('dashboard')} className="px-5 py-2 rounded-lg bg-[#3FAD00]/10 border border-[#3FAD00]/30 text-[#3B5E2B] hover:bg-[#3FAD00] hover:text-white transition-all text-sm font-bold">
                        Dashboard
                    </Link>
                ) : (
                    <Link href="/book" className="px-5 py-2.5 rounded-xl bg-[#3FAD00] text-white hover:bg-[#2C7A00] transition-all text-sm font-bold shadow-md shadow-[#3FAD00]/20 hover:shadow-lg hover:shadow-[#3FAD00]/30 hover:-translate-y-0.5 transform duration-300">
                        Book Now
                    </Link>
                )}
            </nav>
        </header>
    );
}
