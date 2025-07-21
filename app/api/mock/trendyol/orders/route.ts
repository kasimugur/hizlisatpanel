// app/api/mock/trendyol/orders/route.ts

import { NextResponse } from "next/server";
import { mockTrendyolOrders } from "@/mock/mockTrendyolOrders";

// Bu endpoint mock/demo içindir. Canlıda gerçek Trendyol API ile değiştirilecektir.

export async function GET() {
  return NextResponse.json(mockTrendyolOrders, { status: 200 });
}

export function POST() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
}
