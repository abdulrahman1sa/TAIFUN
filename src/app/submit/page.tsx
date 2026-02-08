'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    DoodleCard,
    DoodleButton,
    DoodleInput,
    DoodleSelect,
    DoodleBadge
} from '@/components/DoodleComponents';

const universities = [
    'جامعة أم القرى', 'الجامعة الإسلامية', 'جامعة الإمام محمد بن سعود الإسلامية', 'جامعة الملك سعود',
    'جامعة الملك عبدالعزيز', 'جامعة الملك فهد للبترول والمعادن', 'جامعة الملك فيصل', 'جامعة الملك خالد',
    'جامعة القصيم', 'جامعة طيبة', 'جامعة الطائف', 'جامعة حائل', 'جامعة جازان', 'جامعة الجوف',
    'جامعة تبوك', 'جامعة الباحة', 'جامعة نجران', 'جامعة الحدود الشمالية', 'جامعة الأميرة نورة بنت عبدالرحمن',
    'جامعة الملك سعود بن عبدالعزيز للعلوم الصحية', 'جامعة شقراء', 'جامعة المجمعة', 'جامعة حفر الباطن',
    'جامعة بيشة', 'جامعة جدة', 'جامعة الملك عبدالله للعلوم والتقنية', 'جامعة الإمام عبدالرحمن بن فيصل',
    'جامعة الأمير سطام بن عبدالعزيز', 'جامعة الملك سلمان', 'جامعة الجبيل', 'جامعة الفيصل',
    'جامعة الأمير سلطان', 'جامعة عفت', 'جامعة دار العلوم', 'جامعة المعرفة', 'جامعة رياض العلم',
    'جامعة المستقبل', 'جامعة اليمامة', 'جامعة الأعمال والتكنولوجيا', 'جامعة عناية', 'جامعة الفارابي',
    'جامعة الشرق الأوسط', 'جامعة الأصالة', 'جامعة ابن رشد', 'جامعة جدة الأهلية', 'أخرى'
];

