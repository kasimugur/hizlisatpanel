import { NextRequest, NextResponse } from "next/server";
import mockTrendyolProducts from "@/mock/mockTrendyolProducts";
import { Console } from "console";


// UYARI: Bu RAM'de çalışır, production için uygun değildir.
let products = [...mockTrendyolProducts];

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  // PATCH ile güncellenecek alanlar
  const update = await request.json();

  // Ürünü bul
  const index = products.findIndex((item) => item.barcode === id);

  if (index === -1) {
    return NextResponse.json({ error: "Ürün bulunamadı!" }, { status: 404 });
  }

  // Sadece gelen alanları güncelle (deep merge değil, shallow merge)
  products[index] = { ...products[index], ...update };

  return NextResponse.json(products[index]);
}
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
const { id } = await context.params;

  // console.log("params", context?.params);
console.log(typeof(id))
  const index = products.findIndex((item) => item.barcode === id);

  if (index === -1) {
    return NextResponse.json({ error: "Ürün bulunamadı!" }, { status: 404 });
  }

  const deleted = products[index];
  products.splice(index, 1);
// console.log(deleted)

  return NextResponse.json(deleted);
}