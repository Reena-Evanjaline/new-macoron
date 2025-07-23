import { NextResponse } from 'next/server';
import db from '@/lib/db'; 

export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM vendors ORDER BY created_at DESC');
    return NextResponse.json({ success: true, vendors: rows });
  } catch (e) {
    console.error('Vendor GET Error:', e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
