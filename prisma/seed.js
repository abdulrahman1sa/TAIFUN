const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create Faculty: College of Science
    const scienceFaculty = await prisma.faculty.create({
        data: {
            name: 'كلية العلوم',
            subjects: {
                create: [
                    {
                        name: 'فيزياء 101',
                        sections: {
                            create: [
                                {
                                    sectionNumber: '3',
                                    groups: {
                                        create: [
                                            {
                                                telegramLink: 'https://t.me/example_group_link',
                                                groupName: 'قروب فيزياء 101 - شعبة 3',
                                                status: 'approved',
                                                upvotes: 5,
                                            }
                                        ]
                                    }
                                },
                                {
                                    sectionNumber: '9',
                                }
                            ]
                        }
                    },
                    {
                        name: 'كيمياء 101',
                        sections: {
                            create: [
                                { sectionNumber: '1' }
                            ]
                        }
                    }
                ]
            }
        }
    });

    const engineeringFaculty = await prisma.faculty.create({
        data: {
            name: 'كلية الهندسة',
            subjects: {
                create: [
                    { name: 'هندسة برمجيات' },
                    { name: 'شبكات حاسب' }
                ]
            }
        }
    });

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
