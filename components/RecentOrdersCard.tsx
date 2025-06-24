'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { useOrders } from "@/context/OrdersContext"
import { useRouter } from "next/navigation"

export default function RecentOrdersCard() {
  const { orders } = useOrders()
  const Router = useRouter()
  
  const statusColor: { [key: string]: string } = {
    "Hazırlanıyor": "bg-yellow-200 text-yellow-800",
    "Kargoda": "bg-blue-200 text-blue-800",
    "Teslim Edildi": "bg-green-200 text-green-800",
    "İptal Edildi": "bg-red-500 text-red-800",
  }

  return (
    <>
      <div className="grid grid-cols-4 text-xs font-medium text-gray-500 mb-2">
        <span>Müşteri</span>
        <span>Ürün Adedi</span>
        <span>Tutar</span>
        <span>Durum</span>
      </div>
      {orders.slice(0, 5).map((order, index) => (
        <div key={index} className="grid grid-cols-4 text-sm items-center py-1">
          <span>{order.customerName}</span>
          <span>{order.items.map(e => e.quantity)}</span>
          <span>{order.totalPrice}</span>
          <Badge className={statusColor[order.status]}>{order.status}</Badge>
        </div>
      ))}
      <Button onClick={() => Router.push('/dashboard/orders/')} className="w-full mt-5 bg-blue-500 hover:bg-blue-400 text-white
 " variant={"default"} >Tüm siparişler</Button>
    </>
  )
}
