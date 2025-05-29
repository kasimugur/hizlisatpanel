'use client'

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, PlusCircle } from "lucide-react";

export default function NewProductsPage() {
  const [varyantlar, setVaryantlar] = useState([{ tip: "", deger: "" }]);
  const handleVaryantEkle = () => {
    setVaryantlar([...varyantlar, { tip: "", deger: "" }]);
  };
  const handleVaryantSil = (index) => {
    const guncel = varyantlar.filter((_, i) => i !== index);
    setVaryantlar(guncel);
  };
  const handleVaryantDegis = (index, field, value) => {
    const guncel = [...varyantlar];
    guncel[index][field] = value;
    setVaryantlar(guncel);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">🔒 Yeni Ürün Ekle</h2>

      <Label className="mb-1">🧷 Ürün Adı *</Label>
      <Input placeholder="Ürün adını giriniz" className="mb-4" />

      <Label className="mb-1">💰 Fiyat (TL) *</Label>
      <Input placeholder="Örn: 99.90" className="mb-4" />

      <Label className="mb-1">📦 Stok Miktarı *</Label>
      <Input placeholder="Stok adedini giriniz" className="mb-4" />

      <Label className="mb-1">🔢 SKU (Opsiyonel)</Label>
      <Input placeholder="Stok kodu giriniz" className="mb-4" />

      <Label className="mb-1">🖼️ Ürün Görseli</Label>
      <Input type="file" className="mb-2" />
      <Input placeholder="Görsel URL'si yapıştırın" className="mb-4" />
      <div className="mb-4">
        <img
          src="https://via.placeholder.com/150x120?text=Ürün+Görseli"
          alt="Ürün görsel önizlemesi"
          className="rounded border"
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2">🧩 Varyantlar (Opsiyonel)</Label>
        {varyantlar.map((v, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Input
              placeholder="Varyant adı (örn: Renk)"
              value={v.tip}
              onChange={(e) => handleVaryantDegis(i, "tip", e.target.value)}
            />
            <Input
              placeholder="Varyant değeri (örn: Kırmızı)"
              value={v.deger}
              onChange={(e) => handleVaryantDegis(i, "deger", e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVaryantSil(i)}
            >
              <Trash2 className="text-red-500" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={handleVaryantEkle}>
          <PlusCircle className="mr-2 h-4 w-4" /> Varyant Ekle
        </Button>
      </div>

      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
        Ürünü Kaydet
      </Button>
    </div>
  );
}
