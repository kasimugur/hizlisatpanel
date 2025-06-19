'use client';

import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Input } from "@/components/ui/input"; // shadcn input bileşeni varsayalım
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrdersContext";
import { toast } from "sonner";

export default function OrderDetailCard({ order, mode, closeSheet }: { order: any, mode: "view" | "edit" , closeSheet: () => void} ) {
  const {refetch}= useOrders()
  console.log(order)
  // Düzenleme modunda local state tutalım
  const [formData, setFormData] = useState({
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    phone: order.phone,
    address: order.address,
    items: order.items,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Ürün miktarlarını değiştirmek için:
  const handleItemQuantityChange = (index: number, quantity: number) => {
    if(quantity < 0) return; // negatif olmasın
    const newItems = [...formData.items];
    newItems[index].quantity = quantity;
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const totalPrice = formData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);


const handleClick = async () => {
  try {
    const response = await axios.patch(`/api/orders/${order._id}`, formData);
console.log("Güncelleme başarılı bir şekilde gerçekleşti");
    toast.success("Sipariş başarıyla güncellendi");
  closeSheet() // düzenleme modundan çık
    refetch(); // verileri güncelle
  } catch (error) {
    console.error(error,"Güncelleme sırasında bir hata oluştu.");
    toast.error("Güncelleme sırasında bir hata oluştu.");
  }
};

  return (
    <Card className="max-w-full md:max-w-2xl mx-auto mt-6 shadow-lg  border-0 border-muted-foreground/10 bg-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          📦 Sipariş Detayı
          <Badge variant="secondary" className="text-xs font-normal">{order.status}</Badge>
        </CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Sipariş Tarihi: {format(new Date(order.createdAt), "dd.MM.yyyy HH:mm")}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-md font-semibold text-primary">👤 Müşteri Bilgisi</h3>
          {mode === "edit" ? (
            <>
              <Input
                value={formData.customerName}
                onChange={e => handleChange("customerName", e.target.value)}
                placeholder="Müşteri Adı"
              />
              <Input
                value={formData.customerEmail}
                onChange={e => handleChange("customerEmail", e.target.value)}
                placeholder="Email"
                type="email"
              />
              <Input
                value={formData.phone}
                onChange={e => handleChange("phone", e.target.value)}
                placeholder="Telefon"
                type="tel"
              />
              <Input
                value={formData.address}
                onChange={e => handleChange("address", e.target.value)}
                placeholder="Adres"
              />
            </>
          ) : (
            <>
              <p><strong>Ad:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.customerEmail}</p>
              <p><strong>Telefon:</strong> {order.phone}</p>
              <p><strong>Adres:</strong> {order.address}</p>
            </>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="text-md font-semibold text-primary mb-2">🛍️ Ürünler</h3>
          <ScrollArea className="max-h-60 pr-2">
            <ul className="space-y-2">
              {formData.items.map((item, index) => (
                <li key={index} className="flex justify-between text-sm items-center">
                  <span>{item.name} (₺{item.price} x </span>
                  {mode === "edit" ? (
                    <Input
                      type="number"
                      value={item.quantity}
                      min={0}
                      onChange={e => handleItemQuantityChange(index, Number(e.target.value))}
                      className="w-16 mx-1"
                    />
                  ) : (
                    <span className="mx-1">{item.quantity}</span>
                  )}
                  <span>) = <strong>₺{(item.price * item.quantity).toFixed(2)}</strong></span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>

        <Separator />

        <div className="flex justify-between items-center text-base">
          <p className="font-medium">Toplam Tutar</p>
          <p className="text-green-600 font-bold text-lg">₺{totalPrice.toFixed(2)}</p>
        </div>

        {mode === "edit" && (
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => closeSheet() }>
              Vazgeç
            </Button>
            <Button onClick={()=> handleClick()}>
              Kaydet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
