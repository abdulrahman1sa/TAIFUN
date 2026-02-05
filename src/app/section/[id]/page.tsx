import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingTelegram from '@/components/FloatingTelegram';
import GroupList from '@/components/GroupList';
import { notFound } from 'next/navigation';
import { HiHome, HiChevronLeft } from 'react-icons/hi';
import Link from 'next/link';

export default async function SectionDetails({ params }: { params: { id: string } }) {
    const sectionId = parseInt(params.id);
    if (isNaN(sectionId)) return notFound();

    const section = await prisma.section.findUnique({
        where: { id: sectionId },
        include: {
            subject: {
                include: {
                    faculty: true,
                }
            },
            groups: {
                where: { status: { not: 'hidden' } },
                orderBy: { upvotes: 'desc' }
            }
        }
    });

    if (!section) return notFound();

    // Convert Group objects to plain objects (Date objects issue in passing to Client Components sometimes, though App Router handles it usually. But explicit map is safe if needed. Prisma returns JSON-serializable usually if Dates are strings, but they are Date objects. Next 13+ can serialize Dates to string automatically in Server Components props? Actually yes, it warns but does it. Safer to .toISOString.)
    // Wait, Client Components props must be serializable. Date objects are serializable by Next.js now? No, they need to be strings usually or it warns.
    // I'll map the groups.
    const serializedGroups = section.groups.map(g => ({
        ...g,
        createdAt: g.createdAt.toISOString(),
    }));

    return (
        <>
            <Navbar />
            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-primary-600 transition-colors">
                        <HiHome className="h-5 w-5" />
                    </Link>
                    <HiChevronLeft className="h-4 w-4 mx-2 rtl:rotate-180" />
                    <span className="font-medium text-gray-700">{section.subject.faculty.name}</span>
                    <HiChevronLeft className="h-4 w-4 mx-2 rtl:rotate-180" />
                    <span className="font-medium text-gray-700">{section.subject.name}</span>
                </nav>

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        مادة: {section.subject.name} <span className="text-primary-600">— شعبة: {section.sectionNumber}</span>
                    </h1>
                    <p className="text-gray-500">
                        هنا تلقى روابط قروبات التليجرام الخاصة بهالشعبة.
                    </p>
                </div>

                <GroupList
                    initialGroups={serializedGroups as any} // Type assertion easier than redefining whole type with Date string
                    sectionId={section.id}
                />

            </main>
            <Footer />
            <FloatingTelegram />
        </>
    );
}
