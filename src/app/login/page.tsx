'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        // In a real Supabase setup, this would be:
        // supabase.auth.signInWithOAuth({ provider: 'google' })

        // Mock delay for effect
        setTimeout(() => {
            alert('نظام_التحقق: جاري التوجيه إلى بوابة جوجل... (REDIRECTING_TO_IDENTITY_PROVIDER)');
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-[var(--background)] min-h-screen pt-32 pb-20 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="fixed inset-0 dither-bg pointer-events-none opacity-10 z-0"></div>
            <Navbar />

            <div className="max-w-md w-full px-6 relative z-10">
                {/* Auth Terminal Card */}
                <div className="pixel-card bg-[var(--background)] border-8 border-double border-[var(--foreground)] p-12 shadow-[20px_20px_0_0_rgba(0,0,0,0.3)] relative overflow-hidden animate-fade-in">

                    {/* Security Badge */}
                    <div className="absolute top-0 right-0 bg-[var(--foreground)] text-[var(--background)] px-4 py-1 font-black text-[10px] uppercase tracking-widest">
                        SECURE_ACCESS_V2
                    </div>

                    <div className="text-center mb-12 space-y-6">
                        <div className="flex justify-center gap-2 mb-4">
                            <div className="w-12 h-12 border-4 border-[var(--foreground)] flex items-center justify-center bg-[var(--foreground)]/5">
                                <span className="text-2xl animate-pulse">🔒</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-black text-[var(--foreground)] uppercase tracking-tighter mb-2">
                            بوابة_الدخول_
                        </h1>
                        <div className="inline-block border-2 border-[var(--foreground)] px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                            {isLoading ? 'جاري_المصادقة...' : '[انتظار_تحديد_الهوية]'}
                        </div>
                    </div>

                    {/* Login Options */}
                    <div className="space-y-8">
                        <p className="text-right text-[var(--foreground)] font-bold text-sm leading-relaxed border-r-4 border-[var(--foreground)] pr-4">
                            // للبدء بالحصول على كامل الصلاحيات، يرجى تسجيل الدخول عبر حساب جوجل التعليمي أو الشخصي.
                        </p>

                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className={`
                                w-full flex items-center justify-center gap-6 py-5 px-4 border-4 border-[var(--foreground)] transition-none relative group
                                ${isLoading ? 'bg-[var(--foreground)]/20 cursor-wait' : 'bg-[var(--background)] hover:bg-[var(--foreground)] hover:text-[var(--background)] shadow-[8px_8px_0_0_var(--foreground)] active:translate-y-2 active:shadow-none'}
                            `}
                        >
                            {/* Pixelated Google "G" representation */}
                            <div className="w-8 h-8 grid grid-cols-2 gap-0.5 opacity-80 group-hover:opacity-100">
                                <div className="bg-red-500"></div>
                                <div className="bg-blue-500"></div>
                                <div className="bg-yellow-500"></div>
                                <div className="bg-green-500"></div>
                            </div>

                            <span className="font-black text-lg uppercase tracking-tighter">
                                {isLoading ? 'جاري_المعالجة' : 'دخول_عبر_جيميل'}
                            </span>
                        </button>

                        <button
                            onClick={() => alert('نظام_أبل: جاري التحقق من الهوية... (AUTH_APPLE_PENDING)')}
                            disabled={isLoading}
                            className={`
                                w-full flex items-center justify-center gap-6 py-5 px-4 border-4 border-[var(--foreground)] transition-none relative group
                                ${isLoading ? 'bg-[var(--foreground)]/20 cursor-wait' : 'bg-[var(--background)] hover:bg-[var(--foreground)] hover:text-[var(--background)] shadow-[8px_8px_0_0_var(--foreground)] active:translate-y-2 active:shadow-none'}
                            `}
                        >
                            <div className="text-2xl opacity-80 group-hover:opacity-100">🍎</div>
                            <span className="font-black text-lg uppercase tracking-tighter">
                                {isLoading ? 'جاري_المعالجة' : 'دخول_عبر_أبل'}
                            </span>
                        </button>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 pt-8 border-t-4 border-dotted border-[var(--foreground)]">
                        <p className="text-[10px] text-center font-black opacity-30 uppercase tracking-widest">
                            PROTOCOL_IDENTIFIER: OAUTH_2.0_G
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-10 text-center">
                    <button
                        onClick={() => window.history.back()}
                        className="text-[var(--foreground)] font-black text-xs uppercase tracking-widest hover:underline decoration-double"
                    >
                        [&lt; عودة_للخلف]
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
