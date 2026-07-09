import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const SERVICES = {
    standard: 'Standard Clean',
    deep: 'Deep Clean',
    move_out: 'Move-in/out Clean',
    commercial: 'Commercial Office Clean',
};

function ConfettiParticle({ style }) {
    return <div className="confetti-particle" style={style} />;
}

export default function BookingConfirmed({ booking }) {
    const { auth } = usePage().props;
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    const particles = Array.from({ length: 30 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
        backgroundColor: ['#3FAD00', '#7ed957', '#c8f5a0', '#1F3612', '#fff'][i % 5],
        width: `${6 + Math.random() * 8}px`,
        height: `${6 + Math.random() * 8}px`,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
    }));

    if (!booking) {
        return (
            <div className="sparkle-body min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-3xl p-10 max-w-sm text-center shadow-xl space-y-4">
                    <div className="text-5xl">🔍</div>
                    <h1 className="text-xl font-bold text-[#1F3612]">No Booking Found</h1>
                    <p className="text-sm text-[#839086]">We couldn't find your booking details.</p>
                    <Link href="/" className="btn-premium inline-block mt-2 text-sm">Back to Home</Link>
                </div>
            </div>
        );
    }

    const dateFormatted = booking.booking_date
        ? new Date(booking.booking_date).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })
        : '—';

    const serviceLabel = SERVICES[booking.service_type] || booking.service_type;

    return (
        <>
            <Head>
                <title>Booking Confirmed | MintyFresh Cleaning</title>
                <meta name="description" content="Your MintyFresh cleaning appointment is confirmed and scheduled." />
            </Head>

            <style>{`
                @keyframes confetti-fall {
                    0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .confetti-particle {
                    position: fixed;
                    top: -20px;
                    animation: confetti-fall linear forwards;
                    z-index: 999;
                    pointer-events: none;
                }
                @keyframes pop-in {
                    0%   { transform: scale(0.5); opacity: 0; }
                    70%  { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes checkmark-draw {
                    from { stroke-dashoffset: 60; }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes fade-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
                .pop-in   { animation: pop-in 0.6s cubic-bezier(.36,.07,.19,.97) both; }
                .fade-up  { animation: fade-up 0.5s ease forwards; }
                .fade-up-1 { animation-delay: 0.2s; opacity: 0; }
                .fade-up-2 { animation-delay: 0.35s; opacity: 0; }
                .fade-up-3 { animation-delay: 0.5s; opacity: 0; }
                .fade-up-4 { animation-delay: 0.65s; opacity: 0; }
                .checkmark-path {
                    stroke-dasharray: 60;
                    stroke-dashoffset: 60;
                    animation: checkmark-draw 0.5s ease 0.5s forwards;
                }
            `}</style>

            {/* Confetti */}
            {showConfetti && particles.map((style, i) => (
                <ConfettiParticle key={i} style={style} />
            ))}

            <div className="sparkle-body min-h-screen relative flex flex-col">
                <div className="glow-blob glow-blob-1" />
                <div className="glow-blob glow-blob-2" />

                <Navbar auth={auth} />

                <main className="flex-1 py-20 px-4 flex items-center justify-center">
                    <div className="w-full max-w-2xl space-y-6">

                        {/* Hero Card */}
                        <div className="bg-white rounded-3xl shadow-2xl shadow-[#3FAD00]/10 border border-[#3FAD00]/15 overflow-hidden">

                            {/* Top banner — flat solid green */}
                            <div className="bg-[#3FAD00] px-8 py-10 text-center">
                                {/* Animated checkmark */}
                                <div className="pop-in w-20 h-20 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center mx-auto mb-6">
                                    <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                                        <path className="checkmark-path" d="M10 26 L21 37 L40 16" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>

                                <h1 className="fade-up fade-up-1 text-3xl sm:text-4xl font-black text-white tracking-tight">
                                    Booking Confirmed
                                </h1>
                                <p className="fade-up fade-up-2 mt-2 text-white/80 text-sm max-w-md mx-auto">
                                    Thank you, <span className="font-bold text-white">{booking.customer_name}</span>. Your MintyFresh cleaning is officially scheduled and secure.
                                </p>
                            </div>

                            {/* Details Section */}
                            <div className="p-8 space-y-6 fade-up fade-up-3">

                                {/* Booking ID badge */}
                                <div className="flex items-center justify-center">
                                    <span className="inline-flex items-center gap-2 bg-[#3FAD00]/10 text-[#2C7A00] text-xs font-bold px-4 py-1.5 rounded-full border border-[#3FAD00]/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#3FAD00] animate-pulse inline-block" />
                                        Booking #{String(booking.id).padStart(5, '0')}
                                    </span>
                                </div>

                                {/* Grid of details */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: 'Service', value: serviceLabel },
                                        { label: 'Size', value: `${booking.bedrooms} Bed / ${booking.bathrooms} Bath` },
                                        { label: 'Date', value: dateFormatted },
                                        { label: 'Arrival', value: booking.booking_time },
                                        { label: 'Cleaner', value: booking.cleaner?.name || 'First Available', green: true },
                                        { label: 'Total Paid', value: `$${booking.total_price}`, bold: true },
                                        { label: 'Address', value: `${booking.address}, ${booking.city}`, span: true },
                                    ].map(({ label, value, green, bold, span }) => (
                                        <div key={label} className={`bg-[#FAF9F5] rounded-2xl p-4 border border-[#3FAD00]/10 ${span ? 'col-span-2 sm:col-span-3' : ''}`}>
                                            <span className="text-[10px] text-[#839086] font-bold uppercase tracking-widest block">
                                                {label}
                                            </span>
                                            <p className={`mt-1 text-sm ${bold ? 'text-xl font-black text-[#3FAD00]' : green ? 'font-bold text-[#3FAD00]' : 'font-semibold text-[#1F3612]'}`}>
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Email notice */}
                                <div className="bg-[#3FAD00]/5 border border-[#3FAD00]/15 rounded-2xl px-5 py-3.5">
                                    <p className="text-xs text-[#2C7A00] leading-relaxed">
                                        A confirmation email with full receipt details has been sent to{' '}
                                        <span className="font-bold">{booking.customer_email}</span>.
                                    </p>
                                </div>
                            </div>

                            {/* CTA Footer */}
                            <div className="fade-up fade-up-4 border-t border-[#3FAD00]/10 px-8 py-6 bg-[#FAF9F5] flex flex-col sm:flex-row gap-3">
                                <Link
                                    href="/book"
                                    className="btn-premium flex-1 text-center text-sm py-3"
                                >
                                    Book Another Session
                                </Link>
                                <Link
                                    href="/"
                                    className="flex-1 text-center px-6 py-3 rounded-xl bg-white border border-[#3FAD00]/25 text-[#2C7A00] hover:bg-[#3FAD00]/5 transition-colors text-sm font-semibold"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>

                        {/* Next Steps hint */}
                        <div className="text-center text-xs text-[#839086] fade-up fade-up-4">
                            Questions? Contact us at{' '}
                            <a href="mailto:hello@mintyfresh.com" className="text-[#3FAD00] font-semibold hover:underline">
                                hello@mintyfresh.com
                            </a>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
