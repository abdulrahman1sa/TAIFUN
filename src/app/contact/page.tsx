import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaTelegramPlane } from 'react-icons/fa';

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-16 text-center max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">تواصل معنا</h1>
                    <p className="text-lg text-gray-500 mb-10">
                        عندك استفسار أو قروب مو موجود؟ أو واجهت مشكلة بالموقع؟
                        <br />
                        إحنا هنا عشان نساعدك.
                    </p>

                    <a
                        href="https://t.me/DVVLLP"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:shadow-primary-600/50 transition-all transform hover:-translate-y-1"
                    >
                        <FaTelegramPlane className="h-6 w-6" />
                        <span>تواصل على تيليجرام</span>
                    </a>
                </div>
            </main>
            <Footer />
        </>
    );
}
