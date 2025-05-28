'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TruckIcon, ClipboardCopyIcon } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
const shipmentsToPrepare = [
  { id: "#2025001", customer: "Ayşe K.", quantity: 2, price: "₺320" },
  { id: "#2025002", customer: "Mehmet Y.", quantity: 1, price: "₺180" },
  { id: "#2025003", customer: "Elif T.", quantity: 3, price: "₺450" },
];

const shippedOrders = [
  { id: "#2025001", code: "12345678", company: "Yurtiçi", status: "Yolda", pdf: "#" },
  { id: "#2025002", code: "22334455", company: "MNG", status: "Teslim", pdf: "#" },
  { id: "#3025002", code: "22454455", company: "PTT", status: "Yolda", pdf: "#" },
];

export default function ShippingPage() {
    const [selectedOrder, setSelectedOrder] = useState(null);
  const [firm, setFirm] = useState("Yurtiçi");
  const [note, setNote] = useState("");
  return (
    <div className="p-4 space-y-8 bg-white rounded-md">
      <div>
        <h2 className="text-xl font-semibold mb-2">Bekleyen Siparişler</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sipariş No</TableHead>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Ürün Adedi</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead className="text-center">Kargo Oluştur</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipmentsToPrepare.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell className="text-center">
                       <Dialog >
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedOrder(order)} variant="secondary" className="bg-[#10B981] text-black">
                        <TruckIcon size={16} /> Kargo Oluştur
                      </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Kargo Etiketi Oluştur</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Select value={firm} onValueChange={setFirm}>
                    <SelectTrigger>Kargo Firması</SelectTrigger>
                    <SelectContent className="bg-white">
                      {shippedOrders.map(item => (
                        <SelectItem value={item.company}>{item.company}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input disabled value="Gönderici: Firma Adı / Adres" />
                  <Input disabled value={`Alıcı: ${selectedOrder?.name}`} />
                  <Input disabled value={`Ürün Özeti: ${selectedOrder?.items} ürün - ₺${selectedOrder?.total}`} />
                  <Input placeholder="Kargo Notu (isteğe bağlı)" value={note} onChange={(e) => setNote(e.target.value)} />
                  <Button onClick={() => alert("Barkod Oluşturuldu (mock)")}>Barkod Oluştur</Button>
                </div>
              </DialogContent>
            </Dialog>
          
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Kargolarım</h2>
        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sipariş</TableHead>
                  <TableHead>Takip Kodu</TableHead>
                  <TableHead>Firma</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      {order.code}
                      <ClipboardCopyIcon size={16} className="cursor-pointer" />
                    </TableCell>
                    <TableCell>{order.company}</TableCell>
                    <TableCell className={order.status === "Yolda" ? "text-yellow-500" : "text-green-600"}>
                      {order.status}
                    </TableCell>
                    <TableCell>
                      <Link href={order.pdf} className="text-blue-500 hover:underline">
                        PDF
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
