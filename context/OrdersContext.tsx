'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export type Order = {
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

type OrdersContextType = {
  orders: Order[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/orders')
      setOrders(res.data)
      setError(null)
    } catch (err) {
      setError('Siparişler alınamadı.')
    } finally {
      setLoading(false)
    }
  }
console.log("siparişler ",orders)
  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <OrdersContext.Provider value={{ orders, loading, error, refetch: fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrdersContext)
  if (!context) throw new Error('useOrders must be used within OrdersProvider')
  return context
}
