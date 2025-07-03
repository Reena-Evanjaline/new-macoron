import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const slug = formData.get('slug');
    const description = formData.get('description') || '';
    const price = formData.get('price') || 0.0;
    const stock = formData.get('stock') || 0;
    const category = formData.get('category') || '';
    const sku = formData.get('sku') || '';
    const discount = formData.get('discount') || 0;
    const altText = formData.get('alt_text') || '';
    const sortOrder = formData.get('sort_order') || 0;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required.' }, { status: 400 });
    }

    // Insert product with discount
    const [productResult] = await db.execute(
      `INSERT INTO products (name, slug, description, price, stock, category, sku, discount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description, price, stock, category, sku, discount]
    );

    const productId = productResult.insertId;

    // Handle images
    const imageFiles = formData.getAll('images');
    const uploaded = [];

    for (const imageFile of imageFiles) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(process.cwd(), 'public/uploads', fileName);
      const imageUrl = `/uploads/${fileName}`;

      await writeFile(filePath, buffer);

      await db.execute(
        `INSERT INTO product_images (product_id, image_url, alt_text, sort_order)
         VALUES (?, ?, ?, ?)`,
        [productId, imageUrl, altText, sortOrder]
      );

      uploaded.push(imageUrl);
    }

    return NextResponse.json({
      message: 'Product and images created successfully.',
      productId,
      uploadedImages: uploaded,
    }, { status: 201 });

  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


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
    `, ['serum']);

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

