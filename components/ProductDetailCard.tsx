'use client'
import { format } from "date-fns";
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
          name: v.name,
          options: v.options.split(",").map(o => o.trim()).filter(Boolean)
        }))
      };

      await axios.patch(`/api/products/${product._id}`, payload);
      toast.success("✅ Ürün başarıyla güncellendi");
      closeSheet();
    } catch (error: any) {
      console.error("Ürün güncellenemedi", error);
      toast.error("❌ Güncelleme sırasında bir hata oluştu");
    }
  };

  return (
    <Card className="max-w-full md:max-w-2xl border-0  mt-6 shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">🛒 Ürün Detayı</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mode === "edit" ? (
          <div className="space-y-4">
            <Input value={formData.name} onChange={e => handleChange("name", e.target.value)} placeholder="Ürün Adı" />
            <Input type="number" value={formData.price} onChange={e => handleChange("price", parseFloat(e.target.value) || 0)} placeholder="Fiyat" />
            <Input type="number" value={formData.stock} onChange={e => handleChange("stock", parseInt(e.target.value) || 0)} placeholder="Stok" />
            <Input value={formData.image} onChange={e => handleChange("image", e.target.value)} placeholder="Görsel URL" />

            <Separator />
            <h4 className="font-semibold">🎨 Varyantlar</h4>

            {formData.variants.map((variant, index) => (
              <div key={index} className="space-y-2 border p-2 rounded-md">
                <Input
                  value={variant.name}
                  onChange={e => handleVariantChange(index, "name", e.target.value)}
                  placeholder="Varyant adı (ör. Renk, Beden)"
                />
                <Input
                  value={variant.options}
                  onChange={e => handleVariantChange(index, "options", e.target.value)}
                  placeholder="Seçenekler (ör. m, s, l)"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => removeVariant(index)}
                >
                  Varyantı Sil
                </Button>
              </div>
            ))}

            <Button type="button" onClick={addVariant} variant="outline">
              + Varyant Ekle
            </Button>
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
            {product.variants?.length > 0 && (
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
              ⏰ Eklenme tarihi: {format(new Date(product.createdAt), "dd.MM.yyyy HH:mm")}
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
