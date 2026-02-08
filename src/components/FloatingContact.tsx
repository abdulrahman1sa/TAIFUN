'use client';

import { useState } from 'react';

export default function FloatingContact() {
    const telegramHandle = 'DVVLLP';

    return (
        <div className="fixed bottom-10 left-10 z-[100] flex flex-col gap-4">
            {/* Telegram Support Button */}
            <a
                href={`https://t.me/${telegramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
            >
                <div className="bg-[#FFD400] doodle-border-sm w-16 h-16 flex items-center justify-center doodle-shadow-sm doodle-clickable rotate-[5deg] group-hover:rotate-0 transition-all">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                        <path d="M22 2L2 8.5L9.5 11.5M22 2L15 22L9.5 11.5M22 2L9.5 11.5M9.5 11.5V17.5L13 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="absolute -top-3 -right-3 bg-white doodle-border-sm text-[10px] font-black px-1 -rotate-[10deg]">دعم 💬</span>
                </div>
            </a>
        </div>
    );
}
