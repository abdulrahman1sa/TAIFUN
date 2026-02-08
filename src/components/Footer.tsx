'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="pt-20 pb-10 px-4 mt-20 border-t-4 border-dashed border-black/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-right mb-20">

                    {/* Brand */}
                    <div className="rotate-[-1deg]">
                        <h3 className="text-3xl font-black mb-6">دليل الشعب 📖</h3>
                        <p className="font-bold opacity-50 leading-relaxed">
                            مشروع طلابي يهدف لتسهيل الوصول للمجموعات الدراسية في الجامعات السعودية.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="rotate-[1deg]">
                        <h4 className="font-black text-xs uppercase opacity-30 mb-6 tracking-widest">خريطة الموقع</h4>
                        <ul className="space-y-4 font-black">
                            <li><Link href="/" className="hover:underline">الرئيسية</Link></li>
                            <li><Link href="/groups" className="hover:underline">دليل المجموعات</Link></li>
                            <li><Link href="/submit" className="hover:underline">إضافة رابط</Link></li>
                            <li><Link href="/admin" className="hover:underline">لوحة التحكم</Link></li>
                        </ul>
                    </div>

                    {/* Social/Call to Action */}
                    <div className="rotate-[-0.5deg]">
                        <h4 className="font-black text-xs uppercase opacity-30 mb-6 tracking-widest">المطور والدعم</h4>
                        <div className="space-y-4">
                            <a
                                href="https://t.me/DVVLLP"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 font-black group hover:text-[#FF7A00] transition-colors"
                            >
                                <span className="bg-white doodle-border-sm p-2 rotate-[5deg] group-hover:rotate-0 transition-transform">👨‍💻</span>
                                <div>
                                    <p className="text-sm">تطوير: @DVVLLP</p>
                                    <p className="text-[10px] opacity-40">حساب المطور الرسمي</p>
                                </div>
                            </a>
                            <a
                                href="https://t.me/DVVLLP"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 font-black group hover:text-[#FFD400] transition-colors"
                            >
                                <span className="bg-white doodle-border-sm p-2 rotate-[-5deg] group-hover:rotate-0 transition-transform">🛠️</span>
                                <div>
                                    <p className="text-sm">الدعم التقني</p>
                                    <p className="text-[10px] opacity-40">للمشاكل والاقتراحات</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t-2 border-dashed border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold opacity-30">
                    <p>© {new Date().getFullYear()} جميع الحقوق محفوظة. تم التطوير بواسطة <a href="https://t.me/DVVLLP" target="_blank" rel="noopener noreferrer" className="underline">DVVLLP</a></p>
                    <p>صُنع بكل حب ✏️❤️</p>
                </div>
            </div>
        </footer>
    );
}
