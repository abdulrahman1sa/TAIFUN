import { NextRequest, NextResponse } from 'next/server';
import { supabaseFetch } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'معرف المجموعة مطلوب' },
                { status: 400 }
            );
        }

        // Update status to approved in Supabase
        await supabaseFetch(`submissions?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: 'approved',
                approved_at: new Date().toISOString()
            })
        });

        return NextResponse.json(
            {
                success: true,
                message: 'تم قبول المجموعة بنجاح',
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error approving submission:', error);
        return NextResponse.json(
            { error: error.message || 'حدث خطأ أثناء قبول المجموعة' },
            { status: 500 }
        );
    }
}
