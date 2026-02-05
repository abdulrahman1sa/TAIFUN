import Link from 'next/link';
import { HiAcademicCap } from 'react-icons/hi';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img src="/logo.png" alt="دليل الشعب" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
                            <span>✨</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 space-x-reverse">
                        <Link href="/" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            الرئيسية
                        </Link>
                        <Link href="/submit" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            أضف قروب
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            تواصل معنا
                        </Link>
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button (omitted for MVP brevity, but functional structure is here) */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
