import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

export default function ImageInput({ form }) {
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result?.toString() || "";
        setPreview(result);
        form.setValue("imageUrl", result); // base64 veya data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormField
      control={form.control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>🖼️ Ürün Görseli</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Input
                placeholder="Görsel URL'si yapıştırın"
                value={field.value || ""}
                onChange={(e) => {
                  const url = e.target.value;
                  field.onChange(url);
                  setPreview(url);
                }}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {preview && (
                <Image
                  src={preview}
                  alt="Görsel önizleme"
                  width={150}
                  height={120}
                  className="rounded border"
                />
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
