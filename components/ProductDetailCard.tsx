'use client'
import { format } from "date-fns";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import axios from "axios";
import { useProducts } from "@/context/ProductContext";
import { Label } from "./ui/label";
import { Product } from "@/types/product";

export default function ProductDetailCard({
  product,
  mode,
  closeSheet
}: {
  product: Product,
  mode: "view" | "edit",
  closeSheet: () => void
}) {
  const { fetchProducts, loading } = useProducts()
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || 0,
    stock: product.stock || 0,
    image: product.image || "",
    description: product.description || "",
    variants: product.variants?.map((v: any) => ({
      name: v.name,
      options: Array.isArray(v.options) ? v.options.join(", ") : v.options || "",
    })) || [],
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVariantChange = (index: number, field: "name" | "options", value: string) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,

      variants: [...prev.variants, { name: "", options: "" }]
    }));
  };

  const removeVariant = (index: number) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  
const handleClick = async () => {
  try {
    const payload = {
      ...formData,
      variants: formData.variants.map(v => ({
        name:    v.name,
        options: v.options.split(",").map(o => o.trim()).filter(Boolean)
      }))
    };

    const calls = [];
    if (product.sourceType === "db") {
      // Sadece kendi DB ürününü güncelle
      calls.push(axios.patch(`/api/products/${product.id}`, payload));
    }
    else if (product.sourceType === "trendyol") {
      // Sadece mock Trendyol ürününü güncelle
      calls.push(axios.patch(`/api/mock/trendyol/products/${product.id}`, payload));
    }

    await Promise.all(calls);

    await fetchProducts();
    toast.success("✅ Ürün başarıyla güncellendi");
    closeSheet();
  } catch (error: any) {
    console.error("Güncelleme sırasında hata:", error);
    toast.error("❌ Güncelleme sırasında bir sorun oluştu");
  }
};

const createdAtDisplay = product.createdAt
    ? (() => {
        const d = new Date(product.createdAt);
        return isNaN(d.getTime())
          ? "-"                       // hala geçersizse
          : format(d, "dd/MM/yyyy HH:mm");
      })()
    : "-";

  return (
    <Card className="max-w-full md:max-w-2xl border-0  mt-6 shadow-lg bg-white">
      <CardHeader>
        {/* <CardTitle className="text-xl flex items-center gap-2">🛒 Ürün Detayı</CardTitle> */}
      </CardHeader>
      <CardContent className="space-y-6">
        {mode === "edit" ? (
           <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Ürün Ekle/Düzenle</h2>
      <div className="space-y-4 max-w-md">
        {/* Ürün Adı */}
        <div className="space-y-2">
          <Label htmlFor="name">Ürün Adı</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ürün Adı"
            className="w-full"
          />
        </div>

        {/* Fiyat */}
        <div className="space-y-2">
          <Label htmlFor="price">Fiyat (₺)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
            placeholder="Fiyat"
            className="w-full"
          />
        </div>

        {/* Stok */}
        <div className="space-y-2">
          <Label htmlFor="stock">Stok</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
            placeholder="Stok"
            className="w-full"
          />
        </div>

        {/* Görsel URL */}
        <div className="space-y-2">
          <Label htmlFor="image">Görsel URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="Görsel URL"
            className="w-full"
          />
        </div>

        <Separator />

        {/* Varyantlar */}
        <div className="space-y-2">
          <h4 className="font-semibold">🎨 Varyantlar</h4>
          {formData.variants.map((variant, index) => (
            <div key={index} className="border p-4 rounded-md space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`variant-name-${index}`}>Varyant Adı</Label>
                  <Input
                    id={`variant-name-${index}`}
                    value={variant.name}
                    onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                    placeholder="Ör. Renk, Beden"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`variant-options-${index}`}>Seçenekler</Label>
                  <Input
                    id={`variant-options-${index}`}
                    value={variant.options}
                    onChange={(e) => handleVariantChange(index, 'options', e.target.value)}
                    placeholder="Ör. Kırmızı, Mavi veya S, M, L"
                    className="w-full"
                  />
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => removeVariant(index)}
              >
              Sil
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addVariant} variant="outline" className="mt-2">
            + Varyant Ekle
          </Button>
        </div>

      </div>
    </div>
        ) : (

          <div className="space-y-6 text-sm">

            {/* Ürün Görseli */}
            <div className="w-full h-[200px] overflow-hidden rounded-lg shadow-sm border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Ürün Bilgileri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              <div><strong>🛍 Ürün Adı:</strong> {product.name}</div>
              <div><strong>💸 Fiyat:</strong> ₺{product.price}</div>
              <div><strong>📦 Stok:</strong> {product.stock} adet</div>
              <div><strong>🧾 SKU:</strong> {product.sku || "-"}</div>
            </div>

            {/* Varyantlar */}
            {product.variants.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold text-md mb-2">🎨 Varyantlar</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.variants.map((v, i) => (
                      <li key={i}>
                        <strong>{v.name}:</strong>{" "}
                        {Array.isArray(v.options)
                          ? v.options.join(", ")
                          : String(v.options)}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Eklenme Tarihi */}
            <Separator />
            <div className="text-xs text-muted-foreground text-end">
              ⏰ Eklenme tarihi: {createdAtDisplay}
            </div>
          </div>
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
