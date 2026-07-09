import React, { useState } from 'react';

export default function FaqSection() {
    const [activeFaq, setActiveFaq] = useState(null);
    const faqs = [
        {
            q: "What is included in a standard cleaning?",
            a: "Standard cleaning includes dusting surfaces, vacuuming carpets/rugs, sweeping and mopping hard floors, cleaning bathrooms (sinks, mirrors, toilets, showers), and cleaning the kitchen exterior (wiping counters, appliance faces, sink area)."
        },
        {
            q: "Are the cleaning professionals background-checked?",
            a: "Absolutely. All cleaners at MintyFresh Cleaning undergo a rigorous multi-step vetting process, including personal interviews, professional reference checks, and a comprehensive nationwide criminal background check."
        },
        {
            q: "What is your rescheduling or cancellation policy?",
            a: "We understand plans change. You can reschedule or cancel any booking free of charge up to 24 hours before your scheduled appointment. Cancellations within 24 hours are subject to a $50 late fee."
        },
        {
            q: "Do I need to be home for the cleaning?",
            a: "No, you do not. Many of our clients provide a key lockbox code or leave a key in a designated location. You can specify these entry details in the 'Special Instructions' section of the booking flow."
        },
        {
            q: "Do you supply your own cleaning products?",
            a: "Yes, our cleaners come fully equipped with premium cleaning supplies, microfiber cloths, and vacuums. If you select Aisha or request eco-friendly products, we will use 100% biodegradable and natural formulations."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-[#FAF9F5] border-b border-[#3FAD00]/10 w-full px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#2C7A00] font-extrabold justify-center">
                        FAQ
                    </div>
                    <h2 className="sparkle-heading text-3xl font-extrabold text-[#1F3612]">Frequently Asked Questions</h2>
                    <p className="text-[#2C7A00]">Everything you need to know about our premium cleaning service.</p>
                </div>

                <div className="space-y-4 mt-8">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                            className="bg-white border border-[#3FAD00]/15 rounded-2xl p-6 cursor-pointer hover:border-[#3FAD00]/30 transition-all duration-300"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-[#1F3612] text-sm sm:text-base">{faq.q}</h3>
                                <span className="text-[#3FAD00] font-bold text-lg">{activeFaq === index ? '−' : '+'}</span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-[#2C7A00] text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
