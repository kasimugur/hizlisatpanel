// types/order.ts

// DB'den gelen order item yapısı
export interface DbOrderItem {
  name: string;
  quantity: number;
  price: number;
  _id: { $oid: string };
}

// DB'den gelen order yapısı
export interface DbOrder {
  _id: { $oid: string };
  user: { $oid: string };
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  note: string;
  items: DbOrderItem[];
  totalPrice: number;
  discount: string;
  cargoIncluded: boolean;
  status: "Hazırlanıyor" | "Kargoda" | "Teslim Edildi" | "İptal Edildi";
  paymentStatus: "Kapıda ödeme" | "Ödendi" | "Ödenecek";
  shipment: {
    trackingCode: string;
    company: string;
    status: "Hazırlanıyor" | "Yolda" | "Teslim Edildi" | "İptal Edildi";
    shippedAt: { $date: string } | null;
  };
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
}

// Universal OrderItem tipi
export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

// Universal Order tipi
export type Order = {
  id: string;               // DB _id veya platform orderId
  userId: string;           // DB user _id
  orderId: string;          // Sipariş kodu
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  note?: string;
  items: OrderItem[];
  totalPrice: number;
  discount: number;
  cargoIncluded: boolean;
  status: string;
  paymentStatus: string;
  shipmentTrackingCode?: string;
  shipmentCompany?: string;
  shipmentStatus?: string;
  shippedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  sourceType: "db" | "trendyol";
  [key: string]: any;
};
