'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FloatingContact from '@/components/FloatingContact';

const colleges = [
    'كلية الهندسة', 'كلية الطب', 'كلية العلوم', 'كلية الآداب',
    'كلية التجارة', 'كلية الحقوق', 'كلية الصيدلة', 'كلية طب الأسنان',
    'كلية علوم الحاسب والمعلومات', 'كلية العلوم الطبية التطبيقية',
    'كلية التمريض', 'كلية العمارة والتخطيط', 'كلية اللغات والترجمة',
    'كلية التربية', 'كلية الشريعة', 'كلية الإعلام', 'أخرى (كتابة يدوية)'
];

export default function SubmitPage() {
    const [platform, setPlatform] = useState<'telegram' | 'whatsapp'>('telegram');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [customCollege, setCustomCollege] = useState('');
    const [subjectInput, setSubjectInput] = useState('');
    const [sectionNumber, setSectionNumber] = useState('');
    const [groupLink, setGroupLink] = useState('');
    const [groupName, setGroupName] = useState('');
    const [submitterName, setSubmitterName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const finalCollege = selectedCollege === 'أخرى (كتابة يدوية)' ? customCollege : selectedCollege;

        try {
            const response = await fetch('/api/groups/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    platform,
                    college: finalCollege,
                    subject: subjectInput,
                    sectionNumber,
                    groupLink,
                    groupName,
                    submitterName,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                // Reset form
                setSelectedCollege('');
                setCustomCollege('');
                setSubjectInput('');
                setSectionNumber('');
                setGroupLink('');
                setGroupName('');
                setSubmitterName('');
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[var(--background)] min-h-screen pt-24 relative overflow-hidden">
            <div className="fixed inset-0 dither-bg pointer-events-none opacity-5 z-0"></div>
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block border-4 border-double border-[var(--foreground)] px-8 py-3 mb-4 bg-[var(--background)]">
                        <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tighter uppercase">
                            إضافة_مجموعة_جديدة ➕
                        </h1>
                    </div>
                    <p className="text-lg text-[var(--foreground)] font-bold">
                        <span className="cursor-blink">// جاري_تجهيز_طلب_الإضافة: قيد_المراجعة_</span>
                    </p>
                </div>

                {/* Form Wrapper */}
                <div className="relative">
                    <form onSubmit={handleSubmit} className="pixel-card relative bg-[var(--background)] border-4 border-[var(--foreground)] p-8 md:p-12 shadow-[10px_10px_0_0_var(--foreground)] space-y-12">
                        <div className="absolute top-0 right-0 p-2 bg-[var(--foreground)] text-[var(--background)] font-black text-[10px] uppercase">FORM_ID: #SUB_001</div>

                        {/* Platform Toggle */}
                        <div className="space-y-6">
                            <label className="block text-right text-xs font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">
                                &gt; اختر_المنصة (SELECT_PLATFORM):
                            </label>
                            <div className="grid grid-cols-2 gap-6 p-1 bg-[var(--foreground)] border-2 border-[var(--foreground)]">
                                <button
                                    type="button"
                                    onClick={() => setPlatform('whatsapp')}
                                    className={`flex items-center justify-center gap-4 py-4 font-black transition-none uppercase rounded-none ${platform === 'whatsapp'
                                        ? 'bg-[var(--background)] text-[var(--foreground)]'
                                        : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'
                                        }`}
                                >
                                    [ واتساب ]
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPlatform('telegram')}
                                    className={`flex items-center justify-center gap-4 py-4 font-black transition-none uppercase rounded-none ${platform === 'telegram'
                                        ? 'bg-[var(--background)] text-[var(--foreground)]'
                                        : 'text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] opacity-60'
                                        }`}
                                >
                                    [ تليجرام ]
                                </button>
                            </div>
                        </div>

                        {/* College Select */}
                        <div className="space-y-3">
                            <label className="block text-right text-xs font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">
                                &gt; اختيار_الكلية (COLLEGE_ID):
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCollege}
                                    onChange={(e) => setSelectedCollege(e.target.value)}
                                    className="w-full px-6 py-5 bg-[var(--background)] border-4 border-[var(--foreground)] focus:shadow-[6px_6px_0_0_var(--foreground)] transition-none outline-none font-bold text-xl appearance-none cursor-pointer rounded-none"
                                    required
                                    title="اختر الكلية"
                                >
                                    <option value="">[ اختر_من_القائمة ]</option>
                                    {colleges.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none font-bold">▼</div>
                            </div>

                            {selectedCollege === 'أخرى (كتابة يدوية)' && (
                                <input
                                    type="text"
                                    value={customCollege}
                                    onChange={(e) => setCustomCollege(e.target.value)}
                                    placeholder="اكتب اسم الكلية هنا..."
                                    className="w-full px-6 py-5 bg-[var(--background)] border-4 border-[var(--foreground)] focus:shadow-[6px_6px_0_0_var(--foreground)] transition-none outline-none font-bold text-xl rounded-none mt-4 animate-fade-in"
                                    required
                                />
                            )}
                        </div>

                        {/* Subject Input */}
                        <div className="space-y-3">
                            <label className="block text-right text-xs font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">
                                &gt; اسم_أو_رمز_المادة (SUBJECT_NAME):
                            </label>
                            <input
                                type="text"
                                value={subjectInput}
                                onChange={(e) => setSubjectInput(e.target.value)}
                                placeholder="مثال: MATH_101"
                                className="w-full px-6 py-5 bg-[var(--background)] border-4 border-[var(--foreground)] focus:shadow-[6px_6px_0_0_var(--foreground)] transition-none outline-none font-bold text-xl rounded-none placeholder:[var(--foreground)]/30"
                                required
                            />
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="block text-right text-xs font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">
                                    &gt; رقم_الشعبة (SECTION_NO):
                                </label>
                                <input
                                    type="text"
                                    value={sectionNumber}
                                    onChange={(e) => setSectionNumber(e.target.value)}
                                    placeholder="مثال: 001"
                                    className="w-full px-6 py-5 bg-[var(--background)] border-4 border-[var(--foreground)] focus:shadow-[6px_6px_0_0_var(--foreground)] transition-none outline-none font-bold text-xl rounded-none placeholder:[var(--foreground)]/30"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-right text-xs font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">
                                    &gt; مسمى_المجموعة (LABEL):
                                </label>
                                <input
                                    type="text"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="مثال: قروب فيزياء 101"
                                    className="w-full px-6 py-5 bg-[var(--background)] border-4 border-[var(--foreground)] focus:shadow-[6px_6px_0_0_var(--foreground)] transition-none outline-none font-bold text-xl rounded-none placeholder:[var(--foreground)]/30"
                                    required
                                />
                            </div>
                        </div>

                        {/* Link Input */}
                        <div className="space-y-3">
                            <label className="block text-right text-xs font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">
                                &gt; رابط_الدعوة (INVITE_URL):
                            </label>
                            <input
                                type="url"
                                value={groupLink}
                                onChange={(e) => setGroupLink(e.target.value)}
                                dir="ltr"
                                placeholder={platform === 'telegram' ? 'https://t.me/...' : 'https://chat.whatsapp.com/...'}
                                className="w-full px-6 py-5 bg-[var(--background)] border-4 border-[var(--foreground)] focus:shadow-[6px_6px_0_0_var(--foreground)] transition-none outline-none font-bold text-lg text-left rounded-none font-mono placeholder:[var(--foreground)]/20"
                                required
                            />
                        </div>

                        {/* Status Messasges */}
                        {submitStatus === 'success' && (
                            <div className="p-8 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-4 border-green-600 font-black text-right animate-fade-in">
                                &gt; تم التوصيل: تم إرسال المجموعة للمراجعة بنجاح!
                                <p className="text-xs mt-2 opacity-70">STATUS_200: SUCCESSFUL_UPLOAD</p>
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="p-8 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-4 border-red-600 font-black text-right border-dashed animate-fade-in">
                                &gt; خطأ في الإرسال: يرجى التأكد من الرابط والمحاولة مرة أخرى.
                                <p className="text-xs mt-2 opacity-70">STATUS_400: REQUEST_FAILURE</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[var(--foreground)] text-[var(--background)] py-8 font-black text-2xl hover:bg-[var(--background)] hover:text-[var(--foreground)] border-4 border-[var(--foreground)] transition-none shadow-[10px_10px_0_0_rgba(0,0,0,0.4)] active:translate-y-2 active:shadow-none disabled:opacity-50 rounded-none uppercase tracking-widest group"
                        >
                            {isSubmitting ? 'جاري_الرفع... (UPLOADING)' : '> تنفيذ_الإرسال (EXECUTE_ADDITION)'}
                        </button>
                    </form>
                </div>

                {/* Footer Notes */}
                <div className="mt-16 bg-[var(--background)] border-4 border-dashed border-[var(--foreground)] p-10 text-right shadow-[8px_8px_0_0_rgba(0,0,0,0.1)]">
                    <h3 className="font-black text-2xl mb-8 flex items-center justify-end gap-4 text-[var(--foreground)] uppercase">
                        <span>ميثاق_الاستخدام</span>
                        <span className="text-xs opacity-50">CODE_OF_CONDUCT_V1.0</span>
                    </h3>
                    <ul className="space-y-6 text-[var(--foreground)] font-bold text-sm">
                        <li className="flex items-center justify-end gap-3">// يمنع منعاً باتاً نشر محتوى ترويجي أو إعلانات خارج الإطار الأكاديمي.</li>
                        <li className="flex items-center justify-end gap-3">// يجب التأكد من صحة رقم الشعبة والمادة لتسهيل عملية البحث.</li>
                        <li className="flex items-center justify-end gap-3">// يتم حذف الروابط المعطلة أو المجموعات المخالفة تلقائياً.</li>
                    </ul>
                </div>
            </div>

            <FloatingContact />
        </div>
    );
}
