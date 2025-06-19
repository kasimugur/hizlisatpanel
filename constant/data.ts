interface Order {
  _id?: string
  customerName: string         // Fatura üstündeki isim
  customerEmail: string        // E-posta ile fatura gönderimi için
  phone?: string               // Opsiyonel ama faydalı
  address: string              // Tek satır fatura adresi
  items: {
    name: string               // Ürün adı
    quantity: number          // Adet
    price: number             // Birim fiyat
  }[]
  totalPrice: number           // Toplam fiyat
  status: "Hazırlanıyor" | "Kargoda" | "Teslim Edildi" | "İptal Edildi"
  createdAt?: string
}

