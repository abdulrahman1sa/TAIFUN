import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const facultyId = searchParams.get('facultyId');

    if (!facultyId) {
        return NextResponse.json({ error: 'Faculty ID is required' }, { status: 400 });
    }

    try {
        const subjects = await prisma.subject.findMany({
            where: { facultyId: parseInt(facultyId) },
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(subjects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
    }
}
