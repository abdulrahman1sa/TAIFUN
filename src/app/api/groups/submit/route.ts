import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to store submissions
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions.json');

// Ensure data directory exists
function ensureDataDirectory() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([]));
    }
}

// Read submissions from file
function readSubmissions() {
    try {
        ensureDataDirectory();
        const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Write submissions to file
function writeSubmissions(submissions: any[]) {
    ensureDataDirectory();
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

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

        // Validate platform
        if (platform !== 'telegram' && platform !== 'whatsapp') {
            return NextResponse.json(
                { error: 'نوع المجموعة غير صحيح' },
                { status: 400 }
            );
        }

        // Validate link format
        if (platform === 'telegram' && !groupLink.includes('t.me')) {
            return NextResponse.json(
                { error: 'رابط تليجرام غير صحيح' },
                { status: 400 }
            );
        }

        if (platform === 'whatsapp' && !groupLink.includes('chat.whatsapp.com')) {
            return NextResponse.json(
                { error: 'رابط واتساب غير صحيح' },
                { status: 400 }
            );
        }

        // Create new submission
        const submission = {
            id: Date.now().toString(),
            platform,
            college,
            subject,
            sectionNumber,
            groupLink,
            groupName,
            submitterName: submitterName || 'مجهول',
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        // Read existing submissions
        const submissions = readSubmissions();

        // Add new submission
        submissions.push(submission);

        // Write back to file
        writeSubmissions(submissions);

        return NextResponse.json(
            {
                success: true,
                message: 'تم إرسال المجموعة بنجاح! سيتم مراجعتها قريباً',
                submissionId: submission.id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting group:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء إرسال المجموعة' },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve submissions
export async function GET() {
    try {
        const submissions = readSubmissions();
        return NextResponse.json({ submissions }, { status: 200 });
    } catch (error) {
        console.error('Error reading submissions:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء قراءة المجموعات' },
            { status: 500 }
        );
    }
}
