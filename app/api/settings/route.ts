import { NextRequest, NextResponse } from 'next/server';
import Settings from '@/models/Settings';
import { dbConnect } from '@/lib/db';

export async function GET() {
  try {
    await dbConnect();
    const settings = await Settings.findOne();
    if (!settings) {
      const defaultSettings = await Settings.create({});
      return NextResponse.json(defaultSettings);
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('GET /api/settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const settings = await Settings.findOneAndUpdate({}, body, {
      new: true, // Güncellenmiş belgeyi döndür
      upsert: true, // Belge yoksa yeni bir tane oluştur
    });
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('PATCH /api/settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}