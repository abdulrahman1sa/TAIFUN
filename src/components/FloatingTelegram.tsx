import { FaTelegramPlane } from 'react-icons/fa';

export default function FloatingTelegram() {
    return (
        <a
            href="https://t.me/DVVLLP"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 shadow-lg shadow-primary-600/40 transition-transform hover:scale-110 hover:bg-primary-500"
            aria-label="Contact on Telegram"
        >
            <FaTelegramPlane className="h-7 w-7 text-white" />
        </a>
    );
}
