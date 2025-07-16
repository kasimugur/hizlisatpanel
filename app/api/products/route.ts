// app/api/products/route.ts
import { dbConnect } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/getUserIdFromRequest'
import Product from '@/models/Product'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect()
    const userId = getUserIdFromRequest(req);
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const products = await Product.find({ user: userId })
    return NextResponse.json(products)
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json({ error: 'Ürünler alınamadı' }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const body = await req.json();
    const userId = getUserIdFromRequest(req);
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const errors = [];

    const {
      name,
      price,
      stock,
      sku,
      image,
      variants,
      description
    } = body;

    // Zorunlu alanlar
    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.push("Ürün adı zorunludur ve metin olmalıdır.");
    }

    if (price === undefined || isNaN(price) || price < 0) {
      errors.push("Geçerli bir fiyat girilmelidir.");
    }

    if (stock === undefined || isNaN(stock) || stock < 0) {
      errors.push("Geçerli bir stok miktarı girilmelidir.");
    }

    if (sku !== undefined && typeof sku !== "string") {
      errors.push("SKU değeri metin olmalıdır.");
    }

    if (image && !image.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i)) {
      errors.push("Geçerli bir görsel URL girin (http/https ile başlayan jpg, jpeg, png, webp).");
    }

    // Varyantlar kontrolü
    if (variants && Array.isArray(variants)) {
      variants.forEach((variant, i) => {
        if (!variant.name || typeof variant.name !== "string") {
          errors.push(`Varyant ${i + 1}: 'name' alanı zorunludur ve metin olmalıdır.`);
        }

        if (!Array.isArray(variant.options)) {
          errors.push(`Varyant ${i + 1}: 'options' bir dizi olmalıdır.`);
        } else if (variant.options.some(opt => typeof opt !== "string")) {
          errors.push(`Varyant ${i + 1}: 'options' içinde yalnızca metin olmalıdır.`);
        }
      });
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const newProduct = await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      sku,
      image,
      variants: variants || [],
      description: description || "",
      user: userId,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: error.message || "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
};

