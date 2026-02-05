import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const sectionId = searchParams.get('sectionId');

    if (!sectionId) {
        return NextResponse.json({ error: 'Section ID is required' }, { status: 400 });
    }

    try {
        const groups = await prisma.group.findMany({
            where: {
                sectionId: parseInt(sectionId),
                status: { not: 'hidden' } // Show approved and pending (maybe with a flag)
            },
            orderBy: { upvotes: 'desc' },
        });
        return NextResponse.json(groups);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
    }
}
