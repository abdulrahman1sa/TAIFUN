# دليل الشعب - University Sections Group Directory

تطبيق ويب لتنظيم ومشاركة روابط قروبات التليجرام للشعب الجامعية.

## المميزات
- تصميم عصري وسهل الاستخدام (Modern UI).
- دعم كامل للعربية (RTL).
- بحث متسلسل (كلية > مادة > شعبة).
- تصويت على صحة الروابط (Upvote/Downvote).
- لوحة تحكم للأدمن لمراجعة الإضافات.

## التشغيل

1. **تثبيت الاعتمادات** (تم بالفعل):
   ```bash
   npm install
   ```

2. **تهيئة قاعدة البيانات** (تم بالفعل):
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

3. **تشغيل السيرفر**:
   ```bash
   npm run dev
   ```

4. **الدخول للموقع**:
   افتح المتصفح على [http://localhost:3000](http://localhost:3000).

## لوحة التحكم (Admin)
- الدخول: `/admin`
- كلمة المرور التجريبية: `admin123`

## التقنيات
- Next.js 14
- Tailwind CSS
- Prisma (SQLite)
- Heroicons

تم التطوير بواسطة Antigravity.
