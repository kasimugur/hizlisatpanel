'use client'

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import axios from "axios"
import { useInvoices } from "@/context/InvoiceContext"
import { useOrders } from "@/context/OrdersContext"

export default function NewInvoiceSheet() {
  const { orders } = useOrders()
  const { addInvoice } = useInvoices()
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState({
    orderId: "",
    customer: "",
    total: 0,
    date: new Date()
  })

  const ordersCargo = orders.filter(o => o.status === "Kargoda" || o.status === "Teslim Edildi")

  const handleOrderSelect = (id: string) => {
    const selected = orders.find(o => o._id === id)
    if (!selected) return

    setFormData({
      orderId: id,
      customer: selected.customerName,
      phone: selected.phone,
      address: selected.address,
      items: selected.items,
      discount: selected.discount,
      cargoIncluded: selected.cargoIncluded,
      total: selected.totalPrice,
      date: new Date()
    })

  }

  const handleSubmit = async () => {
    if (!formData.customer.trim()) {
      toast.error("Müşteri adı boş olamaz")
      return
    }

    if (!formData.orderId.trim()) {
      toast.error("Sipariş numarası seçilmelidir")
      return
    }

    if (!formData.total || isNaN(Number(formData.total)) || Number(formData.total) <= 0) {
      toast.error("Geçerli bir tutar girilmelidir")
      return
    }

    if (!formData.date) {
      toast.error("Tarih seçilmelidir")
      return
    }

    try {
      const payload = {
        ...formData,
        total: Number(formData.total),
        date: formData.date.toISOString()
      }
      console.log(payload)
      const res = await axios.post("/api/invoices", payload)
      addInvoice(res.data)
      toast.success("✅ Fatura başarıyla oluşturuldu")
      setFormData({
        orderId: "",
        customer: "",
        total: 0,
        date: new Date()
      })
      setOpen(false)
    } catch (err) {
      console.error("Fatura oluşturulamadı:", err)
      toast.error("❌ Fatura oluşturulurken bir hata oluştu")
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-blue-600 text-white font-semibold">
          📤 Yeni Fatura Kes
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-white sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Yeni Fatura Oluştur</SheetTitle>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <Select onValueChange={handleOrderSelect}>

            <SelectTrigger>
              <SelectValue placeholder="Sipariş Seç (Kargoda / Teslim Edildi)" />
            </SelectTrigger>

            <SelectContent>
              {ordersCargo.length > 0 ? (
                ordersCargo.map(order => (
                  <SelectItem key={order._id} value={order._id}>
                    #{order._id.slice(-5)} - {order.customerName} - ₺{order.totalPrice}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-sm text-muted-foreground">Faturalanabilir sipariş bulunamadı</div>
              )}
            </SelectContent>

          </Select>

          <Input
            placeholder="Müşteri"
            value={formData.customer}
            disabled
          />

          <Input
            placeholder="Tutar"
            value={`${formData.total} ₺`}
            disabled
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left">
                {formData.date ? format(formData.date, "dd MMMM yyyy", { locale: tr }) : "Tarih Seç"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData({ ...formData, date })}
              />
            </PopoverContent>
          </Popover>
        </div>

        <SheetFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>İptal</Button>
          <Button className="bg-blue-600 text-white" onClick={handleSubmit}>Kaydet</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
