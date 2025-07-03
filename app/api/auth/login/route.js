import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req) {
  const { email, password } = await req.json();

  const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (user.length === 0) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const valid = await verifyPassword(password, user[0].password);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const token = generateToken(user[0]);

  // Set cookie
  cookies().set('Authtoken', token, {
 
   
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ message: 'Login successful' });
}
