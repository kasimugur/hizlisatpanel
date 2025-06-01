'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import Link from "next/link"


const orders = [
  { id: "#2025001", name: "Ayşe K.", amount: 320, count: 3, date: "12.04.2024 14:35", status: "Hazırlanıyor" },
  { id: "#2025002", name: "Mehmet Y.", amount: 180, count: 1, date: "13.04.2024 09:20", status: "Kargoda" },
  { id: "#2025003", name: "Elif S.", amount: 450, count: 5, date: "10.04.2024 18:45", status: "Teslim Edildi" },
  { id: "#2025004", name: "Ahmet T.", amount: 275, count: 2, date: "14.04.2024 11:10", status: "İptal Edildi" },
  { id: "#2025005", name: "Zeynep D.", amount: 600, count: 7, date: "15.04.2024 16:00", status: "Hazırlanıyor" },
  { id: "#2025006", name: "Murat K.", amount: 150, count: 1, date: "16.04.2024 08:30", status: "İptal Edildi" },
  { id: "#2025007", name: "Selin A.", amount: 390, count: 4, date: "11.04.2024 13:15", status: "Teslim Edildi" },
  { id: "#2025008", name: "Deniz Ç.", amount: 220, count: 2, date: "17.04.2024 10:05", status: "Kargoda" },
  { id: "#2025009", name: "Burak Ö.", amount: 310, count: 3, date: "18.04.2024 15:40", status: "Hazırlanıyor" },
  { id: "#2025010", name: "Seda G.", amount: 500, count: 6, date: "19.04.2024 12:00", status: "Teslim Edildi" },
  { id: "#2025011", name: "Emre B.", amount: 280, count: 3, date: "20.04.2024 09:50", status: "Hazırlanıyor" }
]

const statusColor: { [key: string]: string } = {
  "Hazırlanıyor": "bg-yellow-200 text-yellow-800",
    "Kargoda": "bg-blue-200 text-blue-800",
    "Teslim Edildi": "bg-green-200 text-green-800",
    "İptal Edildi": "bg-red-500 text-red-800",
}

export default function OrdersPage() {
  const [filter, setFilter] = useState("Tüm Durumlar")

  const filtered = filter === "Tüm Durumlar"
    ? orders
    : orders.filter(order => order.status === filter)

  return (
    <div className="p-6 bg-white  rounded-md">
      <div className="flex justify-between mb-4">
        <Button><Link href={'/dashboard/orders/new'} >+ Yeni Sipariş</Link></Button>
        <Input placeholder="Ara" className="w-1/3" />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 border px-4 py-2 rounded-md">
            {filter} <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Tüm Durumlar", "Hazırlanıyor", "Kargoda", "Teslim Edildi","İptal Edildi"].map(status => (
              <DropdownMenuItem key={status} onClick={() => setFilter(status)}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sipariş No</TableHead>
              <TableHead>Müşteri Adı</TableHead>
              <TableHead>Tutar</TableHead>
              <TableHead>Ürün Sayısı</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Aksiyon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell className="text-green-600">₺{order.amount}</TableCell>
                <TableCell>{order.count} Ürün</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge className={statusColor[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell className="space-x-2 text-gray-500">
                  <span className="cursor-pointer">🔍</span>
                  <span className="cursor-pointer">✏️</span>
                  <span className="cursor-pointer">🗑️</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
