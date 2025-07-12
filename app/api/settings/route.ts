import { NextRequest, NextResponse } from "next/server";
import Settings from "@/models/Settings";
import { dbConnect } from "@/lib/db";
import merge from "lodash.merge";
import { defaultSettings } from "@/lib/defaultSettings";

export async function GET() {
  try {
    await dbConnect();
    const settings = await Settings.findOne();
    if (!settings) {
      // Eğer ayar yoksa default ayarı oluşturup döndür
      
      const created = await Settings.create(defaultSettings);
      console.log("yeni ayar oluşturuldu default ayar " )
      return NextResponse.json(created);
    }
    console.log("YENİ AYAR GETİRİLDİ ", settings )
    
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const updates = await req.json();

    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      // Eğer ayar yoksa yeni oluştur
      const created = await Settings.create(updates);
      return NextResponse.json(created);
    }

    // Var olan ayarı güncelle ama sadece değişiklikleri uygula (merge ile)
    const merged = merge({}, existingSettings.toObject(), updates);

    const updated = await Settings.findOneAndUpdate({}, merged, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
