import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = (process.env.ADMIN_USER || process.env.ADMIN_USERNAME || 'admin@praveshgold.com').trim();
    const expectedPass = (process.env.ADMIN_PASSWORD || 'PraveshGoldAdmin2026!').trim();

    if (username && username.trim() === expectedUser && password && password.trim() === expectedPass) {
      const cookieStore = await cookies();
      cookieStore.set('pg_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ error: 'Invalid admin username or password' }, { status: 401 });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred during login' }, { status: 500 });
  }
}
