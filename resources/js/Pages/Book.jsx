import React, { useState, useEffect, useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import PricingWizard from '@/Components/Welcome/PricingWizard';

export default function Book({ auth, cleaners, stripeKey }) {
    // Read query parameters to prepopulate estimator selections if they came from the homepage
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const initialService = params?.get('service_type') || 'standard';
    const initialBedrooms = parseInt(params?.get('bedrooms')) || 1;
    const initialBathrooms = parseInt(params?.get('bathrooms')) || 1;
    const initialFrequency = params?.get('frequency') || 'one_time';

    const [step, setStep] = useState(1);

    const stripePromise = useMemo(() => {
        return stripeKey ? loadStripe(stripeKey) : null;
    }, [stripeKey]);

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

    const { data, setData, post, processing, errors, transform } = useForm({
        customer_name: auth.user ? auth.user.name : '',
        customer_email: auth.user ? auth.user.email : '',
        customer_phone: '',
        service_type: initialService,
        bedrooms: initialBedrooms,
        bathrooms: initialBathrooms,
        frequency: initialFrequency,
        add_ons: [],
        total_price: 100,
        booking_date: '',
        booking_time: '09:00 AM',
        address: '',
        city: '',
        zip_code: '',
        special_instructions: '',
        cleaner_id: '',
        stripe_token: '',
    });

    const addonsSerialized = JSON.stringify(data.add_ons);

    // Recalculate total price when selections change
    useEffect(() => {
        let base = PRICING.services[data.service_type].base;
        let sizeFee = ((data.bedrooms - 1) * PRICING.bedroomFee) + ((data.bathrooms - 1) * PRICING.bathroomFee);
        
        let addonFee = data.add_ons.reduce((sum, addonKey) => {
            return sum + (PRICING.addons[addonKey]?.price || 0);
        }, 0);

        let subtotal = base + sizeFee + addonFee;
        let discountPercent = PRICING.frequencies[data.frequency].discount;
        let finalPrice = Math.round(subtotal * (1 - discountPercent));

        if (data.total_price !== finalPrice) {
            setData('total_price', finalPrice);
        }
    }, [data.service_type, data.bedrooms, data.bathrooms, data.frequency, addonsSerialized]);

    const handleServiceSelect = (serviceKey) => {
        setData('service_type', serviceKey);
    };

    const handleAddonToggle = (addonKey) => {
        if (data.add_ons.includes(addonKey)) {
            setData('add_ons', data.add_ons.filter(item => item !== addonKey));
        } else {
            setData('add_ons', [...data.add_ons, addonKey]);
        }
    };

    const nextStep = () => {
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

    const handleBookingSubmit = (e, stripeToken = null) => {
        e.preventDefault();
        if (stripeToken) {
            transform((prevData) => ({
                ...prevData,
                stripe_token: stripeToken
            }));
        }
        post(route('bookings.store'));
    };

    return (
        <>
            <Head>
                <title>Book Online | MintyFresh Cleaning</title>
                <meta name="description" content="Book ultra-premium, vetted house and office cleaning in minutes using our real-time pricing wizard." />
            </Head>

            <div className="sparkle-body min-h-screen relative flex flex-col justify-between">
                {/* Background Blobs */}
                <div className="glow-blob glow-blob-1"></div>
                <div className="glow-blob glow-blob-2"></div>
                
                <div>
                    {/* Navbar */}
                    <Navbar auth={auth} />

                    {/* Booking Wizard Section */}
                    <div className="pt-16 pb-12 relative z-10">
                        {stripePromise ? (
                            <Elements stripe={stripePromise}>
                                <PricingWizard 
                                    step={step}
                                    setStep={setStep}
                                    data={data}
                                    setData={setData}
                                    PRICING={PRICING}
                                    handleBookingSubmit={handleBookingSubmit}
                                    handleServiceSelect={handleServiceSelect}
                                    handleAddonToggle={handleAddonToggle}
                                    cleaners={cleaners}
                                    processing={processing}
                                    errors={errors}
                                    prevStep={prevStep}
                                    nextStep={nextStep}
                                />
                            </Elements>
                        ) : (
                            <PricingWizard 
                                step={step}
                                setStep={setStep}
                                data={data}
                                setData={setData}
                                PRICING={PRICING}
                                handleBookingSubmit={handleBookingSubmit}
                                handleServiceSelect={handleServiceSelect}
                                handleAddonToggle={handleAddonToggle}
                                cleaners={cleaners}
                                processing={processing}
                                errors={errors}
                                prevStep={prevStep}
                                nextStep={nextStep}
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
