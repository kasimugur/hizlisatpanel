// lib/mappers.ts
import { DbProduct, DbProductVariant, Product, ProductVariant } from "@/types/product"
import { MockTrendyolProduct } from "@/types/mockTrendyolProduct"
// lib/mappers.ts

export function mapDbToProduct(doc: DbProduct): Product {
  // 1) id: hem string _id hem de {$oid: …} formatını destekle
  const id = typeof doc._id === "string"
    ? doc._id
    : doc._id?.$oid ?? "";

  // 2) createdAt / updatedAt: hem string hem {$date: …} formatı
  const createdAt = typeof doc.createdAt === "string"
    ? doc.createdAt
    : doc.createdAt?.$date ?? "";

  const updatedAt = typeof doc.updatedAt === "string"
    ? doc.updatedAt
    : doc.updatedAt?.$date ?? "";

  // 3) Varyantlar
  const variants: ProductVariant[] = doc.variants.map(v => ({
    name: v.name,
    options: v.options.flatMap(o => o.split(" ")),
  }));

  return {
    id,
    name: doc.name,
    sku: doc.sku || undefined,
    price: doc.price,
    stock: doc.stock,
    image: doc.image,
    images: doc.image ? [doc.image] : [],
    variants,
    createdAt,
    updatedAt,
    sourceType: "db",

    // Orijinal doc içindeki diğer alanları kaybetme:
    ...Object.fromEntries(
      Object.entries(doc).filter(
        ([k]) =>
          ![
            "_id",
            "name",
            "sku",
            "price",
            "stock",
            "variants",
            "createdAt",
            "updatedAt",
            "image"
          ].includes(k)
      )
    )
  }
}

/**
 * Mock Trendyol ürününü ortak Product tipine dönüştürür
 */
export function mapTrendyolToProduct(tr: MockTrendyolProduct): Product {
  const variants: ProductVariant[] = tr.attributes.map(a => ({
    name: a.customAttributeValue ?? `Attr${a.attributeId}`,
    options: a.attributeValueId ? [String(a.attributeValueId)] : [],
  }))

  return {
    id: tr.barcode,
    name: tr.title,
    sku: tr.stockCode,
    price: tr.salePrice ?? tr.listPrice,
    stock: tr.quantity,
    image: tr.images[0]?.url,
    images: tr.images.map(i => i.url),
    variants,
    sourceType: "trendyol",

    // tr içindeki ekstra anahtarları da ekle
    ...Object.fromEntries(
      Object.entries(tr)
        .filter(([k]) =>
          ![
            "barcode", "title", "stockCode", "salePrice", "listPrice", "quantity", "images", "attributes"
          ].includes(k)
        )
    )
  }
}
