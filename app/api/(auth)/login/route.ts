// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { verifyPassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'E-posta ve şifre gerekli.' }, { status: 400 });
  }

  // 1. Kullanıcıyı bul
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 401 });
  }

  // 2. Şifreyi doğrula
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: 'Şifre hatalı.' }, { status: 401 });
  }

  // 3. JWT token oluştur
  const token = signToken({ sub: user._id, email: user.email });

  // 4. Cookie’ye yaz
  const res = NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email }
  });
  res.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 gün
  });

  return res;
}
