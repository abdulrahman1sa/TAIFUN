import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const subjectId = searchParams.get('subjectId');

    if (!subjectId) {
        return NextResponse.json({ error: 'Subject ID is required' }, { status: 400 });
    }

    try {
        const sections = await prisma.section.findMany({
            where: { subjectId: parseInt(subjectId) },
            orderBy: { sectionNumber: 'asc' },
        });
        return NextResponse.json(sections);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
    }
}
