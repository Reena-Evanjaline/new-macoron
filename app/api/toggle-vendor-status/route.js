
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { id, is_active } = await req.json();

    await db.execute("UPDATE vendors SET is_active = ? WHERE id = ?", [is_active, id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
