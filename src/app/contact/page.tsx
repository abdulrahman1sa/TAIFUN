'use client';

import { DoodleCard, DoodleButton, DoodleBadge } from '@/components/DoodleComponents';

export default function ContactPage() {
    return (
        <div className="pt-32 pb-20 px-4 flex items-center justify-center min-h-[80vh]">
            <DoodleCard className="max-w-xl w-full p-12 text-center rotate-[1deg]">
                <DoodleBadge className="mb-6 -rotate-[5deg]">تواصل معنا 📞</DoodleBadge>
                <h1 className="text-4xl font-black mb-6">عندك استفسار؟</h1>
                <p className="font-bold text-lg opacity-60 mb-10 leading-relaxed">
                    حاب تضيف قروب مو موجود؟ أو واجهت مشكلة تقنية؟
                    <br />
                    لا تشيل هم، إحنا هنا دايم!
                </p>

                <div className="space-y-6">
                    <a
                        href="https://t.me/DVVLLP"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <DoodleButton className="w-full py-5 text-xl" variant="primary">
                            تواصل عبر تيليجرام ✈️
                        </DoodleButton>
                    </a>
                    <p className="text-xs font-black opacity-30 uppercase tracking-widest">عادة نرد خلال ساعات قليلة ✨</p>
                </div>
            </DoodleCard>
        </div>
    );
}
