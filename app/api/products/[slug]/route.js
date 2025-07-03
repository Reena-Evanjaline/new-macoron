import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req) {
  try {
    const { pathname } = new URL(req.url);
    const slug = pathname.split("/").pop();

    const [productRows] = await db.query(
      "SELECT * FROM products WHERE slug = ?",
      [slug]
    );

    if (!productRows.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = productRows[0];
    console.log('Fetched product:', product);

    const [imageRows] = await db.query(
      "SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order ASC",
      [product.id]
    );
    console.log('Fetched images:', imageRows);

    product.images = imageRows;
    console.log(product);
    

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
