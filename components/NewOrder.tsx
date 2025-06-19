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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrdersContext";
import { toast } from "sonner";

export default function NewOrder() {
  const { products } = useProducts()
  const { refetch } = useOrders()

  const router = useRouter();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", note: "" });
  const [product, setProduct] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [discount, setDiscount] = useState("");
  const [cargoIncluded, setCargoIncluded] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("Kapıda ödeme");
  const [orderStatus, setOrderStatus] = useState("Hazırlanıyor");

  // const products = [
  //   { name: "V Yaka Bluz", price: 89 },
  //   { name: "Kot Pantolon", price: 120 },
  //   { name: "Gömlek", price: 100 },
  // ];

  const handleProductChange = (index, field, value) => {
    const updated = [...product];
    updated[index][field] = field === "quantity" || field === "price" ? Number(value) : value;
    if (field === "name") {
      const found = products.find((p) => p.name === value);
      if (found) updated[index].price = found.price;
    }
    setProduct(updated);
  };

  const addProduct = () => setProduct([...product, { name: "", quantity: 1, price: 0 }]);

  const removeProduct = (index) => {
    const updated = product.filter((_, i) => i !== index);
    setProduct(updated);
  };

  const calculateTotal = () => {
    const subtotal = product.reduce((sum, item) => sum + item.quantity * item.price, 0);

    let discountVal = 0;

    if (discount.includes("%")) {
      const rate = parseFloat(discount.replace("%", "")) / 100;
      discountVal = subtotal * rate;
    } else {
      discountVal = parseFloat(discount) || 0;
    }

    const cargoFee = cargoIncluded ? 20 : 0; // Kargo dahilsə 20 TL ekle
    // Negatif indirim kontrolü
    if (discountVal < 0) discountVal = 0;

    return Math.max(subtotal - discountVal + cargoFee, 0);
  };


  const handleSubmit = async () => {
    const totalPrice = calculateTotal();
    const orderData = {
      customerName: customer.name,
      customerEmail: customer.email,
      phone: customer.phone,
      address: customer.address,
      items: product,
      totalPrice,
      status: orderStatus,
    };

    try {
      const res = await axios.post("/api/orders", orderData);
      if (res.status === 200 || res.status === 201) {
        router.push("/dashboard/orders");
        refetch();
        toast.success("Sipariş başarıyla eklendi!");

      }
    } catch (err) {
      console.error("Sipariş gönderilemedi:", err);
      toast.error("sipariş eklenirken hata oluştu!");
    }
  };


  return (
    <Card className="max-w-2xl mx-auto mt-4 bg-white">
      <CardContent className="space-y-6 p-6">
        {/* Müşteri Bilgisi */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">🧙 Müşteri Bilgisi</h2>
          <Input placeholder="Ad Soyad" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <Input placeholder="E-posta" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <Input placeholder="Telefon No (Opsiyonel)" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <Textarea placeholder="Adres" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
        </div>

        {/* Sipariş Ürünleri */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">📦 Sipariş Ürünleri</h2>
          <div className="grid grid-cols-3 gap-0.5 ">
            <Label>Adı</Label>
            <Label>Adet</Label>
            <Label>Fiyat</Label>
          </div>
          {product.map((item, index) => (
            <div className="grid grid-cols-4 gap-2 items-center" key={index}>
              <Input list="products" placeholder="Ürün seçiniz" value={item.name} onChange={(e) => handleProductChange(index, "name", e.target.value)} />
              <Input type="number" min="1" value={item.quantity} onChange={(e) => handleProductChange(index, "quantity", e.target.value)} />
              <Input type="number" value={item.price} onChange={(e) => handleProductChange(index, "price", e.target.value)} />
              <Button variant="ghost" onClick={() => removeProduct(index)}><Trash2 className="text-red-500" /></Button>
            </div>
          ))}
          <datalist id="products">
            {products.map((p, idx) => (<option key={idx} value={p.name} />))}
          </datalist>
          <Button onClick={addProduct}>+ Ürün Ekle</Button>
        </div>

        {/* Ödeme Bilgisi */}
        <h2 className="text-xl font-bold text-gray-800">💰 Ödeme Bilgisi</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* İndirim Alanı */}
          <div className="md:col-span-2">
            <Label className="text-sm text-gray-600">İndirim</Label>
            <Input
              placeholder="İndirim (% veya ₺)"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          {/* Kargo Dahil Checkbox */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <Checkbox
              checked={cargoIncluded}
              onCheckedChange={setCargoIncluded}
              id="cargo-included"
            />
            <Label htmlFor="cargo-included" className="text-sm text-gray-600">Kargo dahil mi?</Label>
          </div>

          {/* Ödeme Durumu */}
          <div className="md:col-span-4">
            <Label className="text-sm text-gray-600">Ödeme Durumu</Label>
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
              <SelectTrigger className="w-full bg-white text-gray-800 border border-gray-300">
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-800">
                <SelectItem value="Ödendi">Ödendi</SelectItem>
                <SelectItem value="Ödenecek">Ödenecek</SelectItem>
                <SelectItem value="Kapıda ödeme">Kapıda ödeme</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Toplam Tutar */}
          <div className="md:col-span-4 text-right">
            <p className="text-green-600 font-semibold text-lg">
              Toplam Tutar: ₺{calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
        {/* Sipariş Durumu */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">📦 Sipariş Durumu</h2>
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>

            <SelectContent className="bg-white">
              <SelectItem value="Hazırlanıyor">Hazırlanıyor</SelectItem>
              <SelectItem value="Kargoda">Kargoda</SelectItem>
              <SelectItem value="Teslim edildi">Teslim edildi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Butonlar */}
        <div className="flex justify-between">
          <Button onClick={() => {
            router.push('/dashboard/orders')
            toast.info("Sipariş oluşturma işlemi iptal edildi!");
          }} variant="outline">İptal</Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSubmit}>
            Siparişi Oluştur
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
