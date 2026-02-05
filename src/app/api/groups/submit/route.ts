import { NextRequest, NextResponse } from 'next/server';
import { supabaseFetch } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            platform,
            college,
            subject,
            sectionNumber,
            groupLink,
            groupName,
            submitterName,
        } = body;

        // Validation
        if (!platform || !college || !subject || !sectionNumber || !groupLink || !groupName) {
            return NextResponse.json(
                { error: 'جميع الحقول مطلوبة' },
                { status: 400 }
            );
        }

        // Prepare data for Supabase
        const submission = {
            platform,
            college,
            subject,
            section_number: sectionNumber, // supabase uses snake_case usually
            group_link: groupLink,
            group_name: groupName,
            submitter_name: submitterName || 'مجهول',
            status: 'pending',
        };

        // Insert into Supabase
        const data = await supabaseFetch('submissions', {
            method: 'POST',
            body: JSON.stringify(submission),
            headers: {
                'Prefer': 'return=representation'
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: 'تم إرسال المجموعة بنجاح! سيتم مراجعتها قريباً',
                submissionId: data[0].id,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error submitting group:', error);
        return NextResponse.json(
            { error: error.message || 'حدث خطأ أثناء إرسال المجموعة' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const data = await supabaseFetch('submissions?select=*&order=created_at.desc');
        return NextResponse.json({ submissions: data }, { status: 200 });
    } catch (error: any) {
        console.error('Error reading submissions:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء قراءة المجموعات' },
            { status: 500 }
        );
    }
}
