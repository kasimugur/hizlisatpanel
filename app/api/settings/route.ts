import { NextRequest, NextResponse } from "next/server";
import Settings from "@/models/Settings";
import { dbConnect } from "@/lib/db";
import merge from "lodash.merge";
import { defaultSettings } from "@/lib/defaultSettings";
import { verifyToken } from "@/lib/auth"; // JWT çözümleyici fonksiyonun

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const user = verifyToken(token); // burada user objesi olmalı (id/email vs)
  console.log("Aktif kullanıcı:", user);
  const userId = user.sub; // string
  let settings = await Settings.findOne({ user: userId });
  if (!settings) {
    // Eğer ayar yoksa default ayar oluştur, kullanıcıya ata
    settings = await Settings.create({ ...defaultSettings, user: userId });
    console.log("Yeni ayar oluşturuldu (default, user):");
  } else {
    console.log("Ayar getirildi:");
  }
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  await dbConnect();
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const user = verifyToken(token);
  const userId = user.sub; // string
  const updates = await req.json();
  let settings = await Settings.findOne({ user: userId });
  if (!settings) {
    // Ayar yoksa yeni oluştur
    settings = await Settings.create({ ...defaultSettings, ...updates, user: userId });
    return NextResponse.json(settings);
  }
  // Var olanı güncelle (merge)
  const merged = merge({}, settings.toObject(), updates);

  const updated = await Settings.findOneAndUpdate({ user: userId }, merged, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return NextResponse.json(updated);
}
