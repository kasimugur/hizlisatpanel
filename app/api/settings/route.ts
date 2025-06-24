import { NextRequest, NextResponse } from 'next/server';
import Settings from '@/models/Settings';
import { dbConnect } from '@/lib/db';
import merge from 'lodash.merge';
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

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()

    // Zaten varsa, ikinci kez eklemeyi engelle
    const exists = await Settings.findOne()
    if (exists) {
      return NextResponse.json({ error: "Ayarlar zaten mevcut." }, { status: 400 })
    }

    const created = await Settings.create(body)
    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    console.error("POST /api/settings error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log('Gelen ayarlar:', body);

    const existingSettings = await Settings.findOne();

    if (!existingSettings) {
      const newSettings = await Settings.create(body);
      return NextResponse.json(newSettings);
    }

    const merged = merge({}, existingSettings.toObject(), body);

    const settings = await Settings.findOneAndUpdate({}, merged, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    console.log('Gelen:', JSON.stringify(body, null, 2))
    console.log('Güncellenen:', JSON.stringify(settings, null, 2))

    console.log('Güncellenmiş ayarlar:', settings);

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('PATCH /api/settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

