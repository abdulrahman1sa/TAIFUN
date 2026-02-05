import { NextRequest, NextResponse } from 'next/server';
import { supabaseFetch } from '@/lib/supabase';

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

        // Update status to rejected in Supabase
        await supabaseFetch(`submissions?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: 'rejected',
                rejection_reason: reason || 'غير محدد',
                rejected_at: new Date().toISOString()
            })
        });

        return NextResponse.json(
            {
                success: true,
                message: 'تم رفض المجموعة',
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error rejecting submission:', error);
        return NextResponse.json(
            { error: error.message || 'حدث خطأ أثناء رفض المجموعة' },
            { status: 500 }
        );
    }
}
