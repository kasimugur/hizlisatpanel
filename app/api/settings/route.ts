import { NextRequest, NextResponse } from 'next/server';
import Settings from '@/models/Settings';
import { dbConnect } from '@/lib/db';
import merge from 'lodash.merge';
import { defaultSettings } from '@/lib/defaultSettings'; // 👈 Bu önemli, birazdan vereceğim

// ✅ AYARLARI GETİR – Yoksa oluştur
export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(defaultSettings);
    }
// console.log(defaultSettings)
    const fullSettings = merge({}, defaultSettings, settings.toObject());
    // console.log(fullSettings,"fullsettings get")
    return NextResponse.json(fullSettings);
  } catch (error: any) {
    console.error('GET /api/settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ TEK SEFERLİK OLUŞTUR
export async function POST(req: NextRequest) {
  console.log("👉 POST /api/settings tetiklendi");
  try {
    await dbConnect();
    const body = await req.json();

    const exists = await Settings.findOne();
    console.log(exists," exist")
    if (exists) {
      return NextResponse.json({ error: "Ayarlar zaten mevcut." }, { status: 400 });
    }

    const created = await Settings.create(merge({}, defaultSettings, body));
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/settings error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ GÜNCELLEME – Eksik alanları tamamla
export async function PATCH(req: NextRequest) {
  console.log("👉 PATCH /api/settings tetiklendi");
  try {
    await dbConnect();
    const body = await req.json();

    const existingSettings = await Settings.findOne();

    // Mevcut ayar yoksa yeni oluştur
    if (!existingSettings) {
      const created = await Settings.create(merge({}, defaultSettings, body));
      return NextResponse.json(created);
    }

    // Varsayılanları da ekle
    const merged = merge({}, defaultSettings, existingSettings.toObject(), body);

    const updated = await Settings.findOneAndUpdate({}, merged, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('PATCH /api/settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
