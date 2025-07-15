// app/api/orders/route.ts
import { verifyToken } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { generateSequentialId } from "@/lib/generateSequentialId";
import { getAuthInfo } from "@/lib/getAuthInfo";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const orders = await Order.find({
      user: userId,
    }).sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Siparişler alınamadı" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const body = await req.json();
    const userId = getUserIdFromRequest(req);
    const {
      customerName,
      customerEmail,
      phone = "",
      address,
      note = "",
      items,
      totalPrice,
      status = "Hazırlanıyor",
      cargoIncluded = true,
      paymentStatus = "Kapıda ödeme",
      discount = "0",
    } = body;

    if (
      !customerName?.trim() ||
      !customerEmail?.trim() ||
      !address?.trim() ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !totalPrice
    ) {
      return NextResponse.json(
        { error: "Zorunlu alanlar eksik." },
        { status: 400 }
      );
    }

    const invalidItem = items.find(item => !item.name || !item.quantity || !item.price);
    if (invalidItem) {
      return NextResponse.json(
        { error: "Tüm ürünlerde ad, adet ve fiyat girilmeli." },
        { status: 400 }
      );
    }

    const orderId = await generateSequentialId("ORD");
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const order = await Order.create({
      orderId,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
      note: note.trim(),
      items,
      totalPrice: Number(totalPrice),
      status,
      cargoIncluded,
      paymentStatus,
      discount: discount.toString().trim(),
      user: userId,        // UserID eklendi!

    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: error.message || "Sunucu hatası" }, { status: 500 });
  }
};
