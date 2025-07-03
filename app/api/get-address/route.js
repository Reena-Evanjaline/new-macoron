
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');

  if (!user_id) {
    return NextResponse.json({ hasAddress: false }, { status: 400 });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM addresses WHERE user_id = ? LIMIT 1',
      [user_id]
    );

    const hasAddress = rows.length > 0;
    return NextResponse.json({ hasAddress });
  } catch (error) {
    console.error('DB error in get-address:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
