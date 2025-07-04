import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('query') || '';

    console.log('🔍 Search term:', search);

    const query = `
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.slug,
        GROUP_CONCAT(pi.image_url) AS images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE LOWER(p.name) = LOWER(?)
      GROUP BY p.id
      ORDER BY p.id DESC
    `;

    const values = [search];

    const [rows] = await db.query(query, values);

    const parsedRows = rows.map((row) => ({
      ...row,
      images: row.images ? row.images.split(',') : [],
    }));

    return NextResponse.json(parsedRows);
  } catch (error) {
    console.error('❌ Search API error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
