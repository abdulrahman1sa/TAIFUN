'use client';

import { useState } from 'react';

export default function FloatingTelegram() {
    const [isOpen, setIsOpen] = useState(false);

    const telegramUsername = 'your_telegram_username'; // Replace with actual username

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Tooltip */}
            {isOpen && (
                <div className="absolute bottom-20 left-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                    تواصل معنا عبر تليجرام
                    <div className="absolute -bottom-1 left-6 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                </div>
            )}

            {/* Floating Button */}
            <a
                href={`https://t.me/${telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0088cc] to-[#229ED9] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-300 group"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {/* Telegram Icon */}
                <svg
                    className="w-8 h-8 group-hover:rotate-12 transition-transform"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.042-1.362 5.362-.169.56-.502.748-.825.767-.7.064-1.232-.461-1.911-.904-1.061-.693-1.662-1.125-2.693-1.801-1.191-.781-.419-1.211.26-1.914.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.154.233.17.326.016.094.036.307.02.473z" />
                </svg>

                {/* Pulse Animation */}
                <span className="absolute w-full h-full rounded-full bg-[#0088cc] opacity-50 animate-ping"></span>
            </a>
        </div>
    );
}
