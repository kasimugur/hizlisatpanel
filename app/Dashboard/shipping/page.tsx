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
import { mockKargoFirmalari } from "@/constant/mockKargoFirmalari";
// import { mockOrders } from "@/constant/mockOrders";
import { mockShipments } from "@/constant/mockShipments";
import { useOrders } from "@/context/OrdersContext";
import { useSettings } from "@/context/SettingsContext";
import { toast } from "sonner";


export default function ShippingPage() {
  const { orders } = useOrders()
  const { settings } = useSettings()
  const cargoFirm = settings?.shipping?.carriers || []
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [firm, setFirm] = useState(cargoFirm?.[0] || "");
  const [note, setNote] = useState("");
  const [shipments, setShipments] = useState(mockShipments)
  console.log(settings?.company.name)

const generateTrackingCode = () => {
  return `TRK-${Date.now().toString().slice(-8)}`;
}
console.log(selectedOrder,"selectorder")
const handleCreateShipment = () => {
  if (!selectedOrder) return;

  const newShipment = {
    orderId: selectedOrder._id,
    trackingCode: generateTrackingCode(),
    company: firm,
    status: "Yolda",
    labelPdf: "#", // Gerçek API'den gelirse buraya link gelecek
  }; 
  setShipments((prev) => [...prev, newShipment]);

  toast.success(`📦 ${firm} firması ile kargo oluşturuldu`);
  setSelectedOrder(null); // dialog'u kapatmak için
  setNote(""); // notu temizle
};

console.log(shipments," shipments")
  const mockOrders = orders
  return (
    <div className="p-4 space-y-8 bg-white rounded-md">
      {/* Bekleyen Siparişler */}
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
            {mockOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.items.reduce((sum, i) => sum + i.quantity, 0)}</TableCell>
                <TableCell>₺{order.totalPrice.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedOrder(order)}
                        variant="secondary"
                        className="bg-[#10B981] text-black"
                      >
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
                            {cargoFirm.map((f, index) => (
                              <SelectItem key={index} value={f}>
                                {f}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input disabled value={`Gönderici: ${settings?.company.name}`} />
                        <Input disabled value={`Alıcı: ${selectedOrder?.customerName}`} />
                        <Input
                          disabled
                          value={`Ürün: ${selectedOrder?.items.map(i => i.name).join(", ")} - ₺${selectedOrder?.totalPrice}`}
                        />
                        <Input
                          placeholder="Kargo Notu (isteğe bağlı)"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                        <Button onClick={handleCreateShipment}>
                          Barkod Oluştur
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Kargolarım */}
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
                {shipments.map((shipment) => (
                  <TableRow key={shipment.orderId}>
                    <TableCell>{shipment.orderId}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      {shipment.trackingCode}
                      <ClipboardCopyIcon size={16} className="cursor-pointer" />
                    </TableCell>
                    <TableCell>{shipment.company}</TableCell>
                    <TableCell className={shipment.status === "Yolda" ? "text-yellow-500" : "text-green-600"}>
                      {shipment.status}
                    </TableCell>
                    <TableCell>
                      <Link href={shipment.labelPdf} className="text-blue-500 hover:underline">
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
