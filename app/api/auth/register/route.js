import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req) {
  const { name, email, password } = await req.json();

  const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser.length > 0) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }

  const hashed = await hashPassword(password);
  await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);

  return NextResponse.json({ message: 'User registered' });
}
