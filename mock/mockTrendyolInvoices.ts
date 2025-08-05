// mock/mockTrendyolInvoices.ts

export interface MockTrendyolInvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface MockTrendyolInvoice {
  invoiceId: string
  sellerId: string
  invoiceNumber: string
  orderNumber: string
  invoiceLink: string
  amount: number
  taxAmount: number
  totalWithTax: number
   customerFirstName: string,   // <-- ekledik
  customerLastName: string,
  items: MockTrendyolInvoiceItem[]
  invoiceDateTime: number // Unix timestamp
}

const mockTrendyolInvoices: MockTrendyolInvoice[] = [
  {
    invoiceId: "INV-1001",
    sellerId: "2738",
    invoiceNumber: "TY20250701-INV1001",
    orderNumber: "ORD-20250701-0001",
    invoiceLink: "https://mockfatura.com/INV-1001.pdf",
    amount: 500,
    taxAmount: 90,
    totalWithTax: 590,
    invoiceDateTime: 1698686400,
    customerFirstName: "Ali",   // <-- ekledik
    customerLastName: "Kaya",
    items: [
      { id: "1", description: "Ürün A", quantity: 2, unitPrice: 200, totalPrice: 400 },
      { id: "2", description: "Ürün B", quantity: 1, unitPrice: 100, totalPrice: 100 }
    ]
  },
  {
    invoiceId: "INV-1002",
    sellerId: "2738",
    invoiceNumber: "TY20250702-INV1002",
    orderNumber: "ORD-20250702-0002",
    invoiceLink: "https://mockfatura.com/INV-1002.pdf",
    amount: 300,
    taxAmount: 54,
    totalWithTax: 354,
    invoiceDateTime: 1698772800,
      customerFirstName: "ahmet",   // <-- ekledik
    customerLastName: "Kaya",
    items: [
      { id: "3", description: "Ürün C", quantity: 3, unitPrice: 100, totalPrice: 300 }
    ]
  },
  {
    invoiceId: "INV-1003",
    sellerId: "2738",
    invoiceNumber: "TY20250703-INV1003",
    orderNumber: "ORD-20250703-0003",
    invoiceLink: "https://mockfatura.com/INV-1003.pdf",
    amount: 150,
    taxAmount: 27,
    totalWithTax: 177,
    invoiceDateTime: 1698859200,
      customerFirstName: "Ali Mehmet",   // <-- ekledik
    customerLastName: "akgöz",
    items: [
      { id: "4", description: "Ürün D", quantity: 1, unitPrice: 150, totalPrice: 150 }
    ]
  }
]

export default mockTrendyolInvoices

