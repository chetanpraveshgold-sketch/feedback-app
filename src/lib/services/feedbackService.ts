/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFromGoogleSheet } from '@/lib/googleSheets';

export interface FeedbackRecord {
  id: string;
  rating: number;
  rating_label: string;
  selected_reasons: string[];
  other_reason: string;
  experience_comment: string;
  contact_requested: boolean;
  mobile_number: string;
  language: string;
  created_at: string;
  vera_customer_id: string;
  vera_sync_status: string;
  vera_synced_at: string;
}

export interface ConcernMetric {
  reason: string;
  count: number;
  percentage: number;
}

export interface TrendDayMetric {
  date: string;
  lowCount: number;  // 1-6
  midCount: number;  // 7-8
  highCount: number; // 9-10
  total: number;
}

export interface OverviewMetrics {
  totalFeedback: number;
  receivedTodayCount: number;
  avgScore: number;
  lowScoreCount: number;  // 1-6
  midScoreCount: number;  // 7-8
  highScoreCount: number; // 9-10
  contactRequestCount: number;
  contactRequestPercentage: string;
  topConcerns: ConcernMetric[];
  latestLowScoreFeedback: FeedbackRecord[];
  last7DaysTrend: TrendDayMetric[];
}

export interface InboxFilters {
  search?: string;
  scoreCategory?: 'all' | '1-6' | '7-8' | '9-10';
  contactRequested?: 'all' | 'yes' | 'no';
  language?: 'all' | 'en' | 'hi' | 'mr';
  dateRange?: 'all' | 'today' | '7days' | '30days';
}

