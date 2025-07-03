import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendBulkEmails } from '@/lib/awsclient';

export async function POST(req) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }

    // Get user details
    const [userRows] = await db.query('SELECT email, name FROM users WHERE id = ?', [user_id]);
    if (userRows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const user = userRows[0];

    // Get cart items
    const [cartItems] = await db.query(
      `
        SELECT c.product_id, c.quantity, p.name, p.price 
        FROM cart c 
        JOIN products p ON c.product_id = p.id 
        WHERE c.user_id = ?
      `,
      [user_id]
    );

    if (cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Get latest address
    const [addressRows] = await db.query(
      `
        SELECT id, city, pincode, mobile
        FROM addresses 
        WHERE user_id = ? 
        ORDER BY id DESC LIMIT 1
      `,
      [user_id]
    );
    if (addressRows.length === 0) {
      return NextResponse.json({ error: 'No address found' }, { status: 404 });
    }
    const address = addressRows[0];

    // Calculate total price
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Build product HTML rows
    const productHTML = cartItems
      .map(
        (item) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">₹${item.price}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">₹${item.quantity * item.price}</td>
          </tr>
        `
      )
      .join('');

    const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <div style="background-color: #d32f2f; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Your Invoice</h1>
      </div>
      <div style="padding: 20px;">
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>Thank you for your inquiry. Here are your order details:</p>

        <table width="100%" border="0" cellpadding="8" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f44336; color: #ffffff;">
              <th align="left" style="border: 1px solid #ddd;">Product</th>
              <th align="left" style="border: 1px solid #ddd;">Qty</th>
              <th align="left" style="border: 1px solid #ddd;">Price</th>
              <th align="left" style="border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${productHTML}
            <tr style="background-color: #ffe6e6;">
              <td colspan="3" align="right" style="border: 1px solid #ddd; padding: 8px;"><strong>Total</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>₹${totalPrice}</strong></td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 20px; background-color: #f1f1f1; padding: 15px; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #d32f2f;">Shipping Address</h3>
          <p style="margin: 5px 0;">
            ${address.city}, ${address.pincode}<br/>
            Phone: ${address.mobile}
          </p>
        </div>

        <div style="margin-top: 30px; background-color: #fafafa; padding: 15px; border-radius: 4px; border: 1px solid #ddd;">
          <h3 style="margin-top: 0; color: #d32f2f;">Contact Details</h3>
          <p style="margin: 5px 0;"><strong>📞 Phone:</strong> *********</p>
          <a href="https://wa.me/917901655023" style="display: inline-block; background-color: #25D366; color: #fff; padding: 8px 12px; border-radius: 4px; text-decoration: none; font-weight: bold; margin: 5px 0;">WhatsApp</a>
          <p style="margin: 10px 0;">
            <strong>📍 Our Address:</strong><br/>
           *************************************************** Need to be fill
          </p>
          <p style="margin: 5px 0;"><strong>✉️ Email:</strong> **********</p>
        </div>

         <div style="margin-top: 30px; background-color: #fff8e1; padding: 15px; border-radius: 4px; border: 1px solid #ddd;">
          <h3 style="margin-top: 0; color: #d32f2f;">Important Disclaimer</h3>
          <p style="font-size: 0.9em; color: #555; margin: 5px 0;">
            We are solely a reseller of Korean beauty products and have no involvement in the formulation, manufacturing, testing, certification, or claims made by the original brands. All responsibility for product quality, safety, regulatory compliance, and certifications lies entirely with the respective manufacturers. Customers are advised to review product details and ingredients carefully before purchasing, and to consult with a medical professional if needed. By purchasing, users agree that they are doing so at their own discretion and that the manufacturer is solely responsible for the product and its effects.
          </p>
        </div>


        <p style="margin-top: 30px; font-size: 0.9em; color: #888;">
          If you have any questions, please reply to this email kh@raceinnovations.in.
        </p>
      </div>
      <div style="background-color: #d32f2f; color: #ffffff; text-align: center; padding: 10px;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} Made In Korea</p>
      </div>
    </div>
  </div>
`;


    // Save each product in inquiries table
    for (const item of cartItems) {
      await db.query(
        `
          INSERT INTO inquiries (user_id, product_id, address_id)
          VALUES (?, ?, ?)
        `,
        [user_id, item.product_id, address.id]
      );
    }

    // Send invoice via email
    await sendBulkEmails([user.email, 'kh@raceinnovations.in'], 'Your Invoice', html);

    return NextResponse.json({ success: true, message: 'Invoice sent & saved.' });

  } catch (err) {
    console.error('Error in /api/email POST:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
