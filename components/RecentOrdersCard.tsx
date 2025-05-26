import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"

export default function RecentOrdersCard() {
  const orders = [
     { id: 1, customer: "Ayşe K.", quantity: 2, amount: 300, status: "Hazırlanıyor" },
  { id: 2, customer: "Mehmet Y.", quantity: 1, amount: 120, status: "Kargoda" },
  { id: 3, customer: "Fatma A.", quantity: 3, amount: 450, status: "Teslim Edildi" },
  { id: 4, customer: "Ali V.", quantity: 1, amount: 150, status: "İptal Edildi" },
  { id: 5, customer: "Ahmet K.", quantity: 2, amount: 280, status: "Hazırlanıyor" },
  { id: 6, customer: "Zeynep D.", quantity: 1, amount: 100, status: "Hazırlanıyor" }
  ]

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
      {orders.slice(0,5).map((order, index) => (
        <div key={index} className="grid grid-cols-4 text-sm items-center py-1">
          <span>{order.customer}</span>
          <span>{order.quantity}</span>
          <span>{order.amount}</span>
          <Badge className={statusColor[order.status]}>{order.status}</Badge>
        </div>
      ))}
      <Button className="w-full mt-5 bg-blue-500 hover:bg-blue-400 text-white
 " variant={"default"} >Tüm siparişler</Button>
    </>
  )
}
