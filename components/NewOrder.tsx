'use client'
import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

const productList = [
  { name: "V Yaka Bluz", price: 89 },
  { name: "Kot Pantolon", price: 120 },
  { name: "Gömlek", price: 100 },
];

export default function NewOrder() {
  const [customer, setCustomer] = useState({ name: "", phone: "", note: "" });
  const [products, setProducts] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);
  const [discount, setDiscount] = useState("0");
  const [cargoIncluded, setCargoIncluded] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("Kapıda ödeme");
  const [orderStatus, setOrderStatus] = useState("Hazırlanıyor");

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = field === "quantity" || field === "price" ? Number(value) : value;

    if (field === "name") {
      const found = productList.find((p) => p.name === value);
      if (found) updated[index].price = found.price;
    }

    setProducts(updated);
  };

  const addProduct = () => setProducts([...products, { name: "", quantity: 1, price: 0 }]);

  const removeProduct = (index): any => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  const calculateTotal = () => {
    const subtotal = products.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    let discountVal = 0;
    if (discount.includes("%")) {
      const rate = parseFloat(discount.replace("%", "")) / 100;
      discountVal = subtotal * rate;
    } else {
      discountVal = parseFloat(discount) || 0;
    }
    return subtotal - discountVal;
  };

  return (
    <Card className="max-w-2xl mx-auto mt-4">
      <CardContent className="space-y-6 p-6">
        {/* Müşteri Bilgisi */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">🧍 Müşteri Bilgisi</h2>
          <Input
            placeholder="Müşteri adı giriniz"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <Input
            placeholder="Telefon No (Opsiyonel)"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
          <Textarea
            placeholder="Teslimat Notu"
            value={customer.note}
            onChange={(e) => setCustomer({ ...customer, note: e.target.value })}
          />
        </div>

        {/* Sipariş Ürünleri */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">📦 Sipariş Ürünleri</h2>
          {products.map((item, index) => (
            <div className="grid grid-cols-4 gap-2 items-center" key={index}>
              <Input
                placeholder="Ürün adı yazın veya seçin"
                list="productList"
                value={item.name}
                onChange={(e) => handleProductChange(index, "name", e.target.value)}
              />
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
              />
              <Input
                type="number"
                value={item.price}
                onChange={(e) => handleProductChange(index, "price", e.target.value)}
              />
              <Button variant="ghost" onClick={() => removeProduct(index)}>
                <Trash2 className="text-red-500" />
              </Button>
            </div>
          ))}
          <datalist id="productList">
            {productList.map((p, idx) => (
              <option key={idx} value={p.name} />
            ))}
          </datalist>
          <Button onClick={addProduct}>+ Ürün Ekle</Button>
        </div>

        {/* Toplam / Ödeme Bilgisi */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">💰 Toplam / Ödeme Bilgisi</h2>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="İndirim (% veya ₺)"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <Checkbox
              checked={cargoIncluded}
              onCheckedChange={setCargoIncluded}
            />
            <Label>Kargo dahil mi?</Label>
            <Select
              value={paymentStatus}
              onValueChange={setPaymentStatus}
            >
              <SelectContent>
                <SelectItem value="Ödendi">Ödendi</SelectItem>
                <SelectItem value="Ödenecek">Ödenecek</SelectItem>
                <SelectItem value="Kapıda ödeme">Kapıda ödeme</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-green-600 font-semibold text-right">
            Toplam Tutar: ₺{calculateTotal().toFixed(2)}
          </p>
        </div>

        {/* Sipariş Durumu */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">📦 Sipariş Durumu</h2>
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectContent>
              <SelectItem value="Hazırlanıyor">Hazırlanıyor</SelectItem>
              <SelectItem value="Kargoda">Kargoda</SelectItem>
              <SelectItem value="Teslim edildi">Teslim edildi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Butonlar */}
        <div className="flex justify-between">
          <Button variant="outline">İptal</Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Siparişi Oluştur
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
