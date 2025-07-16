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

// 1. Ürün tipi
export interface Product {
  _id: string
  name: string
  img: string
  price: number
  stock: number
}

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
      const response = await axios.get<Product[]>("/api/products")
      setProducts(response.data)
    } catch (error) {
      console.error("Ürünler alınamadı:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [user?.id])

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