function parseSheetRowToRecord(row: any[]): FeedbackRecord {
  const cleanStr = (val: any) => (val !== undefined && val !== null ? String(val).replace(/^'/, '').trim() : '');
  
  const rawContact = cleanStr(row[6]).toUpperCase();
  const contactRequested = rawContact === 'YES' || rawContact === 'TRUE';

  const rawReasons = cleanStr(row[3]);
  const selectedReasons = rawReasons ? rawReasons.split(',').map((r) => r.trim()).filter(Boolean) : [];

  return {
    id: cleanStr(row[0]),
    rating: parseInt(row[1], 10) || 0,
    rating_label: cleanStr(row[2]),
    selected_reasons: selectedReasons,
    other_reason: cleanStr(row[4]),
    experience_comment: cleanStr(row[5]),
    contact_requested: contactRequested,
    mobile_number: cleanStr(row[7]),
    language: cleanStr(row[8]) || 'en',
    created_at: cleanStr(row[9]),
    vera_customer_id: cleanStr(row[10]),
    vera_sync_status: cleanStr(row[11]) || 'not_connected',
    vera_synced_at: cleanStr(row[12])
  };
}

export async function getAllFeedbacks(): Promise<FeedbackRecord[]> {
  try {
    const rawRows = await getFromGoogleSheet('Feedbacks', 'A:M');
    if (!rawRows || rawRows.length === 0) return [];
    
    // Check if first row is header
    const hasHeader = rawRows[0][0] && (rawRows[0][0].toLowerCase() === 'id' || rawRows[0][0].toLowerCase() === 'feedback_id');
    const dataRows = hasHeader ? rawRows.slice(1) : rawRows;
    
    return dataRows.map(parseSheetRowToRecord).filter((rec: FeedbackRecord) => rec.id.length > 0);
  } catch (error) {
    console.error('Error fetching feedbacks in feedbackService:', error);
    return [];
  }
}

export async function getDashboardOverviewMetrics(): Promise<OverviewMetrics> {
  const records = await getAllFeedbacks();

  const totalFeedback = records.length;
  if (totalFeedback === 0) {
    return {
      totalFeedback: 0,
      receivedTodayCount: 0,
      avgScore: 0,
      lowScoreCount: 0,
      midScoreCount: 0,
      highScoreCount: 0,
      contactRequestCount: 0,
      contactRequestPercentage: '0%',
      topConcerns: [],
      latestLowScoreFeedback: [],
      last7DaysTrend: []
    };
  }

  // Today in IST
  const todayStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  let totalScoreSum = 0;
  let receivedTodayCount = 0;
  let lowScoreCount = 0;
  let midScoreCount = 0;
  let highScoreCount = 0;
  let contactRequestCount = 0;
  const concernCounts: Record<string, number> = {};

  records.forEach((rec) => {
    totalScoreSum += rec.rating;
    
    if (rec.created_at.includes(todayStr)) {
      receivedTodayCount++;
    }

    if (rec.rating <= 6) lowScoreCount++;
    else if (rec.rating <= 8) midScoreCount++;
    else highScoreCount++;

    if (rec.contact_requested) contactRequestCount++;

    rec.selected_reasons.forEach((reason) => {
      concernCounts[reason] = (concernCounts[reason] || 0) + 1;
    });
  });

  const avgScore = Math.round((totalScoreSum / totalFeedback) * 10) / 10;
  const contactRequestPercentage = `${Math.round((contactRequestCount / totalFeedback) * 1000) / 10}%`;

  // Top concerns sorted
  const topConcerns: ConcernMetric[] = Object.entries(concernCounts)
    .map(([reason, count]) => ({
      reason,
      count,
      percentage: Math.round((count / totalFeedback) * 100)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Latest 5 low-score feedback (rating <= 6), reversed to show newest first
  const latestLowScoreFeedback = [...records]
    .filter((rec) => rec.rating <= 6)
    .reverse()
    .slice(0, 5);

  // Last 7 days trend calculation
  const last7DaysTrend: TrendDayMetric[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateFormatted = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short'
    }).format(d);

    const fullDateFormatted = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(d);

    const dayRecords = records.filter((rec) => rec.created_at.includes(fullDateFormatted));

    const low = dayRecords.filter((r) => r.rating <= 6).length;
    const mid = dayRecords.filter((r) => r.rating >= 7 && r.rating <= 8).length;
    const high = dayRecords.filter((r) => r.rating >= 9).length;

    last7DaysTrend.push({
      date: dateFormatted,
      lowCount: low,
      midCount: mid,
      highCount: high,
      total: dayRecords.length
    });
  }

  return {
    totalFeedback,
    receivedTodayCount,
    avgScore,
    lowScoreCount,
    midScoreCount,
    highScoreCount,
    contactRequestCount,
    contactRequestPercentage,
    topConcerns,
    latestLowScoreFeedback,
    last7DaysTrend
  };
}

export async function getFilteredFeedbacks(filters: InboxFilters): Promise<FeedbackRecord[]> {
  const records = await getAllFeedbacks();

  return records.filter((rec) => {
    // Mobile search filter
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.trim().toLowerCase();
      const mobileMatch = rec.mobile_number.toLowerCase().includes(q);
      const idMatch = rec.id.toLowerCase().includes(q);
      if (!mobileMatch && !idMatch) return false;
    }

    // Score category filter
    if (filters.scoreCategory && filters.scoreCategory !== 'all') {
      if (filters.scoreCategory === '1-6' && rec.rating > 6) return false;
      if (filters.scoreCategory === '7-8' && (rec.rating < 7 || rec.rating > 8)) return false;
      if (filters.scoreCategory === '9-10' && rec.rating < 9) return false;
    }

    // Contact requested filter
    if (filters.contactRequested && filters.contactRequested !== 'all') {
      if (filters.contactRequested === 'yes' && !rec.contact_requested) return false;
      if (filters.contactRequested === 'no' && rec.contact_requested) return false;
    }

    // Language filter
    if (filters.language && filters.language !== 'all') {
      if (rec.language.toLowerCase() !== filters.language.toLowerCase()) return false;
    }

    return true;
  }).reverse(); // Newest first
}

export async function getFeedbackById(id: string): Promise<FeedbackRecord | null> {
  const records = await getAllFeedbacks();
  return records.find((rec) => rec.id.toLowerCase() === id.toLowerCase()) || null;
}
