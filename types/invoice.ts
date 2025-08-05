// types/invoice.ts

export interface DbInvoiceItem {
  description: string;
  quantity: number;
  price: number;
  totalPrice: number;
  _id: { $oid: string };
}

// DB'den gelen fatura yapısı
export interface DbInvoice {
  _id: { $oid: string };
  user: { $oid: string };
  invoiceNumber?: string;   // opsiyonel
  orderId?: string;         // opsiyonel
  link?: string;            // opsiyonel
  amount?: number;          // opsiyonel
  taxAmount?: number;       // opsiyonel
  totalWithTax?: number;    // opsiyonel
  items?: DbInvoiceItem[];  // opsiyonel
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
}

// Evrensel fatura kalemi tipi
export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

// Evrensel fatura tipi
export type Invoice = {
  id: string;               // Fatura dokümanı _id veya platformda benzersiz numara
  userId: string;           // Kullanıcı _id
  invoiceNumber: string;
  orderId: string;
  link: string;
  amount: number;
  taxAmount?: number;
  totalWithTax: number;
  items?: InvoiceItem[];
  createdAt?: string;
  updatedAt?: string;
  sourceType: "db" | "trendyol" | "mock";
  [key: string]: any;
};
