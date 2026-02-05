'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HiCheck, HiX, HiExternalLink } from 'react-icons/hi';

interface Submission {
    id: number;
    facultyName: string;
    subjectName: string;
    sectionNumber: string;
    telegramLink: string;
    groupName: string;
    notes: string;
    createdAt: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            fetchSubmissions();
        } else {
            alert('Wrong password');
        }
    };

    const fetchSubmissions = async () => {
        const res = await fetch('/api/admin/submissions', {
            headers: { 'x-admin-secret': 'admin123' }
        });
        if (res.ok) setSubmissions(await res.json());
    };

    const handleAction = async (id: number, action: 'approve' | 'reject') => {
        if (!confirm(`Are you sure you want to ${action}?`)) return;

        const res = await fetch(`/api/admin/submissions/${id}/${action}`, {
            method: 'POST',
            headers: { 'x-admin-secret': 'admin123' }
        });

        if (res.ok) {
            setSubmissions(prev => prev.filter(s => s.id !== id));
        } else {
            alert('Action failed');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-xl font-bold mb-4">Admin Login</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border p-2 rounded w-full mb-4"
                        placeholder="Password"
                    />
                    <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded">Login</button>
                </form>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="flex-grow pt-24 pb-16 px-4 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold mb-8">طلبات الإضافة المعلقة</h1>

                <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التفاصيل</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الرابط</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ملاحظات</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">لا توجد طلبات جديدة</td>
                                </tr>
                            ) : (
                                submissions.map(sub => (
                                    <tr key={sub.id}>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{sub.subjectName}</div>
                                            <div className="text-sm text-gray-500">{sub.facultyName} - شعبة {sub.sectionNumber}</div>
                                            {sub.groupName && <div className="text-xs text-gray-400 mt-1">{sub.groupName}</div>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={sub.telegramLink} target="_blank" className="text-primary-600 hover:text-primary-900 flex items-center gap-1">
                                                <HiExternalLink /> معاينة
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {sub.notes || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                            <button
                                                onClick={() => handleAction(sub.id, 'approve')}
                                                className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md flex items-center gap-1"
                                            >
                                                <HiCheck /> اعتماد
                                            </button>
                                            <button
                                                onClick={() => handleAction(sub.id, 'reject')}
                                                className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md flex items-center gap-1"
                                            >
                                                <HiX /> رفض
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    );
}
