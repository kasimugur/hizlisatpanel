'use client'

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageInput from "./ImageInput";
import axios from "axios";
import { useProducts } from "@/context/ProductContext";

const formSchema = z.object({
  name: z.string().min(1, "Ürün adı zorunlu"),
  price: z.string().min(1, "Fiyat zorunlu"),
  stock: z.string().min(1, "Stok zorunlu"),
  sku: z.string().optional(),
  imageUrl: z.string().optional(),
});

export default function NewProduct() {
  const { fetchProducts } = useProducts()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      sku: "",
      imageUrl: "",
    },
  });

  const [varyant, setVaryant] = useState([{ tip: "", deger: "" }]);

  const handleVaryantEkle = () => {
    setVaryant([...varyant, { tip: "", deger: "" }]);
  };

  const handleVaryantSil = (index: number) => {
    const updated = varyant.filter((_, i) => i !== index);
    setVaryant(updated);
  };

  const handleVaryantDegis = (index: number, field: string, value: string) => {
    const updated = [...varyant];
    (updated[index] as any)[field] = value;
    setVaryant(updated);
  }

  const normalizedVariants = (varyant: { tip: string; deger: string }[]) => {
    return varyant.map(v => ({
      name: v.tip,
      options: v.deger ? v.deger.split(',').map(opt => opt.trim()) : [],
    }));
  }

  const onSubmit = async (data: any) => {
    const normalized = normalizedVariants(varyant); // fonksiyonu çağır
    console.log("normalized fonksiyon",normalized)
    const fullData = {
      ...data,
      ...(normalized.length > 0 && { variants: normalized }),
    };
    try {
      await axios.post('/api/products', fullData)
      await fetchProducts()
      form.reset()
      setVaryant([{ tip: '', deger: '' }])
    } catch (error) {
      console.error('Ürün eklenemedi:', error)
    }
    console.log("Ürün verisi:", fullData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">📦 Yeni Ürün Ekle</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>🧷 Ürün Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Ürün adını giriniz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>💰 Fiyat (TL) *</FormLabel>
                <FormControl>
                  <Input placeholder="Örn: 99.90" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>📦 Stok Miktarı *</FormLabel>
                <FormControl>
                  <Input placeholder="Stok adedini giriniz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>🔢 SKU (Opsiyonel)</FormLabel>
                <FormControl>
                  <Input placeholder="Stok kodu giriniz" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <ImageInput form={form} />
          <div>
            <FormLabel>🧩 Varyantlar (Opsiyonel)</FormLabel>
            {varyant.map((v, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <Input
                  placeholder="Tipi (örn: Renk)"
                  value={v.tip}
                  onChange={(e) => handleVaryantDegis(i, "tip", e.target.value)}
                />
                <Input
                  placeholder="Değeri (örn: Kırmızı)"
                  value={v.deger}
                  onChange={(e) => handleVaryantDegis(i, "deger", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleVaryantSil(i)}
                >
                  <Trash2 className="text-red-500" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={handleVaryantEkle}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Varyant Ekle
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Ürünü Kaydet
          </Button>
        </form>
      </Form>
    </div>
  );
}
