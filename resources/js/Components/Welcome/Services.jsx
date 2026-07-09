import React from 'react';

export default function Services({ data, handleServiceSelect, scrollToBooking }) {
    return (
        <section id="services" className="py-24 bg-[#FAF9F5] border-b border-[#3FAD00]/10 w-full px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#3FAD00]/15 pb-8">
                <div className="lg:col-span-7 space-y-3 text-left">
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#2C7A00] font-extrabold">
                        Our Services
                    </div>
                    <h2 className="sparkle-heading text-4xl sm:text-5xl font-black text-[#1F3612]">
                        We Always Provide The Best Service
                    </h2>
                </div>
                <div className="lg:col-span-5 text-left">
                    <p className="text-base text-[#2C7A00] leading-relaxed">
                        While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services to maintain a consistently fresh, luxury environment.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Service 1 */}
                <div 
                    onClick={() => { handleServiceSelect('standard'); scrollToBooking(); }}
                    className={`bg-white rounded-3xl overflow-hidden shadow-sm border-2 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer hover:shadow-md group ${data.service_type === 'standard' ? 'border-[#3FAD00] bg-[#3FAD00]/5' : 'border-[#3FAD00]/15'}`}
                >
                    <div className="overflow-hidden h-52">
                        <img 
                            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" 
                            alt="Standard Clean" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="sparkle-heading text-2xl font-semibold text-[#1F3612] mb-3">Standard Clean</h3>
                            <p className="text-[#3B5E2B] text-sm leading-relaxed mb-6">
                                Regular maintenance cleaning to keep your space fresh and tidy. Perfect for weekly, bi-weekly, or monthly schedules.
                            </p>
                        </div>
                        <ul className="space-y-3 text-sm text-[#3B5E2B] border-t border-slate-100 pt-6 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Dusting & vacuuming
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Kitchen & bathroom sanitizing
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Trash emptying
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Bed making & surface wiping
                            </li>
                        </ul>
                        <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                            <span className="text-xs font-bold text-[#2C7A00] flex items-center gap-1.5 transition-colors group-hover:text-[#1F3612]">
                                Select Package
                            </span>
                            <div className="w-8 h-8 rounded-full bg-[#3FAD00]/10 flex items-center justify-center text-[#2C7A00] group-hover:bg-[#3FAD00] group-hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service 2 */}
                <div 
                    onClick={() => { handleServiceSelect('deep'); scrollToBooking(); }}
                    className={`bg-white rounded-3xl overflow-hidden shadow-sm border-2 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer hover:shadow-md group ${data.service_type === 'deep' ? 'border-[#3FAD00] bg-[#3FAD00]/5' : 'border-[#3FAD00]/15'}`}
                >
                    <div className="overflow-hidden h-52">
                        <img 
                            src="https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80" 
                            alt="Deep Clean" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="sparkle-heading text-2xl font-semibold text-[#1F3612] mb-3">Deep Clean</h3>
                            <p className="text-[#3B5E2B] text-sm leading-relaxed mb-6">
                                Intensive cleaning that reaches every corner. Ideal for seasonal refreshes or when your space needs extra attention.
                            </p>
                        </div>
                        <ul className="space-y-3 text-sm text-[#3B5E2B] border-t border-slate-100 pt-6 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Grout & tile scrubbing
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Inside oven & fridge cleaning
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Baseboard & window washing
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Detailed cabinet wiping
                            </li>
                        </ul>
                        <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                            <span className="text-xs font-bold text-[#2C7A00] flex items-center gap-1.5 transition-colors group-hover:text-[#1F3612]">
                                Select Package
                            </span>
                            <div className="w-8 h-8 rounded-full bg-[#3FAD00]/10 flex items-center justify-center text-[#2C7A00] group-hover:bg-[#3FAD00] group-hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service 3 */}
                <div 
                    onClick={() => { handleServiceSelect('move_out'); scrollToBooking(); }}
                    className={`bg-white rounded-3xl overflow-hidden shadow-sm border-2 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer hover:shadow-md group ${data.service_type === 'move_out' ? 'border-[#3FAD00] bg-[#3FAD00]/5' : 'border-[#3FAD00]/15'}`}
                >
                    <div className="overflow-hidden h-52">
                        <img 
                            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80" 
                            alt="Move-In/Out Clean" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="sparkle-heading text-2xl font-semibold text-[#1F3612] mb-3">Move-In/Out</h3>
                            <p className="text-[#3B5E2B] text-sm leading-relaxed mb-6">
                                Detailed cleaning designed to prepare a home for new tenants or restore it after moving. Ensures security deposit return.
                            </p>
                        </div>
                        <ul className="space-y-3 text-sm text-[#3B5E2B] border-t border-slate-100 pt-6 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Inside all cabinets & drawers
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Full appliance deep clean
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Wall spot cleaning & trim wash
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Carpet steam prep & sanitizing
                            </li>
                        </ul>
                        <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                            <span className="text-xs font-bold text-[#2C7A00] flex items-center gap-1.5 transition-colors group-hover:text-[#1F3612]">
                                Select Package
                            </span>
                            <div className="w-8 h-8 rounded-full bg-[#3FAD00]/10 flex items-center justify-center text-[#2C7A00] group-hover:bg-[#3FAD00] group-hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service 4 */}
                <div 
                    onClick={() => { handleServiceSelect('commercial'); scrollToBooking(); }}
                    className={`bg-white rounded-3xl overflow-hidden shadow-sm border-2 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer hover:shadow-md group ${data.service_type === 'commercial' ? 'border-[#3FAD00] bg-[#3FAD00]/5' : 'border-[#3FAD00]/15'}`}
                >
                    <div className="overflow-hidden h-52">
                        <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" 
                            alt="Commercial Clean" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="sparkle-heading text-2xl font-semibold text-[#1F3612] mb-3">Commercial Clean</h3>
                            <p className="text-[#3B5E2B] text-sm leading-relaxed mb-6">
                                Professional sanitization for office buildings, workspaces, and retail environments to maintain a clean workplace.
                            </p>
                        </div>
                        <ul className="space-y-3 text-sm text-[#3B5E2B] border-t border-slate-100 pt-6 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Desk & electronics disinfection
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Common area & lobby polishing
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Breakroom & restroom sanitizing
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#3FAD00]">•</span> Safe waste disposal & recycling
                            </li>
                        </ul>
                        <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                            <span className="text-xs font-bold text-[#2C7A00] flex items-center gap-1.5 transition-colors group-hover:text-[#1F3612]">
                                Select Package
                            </span>
                            <div className="w-8 h-8 rounded-full bg-[#3FAD00]/10 flex items-center justify-center text-[#2C7A00] group-hover:bg-[#3FAD00] group-hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}
