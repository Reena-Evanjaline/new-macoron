import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';
export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.id as product_id,
        p.name,
        p.slug,
        p.description,
        p.price,
        p.stock,
        p.category,
        p.sku,
        p.discount,
        i.id as image_id,
        i.image_url,
        i.alt_text,
        i.sort_order
      FROM products p
      LEFT JOIN product_images i ON p.id = i.product_id
      WHERE p.category = ?
      ORDER BY p.id DESC, i.sort_order ASC
    `, ['Deodorant']);

    // Group by product_id as before
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.product_id]) {
        grouped[row.product_id] = {
          id: row.product_id,
          name: row.name,
          slug: row.slug,
          description: row.description,
          price: row.price,
          stock: row.stock,
          category: row.category,
          sku: row.sku,
          discount: row.discount,
          images: [],
        };
      }
      if (row.image_id) {
        grouped[row.product_id].images.push({
          id: row.image_id,
          url: row.image_url,
          alt: row.alt_text,
          sortOrder: row.sort_order,
        });
      }
    }

    return NextResponse.json(Object.values(grouped), { status: 200 });
  } catch (err) {
    console.error('Fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}