import { NextResponse, after } from 'next/server';
import { z } from 'zod';
import { createFeedback, FeedbackData } from '@/lib/feedbackStorage/googleSheetsStorage';

const feedbackValidationSchema = z.object({
  rating: z.number().int().min(1).max(10),
  rating_label: z.string().min(1),
  selected_reasons: z.array(z.string()).optional().nullable(),
  other_reason: z.string().optional().nullable().or(z.literal("")),
  experience_comment: z.string().optional().nullable().or(z.literal("")),
  contact_requested: z.boolean(),
  mobile_number: z.string().optional().nullable().or(z.literal("")),
  language: z.string().min(2),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    
    // 1. Zod Validation
    const validationResult = feedbackValidationSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.issues[0].message }, { status: 400 });
    }
    
    const body = validationResult.data;
    
    const formattedDate = "'" + new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date());

    // Populate feedback object
    const feedbackData: FeedbackData = {
      rating: body.rating,
      rating_label: body.rating_label,
      selected_reasons: body.selected_reasons || [],
      other_reason: body.other_reason || '',
      experience_comment: body.experience_comment || '',
      contact_requested: body.contact_requested,
      mobile_number: body.contact_requested ? body.mobile_number || '' : '',
      language: body.language,
      created_at: formattedDate
    };
    
    // Generate feedback ID immediately
    const feedbackId = feedbackData.id || `PG-FB-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    feedbackData.id = feedbackId;
    const refIdShort = `PG-FB-${feedbackId.slice(-6)}`;

    // Perform Google Sheets append in background via after() so API returns immediately (<150ms)
    after(async () => {
      try {
        await createFeedback(feedbackData);
      } catch (err) {
        console.error('Background Google Sheets append error:', err);
      }
    });
    
    return NextResponse.json({ status: 'success', referenceId: refIdShort });
    
  } catch (error) {
    console.error('API minimal feedback endpoint error:', error);
    return NextResponse.json({ error: 'Failed to process feedback submission.' }, { status: 500 });
  }
}
