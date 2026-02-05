import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubmissionForm from '@/components/SubmissionForm';

export default function SubmitPage() {
    return (
        <>
            <Navbar />
            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-primary-900">أضف قروب</h1>
                        <p className="mt-2 text-gray-500">ساعد زملائك وشارك رابط قروب الشعبة</p>
                    </div>

                    <SubmissionForm />
                </div>
            </main>
            <Footer />
        </>
    );
}
