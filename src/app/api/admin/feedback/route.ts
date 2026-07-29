import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  getDashboardOverviewMetrics, 
  getFilteredFeedbacks, 
  getFeedbackById 
} from '@/lib/services/feedbackService';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('pg_admin_session');

    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';
    const id = searchParams.get('id');

    if (type === 'detail' && id) {
      const detail = await getFeedbackById(id);
      if (!detail) {
        return NextResponse.json({ error: 'Feedback record not found' }, { status: 404 });
      }
      return NextResponse.json({ status: 'success', data: detail });
    }

    if (type === 'inbox') {
      const filters = {
        search: searchParams.get('search') || '',
        scoreCategory: (searchParams.get('scoreCategory') || 'all') as any,
        contactRequested: (searchParams.get('contactRequested') || 'all') as any,
        language: (searchParams.get('language') || 'all') as any,
      };

      const data = await getFilteredFeedbacks(filters);
      return NextResponse.json({ status: 'success', data });
    }

    // Default: overview metrics
    const metrics = await getDashboardOverviewMetrics();
    return NextResponse.json({ status: 'success', data: metrics });
  } catch (error) {
    console.error('Error fetching admin feedback data:', error);
    return NextResponse.json({ error: 'Failed to retrieve feedback data' }, { status: 500 });
  }
}
