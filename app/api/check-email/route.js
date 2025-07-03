import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    return NextResponse.json({ exists: rows.length > 0 });
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
