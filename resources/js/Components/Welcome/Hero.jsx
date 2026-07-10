import React from 'react';

export default function Hero({ scrollToBooking }) {
    return (
        <section className="relative overflow-hidden min-h-[640px] flex items-center py-16 md:py-24 bg-[#FAF9F5]/40 border-b border-[#3FAD00]/10 w-full">
            
            {/* Light curtains/living room background image spanning full width */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80" 
                    alt="Bright Living Room Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Subtle soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/70 to-transparent z-0"></div>

            {/* Content Container aligned with rest of site */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Text Content */}
                <div className="lg:col-span-7 space-y-6 text-left">

                    
                    <h1 className="sparkle-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#1F3612] leading-tight">
                        Specialized, efficient, and thorough cleaning services
                    </h1>
                    
                    <p className="text-[#3B5E2B] text-base sm:text-lg leading-relaxed max-w-xl">
                        We provide high-quality cleaning tasks using the least amount of time, energy, and money.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button 
                            onClick={scrollToBooking} 
                            className="px-8 py-4 bg-[#3FAD00] hover:bg-[#2C7A00] text-white font-bold rounded-xl transition-all shadow-md shadow-[#3FAD00]/20 hover:shadow-lg hover:scale-105 active:scale-95 duration-200 text-sm sm:text-base"
                        >
                            Get Started Now
                        </button>
                        <a 
                            href="#services" 
                            className="px-8 py-4 border-2 border-[#1F3612] text-[#1F3612] hover:bg-[#1F3612]/5 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 duration-200 text-sm sm:text-base bg-transparent text-center"
                        >
                            View all Services
                        </a>
                    </div>
                </div>

                {/* Right Column: Cleaning Team Image (Directly on the background) */}
                <div className="lg:col-span-5 relative flex justify-center">
                    {/* Soft glowing ambient circle behind the team */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-[#3FAD00]/15 to-[#FFD200]/10 rounded-[3rem] blur-2xl -z-10 animate-pulse-glow"></div>
                    
                    <img 
                        src="/cleaning_team.png" 
                        alt="MintyFresh Cleaning Team" 
                        className="w-full h-auto max-h-[480px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-[2rem]"
                    />
                </div>
            </div>
        </section>
    );
}
