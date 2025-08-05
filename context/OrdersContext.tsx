'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'
import { DbOrder, Order } from '@/types/order'
import { mapDbToOrder, mapTrendyolToOrder } from '@/lib/mappers'


type OrdersContextType = {
  orders: Order[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const {user} = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
       const dbRes = await axios.get<DbOrder[]>("/api/orders")
      const dbOrders = dbRes.data.map(mapDbToOrder)

      // Mock Trendyol siparişleri
      const trRes = await axios.get<Order[]>("/api/mock/trendyol/orders")
      const trOrders = trRes.data.map(mapTrendyolToOrder)

      // Birleştir
      setOrders([...dbOrders, ...trOrders])
      setError(null)
    } catch (err) {
      setError('Siparişler alınamadı.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [user?.id])

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
