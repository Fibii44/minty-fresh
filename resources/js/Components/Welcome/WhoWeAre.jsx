import React from 'react';

export default function WhoWeAre({ scrollToBooking }) {
    return (
        <section id="who-we-are" className="py-24 bg-white border-b border-[#3FAD00]/10 w-full px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#2C7A00] font-extrabold">
                        Who We Are
                    </div>
                    <h2 className="sparkle-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F3612] leading-tight">
                        We Are the Best Option <br />for a Sparkling Home
                    </h2>
                    <p className="text-[#3B5E2B] leading-relaxed text-base">
                        At MintyFresh Cleaning, our mission is to provide the most convenient platform for connecting you with exceptional, professional cleaners who deliver outstanding results.
                    </p>
                    
                    <div className="space-y-4 pt-2">
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#3FAD00]/20 flex items-center justify-center text-[#2C7A00] shrink-0 mt-0.5">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[#1F3612] text-sm">We always keep you up to date on your cleaning status</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#3FAD00]/20 flex items-center justify-center text-[#2C7A00] shrink-0 mt-0.5">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[#1F3612] text-sm">Our cleaners treat your home like their own home</span>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button onClick={scrollToBooking} className="px-6 py-3 rounded-xl bg-[#3FAD00] text-white hover:bg-[#2C7A00] transition-all text-sm font-bold shadow-md shadow-[#3FAD00]/15">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-5 flex justify-center relative">
                    <div className="absolute -inset-4 bg-[#EAF2E8]/30 rounded-[2.5rem] rotate-2 transform -z-10"></div>
                    <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-xl max-w-md w-full bg-white aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-[400px]">
                        <img 
                            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80" 
                            alt="Professionals cleaning" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
