// app/api/orders/route.ts
import { dbConnect } from "@/lib/db";
import { generateSequentialId } from "@/lib/generateSequentialId";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 });
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
console.log(orderId)
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
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: error.message || "Sunucu hatası" }, { status: 500 });
  }
};
