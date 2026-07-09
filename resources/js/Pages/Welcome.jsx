import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

// Modular components
import Hero from '@/Components/Welcome/Hero';
import Estimator from '@/Components/Welcome/Estimator';
import BeforeAfter from '@/Components/Welcome/BeforeAfter';
import WhoWeAre from '@/Components/Welcome/WhoWeAre';
import WhyChooseUs from '@/Components/Welcome/WhyChooseUs';
import HowItWorks from '@/Components/Welcome/HowItWorks';
import Services from '@/Components/Welcome/Services';
import Testimonials from '@/Components/Welcome/Testimonials';
import FaqSection from '@/Components/Welcome/FaqSection';

export default function Welcome({ auth, cleaners }) {
    // -------------------------------------------------------------
    // WIZARD / PRICING STATE & CONFIG
    // -------------------------------------------------------------
    const [step, setStep] = useState(1);

    // Initial pricing multipliers
    const PRICING = {
        services: {
            standard: { name: 'Standard Clean', base: 100 },
            deep: { name: 'Deep Clean', base: 180 },
            move_out: { name: 'Move-in/out Clean', base: 250 },
            commercial: { name: 'Commercial Office Clean', base: 350 },
        },
        bedroomFee: 25,
        bathroomFee: 35,
        addons: {
            oven: { name: 'Inside Oven', price: 35 },
            fridge: { name: 'Inside Fridge', price: 35 },
            windows: { name: 'Inside Windows', price: 50 },
            baseboards: { name: 'Deep Baseboards', price: 40 },
            cabinets: { name: 'Cabinet Interiors', price: 45 },
            pethair: { name: 'Pet Hair Detail', price: 40 },
        },
        frequencies: {
            one_time: { name: 'One-Time Clean', discount: 0 },
            weekly: { name: 'Weekly (20% Off)', discount: 0.20 },
            bi_weekly: { name: 'Bi-Weekly (15% Off)', discount: 0.15 },
            monthly: { name: 'Monthly (10% Off)', discount: 0.10 },
        }
    };

    // Inertia useForm setup
    const { data, setData, post, processing, errors } = useForm({
        customer_name: auth.user ? auth.user.name : '',
        customer_email: auth.user ? auth.user.email : '',
        customer_phone: '',
        service_type: 'standard',
        bedrooms: 1,
        bathrooms: 1,
        frequency: 'one_time',
        add_ons: [],
        total_price: 100,
        booking_date: '',
        booking_time: '09:00 AM',
        address: '',
        city: '',
        zip_code: '',
        special_instructions: '',
        cleaner_id: '',
    });

    // Helper to calculate total price
    const calculateTotal = (currentData) => {
        const base = PRICING.services[currentData.service_type].base;
        const bedFee = (currentData.bedrooms - 1) * PRICING.bedroomFee;
        const bathFee = (currentData.bathrooms - 1) * PRICING.bathroomFee;
        
        let addonTotal = 0;
        currentData.add_ons.forEach(addon => {
            if (PRICING.addons[addon]) {
                addonTotal += PRICING.addons[addon].price;
            }
        });

        const subtotal = base + bedFee + bathFee + addonTotal;
        const discountPercent = PRICING.frequencies[currentData.frequency].discount;
        const total = subtotal * (1 - discountPercent);
        
        return Math.round(total * 100) / 100;
    };

    // Recalculate price when variables change
    useEffect(() => {
        const calculated = calculateTotal(data);
        if (data.total_price !== calculated) {
            setData('total_price', calculated);
        }
    }, [data.service_type, data.bedrooms, data.bathrooms, data.frequency, data.add_ons]);

    const handleServiceSelect = (serviceKey) => {
        setData(prev => ({
            ...prev,
            service_type: serviceKey
        }));
    };

    const handleAddonToggle = (addonKey) => {
        setData(prev => {
            const hasAddon = prev.add_ons.includes(addonKey);
            const updated = hasAddon 
                ? prev.add_ons.filter(item => item !== addonKey)
                : [...prev.add_ons, addonKey];
            return {
                ...prev,
                add_ons: updated
            };
        });
    };

    const nextStep = () => {
        // Validation for step transitions
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            if (!data.booking_date || !data.booking_time) {
                alert("Please select a valid booking date and time slot.");
                return;
            }
            setStep(4);
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    const scrollToBooking = () => {
        const queryParams = new URLSearchParams({
            service_type: data.service_type,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            frequency: data.frequency
        }).toString();
        router.visit(`/book?${queryParams}`);
    };

    return (
        <>
            <Head>
                <title>MintyFresh Cleaning | Premium Home & Office Cleaning Services</title>
                <meta name="description" content="Book ultra-premium, vetted house and office cleaning in minutes. Real-time pricing wizard, premium cleaners, and glassmorphic user dashboard." />
            </Head>

            <div className="sparkle-body min-h-screen relative">
                {/* Background Blobs */}
                <div className="glow-blob glow-blob-1"></div>
                <div className="glow-blob glow-blob-2"></div>
                
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Hero Section */}
                <Hero scrollToBooking={scrollToBooking} />

                {/* Instant Price Estimator Card (Overlaps Hero slightly) */}
                <Estimator 
                    data={data}
                    setData={setData}
                    PRICING={PRICING}
                    handleServiceSelect={handleServiceSelect}
                    scrollToBooking={scrollToBooking}
                />

                {/* Who We Are Section */}
                <WhoWeAre scrollToBooking={scrollToBooking} />

                {/* Why Choose Us Section */}
                <WhyChooseUs />

                {/* How It Works Section */}
                <HowItWorks />

                {/* Services Catalog */}
                <Services 
                    data={data}
                    handleServiceSelect={handleServiceSelect}
                    scrollToBooking={scrollToBooking}
                />

                {/* Before & After Slider */}
                <BeforeAfter />

                {/* Reviews / Testimonials Section */}
                <Testimonials />

                {/* FAQ Section */}
                <FaqSection />

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
