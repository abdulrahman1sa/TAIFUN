import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
    subsets: ['arabic'],
    variable: '--font-cairo',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'دليل الشعب | University Sections Group Directory',
    description: 'الدليل الطلابي لتنظيم قروبات الشعب الجامعية',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <body className={`${cairo.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
                {children}
            </body>
        </html>
    );
}
