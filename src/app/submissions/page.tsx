'use client';

import { useEffect, useState } from 'react';
import {
    DoodleCard,
    DoodleButton,
    DoodleBadge
} from '@/components/DoodleComponents';

interface Submission {
    id: string;
    platform: string;
    college: string;
    subject: string;
    sectionNumber: string;
    groupLink: string;
    groupName: string;
    submitterName: string;
    status: string;
    createdAt: string;
}

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'telegram' | 'whatsapp'>('all');

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('/api/groups/submit');
            const data = await response.json();
            setSubmissions(data.submissions || []);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredSubmissions = submissions.filter(sub =>
        filter === 'all' ? true : sub.platform === filter
    );

    return (
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-right rotate-[-0.5deg]">
                    <DoodleBadge className="mb-4 bg-[#FF7A00]/20">سجل المقترحات 📝</DoodleBadge>
                    <h1 className="text-5xl font-black mb-4 underline decoration-[#FF7A00] decoration-8 underline-offset-8">
                        تحت المراجعة
                    </h1>
                    <p className="font-bold opacity-40">هذي الروابط توها جاية ونراجعها الحين</p>
                </div>

                {/* Filter */}
                <div className="flex bg-white doodle-border-sm p-1 gap-1 mb-12 max-w-md ml-auto rotate-[1deg]">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 font-black text-sm transition-all ${filter === 'all' ? 'bg-[#FFD400] doodle-border-sm' : 'opacity-40'}`}
                    >
                        الكل
                    </button>
                    <button
                        onClick={() => setFilter('telegram')}
                        className={`px-6 py-2 font-black text-sm transition-all ${filter === 'telegram' ? 'bg-[#FFD400] doodle-border-sm' : 'opacity-40'}`}
                    >
                        تيليجرام
                    </button>
                    <button
                        onClick={() => setFilter('whatsapp')}
                        className={`px-6 py-2 font-black text-sm transition-all ${filter === 'whatsapp' ? 'bg-[#FFD400] doodle-border-sm' : 'opacity-40'}`}
                    >
                        واتساب
                    </button>
                </div>

                {/* Items */}
                {isLoading ? (
                    <div className="text-center py-20 font-black animate-pulse text-2xl">جاري استرجاع الأوراق... 📑</div>
                ) : filteredSubmissions.length === 0 ? (
                    <DoodleCard className="text-center py-20 border-dashed" rotate="rotate-0">
                        <p className="font-black opacity-30 text-2xl">لا توجد مقترحات جديدة حالياً ☕</p>
                    </DoodleCard>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredSubmissions.map((sub, i) => (
                            <DoodleCard key={sub.id} rotate={i % 2 === 0 ? "rotate-[1deg]" : "-rotate-[1deg]"}>
                                <div className="flex justify-between items-start mb-6">
                                    <DoodleBadge className="bg-yellow-100">قيد المراجعة ⏳</DoodleBadge>
                                    <span className="font-black text-[10px] opacity-20">ID: {sub.id.slice(0, 6)}</span>
                                </div>
                                <div className="text-right space-y-4 mb-8">
                                    <h3 className="text-xl font-black">{sub.groupName}</h3>
                                    <div className="text-sm font-bold opacity-50 space-y-1">
                                        <p>📍 {sub.college}</p>
                                        <p>📚 {sub.subject}</p>
                                        <p>📅 {new Date(sub.createdAt).toLocaleDateString('ar-SA')}</p>
                                    </div>
                                    <div className="pt-4 border-t border-dashed border-black/10">
                                        <p className="text-xs font-black">بواسطة: <span className="opacity-100">{sub.submitterName || 'فاعل خير'}</span></p>
                                    </div>
                                </div>
                                <a href={sub.groupLink} target="_blank" className="block">
                                    <DoodleButton variant="outline" className="w-full text-sm py-2">
                                        معاينة الرابط 🔗
                                    </DoodleButton>
                                </a>
                            </DoodleCard>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
