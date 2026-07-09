import React from 'react';

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-16 text-center">
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-[#3FAD00] font-extrabold">
                        How It Works
                    </div>
                    <h2 className="sparkle-heading text-4xl sm:text-5xl font-black text-[#1F3612]">
                        Quick and Easy
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-12 max-w-5xl mx-auto">
                    {/* Step 1 */}
                    <div className="flex-1 flex flex-col items-center text-center space-y-6 max-w-sm">
                        <div className="relative w-36 h-36 rounded-full bg-[#EAF2E8] border border-[#3FAD00]/30 flex items-center justify-center shadow-md">

                            {/* Icon */}
                            <svg className="w-16 h-16 text-[#3FAD00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="sparkle-heading text-xl font-bold text-[#1F3612]">Free Quote</h3>
                            <p className="text-[#3B5E2B] text-sm leading-relaxed max-w-[250px]">
                                Tell us about your home and choose the date you want.
                            </p>
                        </div>
                    </div>

                    {/* Arrow 1 */}
                    <div className="hidden md:block text-[#3FAD00]/40 shrink-0">
                        <svg className="w-16 h-16 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>

                    {/* Step 2 */}
                    <div className="flex-1 flex flex-col items-center text-center space-y-6 max-w-sm">
                        <div className="relative w-36 h-36 rounded-full bg-[#EAF2E8] border border-[#3FAD00]/30 flex items-center justify-center shadow-md">

                            {/* Icon */}
                            <svg className="w-16 h-16 text-[#3FAD00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="sparkle-heading text-xl font-bold text-[#1F3612]">Clean</h3>
                            <p className="text-[#3B5E2B] text-sm leading-relaxed max-w-[250px]">
                                Our seasoned team of full-time cleaners will transform your home.
                            </p>
                        </div>
                    </div>

                    {/* Arrow 2 */}
                    <div className="hidden md:block text-[#3FAD00]/40 shrink-0">
                        <svg className="w-16 h-16 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-1 flex flex-col items-center text-center space-y-6 max-w-sm">
                        <div className="relative w-36 h-36 rounded-full bg-[#EAF2E8] border border-[#3FAD00]/30 flex items-center justify-center shadow-md">

                            {/* Icon */}
                            <svg className="w-16 h-16 text-[#3FAD00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="sparkle-heading text-xl font-bold text-[#1F3612]">Relax</h3>
                            <p className="text-[#3B5E2B] text-sm leading-relaxed max-w-[250px]">
                                Sit back and enjoy how amazing your home or business looks now.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
