import Navbar from '@/components/Navbar';
import SearchHero from '@/components/SearchHero';
import Footer from '@/components/Footer';
import FloatingTelegram from '@/components/FloatingTelegram';

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="flex-grow pt-16">
                <SearchHero />

                {/* Most Searched Placeholder */}
                <div className="py-12 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">الأكثر بحثًا</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Placeholders for visual integrity */}
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-default">
                                    <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <FloatingTelegram />
        </>
    );
}
