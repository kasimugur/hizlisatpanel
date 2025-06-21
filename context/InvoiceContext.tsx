// context/InvoiceContext.tsx

"use client"
import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

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
  deleteInvoice :(id: string) => void
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/api/invoices").then((res) => {
      setInvoices(res.data)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev])
  }
  const deleteInvoice = (id: string) => {
  setInvoices(prev => prev.filter(inv => inv._id !== id));
}

  return (
    <InvoiceContext.Provider value={{ invoices, loading, addInvoice,deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export const useInvoices = () => {
  const context = useContext(InvoiceContext)
  if (!context) throw new Error("useInvoices must be used within InvoiceProvider")
  return context
}
