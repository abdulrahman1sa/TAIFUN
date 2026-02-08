import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const groups = await (prisma as any).group.findMany();
        const submissions = await (prisma as any).groupSubmission.findMany();

        return NextResponse.json({
            groups,
            submissions,
            groupCount: groups.length,
            submissionCount: submissions.length
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
