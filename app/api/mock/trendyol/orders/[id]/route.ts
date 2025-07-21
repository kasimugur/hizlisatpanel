// app/api/mock/trendyol/orders/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { mockTrendyolOrders } from "@/mock/mockTrendyolOrders";
// Bu endpoint mock/demo içindir. Canlıda gerçek API ile değiştirilecek.

export async function PATCH(req: NextRequest, { params }) {
  const { id } = params;
  // Normalde DB'de güncellenirdi. Burada body içeriği alınıp mock response dönecek.
  const body = await req.json();
  // İstersen burada mockTrendyolOrders dizisinde güncelleme de simüle edebilirsin.
  return NextResponse.json({
    message: `Order ${id} updated (mock).`,
    updatedFields: body
  }, { status: 200 });
}

