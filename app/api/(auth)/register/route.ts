
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import Settings from '@/models/Settings';
import { hashPassword, signToken } from '@/lib/auth';
import { defaultSettings } from '@/lib/defaultSettings';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, email, password } = await req.json();

  // 1) Validasyon
  if (!name?.trim() || !email?.trim() || !password || password.length < 8) {
    return NextResponse.json(
      { error: 'Eksik veya geçersiz alanlar.' },
      { status: 400 }
    );
  }

  // 2) E-posta kontrolü
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    return NextResponse.json(
      { error: 'Bu e-posta zaten kullanılmış.' },
      { status: 409 }
    );
  }

  // 3) Şifre hash
  const hashed = await hashPassword(password);

  // 4) Yeni kullanıcı
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    passwordHash: hashed
  });

  // 5) JWT üret
  const token = signToken({ sub: user._id, email: user.email });

  // 6) Default ayar oluştur
  const settingsPayload = { ...defaultSettings, user: user._id };
  await Settings.create(settingsPayload);

  // 7) Yanıt ve cookie set
  const res = NextResponse.json(
    {
      user: { id: user._id, name: user.name, email: user.email }
    },
    { status: 201 }
  );
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
