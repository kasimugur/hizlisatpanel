// types/Product.ts

export type ProductVariant = {
  name: string
  options: string[]
}

export type Product = {
  id: string                   // Her kaynaktan eşsiz anahtar: DB'de _id, Trendyol'da barcode, Hepsiburada'da başka bir şey olabilir
  name: string                 // Ürün adı (DB'de name, Trendyol'da title)
  sku?: string                 // Kendi ürünlerinde veya platformda olabilir
  price: number                // Ana satış fiyatı (DB'de price, Trendyol'da salePrice veya listPrice)
  stock: number                // Stok adedi (DB'de stock, Trendyol'da quantity)
  image?: string               // Tek bir görsel (görsel array'inin ilki)
  images?: string[]            // Çoklu görsel dizisi (Trendyol/Hepsiburada için)
  variants?: ProductVariant[]  // Varyant listesi (hem kendi hem platform için normalize edilir)
  brand?: string               // Marka adı, opsiyonel
  category?: string            // Kategori adı veya id, opsiyonel
  description?: string         // Açıklama
  currency?: string            // Para birimi ("TRY", "USD" vs.)
  vatRate?: number             // KDV oranı, opsiyonel
  platformId?: string          // Platformda benzersiz id (Trendyol'da productMainId, Hepsiburada'da başka bir şey)
  createdAt?: string
  updatedAt?: string
  sourceType: "db" | "trendyol" | "hepsiburada" | "n11" | "mock" // Kaynağı
  [key: string]: any           // Gelecekte yeni alanlar için esnek tutmak istiyorsan ekle
}


export interface DbProductVariant {
  name: string;
  options: string[];
  _id: { $oid: string };
}

export interface DbProduct {
  _id: { $oid: string };
  user: { $oid: string };
  name: string;
  sku: string;
  price: number;
  stock: number;
  variants: DbProductVariant[];
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
  image: string;
}