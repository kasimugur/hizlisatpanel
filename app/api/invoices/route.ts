import { NextRequest, NextResponse } from "next/server";
import Invoice from "@/models/Invoice";
import { dbConnect } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";

function generateInvoiceNo() {
  const random = Math.floor(100000 + Math.random() * 900000); // 6 haneli
  return `INV-${random}`;
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
console.log(userId,"user ıd gett")
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const invoices = await Invoice.find({ user: userId }).sort({ date: -1 }); // Yeni tarih en üstte
    return NextResponse.json(invoices);
  } catch (err: any) {
    console.error("GET /invoices error:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    const body = await req.json();

    const {
      customer,
      phone,
      address,
      items,
      total,
      date,
      description,
      orderId,
      discount,
      cargoIncluded
    } = body;

    // Temel Validasyonlar
    if (!customer || !total || !date || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Müşteri, ürünler, tutar ve tarih zorunludur." },
        { status: 400 }
      );
    }

    if (typeof total !== "number" || total < 0) {
      return NextResponse.json(
        { error: "Tutar geçerli bir sayı olmalıdır." },
        { status: 400 }
      );
    }

    // Benzersiz fatura no üret
    let no;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      no = generateInvoiceNo();
      const existing = await Invoice.findOne({ no });
      if (!existing) isUnique = true;
      attempts++;
    }

    if (!isUnique) {
      return NextResponse.json(
        { error: "Benzersiz fatura numarası üretilemedi." },
        { status: 500 }
      );
    }
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const newInvoice = await Invoice.create({
      user: userId,
      no,
      customer,
      phone: phone || "",
      address: address || "",
      items,
      total,
      discount: discount || "",
      cargoIncluded: cargoIncluded ?? false,
      date: new Date(date),
      description: description || "",
      orderId: orderId || null,
    });

    return NextResponse.json(newInvoice, { status: 201 });

  } catch (error) {
    console.error("Fatura oluşturma hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
