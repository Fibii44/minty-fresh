import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ auth, cleaners }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editCleanerId, setEditCleanerId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        status: 'active',
        rating: 5.0,
        avatar_url: '',
    });

    const showNotification = (msg) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            bio: '',
            status: 'active',
            rating: 5.0,
            avatar_url: '',
        });
        setEditCleanerId(null);
        setIsFormOpen(false);
    };

    const handleOpenAdd = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const handleOpenEdit = (cleaner) => {
        setFormData({
            name: cleaner.name || '',
            email: cleaner.email || '',
            phone: cleaner.phone || '',
            bio: cleaner.bio || '',
            status: cleaner.status || 'active',
            rating: cleaner.rating || 5.0,
            avatar_url: cleaner.avatar_url || '',
        });
        setEditCleanerId(cleaner.id);
        setIsFormOpen(true);
    };

    const handleSaveCleaner = (e) => {
        e.preventDefault();

        if (editCleanerId) {
            router.patch(route('cleaners.update', editCleanerId), formData, {
                onSuccess: () => {
                    showNotification('Cleaner updated successfully!');
                    resetForm();
                }
            });
        } else {
            router.post(route('cleaners.store'), formData, {
                onSuccess: () => {
                    showNotification('Cleaner registered successfully!');
                    resetForm();
                }
            });
        }
    };

    const handleDeleteCleaner = (cleanerId) => {
        if (confirm("Are you sure you want to permanently remove this cleaner? This will also unassign them from any bookings.")) {
            router.delete(route('cleaners.destroy', cleanerId), {
                onSuccess: () => {
                    showNotification('Cleaner removed successfully.');
                }
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center bg-[#EAF2E8]/70 backdrop-blur-md p-6 rounded-2xl border border-[#3FAD00]/15 shadow-sm">
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-[#1F3612] sparkle-heading">
                            Manage Cleaners
                        </h2>
                        <p className="text-xs text-[#728F63] mt-1">
                            Register, update, and manage cleaning personnel records
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Manage Cleaners" />

            <div className="sparkle-body min-h-screen py-10 px-4 md:px-8 text-[#1F3612] relative">
                {/* Background Glow Blobs */}
                <div className="glow-blob glow-blob-1 !opacity-10"></div>

                {/* Notification Banner */}
                {successMessage && (
                    <div className="max-w-7xl mx-auto mb-6 p-4 rounded-xl bg-[#3FAD00]/10 border border-[#3FAD00]/20 text-[#2C7A00] text-sm font-semibold flex items-center justify-between animate-slide-up">
                        <span>✨ {successMessage}</span>
                        <button onClick={() => setSuccessMessage('')} className="text-[#2C7A00] hover:text-[#1F3612]">✕</button>
                    </div>
                )}

                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="glass-card p-8">
                        <div className="flex justify-between items-center mb-6 border-b border-[#3FAD00]/10 pb-3">
                            <h3 className="sparkle-heading text-lg font-bold text-[#1F3612]">Cleaners Directory</h3>
                            <button 
                                onClick={handleOpenAdd}
                                className="px-4 py-2 rounded-xl bg-[#3FAD00] hover:bg-[#2C7A00] text-white font-bold transition-all text-xs shadow-md shadow-[#3FAD00]/10 hover:shadow-[#3FAD00]/25 cursor-pointer border-none"
                            >
                                + Add New Cleaner
                            </button>
                        </div>

                        {/* Add/Edit Cleaner Form */}
                        {isFormOpen && (
                            <form onSubmit={handleSaveCleaner} className="mb-8 p-6 bg-[#EAF2E8]/30 border border-[#3FAD00]/15 rounded-2xl space-y-4 animate-slide-up">
                                <h4 className="sparkle-heading text-sm font-bold text-[#1F3612] mb-2">
                                    {editCleanerId ? 'Edit Cleaner Details' : 'Register New Cleaner'}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#728F63] mb-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-white/80 border border-[#3FAD00]/15 rounded-xl p-2.5 text-xs text-[#1F3612] focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00]"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#728F63] mb-1">Email Address</label>
                                        <input 
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full bg-white/80 border border-[#3FAD00]/15 rounded-xl p-2.5 text-xs text-[#1F3612] focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00]"
                                            placeholder="jane@sparkleclean.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#728F63] mb-1">Phone Number</label>
                                        <input 
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full bg-white/80 border border-[#3FAD00]/15 rounded-xl p-2.5 text-xs text-[#1F3612] focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00]"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#728F63] mb-1">Avatar Image URL</label>
                                        <input 
                                            type="text"
                                            value={formData.avatar_url}
                                            onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                                            className="w-full bg-white/80 border border-[#3FAD00]/15 rounded-xl p-2.5 text-xs text-[#1F3612] focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00]"
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#728F63] mb-1">Status</label>
                                        <select 
                                            value={formData.status}
                                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                                            className="w-full bg-white/80 border border-[#3FAD00]/15 rounded-xl py-2.5 pl-3 pr-8 text-xs text-[#1F3612] focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00] cursor-pointer"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    {editCleanerId && (
                                        <div>
                                            <label className="block text-xs font-semibold text-[#728F63] mb-1">Rating (0 - 5)</label>
                                            <input 
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                value={formData.rating}
                                                onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 5.0})}
                                                className="w-full bg-white/80 border border-[#3FAD00]/15 rounded-xl p-2.5 text-xs text-[#1F3612] focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00]"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#728F63] mb-1">Short Biography</label>
                                    <textarea 
                                        value={formData.bio}
                                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                        className="w-full bg-white/80 border border-[#3FAD00]/15 rounded-xl p-2.5 text-xs text-[#1F3612] focus:outline-none focus:border-[#3FAD00] focus:ring-1 focus:ring-[#3FAD00] h-20 resize-none"
                                        placeholder="Detail professional background, experience..."
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button 
                                        type="button"
                                        onClick={resetForm}
                                        className="px-4 py-2 rounded-xl bg-white border border-[#3FAD00]/20 text-[#728F63] text-xs font-bold hover:bg-[#EAF2E8]/40 transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-[#3FAD00] text-white text-xs font-bold hover:bg-[#2C7A00] transition-all cursor-pointer border-none"
                                    >
                                        {editCleanerId ? 'Save Changes' : 'Create Cleaner'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Cleaners Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-[#3FAD00]/10 text-[#728F63] text-xs font-semibold uppercase tracking-wider">
                                        <th className="py-4 px-3">Cleaner</th>
                                        <th className="py-4 px-3">Contact</th>
                                        <th className="py-4 px-3">Biography</th>
                                        <th className="py-4 px-3">Rating</th>
                                        <th className="py-4 px-3">Status</th>
                                        <th className="py-4 px-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#3FAD00]/5 text-[#1F3612]">
                                    {cleaners && cleaners.map((c) => (
                                        <tr key={c.id} className="hover:bg-[#EAF2E8]/20 transition-colors">
                                            <td className="py-4 px-3 flex items-center gap-3">
                                                <img 
                                                    src={c.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'} 
                                                    alt={c.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-[#3FAD00]/20"
                                                />
                                                <span className="font-semibold text-[#1F3612]">{c.name}</span>
                                            </td>
                                            <td className="py-4 px-3">
                                                <span className="block text-[#3B5E2B] font-semibold">{c.email || 'No Email'}</span>
                                                <span className="block text-[10px] text-[#728F63] mt-0.5">{c.phone || 'No Phone'}</span>
                                            </td>
                                            <td className="py-4 px-3 max-w-[200px] truncate text-[#728F63]" title={c.bio}>
                                                {c.bio || 'No bio provided.'}
                                            </td>
                                            <td className="py-4 px-3">
                                                <span className="text-yellow-500 font-bold text-xs">★ {c.rating}</span>
                                            </td>
                                            <td className="py-4 px-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                                                    c.status === 'active' 
                                                        ? 'bg-[#3FAD00]/10 text-[#2C7A00] border border-[#3FAD00]/20' 
                                                        : 'bg-red-500/10 text-red-700 border border-red-500/20'
                                                }`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-3 text-right space-x-2">
                                                <button 
                                                    onClick={() => handleOpenEdit(c)}
                                                    className="text-[#2C7A00] hover:text-[#1F3612] bg-[#3FAD00]/10 hover:bg-[#3FAD00]/20 px-3 py-1.5 rounded-lg border border-[#3FAD00]/20 transition-all cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteCleaner(c.id)}
                                                    className="text-red-600 hover:text-red-500 font-semibold text-xs bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/15 transition-all cursor-pointer border-none"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!cleaners || cleaners.length === 0) && (
                                        <tr>
                                            <td colSpan="6" className="py-12 text-center text-[#728F63]">No cleaners registered in the system.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
