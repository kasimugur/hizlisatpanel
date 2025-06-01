// app/api/products/route.ts
import { dbConnect } from '@/lib/db'
import Product from '@/models/Product'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  try {
    await dbConnect()
    const products = await Product.find()
    return NextResponse.json(products)
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json({ error: 'Ürünler alınamadı' }, { status: 500 })
  }
}
export const POST = async (req: NextRequest) => {
  try {
    await dbConnect()
    const body = await req.json()

    const { name, price, stock, sku, imageUrl, variants } = body

    if (!name || !price || !stock) {
      return NextResponse.json(
        { error: "Ürün adı, fiyat ve stok zorunludur." },
        { status: 400 }
      )
    }

    if (imageUrl && !imageUrl.match(/\.(jpg|jpeg|png|webp)$/i)) {
      return NextResponse.json(
        { error: "Geçerli bir görsel URL girin (jpg, png, webp)." },
        { status: 400 }
      )
    }

    if (variants) {
      for (const variant of variants) {
        if (!variant.name || variant.name.trim() === "") {
          return NextResponse.json(
            { error: "Her varyant için bir isim girilmelidir." },
            { status: 400 }
          )
        }
        if (!variant.options || !Array.isArray(variant.options) || variant.options.length === 0) {
          return NextResponse.json(
            { error: `Varyant '${variant.name}' için en az bir seçenek olmalıdır.` },
            { status: 400 }
          )
        }
      }
    }

    const product = await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      sku: sku,
      image: imageUrl,
      variants: variants || [],
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error("POST /api/products error:", error)
    return NextResponse.json(
      { error: error.message || "Sunucu hatası oluştu." },
      { status: 500 }
    )
  }
}
