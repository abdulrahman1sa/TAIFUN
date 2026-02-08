import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const taifGroups = [
    {
        groupName: 'بيع وطلب الكتب - جامعة الطائف',
        subject: 'خدمات عامة',
        description: 'بيع او طلب الكتب لجميع تخصصات جامعة الطائف',
        groupLink: 'https://t.me/bookTaifUniversity',
    },
    {
        groupName: 'الفصل الصيفي - جامعة الطائف',
        subject: 'خدمات عامة',
        description: 'الفصـل الصيفـي | جامعـة الطائـف',
        groupLink: 'https://t.me/summerTaifUniversity',
    },
    {
        groupName: 'كلية التقنية',
        subject: 'كلية التقنية',
        description: 'قروب طلاب كلية التقنية',
        groupLink: 'https://t.me/tvtcVocationalTaifCorporation',
    },
    {
        groupName: 'كلية الآداب',
        subject: 'كلية الآداب',
        description: 'اللغة العربية - اللغة الإنجليزية - الإعلام وعلوم الاتصال - علم النفس - التاريخ',
        groupLink: 'https://t.me/aladabTaifUniversity',
    },
    {
        groupName: 'كلية التربية',
        subject: 'كلية التربية',
        description: 'علوم الرياضة - الطفولة المبكرة',
        groupLink: 'https://t.me/educationTaifUniversity',
    },
    {
        groupName: 'الكلية التطبيقية (الدبلوم)',
        subject: 'الكلية التطبيقية',
        description: 'ادارة انظمة الشبكات - تكنولوجيا حماية البيئة - البرمجه وعلوم الحاسب - الاداره الماليه - سلامة الغذاء - الاحصاء التطبيقي - المحاسبه - الاعلانات والاتصال التسويقي - السكرتاريه التنفيذيه - الموارد البشريه - تقنية هندسة المساحه - تقنية السلامه والوقايه - تصميم الازياء - التجارة الألكترونية - الابتكار وريادة الأعمال - الأمن السيبراني',
        groupLink: 'https://t.me/appliedstudiesTaifUniversity',
    },
    {
        groupName: 'دبلوم المناولة الأرضية للطيران',
        subject: 'دبلوم الطيران',
        description: 'دبلوم المناولة الأرضية للطيران',
        groupLink: 'https://t.me/aviationTaifUniversity',
    },
    {
        groupName: 'كلية العلوم',
        subject: 'كلية العلوم',
        description: 'الكيمياء - الفيزياء - أحياء عامة - أحياء دقيقة - أحياء نبات - الرياضيات والاحصاء - التقنية الحيوية - علوم الغذاء والتغذية',
        groupLink: 'https://t.me/TaifUnivierstiy1',
    },
    {
        groupName: 'كلية الهندسة',
        subject: 'كلية الهندسة',
        description: 'الكهربائية - الميكانيكية - المدنية - المعمارية - الصناعية',
        groupLink: 'https://t.me/engineeringTaifUniversity',
    },
    {
        groupName: 'كلية الحاسبات وتقنية المعلومات',
        subject: 'كلية الحاسبات',
        description: 'هندسة الحاسب - علوم الحاسب - تقنية المعلومات',
        groupLink: 'https://t.me/computersTaifUniversity',
    },
    {
        groupName: 'كلية التصاميم والفنون التطبيقية',
        subject: 'كلية التصاميم',
        description: 'الفنون - التصميم الجرافيكي - التصميم الداخلي - تصميم الأزياء والنسيج',
        groupLink: 'https://t.me/designsTaifUniversity',
    },
    {
        groupName: 'كلية الشريعة والأنظمة',
        subject: 'كلية الشريعة',
        description: 'الشريعة - الأنظمة - الدراسات الأسلامية - القراءات - القرآن وعلومه',
        groupLink: 'https://t.me/+TKCYp3jPayCyUgSw',
    },
    {
        groupName: 'كلية ادارة الأعمال',
        subject: 'كلية إدارة الأعمال',
        description: 'المحاسبة - الاقتصاد - التمويل - التأمين - نظم المعلومات - التسويق - إداره أعمال',
        groupLink: 'https://t.me/+na12acQgxzxkZTZk',
    },
    {
        groupName: 'كلية الطب',
        subject: 'كلية الطب',
        description: 'قروب طلاب كلية الطب',
        groupLink: 'https://t.me/medicine_Tu',
    },
    {
        groupName: 'كلية طب الأسنان',
        subject: 'كلية طب الأسنان',
        description: 'قروب طلاب كلية طب الأسنان',
        groupLink: 'https://t.me/Dentistry_TU',
    },
    {
        groupName: 'كلية الصيدلة',
        subject: 'كلية الصيدلة',
        description: 'قروب طلاب كلية الصيدلة',
        groupLink: 'https://t.me/Pharma_DTU33',
    },
    {
        groupName: 'كلية التمريض',
        subject: 'كلية التمريض',
        description: 'قروب طلاب كلية التمريض',
        groupLink: 'https://t.me/nursstudent',
    },
    {
        groupName: 'كلية العلاج الطبيعي',
        subject: 'كلية العلاج الطبيعي',
        description: 'قروب طلاب كلية العلاج الطبيعي',
        groupLink: 'https://t.me/Physical_therapyTU',
    },
    {
        groupName: 'كلية علوم الأشعة',
        subject: 'كلية علوم الأشعة',
        description: 'قروب طلاب كلية علوم الأشعة',
        groupLink: 'https://t.me/RadiologySciences',
    },
    {
        groupName: 'كلية المختبرات الاكلينيكية',
        subject: 'كلية المختبرات',
        description: 'قروب طلاب كلية المختبرات الاكلينيكية',
        groupLink: 'https://t.me/labrotary_Tu',
    },
    {
        groupName: 'جامعة الطائف - فرع تربة',
        subject: 'فرع تربة',
        description: 'قروب طلاب فرع تربة',
        groupLink: 'https://t.me/+LTvqFqmbNhU3Nzg0',
    },
    {
        groupName: 'جامعة الطائف - فرع الخرمة',
        subject: 'فرع الخرمة',
        description: 'قروب طلاب فرع الخرمة',
        groupLink: 'https://t.me/+TI4sw9271iJhNDU0',
    },
    {
        groupName: 'جامعة الطائف - فرع رنية',
        subject: 'فرع رنية',
        description: 'قروب طلاب فرع رنية',
        groupLink: 'https://t.me/+LhI_BEwURHNlNGZk',
    },
];

