import { DbInvoice, DbInvoiceItem, Invoice, InvoiceItem } from "@/types/invoice"
// lib/mappers.ts
import { DbProduct, DbProductVariant, Product, ProductVariant } from "@/types/product"
import { DbOrder, DbOrderItem, Order, OrderItem } from "@/types/order"

import { MockTrendyolProduct } from "@/types/mockTrendyolProduct"

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

export function mapDbToOrder(doc: DbOrder): Order {
  // ID ve userId: hem {$oid} sarmalını hem doğrudan string'i destekle
  const id = typeof doc._id === "string" ? doc._id : doc._id.$oid
  const userId = typeof doc.user === "string" ? doc.user : doc.user.$oid

  // Tarihler: hem {$date} sarmalını hem de direkt string'i destekle
  const createdAt = typeof doc.createdAt === "string"
    ? doc.createdAt
    : doc.createdAt.$date
  const updatedAt = typeof doc.updatedAt === "string"
    ? doc.updatedAt
    : doc.updatedAt.$date

  // shipment.shippedAt olabilir null veya {$date} ya da doğrudan string
  const shippedAt = doc.shipment.shippedAt
    ? (typeof doc.shipment.shippedAt === "string"
        ? doc.shipment.shippedAt
        : doc.shipment.shippedAt.$date)
    : undefined

  // Kalemleri normalize et
  const items: OrderItem[] = doc.items.map((item: DbOrderItem) => ({
    id: item._id.$oid,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }))

  return {
    id,
    userId,
    orderId:        doc.orderId,
    customerName:   doc.customerName,
    customerEmail:  doc.customerEmail,
    phone:          doc.phone,
    address:        doc.address,
    note:           doc.note || undefined,
    items,
    totalPrice:     doc.totalPrice,
    discount:       Number(doc.discount),
    cargoIncluded:  doc.cargoIncluded,
    status:         doc.status,
    paymentStatus:  doc.paymentStatus,
    shipmentTrackingCode: doc.shipment.trackingCode,
    shipmentCompany:      doc.shipment.company,
    shipmentStatus:       doc.shipment.status,
    shippedAt,
    createdAt,
    updatedAt,
    sourceType:     "db",

    // Orijinal dokümandaki ekstra alanları kaybetme
    ...Object.fromEntries(
      Object.entries(doc).filter(
        ([k]) => ![
          "_id","user","orderId","customerName","customerEmail","phone",
          "address","note","items","totalPrice","discount","cargoIncluded",
          "status","paymentStatus","shipment","createdAt","updatedAt","__v"
        ].includes(k)
      )
    )
  }
}

/**
 * TODO: Mock Trendyol siparişi geldiğinde bunu Order tipine dönüştür
 */
export function mapTrendyolToOrder(tr: any): Order {
  // Örnek placeholder:
  return {
    id: tr.orderNumber,
    userId: tr.sellerId?.toString(),
    orderId: tr.orderNumber,
    customerName: `${tr.customerFirstName} ${tr.customerLastName}`,
    customerEmail: tr.customerEmail,
    phone: tr.shippingAddress?.phone,
    address: tr.shippingAddress?.fullAddress,
    note: undefined,
    items: tr.lines?.map((ln: any) => ({
      id: ln.id.toString(),
      name: ln.productName,
      quantity: ln.quantity,
      price: ln.price
    })) || [],
    totalPrice: tr.totalPrice,
    discount: tr.totalDiscount,
    cargoIncluded: true,
    status: tr.shipmentPackageStatus,
    paymentStatus: "Ödenecek",
    shipmentTrackingCode: tr.cargoTrackingNumber?.toString(),
    shipmentCompany: tr.cargoProviderName,
    shipmentStatus: tr.status,
    shippedAt: tr.originShipmentDate ? new Date(tr.originShipmentDate).toISOString() : undefined,
    createdAt: tr.orderDate ? new Date(tr.orderDate).toISOString() : undefined,
    updatedAt: tr.lastModifiedDate ? new Date(tr.lastModifiedDate).toISOString() : undefined,
    sourceType: "trendyol",
    ...tr
  }
}
export function mapDbToInvoice(doc: DbInvoice): Invoice {
  const id = typeof doc._id === "string" ? doc._id : doc._id?.$oid ?? "";
  const userId = typeof doc.user === "string" ? doc.user : doc.user?.$oid ?? "";
  const createdAt = typeof doc.createdAt === "string" ? doc.createdAt : doc.createdAt?.$date ?? "";
  const updatedAt = typeof doc.updatedAt === "string" ? doc.updatedAt : doc.updatedAt?.$date ?? "";

  const items: InvoiceItem[] = doc.items?.map((item: DbInvoiceItem) => ({
    id: item._id ,
    description: item.description ?? "",
    quantity: item.quantity ,
    unitPrice: item.price,
    totalPrice: doc.total,
  })) ?? [];

  // UI için alias ve tüm alanlar
  return {
    id,
    userId,
    invoiceNumber: doc.invoiceNumber ?? doc.no ?? "",
    orderId: doc.orderId ?? "",
    link: doc.link ?? "",
    amount: doc.amount ?? doc.total ?? 0,
    taxAmount: doc.taxAmount ?? 0,
    totalWithTax: doc.totalWithTax ?? doc.total ?? 0,
    items,
    createdAt,
    updatedAt,
    sourceType: "db",
    // --- UI tablo alias'ları ---
    _id: id,
    no: doc.invoiceNumber ?? doc.no ?? "",
    customer: doc.customer ?? "",
    total: doc.total ?? doc.amount ?? 0,
    date: doc.date ?? createdAt ?? "",
    address: doc.address ?? "",
    phone: doc.phone ?? "",
    discount: doc.discount ?? "",
    cargoIncluded: doc.cargoIncluded ?? false,
    description: doc.description ?? "",
    // Ekstra kalan alanlar
    ...Object.fromEntries(
      Object.entries(doc).filter(
        ([k]) => ![
          "_id", "user", "invoiceNumber", "orderId", "link", "amount", "taxAmount",
          "totalWithTax", "items", "createdAt", "updatedAt", "__v",
          "no", "customer", "total", "date", "address", "phone", "discount", "cargoIncluded", "description"
        ].includes(k)
      )
    )
  };
}


/**
 * Mock/radyal Trendyol fatura verisi geldiğinde dönüştürmek için stub
 */
export function mapTrendyolToInvoice(tr: any): Invoice {
  // Gelecekteki mock endpoint yapısına uygun olarak burayı tamamlayabilirsin
  return {
    id: tr.invoiceId?.toString() ?? tr.invoiceNumber,
    userId: tr.sellerId?.toString(),
    invoiceNumber: tr.invoiceNumber,
    orderId: tr.orderNumber,
    link: tr.invoiceLink,
    amount: tr.amount,
    taxAmount: tr.taxAmount,
    total: tr.totalWithTax,
    customer: (tr.customerFirstName && tr.customerLastName)
  ? `${tr.customerFirstName} ${tr.customerLastName}`
  : tr.orderNumber,
    items: tr.items?.map((it: any) => ({
      id: it.id?.toString(),
      description: it.description,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      totalPrice: it.totalPrice,
    })),
    createdAt: tr.invoiceDateTime ? new Date(tr.invoiceDateTime * 1000).toISOString() : undefined,
    updatedAt: undefined,
    sourceType: "trendyol",
    ...tr
  }
}
