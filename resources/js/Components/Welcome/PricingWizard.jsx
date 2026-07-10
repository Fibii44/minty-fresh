import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const PHILIPPINE_LOCATIONS = [
    { city: 'Bacoor, Cavite', zip_code: '4102' },
    { city: 'Dasmariñas, Cavite', zip_code: '4102' },
    { city: 'Imus, Cavite', zip_code: '4103' },
    { city: 'General Trias, Cavite', zip_code: '4107' },
    { city: 'Silang, Cavite', zip_code: '4118' },
    { city: 'Tagaytay, Cavite', zip_code: '4120' },
    { city: 'Trece Martires, Cavite', zip_code: '4109' },
    { city: 'Kawit, Cavite', zip_code: '4104' },
    { city: 'Noveleta, Cavite', zip_code: '4105' },
    { city: 'Cavite City, Cavite', zip_code: '4100' },
    { city: 'Manila, Metro Manila', zip_code: '1000' },
    { city: 'Quezon City, Metro Manila', zip_code: '1100' },
    { city: 'Makati, Metro Manila', zip_code: '1200' },
    { city: 'Taguig, Metro Manila', zip_code: '1630' },
    { city: 'Pasig, Metro Manila', zip_code: '1600' },
    { city: 'Mandaluyong, Metro Manila', zip_code: '1550' },
    { city: 'Alabang, Muntinlupa', zip_code: '1780' },
    { city: 'Las Piñas, Metro Manila', zip_code: '1740' },
    { city: 'Cebu City, Cebu', zip_code: '6000' },
    { city: 'Davao City, Davao del Sur', zip_code: '8000' },
    { city: 'Baguio, Benguet', zip_code: '2600' },
    { city: 'Angeles City, Pampanga', zip_code: '2009' }
];

