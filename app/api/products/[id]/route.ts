// /app/api/products/[id]/route.ts

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const id = params.id;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ message: "Geçersiz ürün ID." }, { status: 400 });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ message: "Geçersiz JSON formatı." }, { status: 400 });
  }

  // Validasyon
  const errors = [];

  if (body.name !== undefined && typeof body.name !== "string") {
    errors.push("Ürün adı geçersiz.");
  }

  if (body.price !== undefined && (typeof body.price !== "number" || body.price < 0)) {
    errors.push("Fiyat geçerli bir sayı olmalı.");
  }

  if (body.stock !== undefined && (typeof body.stock !== "number" || body.stock < 0)) {
    errors.push("Stok geçerli bir sayı olmalı.");
  }

  if (body.image !== undefined && typeof body.image !== "string") {
    errors.push("Görsel URL geçersiz.");
  }

  if (body.variants !== undefined) {
    if (!Array.isArray(body.variants)) {
      errors.push("Varyantlar bir dizi olmalı.");
    } else {
      body.variants.forEach((variant: any, index: number) => {
        if (typeof variant.name !== "string" || !variant.name.trim()) {
          errors.push(`Varyant ${index + 1} adı geçersiz.`);
        }
        if (!Array.isArray(variant.options)) {
          errors.push(`Varyant ${index + 1} seçenekleri bir dizi olmalı.`);
        } else if (variant.options.some((opt: any) => typeof opt !== "string")) {
          errors.push(`Varyant ${index + 1} içinde geçersiz seçenek var.`);
        }
      });
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ message: "Doğrulama hatası", errors }, { status: 400 });
  }

  try {
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ message: "Ürün bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH Hatası:", err);
    return NextResponse.json({ message: "Sunucu hatası." }, { status: 500 });
  }
}


// ÜRÜN SİLME
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const id = params.id;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Ürün bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ message: "Ürün silindi." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}