import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import { isValidObjectId } from "mongoose";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "Geçersiz sipariş ID'si." }, { status: 400 });
  }

  const body = await req.json();

  // İzin verilen güncellenebilir alanları belirle (güvenlik için)
  const allowedFields = ["customerName", "customerEmail", "phone", "address", "items", "totalPrice", "status"];
  const updateData: Record<string, any> = {};

  for (const key of allowedFields) {
    if (key in body) updateData[key] = body[key];
  }

  try {
    const updated = await Order.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PATCH Order Error:", error);
    return NextResponse.json({ message: "Sunucu hatası oluştu." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "Geçersiz sipariş ID'si." }, { status: 400 });
  }

  try {
    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ message: "Sipariş başarıyla silindi." }, { status: 200 });
  } catch (error) {
    console.error("DELETE Order Error:", error);
    return NextResponse.json({ message: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
