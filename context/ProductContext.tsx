// context/ProductContext.tsx
"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"
import { DbProduct, Product } from "@/types/product"
import { mapDbToProduct, mapTrendyolToProduct } from "@/lib/mappers"
import { MockTrendyolProduct } from "@/types/mockTrendyolProduct"


// 2. Context tipi
interface ProductContextType {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  loading: boolean
  fetchProducts: () => Promise<void>
}

// 3. Varsayılan context
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// 4. Provider bileşeni
interface ProductProviderProps {
  children: ReactNode
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const {user} = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchProducts = async () => {
    try {
      const dbRes = await axios.get<DbProduct[]>('/api/products')
      const dbProducts = dbRes.data.map(mapDbToProduct)

      // Mock Trendyol ürünlerini çek ve map et
      const trRes = await axios.get<MockTrendyolProduct[]>('/api/mock/trendyol/products')
      const trProducts = trRes.data.map(mapTrendyolToProduct)

      // İkisini birleştir ve state'e ata
      setProducts([...dbProducts, ...trProducts])
    } catch (error) {
      console.error("Ürünler alınamadı:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [user?.id])
console.log("product context",products.map(i=> i))
  return (
    <ProductContext.Provider value={{ products, setProducts, loading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

// 5. Custom hook
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts, ProductProvider içinde kullanılmalı.")
  }
  return context
}
