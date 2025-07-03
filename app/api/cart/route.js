import { NextResponse } from 'next/server';
import db from '@/lib/db';


export async function POST(req) {
  try {
    const body = await req.json();
    const { products_id, quantity,user_id } = body;
    const parsedQuantity = Number(quantity);
    if (!products_id || !parsedQuantity || parsedQuantity < 1) {
      return NextResponse.json(
        { error: 'Valid product_id and quantity are required' },
        { status: 400 }
      );
    }
    const [existingRows] = await db.query(
      'SELECT id, quantity FROM cart WHERE product_id = ?',
      [products_id]
    );
    if (existingRows.length > 0) {
      const existingItem = existingRows[0];
      const newQuantity = Number(existingItem.quantity) + parsedQuantity;
      await db.query('UPDATE cart SET quantity = ? WHERE id = ?', [
        newQuantity,
        existingItem.id,
      ]);
      return NextResponse.json(
        { message: 'Cart item updated', cartId: existingItem.id },
        { status: 200 }
      );
    } else {
      const [result] = await db.query(
        'INSERT INTO cart (product_id, quantity, user_id) VALUES (?, ?, ?)',
        [products_id, parsedQuantity, user_id]
      );

      return NextResponse.json(
        { message: 'Item added to cart', cartId: result.insertId },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }

    await db.query('DELETE FROM cart WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Item removed from cart' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}