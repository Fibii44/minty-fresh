import React from 'react';

export default function Estimator({ data, setData, PRICING, handleServiceSelect, scrollToBooking }) {
    return (
        <section className="relative z-10 -mt-10 max-w-7xl mx-auto px-6 mb-16">
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#3FAD00]/20 shadow-xl shadow-[#3FAD00]/5">
                <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
                    <div className="w-full lg:w-auto">
                        <span className="text-xs uppercase tracking-wider text-[#2C7A00] font-bold block mb-1">Instant Estimate</span>
                        <h3 className="text-xl font-bold text-[#1F3612]">Calculate Your Price</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:flex-1 max-w-4xl">
                        {/* Service Type */}
                        <div className="space-y-1 text-left">
                            <label className="text-[10px] uppercase tracking-wider text-[#2C7A00] font-bold block">Service Type</label>
                            <select 
                                value={data.service_type}
                                onChange={e => handleServiceSelect(e.target.value)}
                                className="w-full bg-[#EAF2E8]/20 border border-[#3FAD00]/15 rounded-xl px-3 py-2.5 text-[#1F3612] text-sm focus:outline-none focus:border-[#3FAD00]"
                            >
                                {Object.keys(PRICING.services).map(key => (
                                    <option key={key} value={key}>{PRICING.services[key].name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Bedrooms Counter */}
                        <div className="space-y-1 text-left">
                            <label className="text-[10px] uppercase tracking-wider text-[#2C7A00] font-bold block">Bedrooms</label>
                            <div className="flex items-center justify-between bg-[#EAF2E8]/20 border border-[#3FAD00]/15 rounded-xl px-2.5 py-1">
                                <button 
                                    type="button"
                                    onClick={() => setData('bedrooms', Math.max(1, data.bedrooms - 1))}
                                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[#1F3612] text-sm font-bold flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="text-sm font-bold text-[#1F3612] mx-2">{data.bedrooms} Bed</span>
                                <button 
                                    type="button"
                                    onClick={() => setData('bedrooms', Math.min(8, data.bedrooms + 1))}
                                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[#1F3612] text-sm font-bold flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Bathrooms Counter */}
                        <div className="space-y-1 text-left">
                            <label className="text-[10px] uppercase tracking-wider text-[#2C7A00] font-bold block">Bathrooms</label>
                            <div className="flex items-center justify-between bg-[#EAF2E8]/20 border border-[#3FAD00]/15 rounded-xl px-2.5 py-1">
                                <button 
                                    type="button"
                                    onClick={() => setData('bathrooms', Math.max(1, data.bathrooms - 1))}
                                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[#1F3612] text-sm font-bold flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="text-sm font-bold text-[#1F3612] mx-2">{data.bathrooms} Bath</span>
                                <button 
                                    type="button"
                                    onClick={() => setData('bathrooms', Math.min(6, data.bathrooms + 1))}
                                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[#1F3612] text-sm font-bold flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Frequency Select */}
                        <div className="space-y-1 text-left">
                            <label className="text-[10px] uppercase tracking-wider text-[#2C7A00] font-bold block">Frequency</label>
                            <select 
                                value={data.frequency}
                                onChange={e => setData('frequency', e.target.value)}
                                className="w-full bg-[#EAF2E8]/20 border border-[#3FAD00]/15 rounded-xl px-3 py-2.5 text-[#1F3612] text-sm focus:outline-none focus:border-[#3FAD00]"
                            >
                                {Object.keys(PRICING.frequencies).map(key => (
                                    <option key={key} value={key}>{PRICING.frequencies[key].name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 justify-between w-full lg:w-auto border-t lg:border-t-0 border-[#3FAD00]/10 pt-4 lg:pt-0">
                        <div className="text-left lg:text-right">
                            <span className="text-[10px] uppercase tracking-wider text-[#2C7A00] font-bold block">Estimated Price</span>
                            <span className="text-3xl font-black text-[#2C7A00] sparkle-heading">${data.total_price}</span>
                        </div>
                        <button 
                            type="button"
                            onClick={scrollToBooking}
                            className="px-6 py-3 rounded-xl bg-[#3FAD00] text-white hover:bg-[#2C7A00] transition-all text-sm font-bold shadow-md shadow-[#3FAD00]/15 flex items-center gap-2 whitespace-nowrap"
                        >
                            Book Now <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
