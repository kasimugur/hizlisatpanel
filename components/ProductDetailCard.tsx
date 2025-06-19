'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import axios from "axios";

export default function ProductDetailCard({
  product,
  mode,
  closeSheet
}: {
  product: any,
  mode: "view" | "edit",
  closeSheet: () => void
}) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClick = async () => {
    try {
      await axios.patch(`/api/products/${product._id}`, formData);
      toast.success("Ürün başarıyla güncellendi");
      closeSheet();
    } catch (error) {
      console.error("Ürün güncellenemedi", error);
      toast.error("Güncelleme sırasında hata oluştu");
    }
  };

  return (
    <Card className="max-w-full md:max-w-2xl mx-auto mt-6 shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          🛒 Ürün Detayı
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mode === "edit" ? (
          <>
            <Input value={formData.name} onChange={e => handleChange("name", e.target.value)} placeholder="Ürün Adı" />
            <Input type="number" value={formData.price} onChange={e => handleChange("price", parseFloat(e.target.value))} placeholder="Fiyat" />
            <Input type="number" value={formData.stock} onChange={e => handleChange("stock", parseInt(e.target.value))} placeholder="Stok" />
            <Input value={formData.description} onChange={e => handleChange("description", e.target.value)} placeholder="Açıklama" />
          </>
        ) : (
          <>
            <p><strong>Ad:</strong> {product.name}</p>
            <p><strong>Fiyat:</strong> ₺{product.price}</p>
            <p><strong>Stok:</strong> {product.stock}</p>
            <p><strong>Açıklama:</strong> {product.description}</p>
          </>
        )}
        <Separator />
        {mode === "edit" && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeSheet}>Vazgeç</Button>
            <Button onClick={handleClick}>Kaydet</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
