'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useOrders } from "@/context/OrdersContext"
import OrderDetailCard from "@/components/OrderDetailCard"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner"
import { format } from "date-fns";
const statusColor: { [key: string]: string } = {
  "Hazırlanıyor": "bg-yellow-200 text-yellow-800",
  "Kargoda": "bg-blue-200 text-blue-800",
  "Teslim Edildi": "bg-green-200 text-green-800",
  "İptal Edildi": "bg-red-500 text-red-800",
}

export default function OrdersPage() {
  const { orders, refetch, loading } = useOrders()
  const [filter, setFilter] = useState("Tüm Durumlar")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [mode, setMode] = useState<"view" | "edit" | null>(null)
  // Sheet açık mı kapalı mı durumu
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false)



  const closeSheet = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const filtered = filter === "Tüm Durumlar"
    ? orders
    : orders.filter(order => order.status === filter)

  const handleView = (order) => {
    setSelectedOrder(order);
    setMode("view");
    setOpen(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order)
    setMode("edit")
  }
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Silme işlemi başarısız");
      }

      console.log("Sipariş başarıyla silindi:", id);
      toast.success("Sipariş başarıyla silindi!");
      refetch();
    } catch (error) {
      console.error("Silme hatası:", error);
      toast.error("Sipariş silinemedi!");
    }
  };


  if (loading) return <div>...yükleniyor</div>

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
            {["Tüm Durumlar", "Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal Edildi"].map(status => (
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
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell className="text-green-600">₺{order.totalPrice}</TableCell>
                <TableCell>{order.items.reduce((total, e) => total + e.quantity, 0)} Ürün</TableCell>
                <TableCell>{format(new Date(order.createdAt), "dd.MM.yyyy HH:mm")}</TableCell>
                <TableCell>
                  <Badge className={statusColor[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell className="space-x-2 text-gray-500">


                  <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full md:w-1/2 bg-white overflow-y-auto">

                      {selectedOrder && (
                        <OrderDetailCard order={selectedOrder} closeSheet={closeSheet} mode={mode} />
                      )}


                    </SheetContent>
                  </Sheet>
                  <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(order)}
                      >  <Pencil className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full md:w-1/2 bg-white overflow-y-auto">


                      {selectedOrder && (
                        <OrderDetailCard order={selectedOrder} closeSheet={closeSheet} mode={mode} />
                      )}


                    </SheetContent>
                  </Sheet>



                  <Dialog open={dialog} onOpenChange={setDialog} >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                      // onClick={() => handleDelete(order._id)}
                      >


                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Silme Onayı</DialogTitle>
                      </DialogHeader>
                      <p>Bu siparişi silmek istediğinizden emin misiniz?</p>
                      <DialogFooter>
                        <Button onClick={() => {
                          setDialog(false)
                          toast.info("Sipariş silme işlemi iptal edildi!");
                        }} variant="outline">İptal</Button>
                        <Button variant="outline" onClick={() => handleDelete(order._id)}>
                          Sil
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>



                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* 
      {selectedOrder && (
        <div className="mt-6">
        </div>
      )} */}
    </div>
  )
}
