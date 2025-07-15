import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import { isValidObjectId } from "mongoose";
import { getUserIdFromRequest } from "@/utils/auth"; // JWT'den userId çekme fonksiyonu

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "Geçersiz sipariş ID'si." }, { status: 400 });
  }

  const userId = getUserIdFromRequest(req); // Kullanıcı kim?
  if (!userId) {
    return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
  }

  const body = await req.json();

  // Sadece izin verilen alanlar güncellenebilir
  const allowedFields = ["customerName", "customerEmail", "phone", "address", "items", "totalPrice", "status"];
  const updateData: Record<string, any> = {};

  for (const key of allowedFields) {
    if (key in body) updateData[key] = body[key];
  }

  try {
    // Güncellenen kayıt hem userId'ye hem id'ye bakılarak seçilir!
    const updated = await Order.findOneAndUpdate(
      { _id: id, user: userId }, // <-- sadece kendi kaydın!
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Sipariş bulunamadı veya yetki yok." }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PATCH Order Error:", error);
    return NextResponse.json({ message: "Sunucu hatası oluştu." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "Geçersiz sipariş ID'si." }, { status: 400 });
  }

  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
  }

  try {
    // Sadece kendi kaydını silebilir
    const deleted = await Order.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return NextResponse.json({ message: "Sipariş bulunamadı veya yetki yok." }, { status: 404 });
    }

    return NextResponse.json({ message: "Sipariş başarıyla silindi." }, { status: 200 });
  } catch (error) {
    console.error("DELETE Order Error:", error);
    return NextResponse.json({ message: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
