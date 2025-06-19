// app/api/orders/route.ts
import { dbConnect } from "@/lib/db"
import Order from "@/models/Order"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
  try {
    await dbConnect()
    const orders = await Order.find().sort({ createdAt: -1 })
    return NextResponse.json(orders)
  } catch (error) {
    console.error("GET /api/orders error:", error)
    return NextResponse.json({ error: "Siparişler alınamadı" }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect()
    const body = await req.json()

    const { customerName, customerEmail, phone, address, items, totalPrice, status } = body

    if (!customerName || !customerEmail || !address || !items || items.length === 0 || !totalPrice) {
      return NextResponse.json(
        { error: "Zorunlu alanlar eksik: isim, e-posta, adres, ürünler ve toplam tutar." },
        { status: 400 }
      )
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      phone,
      address,
      items,
      totalPrice: Number(totalPrice),
      status: status || "Hazırlanıyor"
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error: any) {
    console.error("POST /api/orders error:", error)
    return NextResponse.json({ error: error.message || "Sunucu hatası" }, { status: 500 })
  }
}
