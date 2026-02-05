'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Submission {
    id: string;
    platform: string;
    college: string;
    subject: string;
    section_number: string;
    group_link: string;
    group_name: string;
    submitter_name: string;
    status: string;
    created_at: string;
}

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
    const router = useRouter();

    const ADMIN_PASSWORD = 'JUSTMEANDSOMEPEPOLR><';

    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            fetchSubmissions();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
            fetchSubmissions();
        } else {
            alert('تم رفض الدخول: كلمة المرور خاطئة (INVALID_KEY)');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
        setPassword('');
    };

    const fetchSubmissions = async () => {
        setIsLoading(true);
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

    const handleApprove = async (id: string) => {
        try {
            const response = await fetch('/api/admin/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                alert('الحالة: تم الاعتماد (NODE_AUTHORIZED)');
                fetchSubmissions();
            } else {
                alert('خطأ: فشلت العملية (SYS_FAILURE)');
            }
        } catch (error) {
            console.error('Error approving:', error);
        }
    };

    const handleReject = async (id: string) => {
        const reason = prompt('سبب الرفض (اختياري):');
        try {
            const response = await fetch('/api/admin/reject', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, reason }),
            });

            if (response.ok) {
                alert('الحالة: تم الرفض (NODE_TERMINATED)');
                fetchSubmissions();
            } else {
                alert('خطأ: فشلت العملية (SYS_FAILURE)');
            }
        } catch (error) {
            console.error('Error rejecting:', error);
        }
    };

    const filteredSubmissions = submissions.filter(sub => sub.status === filter);

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

    // Login Screen (Terminal Look)
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4 relative overflow-hidden">
                <div className="fixed inset-0 dither-bg pointer-events-none opacity-10"></div>
                <div className="pixel-card bg-[var(--background)] border-8 border-double border-[var(--foreground)] p-12 max-w-lg w-full shadow-[16px_16px_0_0_var(--foreground)] relative z-10">
                    <div className="absolute top-0 left-0 bg-[var(--foreground)] text-[var(--background)] px-4 py-1 font-black text-xs uppercase tracking-widest leading-none">ROOT_ACCESS</div>

                    <div className="text-center mb-12 space-y-6">
                        <div className="flex justify-center gap-2 mb-8">
                            {[1, 2, 3].map(i => <div key={i} className={`w-8 h-8 border-4 border-[var(--foreground)] bg-[var(--foreground)]/10 animate-pulse delay-${i}`}></div>)}
                        </div>
                        <h1 className="text-4xl font-black text-[var(--foreground)] mb-2 uppercase tracking-tighter">نظام_الإشراف_</h1>
                        <p className="text-[var(--foreground)] font-bold text-sm leading-relaxed border-l-4 border-[var(--foreground)] pl-6 text-right max-w-xs mx-auto">
                            // منطقة_محظورة.<br />
                            // يتطلب_التحليل_دخول_المصرح_لهم.<br />
                            // [STATUS]: WAITING_FOR_KEY
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-4">
                            <label className="block text-right text-xs font-black text-[var(--foreground)] uppercase tracking-widest opacity-60">
                                أدخل_كلمة_المرور (MASTER_KEY):
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="●●●●●●"
                                className="w-full px-8 py-6 text-center bg-[var(--background)] border-4 border-[var(--foreground)] focus:shadow-[8px_8px_0_0_var(--foreground)] transition-none outline-none text-2xl font-black rounded-none tracking-widest placeholder:[var(--foreground)]/20"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--foreground)] text-[var(--background)] py-6 px-10 font-black text-2xl transition-none border-2 border-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)] shadow-[8px_8px_0_0_var(--foreground)] active:translate-y-2 active:shadow-none rounded-none uppercase tracking-widest"
                        >
                            فتح_الاتصال (AUTHENTICATE)
                        </button>
                    </form>

                    <p className="text-center text-[10px] text-[var(--foreground)] mt-10 font-black opacity-30 uppercase tracking-[0.3em]">
                        SAUDI_ACADEMIC_SYS_SECURED
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden pb-20">
            <div className="fixed inset-0 dither-bg pointer-events-none opacity-5"></div>

            {/* Admin Header */}
            <div className="bg-[var(--background)] border-b-8 border-double border-[var(--foreground)] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-right">
                            <h1 className="text-3xl font-black uppercase tracking-tighter">لوحة_التحكم_V2.0</h1>
                            <div className="flex items-center justify-end gap-2 mt-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                                <p className="text-xs font-black opacity-70">S_STATUS: ONLINE_AUTHORIZED</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-[var(--background)] text-[var(--foreground)] px-8 py-3 font-black border-4 border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-none uppercase tracking-widest text-sm shadow-[6px_6px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
                        >
                            [ تسجيل_الخروج ]
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-[var(--background)] border-4 border-dashed border-[var(--foreground)] p-10 relative group">
                        <div className="absolute top-4 right-4 font-black text-[10px] opacity-20 uppercase">STATUS[!]</div>
                        <div className="text-6xl font-black mb-4 group-hover:scale-110 transition-transform">
                            {submissions.filter(s => s.status === 'pending').length}
                        </div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] border-t-2 border-[var(--foreground)] pt-2 mt-4">بانتظار_المراجعة</div>
                    </div>

                    <div className="bg-[var(--background)] border-4 border-[var(--foreground)] p-10 relative group">
                        <div className="absolute top-4 right-4 font-black text-[10px] opacity-20 uppercase">STATUS[V]</div>
                        <div className="text-6xl font-black mb-4 group-hover:scale-110 transition-transform">
                            {submissions.filter(s => s.status === 'approved').length}
                        </div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] border-t-2 border-[var(--foreground)] pt-2 mt-4">عناصر_مضافة</div>
                    </div>

                    <div className="bg-[var(--background)] border-4 border-[var(--foreground)] p-10 relative group bg-[var(--foreground)]/5">
                        <div className="absolute top-4 right-4 font-black text-[10px] opacity-20 uppercase">STATUS[X]</div>
                        <div className="text-6xl font-black mb-4 group-hover:scale-110 transition-transform">
                            {submissions.filter(s => s.status === 'rejected').length}
                        </div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] border-t-2 border-[var(--foreground)] pt-2 mt-4">طلبات_مرفوضة</div>
                    </div>
                </div>

                {/* Filter Controls System */}
                <div className="flex bg-[var(--foreground)] p-1 border-4 border-[var(--foreground)] mb-12 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)]">
                    <button
                        onClick={() => setFilter('pending')}
                        className={`flex-1 py-4 font-black text-xs uppercase transition-none ${filter === 'pending' ? 'bg-[var(--background)] text-[var(--foreground)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                    >
                        [ قيد_البحث ]
                    </button>
                    <button
                        onClick={() => setFilter('approved')}
                        className={`flex-1 py-4 font-black text-xs uppercase transition-none ${filter === 'approved' ? 'bg-[var(--background)] text-[var(--foreground)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                    >
                        [ الموثقة ]
                    </button>
                    <button
                        onClick={() => setFilter('rejected')}
                        className={`flex-1 py-4 font-black text-xs uppercase transition-none ${filter === 'rejected' ? 'bg-[var(--background)] text-[var(--foreground)]' : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'}`}
                    >
                        [ المرفوضة ]
                    </button>
                </div>

                {/* Main Content List */}
                {isLoading ? (
                    <div className="text-center py-40 border-8 border-double border-[var(--foreground)] bg-[var(--background)] animate-pulse">
                        <p className="text-3xl font-black uppercase tracking-widest">تحميل_البيانات... (MEM_STREAMING)</p>
                    </div>
                ) : filteredSubmissions.length === 0 ? (
                    <div className="text-center py-40 border-4 border-dashed border-[var(--foreground)] bg-[var(--background)]">
                        <div className="text-8xl mb-8 opacity-20">[!]</div>
                        <h3 className="text-4xl font-black text-[var(--foreground)] uppercase mb-4">لا توجد سجلات حالية</h3>
                        <p className="font-bold opacity-30">// END_OF_FILE_REACHED</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-10">
                        {filteredSubmissions.map((submission) => (
                            <div
                                key={submission.id}
                                className="bg-[var(--background)] border-4 border-[var(--foreground)] p-8 pixel-card shadow-[10px_10px_0_0_var(--foreground)] relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--foreground)] opacity-10"></div>

                                <div className="flex flex-col lg:flex-row gap-10">
                                    {/* Detailed Info Section */}
                                    <div className="flex-1 space-y-8">
                                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between border-b-4 border-double border-[var(--foreground)] pb-6 gap-4">
                                            <div className="text-right">
                                                <h3 className="text-3xl font-black uppercase leading-none tracking-tight">
                                                    {submission.group_name}
                                                </h3>
                                                <p className="text-[10px] font-black opacity-30 mt-2">OBJ_ID: {submission.id.toUpperCase()}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-[10px] border-2 border-[var(--foreground)] px-3 py-1 uppercase bg-[var(--foreground)] text-[var(--background)]">
                                                    {submission.platform === 'telegram' ? 'PROTO: T_GRAM' : 'PROTO: W_APP'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-right text-xs">
                                            <div className="space-y-1">
                                                <p className="opacity-40 font-black uppercase tracking-widest">الكلية (COL):</p>
                                                <p className="font-black text-sm">{submission.college}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="opacity-40 font-black uppercase tracking-widest">المادة (SUB):</p>
                                                <p className="font-black text-sm">{submission.subject}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="opacity-40 font-black uppercase tracking-widest">الشعبة (SEC):</p>
                                                <p className="font-black text-sm">#{submission.section_number}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="opacity-40 font-black uppercase tracking-widest">المُرسل (SRC):</p>
                                                <p className="font-black text-sm">{submission.submitter_name}</p>
                                            </div>
                                        </div>

                                        <div className="text-right border-t-2 border-dotted border-[var(--foreground)] pt-6">
                                            <p className="opacity-40 font-black uppercase tracking-widest text-[10px] mb-2">رابط_المجموعة (TARGET_LINK):</p>
                                            <a
                                                href={submission.group_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline font-black break-all text-sm font-mono text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-400 dark:group-hover:text-black transition-colors"
                                            >
                                                {submission.group_link}
                                            </a>
                                        </div>

                                        <p className="text-[10px] font-black text-right pt-2 opacity-30 uppercase tracking-widest">
                                            تاريخ_الإرسال: {formatDate(submission.created_at)}
                                        </p>
                                    </div>

                                    {/* Action Command Section */}
                                    {submission.status === 'pending' && (
                                        <div className="flex flex-col gap-6 lg:w-64 justify-center border-r-0 lg:border-r-4 border-double border-[var(--foreground)] lg:pr-10">
                                            <button
                                                onClick={() => handleApprove(submission.id)}
                                                className="bg-[var(--foreground)] text-[var(--background)] px-6 py-5 font-black text-lg border-2 border-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-none uppercase shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] active:translate-y-2 active:shadow-none"
                                            >
                                                [ اعتماد_NODE ]
                                            </button>
                                            <button
                                                onClick={() => handleReject(submission.id)}
                                                className="bg-[var(--background)] text-red-600 dark:text-red-400 px-6 py-5 font-black text-lg border-4 border-red-600 dark:border-red-400 hover:bg-red-600 dark:hover:bg-red-400 hover:text-white dark:hover:text-black transition-none uppercase shadow-[6px_6px_0_0_rgba(255,0,0,0.2)] active:translate-y-2 active:shadow-none"
                                            >
                                                [ رفض_NODE ]
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