// Simple date extensions helper
const now = () => {
    const today = new Date();
    return {
        addDays(days) {
            const next = new Date(today);
            next.setDate(today.getDate() + days);
            return this.formatDate(next);
        },
        format(type) {
            return this.formatDate(today);
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    };
};

export default function PricingWizard({
    step,
    setStep,
    data,
    setData,
    PRICING,
    handleBookingSubmit,
    handleServiceSelect,
    handleAddonToggle,
    cleaners,
    processing,
    errors,
    prevStep,
    nextStep
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [showDropdown, setShowDropdown] = useState(false);
    const [cardholderName, setCardholderName] = useState('');
    const [country, setCountry] = useState('PH');
    const [cardError, setCardError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (step < 4) {
            nextStep();
            return;
        }

        if (!stripe || !elements) {
            handleBookingSubmit(e);
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
            handleBookingSubmit(e);
            return;
        }

        const { token, error } = await stripe.createToken(cardNumberElement, {
            name: cardholderName,
            address_country: country,
        });

        if (error) {
            setCardError(error.message);
            return;
        }

        setCardError('');
        handleBookingSubmit(e, token.id);
    };

    const filteredLocations = PHILIPPINE_LOCATIONS.filter(loc => 
        loc.city.toLowerCase().includes((data.city || '').toLowerCase()) ||
        loc.zip_code.includes(data.city || '')
    );

    const handleSelectLocation = (loc) => {
        setData(prev => ({
            ...prev,
            city: loc.city,
            zip_code: loc.zip_code
        }));
        setShowDropdown(false);
    };

    return (
        <section id="booking-wizard-section" className="py-24 bg-[#FAF9F5] border-b border-[#3FAD00]/10 w-full px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#2C7A00] font-extrabold justify-center">
                        Book Online
                    </div>
                    <h2 className="sparkle-heading text-4xl sm:text-5xl font-extrabold text-[#1F3612]">
                        Schedule Your Clean
                    </h2>
                    <p className="text-lg text-[#2C7A00] max-w-2xl mx-auto leading-relaxed">
                        Custom-tailor your appointment slot, input details, select a cleaner, and secure your booking instantly.
                    </p>
                </div>

                {/* Progress Stepper */}
                <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
                    <div className="flex flex-col items-center gap-2">
                        <div className={`step-dot ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                            {step > 1 ? '✓' : '1'}
                        </div>
                        <span className="text-xs text-[#2C7A00] font-semibold">Service</span>
                    </div>
                    <div className={`step-connector ${step > 1 ? 'active' : ''}`}></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className={`step-dot ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                            {step > 2 ? '✓' : '2'}
                        </div>
                        <span className="text-xs text-[#2C7A00] font-semibold">Add-ons</span>
                    </div>
                    <div className={`step-connector ${step > 2 ? 'active' : ''}`}></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className={`step-dot ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>
                            {step > 3 ? '✓' : '3'}
                        </div>
                        <span className="text-xs text-[#2C7A00] font-semibold">Schedule</span>
                    </div>
                    <div className={`step-connector ${step > 3 ? 'active' : ''}`}></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className={`step-dot ${step === 4 ? 'active' : ''}`}>
                            4
                        </div>
                        <span className="text-xs text-[#2C7A00] font-semibold">Confirm</span>
                    </div>
                </div>

                {/* Main Grid: Form + Sticky Sidebar */}
                <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-[#3FAD00]/15 shadow-sm min-h-[400px] flex flex-col justify-between">
                        {/* Step 1: Select Service & Rooms */}
                        {step === 1 && (
                            <div className="space-y-8 animate-fade-in">
                                <h3 className="sparkle-heading text-xl font-bold text-[#1F3612]">Select Service Package & Size</h3>
                                
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-[#3B5E2B] block">Cleaning Service Type</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {Object.keys(PRICING.services).map((key) => (
                                            <div 
                                                key={key}
                                                onClick={() => handleServiceSelect(key)}
                                                className={`wizard-radio-card ${data.service_type === key ? 'active' : ''}`}
                                            >
                                                <h4 className="font-bold text-sm text-[#1F3612] mb-1">{PRICING.services[key].name.split(' ')[0]}</h4>
                                                <p className="text-xs text-[#2C7A00]">${PRICING.services[key].base} base</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-[#3B5E2B] block">Bedrooms</label>
                                        <div className="flex items-center justify-between bg-[#EAF2E8]/20 border border-[#3FAD00]/15 rounded-2xl p-2.5">
                                            <button 
                                                type="button"
                                                onClick={() => setData('bedrooms', Math.max(1, data.bedrooms - 1))}
                                                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#1F3612] text-lg font-bold transition-all flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-extrabold text-[#1F3612]">{data.bedrooms}</span>
                                            <button 
                                                type="button"
                                                onClick={() => setData('bedrooms', Math.min(8, data.bedrooms + 1))}
                                                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#1F3612] text-lg font-bold transition-all flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-xs text-[#839086]">+$25 per bedroom above 1</span>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-[#3B5E2B] block">Bathrooms</label>
                                        <div className="flex items-center justify-between bg-[#EAF2E8]/20 border border-[#3FAD00]/15 rounded-2xl p-2.5">
                                            <button 
                                                type="button"
                                                onClick={() => setData('bathrooms', Math.max(1, data.bathrooms - 1))}
                                                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#1F3612] text-lg font-bold transition-all flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-extrabold text-[#1F3612]">{data.bathrooms}</span>
                                            <button 
                                                type="button"
                                                onClick={() => setData('bathrooms', Math.min(6, data.bathrooms + 1))}
                                                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#1F3612] text-lg font-bold transition-all flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-xs text-[#839086]">+$35 per bathroom above 1</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Addons & Frequency */}
                        {step === 2 && (
                            <div className="space-y-8 animate-fade-in">
                                <h3 className="sparkle-heading text-xl font-bold text-[#1F3612]">Add-on Extras & Frequency Discount</h3>

                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-[#3B5E2B] block">Choose Add-on Services</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {Object.keys(PRICING.addons).map((key) => (
                                            <div 
                                                key={key}
                                                onClick={() => handleAddonToggle(key)}
                                                className={`addon-card ${data.add_ons.includes(key) ? 'active' : ''}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="checkbox-glow">
                                                        {data.add_ons.includes(key) && <span className="text-[10px] text-white">✓</span>}
                                                    </div>
                                                    <span className="text-sm font-semibold text-[#1F3612]">{PRICING.addons[key].name}</span>
                                                </div>
                                                <span className="text-xs text-[#2C7A00] font-bold">+${PRICING.addons[key].price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-[#3B5E2B] block">Frequency (Discount Savings)</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {Object.keys(PRICING.frequencies).map((key) => (
                                            <div 
                                                key={key}
                                                onClick={() => setData('frequency', key)}
                                                className={`wizard-radio-card ${data.frequency === key ? 'active' : ''}`}
                                            >
                                                <h4 className="font-bold text-xs text-[#1F3612] mb-0.5">{PRICING.frequencies[key].name}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Date, Time & Cleaner Preference */}
                        {step === 3 && (
                            <div className="space-y-8 animate-fade-in">
                                <h3 className="sparkle-heading text-xl font-bold text-[#1F3612]">Select Appointment Schedule</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-[#3B5E2B] block">Preferred Date</label>
                                        <input 
                                            type="date" 
                                            value={data.booking_date}
                                            onChange={e => setData('booking_date', e.target.value)}
                                            min={now().addDays(1)}
                                            className="w-full bg-white border border-[#3FAD00]/25 rounded-2xl p-4 text-[#1F3612] focus:outline-none focus:border-[#3FAD00] transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-[#3B5E2B] block">Available Time Slots</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
                                                <div 
                                                    key={time}
                                                    onClick={() => setData('booking_time', time)}
                                                    className={`calendar-time-pill ${data.booking_time === time ? 'active' : ''}`}
                                                >
                                                    {time}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-[#3B5E2B] block">Cleaner Preference (Optional)</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                        <div 
                                            onClick={() => setData('cleaner_id', '')}
                                            className={`wizard-radio-card flex flex-col items-center justify-center min-h-[120px] ${data.cleaner_id === '' ? 'active' : ''}`}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[#3FAD00]/10 flex items-center justify-center text-[#2C7A00] mb-2">
                                                ⚡
                                            </div>
                                            <span className="font-bold text-xs text-[#1F3612]">First Available</span>
                                            <span className="text-[10px] text-[#839086]">Fastest assignment</span>
                                        </div>

                                        {cleaners && cleaners.map((cleaner) => (
                                            <div 
                                                key={cleaner.id}
                                                onClick={() => setData('cleaner_id', cleaner.id)}
                                                className={`wizard-radio-card flex flex-col items-center text-center p-3 cursor-pointer ${data.cleaner_id === cleaner.id ? 'active' : ''}`}
                                            >
                                                <img 
                                                    src={cleaner.avatar_url} 
                                                    alt={cleaner.name} 
                                                    className="w-10 h-10 rounded-full object-cover mb-2 border border-[#3FAD00]/15"
                                                />
                                                <span className="font-bold text-xs text-[#1F3612] block truncate w-full">{cleaner.name.split(' ')[0]}</span>
                                                <span className="text-[10px] text-amber-500">★ {cleaner.rating}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Contact details & billing simulation */}
                        {step === 4 && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="sparkle-heading text-xl font-bold text-[#1F3612]">Contact & Billing Confirmation</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-[#2C7A00] font-semibold block">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={data.customer_name} 
                                            onChange={e => setData('customer_name', e.target.value)} 
                                            placeholder="John Doe"
                                            required
                                            className="w-full bg-white border border-[#3FAD00]/25 rounded-xl p-3 text-[#1F3612] focus:outline-none focus:border-[#3FAD00] text-sm"
                                        />
                                        {errors.customer_name && <span className="text-xs text-red-400">{errors.customer_name}</span>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-[#2C7A00] font-semibold block">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={data.customer_email} 
                                            onChange={e => setData('customer_email', e.target.value)} 
                                            placeholder="johndoe@example.com"
                                            required
                                            className="w-full bg-white border border-[#3FAD00]/25 rounded-xl p-3 text-[#1F3612] focus:outline-none focus:border-[#3FAD00] text-sm"
                                        />
                                        {errors.customer_email && <span className="text-xs text-red-400">{errors.customer_email}</span>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-[#2C7A00] font-semibold block">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            value={data.customer_phone} 
                                            onChange={e => setData('customer_phone', e.target.value)} 
                                            placeholder="(555) 000-0000"
                                            className="w-full bg-white border border-[#3FAD00]/25 rounded-xl p-3 text-[#1F3612] focus:outline-none focus:border-[#3FAD00] text-sm"
                                        />
                                        {errors.customer_phone && <span className="text-xs text-red-400">{errors.customer_phone}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                                    <div className="sm:col-span-3 space-y-2">
                                        <label className="text-xs text-[#2C7A00] font-semibold block">Address</label>
                                        <input 
                                            type="text" 
                                            value={data.address} 
                                            onChange={e => setData('address', e.target.value)} 
                                            placeholder="123 Main St"
                                            required
                                            className="w-full bg-white border border-[#3FAD00]/25 rounded-xl p-3 text-[#1F3612] focus:outline-none focus:border-[#3FAD00] text-sm"
                                        />
                                        {errors.address && <span className="text-xs text-red-400">{errors.address}</span>}
                                    </div>
                                    <div className="sm:col-span-2 space-y-2 relative">
                                        <label className="text-xs text-[#2C7A00] font-semibold block">City / Province</label>
                                        <input 
                                            type="text" 
                                            value={data.city} 
                                            onChange={e => {
                                                setData('city', e.target.value);
                                                setShowDropdown(true);
                                            }} 
                                            onFocus={() => setShowDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                            placeholder="Dasmariñas, Cavite"
                                            required
                                            className="w-full bg-white border border-[#3FAD00]/25 rounded-xl p-3 text-[#1F3612] focus:outline-none focus:border-[#3FAD00] text-sm"
                                        />
                                        {showDropdown && filteredLocations.length > 0 && (
                                            <div className="absolute top-[100%] left-0 right-0 z-50 mt-1 max-h-52 overflow-y-auto bg-white/95 backdrop-blur-md border border-[#3FAD00]/25 rounded-xl shadow-lg shadow-[#3FAD00]/10 overflow-hidden divide-y divide-[#3FAD00]/10">
                                                {filteredLocations.map((loc, idx) => (
                                                    <div 
                                                        key={idx}
                                                        onMouseDown={() => handleSelectLocation(loc)}
                                                        className="px-4 py-2.5 text-xs text-[#1F3612] hover:bg-[#3FAD00] hover:text-white cursor-pointer transition-colors duration-150 flex justify-between items-center"
                                                    >
                                                        <span className="font-semibold">{loc.city}</span>
                                                        <span className="opacity-80 text-[10px] font-bold bg-[#3FAD00]/10 px-2 py-0.5 rounded-full">{loc.zip_code}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="sm:col-span-1 space-y-2">
                                        <label className="text-xs text-[#2C7A00] font-semibold block">Zip Code</label>
                                        <input 
                                            type="text" 
                                            value={data.zip_code} 
                                            onChange={e => setData('zip_code', e.target.value)} 
                                            placeholder="4102"
                                            required
                                            className="w-full bg-white border border-[#3FAD00]/25 rounded-xl p-3 text-[#1F3612] focus:outline-none focus:border-[#3FAD00] text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-[#2C7A00] font-semibold block">Special Instructions / Entry Info</label>
                                    <textarea 
                                        rows="2"
                                        value={data.special_instructions}
                                        onChange={e => setData('special_instructions', e.target.value)}
                                        placeholder="Key is under the flowerpot. Dog is inside..."
                                        className="w-full bg-white border border-[#3FAD00]/25 rounded-xl p-3 text-[#1F3612] focus:outline-none focus:border-[#3FAD00] text-sm"
                                    ></textarea>
                                </div>

                                {/* Stripe Payment Method */}
                                <div className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.5"/><path d="M2 10h20" strokeWidth="1.5"/></svg>
                                        <span className="text-sm font-semibold text-slate-700">Card</span>
                                    </div>

                                    <div className="p-4 space-y-3 bg-white">
                                        {/* Card Number */}
                                        <div>
                                            <label className="text-xs font-medium text-slate-500 block mb-1">Card information</label>
                                            <div className="border border-slate-300 rounded-t-lg px-3 py-2.5 focus-within:border-[#3FAD00] focus-within:ring-1 focus-within:ring-[#3FAD00] transition-all">
                                                <CardNumberElement
                                                    options={{ style: { base: { fontSize: '14px', color: '#1F3612', '::placeholder': { color: '#9ca3af' } }, invalid: { color: '#ef4444' } }, showIcon: true }}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="border border-t-0 border-r-0 border-slate-300 rounded-bl-lg px-3 py-2.5 focus-within:border-[#3FAD00] focus-within:ring-1 focus-within:ring-[#3FAD00] transition-all">
                                                    <CardExpiryElement
                                                        options={{ style: { base: { fontSize: '14px', color: '#1F3612', '::placeholder': { color: '#9ca3af' } }, invalid: { color: '#ef4444' } } }}
                                                    />
                                                </div>
                                                <div className="border border-t-0 border-slate-300 rounded-br-lg px-3 py-2.5 focus-within:border-[#3FAD00] focus-within:ring-1 focus-within:ring-[#3FAD00] transition-all">
                                                    <CardCvcElement
                                                        options={{ style: { base: { fontSize: '14px', color: '#1F3612', '::placeholder': { color: '#9ca3af' } }, invalid: { color: '#ef4444' } } }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Cardholder Name */}
                                        <div>
                                            <label className="text-xs font-medium text-slate-500 block mb-1">Cardholder name</label>
                                            <input
                                                type="text"
                                                value={cardholderName}
                                                onChange={e => setCardholderName(e.target.value)}
                                                placeholder="Full name on card"
                                                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-[#1F3612] placeholder-slate-400 focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00] transition-all"
                                            />
                                        </div>

                                        {/* Country */}
                                        <div>
                                            <label className="text-xs font-medium text-slate-500 block mb-1">Country or region</label>
                                            <select
                                                value={country}
                                                onChange={e => setCountry(e.target.value)}
                                                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-[#1F3612] focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00] transition-all bg-white"
                                            >
                                                <option value="PH">Philippines</option>
                                                <option value="US">United States</option>
                                                <option value="AU">Australia</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="CA">Canada</option>
                                                <option value="SG">Singapore</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {(cardError || errors.stripe_token) && (
                                    <p className="text-xs text-red-500 font-semibold">{cardError || errors.stripe_token}</p>
                                )}
                                <p className="text-[10px] text-[#839086]">Payments are encrypted and processed securely via Stripe.</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
                            {step > 1 ? (
                                <button 
                                    type="button" 
                                    onClick={prevStep}
                                    className="px-6 py-2.5 rounded-xl bg-white border border-[#3FAD00]/30 text-[#2C7A00] hover:bg-[#3FAD00]/5 hover:text-[#1F3612] transition-colors text-sm font-semibold"
                                >
                                    Back
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step < 4 ? (
                                <button 
                                    type="button" 
                                    onClick={nextStep}
                                    className="px-6 py-2.5 rounded-xl bg-[#3FAD00] text-white hover:bg-[#2C7A00] transition-colors text-sm font-bold shadow-md shadow-[#3FAD00]/10"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="btn-premium"
                                >
                                    {processing ? 'Booking...' : 'Book Cleaning Session'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Sticky Summary Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-[#3FAD00]/15 shadow-sm sticky top-24">
                            <h3 className="sparkle-heading text-lg font-bold text-[#1F3612] mb-6 border-b border-slate-100 pb-3">Booking Summary</h3>
                            
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[#2C7A00] block text-xs font-semibold">Service Selected</span>
                                        <span className="font-semibold text-[#1F3612]">{PRICING.services[data.service_type].name}</span>
                                    </div>
                                    <span className="font-bold text-[#1F3612]">${PRICING.services[data.service_type].base}</span>
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[#2C7A00] block text-xs font-semibold">Property Layout</span>
                                        <span className="text-[#1F3612] text-xs font-medium">{data.bedrooms} Bed / {data.bathrooms} Bath</span>
                                    </div>
                                    <span className="font-semibold text-[#3B5E2B]">
                                        +${((data.bedrooms - 1) * PRICING.bedroomFee) + ((data.bathrooms - 1) * PRICING.bathroomFee)}
                                    </span>
                                </div>

                                {data.add_ons.length > 0 && (
                                    <div className="space-y-1.5 border-t border-slate-100 pt-3">
                                        <span className="text-[#2C7A00] block text-xs font-semibold">Add-on Extras</span>
                                        {data.add_ons.map((addonKey) => (
                                            <div key={addonKey} className="flex justify-between text-xs text-[#3B5E2B]">
                                                <span>+ {PRICING.addons[addonKey].name}</span>
                                                <span>${PRICING.addons[addonKey].price}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                                    <div>
                                        <span className="text-[#2C7A00] block text-xs font-semibold">Frequency Discount</span>
                                        <span className="text-emerald-700 text-xs font-medium">{PRICING.frequencies[data.frequency].name}</span>
                                    </div>
                                    <span className="font-bold text-emerald-700">
                                        -{PRICING.frequencies[data.frequency].discount * 100}%
                                    </span>
                                </div>

                                {data.booking_date && (
                                    <div className="border-t border-slate-100 pt-3 space-y-1 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-[#2C7A00] font-semibold">Date:</span>
                                            <span className="text-[#1F3612] font-semibold">{data.booking_date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#2C7A00] font-semibold">Arrival Window:</span>
                                            <span className="text-[#1F3612] font-semibold">{data.booking_time}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t-2 border-dashed border-slate-200 pt-4 flex justify-between items-end">
                                    <div>
                                        <span className="text-[#2C7A00] text-xs block font-semibold">Estimated Duration</span>
                                        <span className="text-[#3B5E2B] font-semibold text-xs">
                                            ~{3 + (data.bedrooms * 0.5) + (data.bathrooms * 0.5) + (data.add_ons.length * 0.25)} hours
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[#2C7A00] text-xs block font-semibold">Total Price</span>
                                        <span className="text-3xl font-black text-[#2C7A00] sparkle-heading">${data.total_price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