async function main() {
    console.log('🚀 بدء إضافة مجموعات جامعة الطائف...\n');

    for (const group of taifGroups) {
        try {
            // إضافة كطلب جديد (Submission)
            const submission = await prisma.groupSubmission.create({
                data: {
                    platform: 'telegram',
                    groupType: 'subject',
                    college: 'جامعة الطائف',
                    subject: group.subject,
                    sectionNumber: 'عام',
                    groupLink: group.groupLink,
                    groupName: group.groupName,
                    description: group.description,
                    submitterName: 'المسؤول',
                    status: 'pending',
                },
            });

            // الموافقة التلقائية وإضافتها للمجموعات المعتمدة
            await prisma.group.create({
                data: {
                    platform: 'telegram',
                    groupType: 'subject',
                    college: 'جامعة الطائف',
                    subject: group.subject,
                    sectionNumber: 'عام',
                    groupLink: group.groupLink,
                    groupName: group.groupName,
                    description: group.description,
                },
            });

            // تحديث حالة الطلب إلى "معتمد"
            await prisma.groupSubmission.update({
                where: { id: submission.id },
                data: { status: 'approved' },
            });

            console.log(`✅ تمت إضافة: ${group.groupName}`);
        } catch (error) {
            console.error(`❌ فشل إضافة: ${group.groupName}`, error);
        }
    }

    console.log('\n🎉 انتهت العملية بنجاح!');
}

main()
    .catch((e) => {
        console.error('❌ حدث خطأ:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
