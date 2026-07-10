import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ auth, role, bookings, cleaners, stats, cleaner, jobs }) {
    // -------------------------------------------------------------
    // COMMON NOTIFICATION STATE
    // -------------------------------------------------------------
    const [successMessage, setSuccessMessage] = useState('');

    const showNotification = (msg) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    // -------------------------------------------------------------
    // CLIENT ACTIONS
    // -------------------------------------------------------------
    const handleCancelBooking = (bookingId) => {
        if (confirm("Are you sure you want to cancel this booking?")) {
            router.patch(route('bookings.status', bookingId), {
                status: 'cancelled'
            }, {
                onSuccess: () => showNotification('Booking cancelled successfully.')
            });
        }
    };

    // -------------------------------------------------------------
    // CLEANER PORTAL STATE & ACTIONS
    // -------------------------------------------------------------
    const [selectedJob, setSelectedJob] = useState(null);
    const [checklist, setChecklist] = useState({
        dust: false,
        vacuum: false,
        mopping: false,
        sanitized: false,
        trash: false,
        kitchen: false
    });

    const handleSelectJob = (job) => {
        setSelectedJob(job);
        // Reset checklist when selecting new job
        setChecklist({
            dust: job.status === 'completed',
            vacuum: job.status === 'completed',
            mopping: job.status === 'completed',
            sanitized: job.status === 'completed',
            trash: job.status === 'completed',
            kitchen: job.status === 'completed'
        });
    };

    const handleChecklistToggle = (key) => {
        setChecklist(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleCompleteJob = (jobId) => {
        const allDone = Object.values(checklist).every(val => val === true);
        if (!allDone) {
            alert("Please complete all cleaning checklist items first!");
            return;
        }

        router.patch(route('bookings.status', jobId), {
            status: 'completed'
        }, {
            onSuccess: () => {
                showNotification('Job completed successfully!');
                setSelectedJob(null);
            }
        });
    };

    // -------------------------------------------------------------
    // ADMIN PORTAL ACTIONS
    // -------------------------------------------------------------
    const handleAssignCleaner = (bookingId, cleanerId) => {
        router.patch(route('bookings.assign', bookingId), {
            cleaner_id: cleanerId
        }, {
            onSuccess: () => showNotification('Cleaner assigned successfully.')
        });
    };

    const handleUpdateStatus = (bookingId, status) => {
        router.patch(route('bookings.status', bookingId), {
            status: status
        }, {
            onSuccess: () => showNotification('Booking status updated successfully.')
        });
    };

    const handleDeleteBooking = (bookingId) => {
        if (confirm("Are you sure you want to permanently delete this booking?")) {
            router.delete(route('bookings.destroy', bookingId), {
                onSuccess: () => showNotification('Booking deleted from records.')
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center bg-[#EAF2E8]/70 backdrop-blur-md p-6 rounded-2xl border border-[#3FAD00]/15 shadow-sm">
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-[#1F3612] sparkle-heading">
                            MintyFresh Admin Portal
                        </h2>
                        <p className="text-xs text-[#728F63] mt-1">
                            Logged in as: <span className="text-[#3FAD00] font-bold">{auth.user.name}</span> ({role.toUpperCase()})
                        </p>
                    </div>
                    {role === 'client' && (
                        <Link href="/" className="px-5 py-2.5 rounded-xl bg-[#3FAD00] hover:bg-[#2C7A00] text-white font-bold transition-all text-xs shadow-lg shadow-[#3FAD00]/10">
                            + Book New Clean
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Portal Dashboard" />

            <div className="sparkle-body min-h-screen py-10 px-4 md:px-8 text-[#1F3612] relative">
                {/* Background Glow Blobs */}
                <div className="glow-blob glow-blob-1 !opacity-10"></div>
                
                {/* Success Notification Alert */}
                {successMessage && (
                    <div className="max-w-7xl mx-auto mb-6 p-4 rounded-xl bg-[#3FAD00]/10 border border-[#3FAD00]/20 text-[#2C7A00] text-sm font-semibold flex items-center justify-between animate-slide-up">
                        <span>✨ {successMessage}</span>
                        <button onClick={() => setSuccessMessage('')} className="text-[#2C7A00] hover:text-[#1F3612]">✕</button>
                    </div>
                )}

                <div className="max-w-7xl mx-auto space-y-10">

                    {/* ========================================================= */}
                    {/* 1. ADMIN DASHBOARD                                        */}
                    {/* ========================================================= */}
                    {role === 'admin' && (
                        <div className="space-y-10">
                            {/* Stats Ribbon */}
                            {stats && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="glass-card p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#3FAD00]/5 rounded-full filter blur-lg"></div>
                                        <span className="text-[#728F63] text-xs block">Total Revenue</span>
                                        <span className="text-2xl font-black text-[#1F3612] sparkle-heading">${stats.totalRevenue}</span>
                                    </div>
                                    <div className="glass-card p-6">
                                        <span className="text-[#728F63] text-xs block">Completed Cleans</span>
                                        <span className="text-2xl font-black text-[#2C7A00] sparkle-heading">{stats.completedCount}</span>
                                    </div>
                                    <div className="glass-card p-6">
                                        <span className="text-[#728F63] text-xs block">Pending Assignment</span>
                                        <span className="text-2xl font-black text-amber-600 sparkle-heading">{stats.pendingCount}</span>
                                    </div>
                                    <div className="glass-card p-6">
                                        <span className="text-[#728F63] text-xs block">Active Bookings</span>
                                        <span className="text-2xl font-black text-[#3FAD00] sparkle-heading">{stats.activeCount}</span>
                                    </div>
                                </div>
                            )}

                            {/* Bookings Manager Table */}
                            <div className="glass-card p-8">
                                <h3 className="sparkle-heading text-lg font-bold text-[#1F3612] mb-6 border-b border-[#3FAD00]/10 pb-3">All Customer Bookings</h3>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-sm">
                                        <thead>
                                            <tr className="border-b border-[#3FAD00]/10 text-[#728F63] text-xs font-semibold uppercase tracking-wider">
                                                <th className="py-4 px-3">Client</th>
                                                <th className="py-4 px-3">Service</th>
                                                <th className="py-4 px-3">Schedule</th>
                                                <th className="py-4 px-3">Address</th>
                                                <th className="py-4 px-3">Price</th>
                                                <th className="py-4 px-3">Assigned Cleaner</th>
                                                <th className="py-4 px-3">Status</th>
                                                <th className="py-4 px-3 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#3FAD00]/5 text-[#1F3612]">
                                            {bookings && bookings.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-[#EAF2E8]/20 transition-colors">
                                                    <td className="py-4 px-3 font-semibold text-[#1F3612]">
                                                        {booking.customer_name}
                                                        <span className="block text-[10px] text-[#728F63] font-normal">{booking.customer_email}</span>
                                                    </td>
                                                    <td className="py-4 px-3 capitalize">
                                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#3FAD00]/10 text-[#2C7A00] border border-[#3FAD00]/20">
                                                            {booking.service_type}
                                                        </span>
                                                        <span className="block text-[10px] text-[#728F63] mt-1">{booking.bedrooms} bed, {booking.bathrooms} bath</span>
                                                    </td>
                                                    <td className="py-4 px-3">
                                                        {new Date(booking.booking_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                        <span className="block text-[10px] text-[#728F63] mt-0.5">{booking.booking_time}</span>
                                                    </td>
                                                    <td className="py-4 px-3 max-w-[150px] truncate text-[#3B5E2B]" title={booking.address}>
                                                        {booking.address}
                                                    </td>
                                                    <td className="py-4 px-3 font-bold text-[#1F3612]">${booking.total_price}</td>
                                                    <td className="py-4 px-3">
                                                        <select 
                                                            value={booking.cleaner_id || ''}
                                                            onChange={(e) => handleAssignCleaner(booking.id, e.target.value)}
                                                            className="bg-white border border-[#3FAD00]/15 rounded-xl py-2 pl-3 pr-8 text-xs text-[#1F3612] focus:outline-none focus:border-[#3FAD00] w-full max-w-[165px] cursor-pointer shadow-sm"
                                                        >
                                                            <option value="">Unassigned</option>
                                                            {cleaners && cleaners.map((c) => (
                                                                <option key={c.id} value={c.id}>{c.name}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="py-4 px-3">
                                                        <select 
                                                            value={booking.status}
                                                            onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                                                            className={`border rounded-xl py-2 pl-3 pr-8 text-xs font-semibold focus:outline-none w-full max-w-[130px] cursor-pointer shadow-sm ${
                                                                booking.status === 'completed' ? 'bg-green-500/10 text-green-700 border-green-500/20' :
                                                                booking.status === 'assigned' ? 'bg-[#3FAD00]/10 text-[#2C7A00] border-[#3FAD00]/20' :
                                                                booking.status === 'cancelled' ? 'bg-red-500/10 text-red-700 border-red-500/20' :
                                                                'bg-amber-500/10 text-amber-700 border-amber-500/20'
                                                            }`}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="assigned">Assigned</option>
                                                            <option value="completed">Completed</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </td>
                                                    <td className="py-4 px-3 text-right">
                                                        <button 
                                                            onClick={() => handleDeleteBooking(booking.id)}
                                                            className="text-red-600 hover:text-red-500 font-semibold text-xs bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/15 transition-all cursor-pointer"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {(!bookings || bookings.length === 0) && (
                                                <tr>
                                                    <td colSpan="8" className="py-12 text-center text-[#728F63]">No bookings available in the database.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* 2. CLEANER PORTAL                                         */}
                    {/* ========================================================= */}
                    {role === 'cleaner' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Cleaner Bio & Jobs List */}
                            <div className="lg:col-span-7 space-y-8">
                                {cleaner && (
                                    <div className="glass-card p-6 flex flex-col sm:flex-row gap-6 items-center">
                                        <img 
                                            src={cleaner.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'} 
                                            alt={cleaner.name} 
                                            className="w-20 h-20 rounded-full object-cover border-2 border-[#3FAD00]/30"
                                        />
                                        <div className="text-center sm:text-left space-y-2">
                                            <h3 className="sparkle-heading text-xl font-bold text-[#1F3612]">{cleaner.name}</h3>
                                            <div className="flex justify-center sm:justify-start gap-4 text-xs">
                                                <span className="text-yellow-500 font-bold">★ {cleaner.rating} Rating</span>
                                                <span className="text-[#728F63]">|</span>
                                                <span className="text-[#3FAD00] font-bold">{cleaner.status.toUpperCase()}</span>
                                            </div>
                                            <p className="text-[#728F63] text-xs max-w-md italic">"{cleaner.bio}"</p>
                                        </div>
                                    </div>
                                )}

                                <div className="glass-card p-6">
                                    <h3 className="sparkle-heading text-lg font-bold text-[#1F3612] mb-6 border-b border-[#3FAD00]/10 pb-3">Your Assigned Cleaning Jobs</h3>
                                    
                                    <div className="space-y-4">
                                        {jobs && jobs.map((job) => (
                                            <div 
                                                key={job.id} 
                                                onClick={() => handleSelectJob(job)}
                                                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                                                    selectedJob?.id === job.id 
                                                        ? 'bg-[#3FAD00]/10 border-[#3FAD00]/50 shadow-md shadow-[#3FAD00]/5' 
                                                        : 'bg-white/70 border-[#3FAD00]/10 hover:border-[#3FAD00]/30'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <h4 className="font-bold text-[#1F3612] text-base">{job.customer_name}</h4>
                                                        <p className="text-xs text-[#728F63] mt-1">{job.address}, {job.city}</p>
                                                    </div>
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        job.status === 'completed' ? 'bg-green-500/10 text-green-700 border border-green-500/20' : 'bg-[#3FAD00]/10 text-[#2C7A00] border border-[#3FAD00]/20'
                                                    }`}>
                                                        {job.status}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center mt-6 text-xs text-[#728F63] border-t border-[#3FAD00]/5 pt-3">
                                                    <span>📅 {new Date(job.booking_date).toLocaleDateString()}</span>
                                                    <span>⏰ {job.booking_time}</span>
                                                    <span className="font-bold text-[#1F3612]">${job.total_price}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {(!jobs || jobs.length === 0) && (
                                            <p className="text-[#728F63] text-center py-10">You have no cleaning jobs scheduled currently.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Job Execution & Checklist Side panel */}
                            <div className="lg:col-span-5">
                                {selectedJob ? (
                                    <div className="glass-card p-6 space-y-6 animate-fade-in">
                                        <div className="border-b border-[#3FAD00]/10 pb-3">
                                            <h3 className="sparkle-heading text-lg font-bold text-[#1F3612]">Active Job Execution</h3>
                                            <span className="text-xs text-[#728F63]">Client: {selectedJob.customer_name}</span>
                                        </div>

                                        <div className="space-y-3 bg-[#EAF2E8]/40 p-4 rounded-xl border border-[#3FAD00]/10 text-xs">
                                            <div className="flex justify-between"><span className="text-[#728F63]">Service:</span><span className="text-[#1F3612] font-semibold capitalize">{selectedJob.service_type} Clean</span></div>
                                            <div className="flex justify-between"><span className="text-[#728F63]">Layout:</span><span className="text-[#1F3612] font-semibold">{selectedJob.bedrooms} Beds, {selectedJob.bathrooms} Baths</span></div>
                                            <div className="flex justify-between"><span className="text-[#728F63]">Add-ons:</span><span className="text-[#1F3612] font-semibold capitalize">{selectedJob.add_ons && selectedJob.add_ons.join(', ') || 'None'}</span></div>
                                            {selectedJob.special_instructions && (
                                                <div className="border-t border-[#3FAD00]/10 pt-2 mt-2">
                                                    <span className="text-[#728F63] block mb-1">Client Special Instructions:</span>
                                                    <p className="text-[#3B5E2B] italic">"{selectedJob.special_instructions}"</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Dynamic Checklist */}
                                        <div className="space-y-4">
                                            <span className="text-sm font-semibold text-[#1F3612] block">Required Job Checklist (Quality Assurance)</span>
                                            
                                            <div className="space-y-3">
                                                {[
                                                    { key: 'dust', label: 'Dust & Wipe All Surfaces' },
                                                    { key: 'vacuum', label: 'Vacuum Rugs & Carpet' },
                                                    { key: 'mopping', label: 'Mop Hardwood/Tile Floors' },
                                                    { key: 'sanitized', label: 'Sanitize Toilets, Tubs, & Sinks' },
                                                    { key: 'trash', label: 'Empty Garbage & Recycle Bins' },
                                                    { key: 'kitchen', label: 'Clean Kitchen Counter & Appliances' }
                                                ].map(item => (
                                                    <div 
                                                        key={item.key} 
                                                        onClick={() => selectedJob.status !== 'completed' && handleChecklistToggle(item.key)}
                                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                                            checklist[item.key] 
                                                                ? 'bg-[#3FAD00]/10 border-[#3FAD00]/20 text-[#2C7A00]' 
                                                                : 'bg-white/40 border-[#3FAD00]/10 text-[#728F63]'
                                                        } ${selectedJob.status !== 'completed' ? 'cursor-pointer hover:bg-[#EAF2E8]/40' : ''}`}
                                                    >
                                                        <div className={`w-5 h-5 rounded border flex items-center justify-center text-[10px] ${
                                                            checklist[item.key] ? 'bg-[#3FAD00] border-[#3FAD00] text-white font-bold' : 'border-[#728F63]'
                                                        }`}>
                                                            {checklist[item.key] && '✓'}
                                                        </div>
                                                        <span className="text-xs font-semibold">{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedJob.status !== 'completed' ? (
                                            <button 
                                                onClick={() => handleCompleteJob(selectedJob.id)}
                                                className="w-full py-3 rounded-xl bg-[#3FAD00] hover:bg-[#2C7A00] text-white font-bold transition-all text-sm shadow-md shadow-[#3FAD00]/10 border-none cursor-pointer"
                                            >
                                                Finish Job & Complete
                                            </button>
                                        ) : (
                                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-700 text-center font-bold text-xs">
                                                ✓ This Cleaning Visit is Completed.
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="glass-card p-8 text-center text-[#728F63]">
                                        <span className="text-3xl block mb-2">📋</span>
                                        Select an assigned job from the left to view instructions and start your cleaning checklist.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* 3. CUSTOMER DASHBOARD                                     */}
                    {/* ========================================================= */}
                    {role === 'client' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            {/* Bookings Lists */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="glass-card p-6">
                                    <h3 className="sparkle-heading text-lg font-bold text-[#1F3612] mb-6 border-b border-[#3FAD00]/10 pb-3">Your Upcoming Cleaning Sessions</h3>
                                    
                                    <div className="space-y-4">
                                        {bookings && bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').map((booking) => (
                                            <div key={booking.id} className="p-5 rounded-2xl bg-white/50 border border-[#3FAD00]/10 space-y-4">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <span className="text-xs text-[#2C7A00] font-bold uppercase tracking-wider capitalize">{booking.service_type} Clean</span>
                                                        <h4 className="font-bold text-[#1F3612] text-base mt-1">{booking.address}</h4>
                                                    </div>
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                                                        booking.status === 'assigned' ? 'bg-[#3FAD00]/10 text-[#2C7A00] border border-[#3FAD00]/20' : 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#728F63] border-t border-[#3FAD00]/5 pt-3">
                                                    <div><span className="block text-[10px] text-[#728F63]">Date</span>{new Date(booking.booking_date).toLocaleDateString()}</div>
                                                    <div><span className="block text-[10px] text-[#728F63]">Arrival Window</span>{booking.booking_time}</div>
                                                    <div><span className="block text-[10px] text-[#728F63]">Cleaner</span>{booking.cleaner ? booking.cleaner.name : 'Pending assignment'}</div>
                                                    <div><span className="block text-[10px] text-[#728F63]">Cost</span><span className="text-[#1F3612] font-bold">${booking.total_price}</span></div>
                                                </div>

                                                <div className="flex justify-end gap-3 pt-2">
                                                    <button 
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                        className="text-xs font-semibold text-red-600 hover:text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/15 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
                                                    >
                                                        Cancel Appointment
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {(!bookings || bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length === 0) && (
                                            <p className="text-[#728F63] text-center py-8 text-sm">You have no upcoming cleanings scheduled.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="glass-card p-6">
                                    <h3 className="sparkle-heading text-lg font-bold text-[#1F3612] mb-6 border-b border-[#3FAD00]/10 pb-3">Past Cleaning History</h3>
                                    
                                    <div className="space-y-4">
                                        {bookings && bookings.filter(b => b.status === 'completed' || b.status === 'cancelled').map((booking) => (
                                            <div key={booking.id} className="p-4 rounded-xl bg-white/40 border border-[#3FAD00]/10 flex justify-between items-center text-xs">
                                                <div>
                                                    <span className="font-semibold text-[#1F3612] capitalize">{booking.service_type} Clean</span>
                                                    <span className="block text-[#728F63] text-[10px] mt-0.5">{new Date(booking.booking_date).toLocaleDateString()} | Cleaner: {booking.cleaner ? booking.cleaner.name : 'None'}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold text-[#1F3612]">${booking.total_price}</span>
                                                    <span className={`px-2 py-0.5 rounded-md ${
                                                        booking.status === 'completed' ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {(!bookings || bookings.filter(b => b.status === 'completed' || b.status === 'cancelled').length === 0) && (
                                            <p className="text-[#728F63] text-center py-6 text-sm">No cleaning history recorded.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar: Cleaner Preference & Quick Tips */}
                            <div className="space-y-6">
                                <div className="glass-card p-6">
                                    <h3 className="sparkle-heading text-sm font-bold text-[#1F3612] mb-4 border-b border-[#3FAD00]/10 pb-2">Vetted Cleaning Crew</h3>
                                    <div className="space-y-4">
                                        {cleaners && cleaners.map((c) => (
                                            <div key={c.id} className="flex items-center gap-3">
                                                <img src={c.avatar_url} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-[#3FAD00]/10" />
                                                <div>
                                                    <span className="text-xs font-bold text-[#1F3612] block">{c.name}</span>
                                                    <span className="text-[10px] text-yellow-500 font-bold">★ {c.rating} Expert Cleaner</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card p-6 space-y-3 bg-[#EAF2E8]/40">
                                    <h3 className="sparkle-heading text-xs font-bold text-[#2C7A00] uppercase tracking-wide">💡 Preparing for Clean</h3>
                                    <p className="text-[#728F63] text-xs leading-relaxed">
                                        To help your cleaner get maximum results, please tidy up loose items like toys or clothing before they arrive. Leave any entry keycodes or notes in your profile instructions!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
