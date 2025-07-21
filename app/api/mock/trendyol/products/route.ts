import { NextRequest, NextResponse } from "next/server";
import mockTrendyolProducts from "@/mock/mockTrendyolProducts";

// RAM üzerinde çalışan array, gerçek projede DB ile değiştir!
let products = [...mockTrendyolProducts];

// GET /api/products — Tüm ürünleri listele
export async function GET() {
  return NextResponse.json(products);
}

// POST /api/products — Yeni ürün ekle
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Zorunlu alan kontrolü
  if (!body.barcode || !body.title) {
    return NextResponse.json({ error: "barcode ve title zorunlu!" }, { status: 400 });
  }
  // (Ek validation'ları burada artırabilirsin.)

  // barcode benzersiz olmalı!
  if (products.find((item) => item.barcode === body.barcode)) {
    return NextResponse.json({ error: "Aynı barcode ile ürün var!" }, { status: 409 });
  }

  products.push(body);
  return NextResponse.json(body, { status: 201 });
}
