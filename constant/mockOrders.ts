// constants/mockOrders.ts

export const mockOrders = [
  {
    id: "ORD-2025001",
    customer: "Ayşe Kaplan",
    address: "Atatürk Mah. No:22 İstanbul",
    phone: "0533 123 45 67",
    items: [
      { name: "Tunik", quantity: 2, price: 160 },
      { name: "Pantolon", quantity: 1, price: 200 }
    ],
    cargoIncluded: true,
    discount: "₺40",
    total: 480, // Örnek hesap: 520 - 40 (indirim) + 20 (kargo)
    status: "Hazırlanıyor",
    note: "Kargoya sabah verilmesi rica olunur.",
    createdAt: "2025-06-21T08:32:00.000Z"
  },
  {
    id: "ORD-2025002",
    customer: "Mehmet Yıldız",
    address: "Kavaklı Mah. 10. Sokak No:5 Ankara",
    phone: "0555 987 65 43",
    items: [
      { name: "Gömlek", quantity: 1, price: 180 }
    ],
    cargoIncluded: false,
    discount: "%10",
    total: 162,
    status: "Hazırlanıyor",
    note: "",
    createdAt: "2025-06-20T10:15:00.000Z"
  }
];
