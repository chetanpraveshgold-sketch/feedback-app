/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { appendToGoogleSheet, getFromGoogleSheet } from '@/lib/googleSheets';

export interface FeedbackData {
  id?: string;
  rating: number;
  rating_label: string;
  selected_reasons: string[];
  other_reason: string;
  experience_comment: string;
  contact_requested: boolean;
  mobile_number: string;
  language: string;
  created_at: string;
}

export const generateFeedbackId = (): string => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return `PG-FB-2026-${code}`;
};

export async function createFeedback(data: FeedbackData): Promise<{ success: boolean; id: string }> {
  const feedbackId = data.id || generateFeedbackId();
  
  // Headers: id, rating, rating_label, selected_reasons, other_reason, experience_comment, contact_requested, mobile_number, language, created_at
  const rowValues = [
    feedbackId,                                  // 0: id
    data.rating,                                 // 1: rating (number)
    data.rating_label,                           // 2: rating_label
    (data.selected_reasons || []).join(', '),    // 3: selected_reasons (comma-separated readable text)
    data.other_reason || '',                     // 4: other_reason
    data.experience_comment || '',               // 5: experience_comment
    data.contact_requested ? 'TRUE' : 'FALSE',   // 6: contact_requested
    data.mobile_number || '',                    // 7: mobile_number
    data.language,                               // 8: language
    data.created_at                              // 9: created_at
  ];

  await appendToGoogleSheet('Feedbacks', rowValues);
  return { success: true, id: feedbackId };
}
