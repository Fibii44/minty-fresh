import React from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Admin Log In" />

            {status && (
                <div className="mb-4 p-3 bg-green-50/80 border border-green-200 text-sm font-semibold text-[#2C7A00] rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-sm font-semibold text-[#1F3612] mb-1.5" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-[#3FAD00]/25 focus:border-[#3FAD00] focus:ring-[#3FAD00]/20 bg-white/70 backdrop-blur-sm shadow-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="admin@mintyfresh.com"
                    />

                    <InputError message={errors.email} className="mt-2 text-xs text-red-500 font-medium" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <InputLabel htmlFor="password" value="Password" className="text-sm font-semibold text-[#1F3612]" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-[#2C7A00] hover:text-[#1F3612] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-[#3FAD00]/25 focus:border-[#3FAD00] focus:ring-[#3FAD00]/20 bg-white/70 backdrop-blur-sm shadow-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2 text-xs text-red-500 font-medium" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded text-[#3FAD00] focus:ring-[#3FAD00]/25 border-[#3FAD00]/30"
                        />
                        <span className="ms-2.5 text-xs text-[#3B5E2B] font-semibold">
                            Keep me signed in
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 bg-gradient-to-r from-[#3FAD00] to-[#2C7A00] hover:from-[#2C7A00] hover:to-[#1F3612] text-white font-bold rounded-xl shadow-lg shadow-[#3FAD00]/20 hover:shadow-xl hover:shadow-[#3FAD00]/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {processing ? (
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <>
                                <span>Sign In to Dashboard</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
