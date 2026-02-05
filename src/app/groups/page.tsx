'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import FloatingContact from '@/components/FloatingContact';

interface Group {
    id: string;
    platform: string;
    college: string;
    subject: string;
    sectionNumber: string;
    groupLink: string;
    groupName: string;
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
        <div className="min-h-screen bg-[var(--background)] pt-32 pb-20 relative overflow-hidden">
            <div className="fixed inset-0 dither-bg pointer-events-none opacity-5 z-0"></div>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b-8 border-double border-[var(--foreground)] pb-10">
                    <div className="text-right flex-1">
                        <div className="ksa-badge mb-4">نظام_فهرسة_المجموعات_V1.0</div>
                        <h1 className="text-5xl font-black text-[var(--foreground)] uppercase tracking-tighter mb-4">
                            دليل المجموعات_
                        </h1>
                        <p className="text-[var(--foreground)] font-bold text-lg opacity-60 font-mono">
                            // إجمالي_البيانات_الأكاديمية: {groups.length} // الحالة: فحص_نشط //
                        </p>
                    </div>
                </div>

                {/* Database Controls */}
                <div className="pixel-card bg-[var(--background)] border-4 border-[var(--foreground)] p-6 mb-12 shadow-[8px_8px_0_0_var(--foreground)]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* Search Input */}
                        <div className="md:col-span-2 space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--foreground)] opacity-50 px-2">محددات_البحث (SEARCH_QUERY)</label>
                            <input
                                type="text"
                                placeholder="ابحث عن كلية، مادة، أو مجموعة... "
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 bg-[var(--background)] border-4 border-[var(--foreground)] focus:shadow-[6px_6px_0_0_var(--foreground)] transition-none outline-none font-bold text-xl rounded-none placeholder:[var(--foreground)]/30"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--foreground)] opacity-50 px-2">تصفية_المنصة (FILTER)</label>
                            <div className="flex bg-[var(--foreground)] p-1 border-2 border-[var(--foreground)]">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`flex-1 py-3 text-[10px] font-black uppercase transition-none ${filter === 'all' ? 'bg-[var(--background)] text-[var(--foreground)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                                >
                                    [ الكل ]
                                </button>
                                <button
                                    onClick={() => setFilter('telegram')}
                                    className={`flex-1 py-3 text-[10px] font-black uppercase transition-none ${filter === 'telegram' ? 'bg-[var(--background)] text-[var(--foreground)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                                >
                                    [ تليجرام ]
                                </button>
                                <button
                                    onClick={() => setFilter('whatsapp')}
                                    className={`flex-1 py-3 text-[10px] font-black uppercase transition-none ${filter === 'whatsapp' ? 'bg-[var(--background)] text-[var(--foreground)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                                >
                                    [ واتساب ]
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submissions Grid */}
                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-64 bg-[var(--background)] border-4 border-[var(--foreground)] relative overflow-hidden">
                                <div className="absolute inset-0 dither-bg opacity-20"></div>
                                <div className="absolute inset-0 flex items-center justify-center font-black animate-pulse uppercase text-xs">جاري_استبقاء_البيانات_{i}...</div>
                            </div>
                        ))}
                    </div>
                ) : filteredGroups.length === 0 ? (
                    <div className="text-center py-40 border-8 border-dashed border-[var(--foreground)] bg-[var(--background)]">
                        <div className="text-8xl mb-8 opacity-20">[!]</div>
                        <h2 className="text-4xl font-black text-[var(--foreground)] uppercase mb-4">404_السجل_غير_موجود</h2>
                        <p className="font-bold opacity-60">// لا توجد نتائج للبحث الحالي في قاعدة البيانات.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredGroups.map((group) => (
                            <div
                                key={group.id}
                                className="pixel-card bg-[var(--background)] border-4 border-[var(--foreground)] p-8 hover:shadow-[12px_12px_0_0_var(--foreground)] transition-none shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] group flex flex-col h-full relative"
                            >
                                {/* Header Decorative */}
                                <div className="flex justify-between items-start mb-8 border-b-2 border-dashed border-[var(--foreground)] pb-4">
                                    <span className={`px-2 py-1 font-black text-[10px] uppercase border-2 border-[var(--foreground)] ${group.platform === 'telegram' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--foreground)]'}`}>
                                        {group.platform === 'telegram' ? 'بروتوكول: تليجرام' : 'بروتوكول: واتساب'}
                                    </span>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-[var(--foreground)] animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Information */}
                                <div className="text-right flex-grow space-y-8">
                                    <h3 className="text-2xl font-black text-[var(--foreground)] uppercase leading-tight tracking-tight">
                                        {group.groupName}
                                    </h3>

                                    <div className="space-y-4 font-mono text-xs border-r-4 border-[var(--foreground)] pr-6 ml-auto w-fit">
                                        <div className="flex items-center justify-end gap-3">
                                            <span className="text-[var(--foreground)] font-black text-sm">{group.college}</span>
                                            <span className="opacity-40 text-[10px]">الكلية:</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-3">
                                            <span className="text-[var(--foreground)] font-black text-sm">{group.subject}</span>
                                            <span className="opacity-40 text-[10px]">المادة:</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-3">
                                            <span className="text-[var(--foreground)] font-black text-sm">#{group.sectionNumber}</span>
                                            <span className="opacity-40 text-[10px]">الشعبة:</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Link Button */}
                                <a
                                    href={group.groupLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[var(--foreground)] text-[var(--background)] text-center py-5 font-black border-2 border-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-none uppercase tracking-widest mt-10 shadow-[6px_6px_0_0_rgba(0,0,0,0.4)] active:translate-y-1 active:shadow-none text-xl"
                                >
                                    دخول_المجموعة &gt;&gt;
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <FloatingContact />
        </div>
    );
}
