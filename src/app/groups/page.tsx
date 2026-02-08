'use client';

import { useEffect, useState } from 'react';
import {
    DoodleCard,
    DoodleButton,
    DoodleBadge,
    DoodleInput
} from '@/components/DoodleComponents';

interface Group {
    id: string;
    platform: string;
    college: string;
    subject: string;
    sectionNumber: string;
    groupLink: string;
    groupName: string;
    description?: string;
    createdAt: string;
}

export default function GroupsPage() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'telegram' | 'whatsapp'>('all');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetch('/api/groups/approved');
            const data = await response.json();
            setGroups(data.groups || []);
        } catch (error) {
            console.error('Error fetching groups:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredGroups = groups.filter(group => {
        const matchesSearch =
            group.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.college.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filter === 'all' ? true : group.platform === filter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-right rotate-[0.5deg]">
                    <DoodleBadge className="mb-4">قاعدة البيانات الكاملة 🗄️</DoodleBadge>
                    <h1 className="text-5xl font-black mb-4 underline decoration-[#FFD400] decoration-8 underline-offset-8">
                        دليل المجموعات
                    </h1>
                    <p className="font-bold opacity-40">تصفح جميع الروابط الموثقة في النظام</p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-end">
                    <div className="flex-1 w-full space-y-3">
                        <label className="font-black text-xs uppercase opacity-40 block">ابحث في الدفاتر...</label>
                        <DoodleInput
                            placeholder="اسم المجموعة، الكلية، المادة..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-white doodle-border-sm p-1 gap-1 -rotate-[1deg]">
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
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-48 bg-gray-100 doodle-border-sm animate-pulse"></div>
                        ))}
                    </div>
                ) : filteredGroups.length === 0 ? (
                    <DoodleCard className="text-center py-20 border-dashed" rotate="rotate-0">
                        <p className="font-black opacity-30 text-2xl">ما لقيت اللي تبغاه؟ جرب بحث ثاني 🔎</p>
                    </DoodleCard>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGroups.map((group, i) => (
                            <DoodleCard
                                key={group.id}
                                rotate={i % 3 === 0 ? "rotate-[1deg]" : i % 3 === 1 ? "-rotate-[0.5deg]" : "rotate-[0.5deg]"}
                                className="flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <DoodleBadge className={group.platform === 'telegram' ? 'bg-[#FF7A00]/20' : 'bg-green-400/20'}>
                                        {group.platform === 'telegram' ? '✈️' : '💬'}
                                    </DoodleBadge>
                                    <div className="w-2 h-2 bg-black animate-ping rounded-full"></div>
                                </div>

                                <div className="flex-1 text-right mb-8">
                                    <h3 className="text-xl font-black mb-2 line-clamp-2">{group.groupName}</h3>
                                    {group.description && (
                                        <p className="text-[10px] font-bold opacity-70 mb-4 line-clamp-1 italic bg-black/5 px-2 py-1">
                                            {group.description}
                                        </p>
                                    )}
                                    <div className="space-y-2 text-xs font-bold opacity-60">
                                        <p>🏛️ {group.college}</p>
                                        <p>📚 {group.subject}</p>
                                        <p>🔢 شعبة {group.sectionNumber}</p>
                                    </div>
                                </div>

                                <a
                                    href={group.groupLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block mt-auto"
                                >
                                    <DoodleButton className="w-full text-base py-3" variant="primary">
                                        دخول الرابط ✨
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
