import React from 'react';

export default function Testimonials() {
    return (
        <section className="py-24 bg-white border-b border-[#3FAD00]/10 w-full px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#2C7A00] font-extrabold">
                    Testimonials
                </div>
                <h2 className="sparkle-heading text-3xl sm:text-4xl font-extrabold text-[#1F3612]">
                    Loved by Springfield Residents
                </h2>
                <p className="text-[#2C7A00] max-w-xl mx-auto">
                    Read how we save people hours of stress with our reliable, luxury cleaning experience.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-3xl p-8 flex flex-col justify-between border border-[#3FAD00]/15 shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-[#3B5E2B] text-sm leading-relaxed italic mb-8">
                        "The deep cleaning of my townhouse was absolutely flawless. I selected Yuki as my cleaner, and his level of detail was unmatched. The bathrooms literally gleam. Booking was incredibly easy."
                    </p>
                    <div className="flex items-center gap-4">
                        <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&h=60&q=80" 
                            alt="Sarah M." 
                            className="w-12 h-12 rounded-full object-cover border border-[#3FAD00]/15"
                        />
                        <div>
                            <h4 className="font-bold text-[#1F3612] text-sm">Sarah Jenkins</h4>
                            <div className="text-amber-500 text-xs flex gap-0.5">★★★★★</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 flex flex-col justify-between border border-[#3FAD00]/15 shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-[#3B5E2B] text-sm leading-relaxed italic mb-8">
                        "I have weekly cleanings done with Aisha, and using natural green products was a dealbreaker for me. The house smells wonderful without any chemical odor. Extremely professional service."
                    </p>
                    <div className="flex items-center gap-4">
                        <img 
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=60&h=60&q=80" 
                            alt="David K." 
                            className="w-12 h-12 rounded-full object-cover border border-[#3FAD00]/15"
                        />
                        <div>
                            <h4 className="font-bold text-[#1F3612] text-sm">David K.</h4>
                            <div className="text-amber-500 text-xs flex gap-0.5">★★★★★</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 flex flex-col justify-between border border-[#3FAD00]/15 shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-[#3B5E2B] text-sm leading-relaxed italic mb-8">
                        "I needed a move-out clean to secure my rental deposit. Marcus Vance was assigned and completed the job in 4 hours. Passed my inspection with flying colors. Worth every dollar!"
                    </p>
                    <div className="flex items-center gap-4">
                        <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&h=60&q=80" 
                            alt="John S." 
                            className="w-12 h-12 rounded-full object-cover border border-[#3FAD00]/15"
                        />
                        <div>
                            <h4 className="font-bold text-[#1F3612] text-sm">John Sanderson</h4>
                            <div className="text-amber-500 text-xs flex gap-0.5">★★★★★</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}
