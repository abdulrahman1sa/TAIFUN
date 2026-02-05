export default function Footer() {
    return (
        <footer className="mt-auto bg-white border-t border-gray-100 py-12">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="دليل الشعب" className="h-16 w-auto object-contain opacity-50 grayscale hover:grayscale-0 transition-all cursor-default" />
                </div>
                <p className="text-sm text-gray-500">
                    خدمة طلابية لتنظيم قروبات الشعب &copy; {new Date().getFullYear()}
                </p>
                <p className="mt-2 text-xs text-gray-400 font-bold">
                    دليل الشعب - صنع بحب للطلاب 💚
                </p>
            </div>
        </footer>
    );
}
