import db from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    const body = await req.json();

    const {
      user_id,
      country,
      fullName,
      mobile,
      pincode,
      flat,
      area,
      landmark,
      city,
      state,
      defaultAddress,
      instructions,
    } = body;

    if (!user_id || !fullName || !mobile || !pincode || !flat || !area || !city || !state) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (defaultAddress) {
      await db.execute(
        'UPDATE addresses SET default_address = FALSE WHERE user_id = ?',
        [user_id]
      );
    }
    await db.execute(
      `INSERT INTO addresses
       (user_id, country, full_name, mobile, pincode, flat, area, landmark, city, state, default_address, instructions)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        country,
        fullName,
        mobile,
        pincode,
        flat,
        area,
        landmark,
        city,
        state,
        defaultAddress ? 1 : 0,
        instructions
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