export default function SubmitPage() {
    const [platform, setPlatform] = useState<'telegram' | 'whatsapp'>('telegram');
    const [groupType, setGroupType] = useState<'subject' | 'section'>('section');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [customCollege, setCustomCollege] = useState('');
    const [subjectInput, setSubjectInput] = useState('');
    const [sectionNumber, setSectionNumber] = useState('');
    const [groupLink, setGroupLink] = useState('');
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [submitterName, setSubmitterName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const college = selectedCollege === 'أخرى' ? customCollege : selectedCollege;

        try {
            const response = await fetch('/api/groups/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    platform,
                    groupType,
                    college: college,
                    subject: groupType === 'subject' ? 'عام' : subjectInput,
                    sectionNumber: groupType === 'subject' ? 'عام' : sectionNumber,
                    groupLink,
                    groupName,
                    description,
                    submitterName,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setSubjectInput('');
                setSectionNumber('');
                setGroupLink('');
                setGroupName('');
                setSubmitterName('');
                setCustomCollege('');
                setDescription('');
            } else {
                const errorData = await response.json();
                console.error('Submission failed:', errorData);
                setSubmitStatus('error');
                alert(`فشل الإرسال: ${errorData.error || 'خطأ غير معروف'}`);
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 rotate-[1deg]">
                    <h1 className="text-5xl font-black mb-4 inline-block bg-[#FFD400] px-6 py-2 doodle-border-sm">
                        إضافة شعبة جديدة ✍️
                    </h1>
                    <p className="font-bold opacity-70">ساعد زملاءك وشارك روابط الشعب الموثقة!</p>
                </div>

                {/* Form */}
                <DoodleCard rotate="-rotate-[0.5deg]">
                    <form onSubmit={handleSubmit} className="space-y-10 p-2 md:p-6 text-right">

                        {/* Platform & Type Selector */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="font-black text-sm uppercase block opacity-40">المنصة:</label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPlatform('telegram')}
                                        className={`flex-1 py-4 doodle-border-sm font-black transition-all ${platform === 'telegram' ? 'bg-[#FFD400] shadow-[4px_4px_0_0_black]' : 'bg-white opacity-50'}`}
                                    >
                                        تيليجرام ✈️
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPlatform('whatsapp')}
                                        className={`flex-1 py-4 doodle-border-sm font-black transition-all ${platform === 'whatsapp' ? 'bg-[#FFD400] shadow-[4px_4px_0_0_black]' : 'bg-white opacity-50'}`}
                                    >
                                        واتساب 💬
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="font-black text-sm uppercase block opacity-40">نوع المجموعة:</label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setGroupType('section')}
                                        className={`flex-1 py-4 doodle-border-sm font-black transition-all ${groupType === 'section' ? 'bg-[#FFD400] shadow-[4px_4px_0_0_black]' : 'bg-white opacity-50'}`}
                                    >
                                        قروب شعبة 🔢
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setGroupType('subject')}
                                        className={`flex-1 py-4 doodle-border-sm font-black transition-all ${groupType === 'subject' ? 'bg-[#FFD400] shadow-[4px_4px_0_0_black]' : 'bg-white opacity-50'}`}
                                    >
                                        قروب مادة عام 📚
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* College & Subject */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3 rotate-[0.5deg]">
                                <label className="font-black text-sm uppercase opacity-40">الجامعة</label>
                                <DoodleSelect value={selectedCollege} onChange={(e) => setSelectedCollege(e.target.value)} required>
                                    <option value="">اختار جامعتك</option>
                                    {universities.map(c => <option key={c} value={c}>{c}</option>)}
                                </DoodleSelect>
                            </div>

                            {selectedCollege === 'أخرى' && (
                                <div className="space-y-3 md:col-span-2 animate-bounce rotate-[-1deg]">
                                    <label className="font-black text-sm uppercase opacity-40">اسم جامعتك الرهيبة</label>
                                    <DoodleInput
                                        placeholder="اكتب اسم الجامعة هنا..."
                                        value={customCollege}
                                        onChange={(e) => setCustomCollege(e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                            <div className={`space-y-3 -rotate-[0.5deg] transition-all ${groupType === 'subject' ? 'opacity-30 pointer-events-none' : ''}`}>
                                <label className="font-black text-sm uppercase opacity-40">رمز المادة</label>
                                <DoodleInput
                                    placeholder={groupType === 'subject' ? 'عام' : 'مثلاً: ARAB 101'}
                                    value={subjectInput}
                                    onChange={(e) => setSubjectInput(e.target.value)}
                                    required={groupType === 'section'}
                                />
                            </div>
                        </div>

                        {/* Group Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className={`space-y-3 -rotate-[1deg] transition-all ${groupType === 'subject' ? 'opacity-30 pointer-events-none' : ''}`}>
                                <label className="font-black text-sm uppercase opacity-40">رقم الشعبة</label>
                                <DoodleInput
                                    placeholder={groupType === 'subject' ? 'غير مطلوب' : 'مثلاً: 123'}
                                    value={sectionNumber}
                                    onChange={(e) => setSectionNumber(e.target.value)}
                                    required={groupType === 'section'}
                                />
                            </div>
                            <div className="space-y-3 rotate-[1deg]">
                                <label className="font-black text-sm uppercase opacity-40">اسم القروب</label>
                                <DoodleInput
                                    placeholder="مثلاً: قروب طلاب الفيزياء"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3 rotate-[-0.5deg]">
                            <label className="font-black text-sm uppercase opacity-40">وصف المجموعة (اختياري)</label>
                            <DoodleInput
                                placeholder="اكتب تفاصيل إضافية هنا..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Link */}
                        <div className="space-y-3">
                            <label className="font-black text-sm uppercase opacity-40">رابط الدعوة</label>
                            <DoodleInput
                                type="url"
                                dir="ltr"
                                placeholder="https://..."
                                value={groupLink}
                                onChange={(e) => setGroupLink(e.target.value)}
                                required
                                className="text-left font-mono"
                            />
                        </div>

                        {/* Submitter Info */}
                        <div className="space-y-3 -rotate-[0.5deg]">
                            <label className="font-black text-sm uppercase opacity-40">اسمك (اختياري)</label>
                            <DoodleInput
                                placeholder="من أنت؟"
                                value={submitterName}
                                onChange={(e) => setSubmitterName(e.target.value)}
                            />
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <DoodleBadge className="w-full py-4 text-center bg-green-400 rotate-0">
                                تم الإرسال بنجاح! جاري المراجعة 🚀
                            </DoodleBadge>
                        )}
                        {submitStatus === 'error' && (
                            <DoodleBadge className="w-full py-4 text-center bg-red-400 rotate-0">
                                فشل الإرسال! تأكد من البيانات ❌
                            </DoodleBadge>
                        )}

                        <DoodleButton type="submit" disabled={isSubmitting} className="w-full py-6 text-2xl" variant="primary">
                            {isSubmitting ? 'جاري الرفع... ✏️' : 'أرسل الشعبة الآن! ✅'}
                        </DoodleButton>
                    </form>
                </DoodleCard>

                {/* Important Note */}
                <div className="mt-16 rotate-[1deg]">
                    <DoodleCard className="bg-[#FF7A00]/10 border-dashed">
                        <h3 className="text-xl font-black mb-4">تنبيه هام 🚨</h3>
                        <p className="font-bold opacity-80 text-sm leading-relaxed">
                            تأكد من أن الرابط يعمل بشكل صحيح، سيتم مراجعة الطلبات يدوياً قبل ظهورها في الدليل. شكراً لمساهمتك!
                        </p>
                    </DoodleCard>
                </div>

            </div>
        </div>
    );
}
