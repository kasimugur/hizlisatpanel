// context/InvoiceContext.tsx

"use client"
import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"
import { mapDbToInvoice, mapTrendyolToInvoice } from "@/lib/mappers"
import { DbInvoice, Invoice } from "@/types/invoice"


type InvoiceContextType = {
  invoices: Invoice[]
  loading: boolean
  addInvoice: (invoice: Invoice) => void
  deleteInvoice: (id: string) => void
  infetch: () => Promise<void>
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const dbRes = await axios.get<DbInvoice[]>("/api/invoices")
      const dbInvoices = dbRes.data.map(mapDbToInvoice)

      let trInvoices: Invoice[] = []// Mock Trendyol faturaları (henüz yoksa[])

      try {
        const trRes = await axios.get<any[]>("/api/mock/trendyol/invoice")
        trInvoices = trRes.data.map(mapTrendyolToInvoice)
      } catch {
        console.warn("Mock Trendyol faturaları alınamadı veya tanımsız.")
      }
      setInvoices([...dbInvoices, ...trInvoices])
    } catch (error) {
      setError('Siparişler alınamadı.', error.data)
    } finally {
      setLoading(false)
    }
  }
  console.log(invoices)
  useEffect(() => {
    fetchInvoices()

  }, [user?.id])
  console.log("users id ", user?.id)
  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev])
  }
  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv._id !== id));
  }

  return (
    <InvoiceContext.Provider value={{ invoices, loading, addInvoice, deleteInvoice, infetch: fetchInvoices }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export const useInvoices = () => {
  const context = useContext(InvoiceContext)
  if (!context) throw new Error("useInvoices must be used within InvoiceProvider")
  return context
}
