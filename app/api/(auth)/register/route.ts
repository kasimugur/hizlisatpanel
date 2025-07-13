import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, email, password } = await req.json();
console.log("gelen bilgiler ",name,email,password)
  // 1) Basit validasyon
  if (!name?.trim() || !email?.trim() || !password || password.length < 8) {
    return NextResponse.json({ error: 'Eksik veya geçersiz alanlar.' }, { status: 400 });
  }

  // 2) E-posta kontrolü
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    return NextResponse.json({ error: 'Bu e-posta zaten kullanılmış.' }, { status: 409 });
  }

  // 3) Şifre hash
  const hashed = await hashPassword(password);

  // 4) Yeni kullanıcı
  const user = await User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash: hashed });

  // 5) JWT üret
  const token = signToken({ sub: user._id, email: user.email });

  // 6) Yanıt (ister cookie, ister JSON)
  return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email } }, { status: 201 });
}
