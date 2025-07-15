// context/InvoiceContext.tsx

"use client"
import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"
export type Invoice = {
  _id: string
  customer: string
  orderId: string
  total: number
  date: string
}

type InvoiceContextType = {
  invoices: Invoice[]
  loading: boolean
  addInvoice: (invoice: Invoice) => void
  deleteInvoice: (id: string) => void
  infetch: () => Promise<void>
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const {user } = useAuth()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/invoices")
      setInvoices(res.data)
      setError(null)

    } catch (error) {
      setError('Siparişler alınamadı.', error.data)
    } finally {
      setLoading(false)
    }


  }
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
