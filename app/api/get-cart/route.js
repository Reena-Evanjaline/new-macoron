import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }

    const [rows] = await db.query(`
      SELECT 
        cart.id AS cart_id,
        cart.quantity,
        products.id AS product_id,
        products.name,
        products.price,
        (
          SELECT image_url
          FROM product_images
          WHERE product_images.product_id = products.id
          ORDER BY sort_order ASC
          LIMIT 1
        ) AS image_url
      FROM cart
      JOIN products ON cart.product_id = products.id
      WHERE cart.user_id = ?
    `, [userId]);

    return NextResponse.json({ cartItems: rows, count: rows.length }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
