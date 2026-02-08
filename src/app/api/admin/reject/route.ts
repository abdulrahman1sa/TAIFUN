import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, reason } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'معرف المجموعة مطلوب' },
                { status: 400 }
            );
        }

        // Update status to rejected in Prisma
        await (prisma as any).groupSubmission.update({
            where: { id },
            data: {
                status: 'rejected',
                reviewNote: reason || 'غير محدد',
                updatedAt: new Date()
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: 'تم رفض المجموعة بنجاح',
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error rejecting submission:', error);
        return NextResponse.json(
            {
                error: 'حدث خطأ في قاعدة البيانات أثناء الرفض',
                details: error.message
            },
            { status: 500 }
        );
    }
}
