'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import FloatingContact from '@/components/FloatingContact';

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-[var(--background)] pt-32 pb-20 relative overflow-hidden">
            <div className="fixed inset-0 dither-bg pointer-events-none opacity-5 z-0"></div>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b-8 border-double border-[var(--foreground)] pb-10">
                    <div className="text-right flex-1">
                        <div className="ksa-badge mb-4">SUBMISSION_LOG_ANALYSIS</div>
                        <h1 className="text-5xl font-black text-[var(--foreground)] uppercase tracking-tighter mb-4">
                            سجل_المقترحات_
                        </h1>
                        <p className="text-[var(--foreground)] font-bold text-lg opacity-60 font-mono">
                            <span className="cursor-blink">// جاري_عرض_البيانات_قيد_المراجعة...</span>
                        </p>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="pixel-card bg-[var(--background)] border-4 border-[var(--foreground)] p-6 mb-12 shadow-[8px_8px_0_0_var(--foreground)]">
                    <div className="flex bg-[var(--foreground)] p-1 border-2 border-[var(--foreground)] max-w-2xl ml-auto">
                        <button
                            onClick={() => setFilter('all')}
                            className={`flex-1 py-4 font-black text-xs uppercase transition-none ${filter === 'all' ? 'bg-[var(--background)] text-[var(--foreground)] shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                        >
                            [ الكل_({submissions.length}) ]
                        </button>
                        <button
                            onClick={() => setFilter('telegram')}
                            className={`flex-1 py-4 font-black text-xs uppercase transition-none ${filter === 'telegram' ? 'bg-[var(--background)] text-[var(--foreground)] shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                        >
                            [ تليجرام_({submissions.filter(s => s.platform === 'telegram').length}) ]
                        </button>
                        <button
                            onClick={() => setFilter('whatsapp')}
                            className={`flex-1 py-4 font-black text-xs uppercase transition-none ${filter === 'whatsapp' ? 'bg-[var(--background)] text-[var(--foreground)] shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                        >
                            [ واتساب_({submissions.filter(s => s.platform === 'whatsapp').length}) ]
                        </button>
                    </div>
                </div>

                {/* Grid Content */}
                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-80 bg-[var(--background)] border-4 border-[var(--foreground)] relative overflow-hidden">
                                <div className="absolute inset-0 dither-bg opacity-30"></div>
                                <div className="absolute inset-0 flex items-center justify-center font-black animate-pulse">MEM_FETCHING_{i}...</div>
                            </div>
                        ))}
                    </div>
                ) : filteredSubmissions.length === 0 ? (
                    <div className="text-center py-40 bg-[var(--background)] border-8 border-dashed border-[var(--foreground)]">
                        <div className="text-8xl mb-8 opacity-20">[0]</div>
                        <h2 className="text-4xl font-black text-[var(--foreground)] uppercase mb-4">نظام_فارغ (NULL_DATA)</h2>
                        <p className="font-bold opacity-60">// لا توجد اقتراحات حالية في القاعدة.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredSubmissions.map((submission) => (
                            <div
                                key={submission.id}
                                className="pixel-card bg-[var(--background)] border-4 border-[var(--foreground)] p-8 hover:shadow-[12px_12px_0_0_var(--foreground)] transition-none shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] group flex flex-col h-full relative"
                            >
                                {/* Platform & Status */}
                                <div className="flex justify-between items-start mb-8 border-b-2 border-dashed border-[var(--foreground)] pb-4">
                                    <span className={`px-2 py-1 font-black text-[10px] uppercase border-2 border-[var(--foreground)] ${submission.platform === 'telegram' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--foreground)]'}`}>
                                        {submission.platform === 'telegram' ? 'PROTO: T_GRAM' : 'PROTO: W_APP'}
                                    </span>
                                    <span className="text-[10px] font-black uppercase text-yellow-600 dark:text-yellow-400">
                                        [ قيد_المراجعة ]
                                    </span>
                                </div>

                                {/* Information Section */}
                                <div className="text-right flex-grow space-y-6">
                                    <h3 className="text-2xl font-black text-[var(--foreground)] uppercase leading-tight tracking-tight">
                                        {submission.groupName}
                                    </h3>

                                    <div className="space-y-3 font-mono text-xs border-r-4 border-[var(--foreground)] pr-6 ml-auto w-fit">
                                        <div className="flex items-center justify-end gap-3">
                                            <span className="text-[var(--foreground)] font-bold">{submission.college}</span>
                                            <span className="opacity-40 uppercase">COLLEGE_ID:</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-3">
                                            <span className="text-[var(--foreground)] font-bold">{submission.subject}</span>
                                            <span className="opacity-40 uppercase">SUBJECT:</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-3">
                                            <span className="text-[var(--foreground)] font-bold">#{submission.sectionNumber}</span>
                                            <span className="opacity-40 uppercase">SECTION:</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--foreground)]/10">
                                            <span className="text-[var(--foreground)] opacity-70 italic">@{submission.submitterName}</span>
                                            <span className="opacity-40 uppercase">SUBMITTED_BY:</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-6 border-t-2 border-dotted border-[var(--foreground)]">
                                    <p className="text-[10px] font-black text-[var(--foreground)] opacity-40 text-center mb-4 uppercase">TIMESTAMP: {formatDate(submission.createdAt)}</p>
                                    <a
                                        href={submission.groupLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-[var(--background)] text-[var(--foreground)] text-center py-4 font-black border-2 border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-none uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none"
                                    >
                                        معاينة_الرابط &gt;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <FloatingContact />
        </div>
    );
}
