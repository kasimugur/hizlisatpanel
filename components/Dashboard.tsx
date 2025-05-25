import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock2, LogOut, LucideFileSignature, PlusCircle, ShoppingCart } from "lucide-react";
import RecentOrdersCard from "./RecentOrdersCard";
import Link from "next/link";

export default function Dashboard() {
  const FastTransactions = [
    { label: "Ürün Ekle", href: "/urun-ekle", icon: PlusCircle },
    { label: "Sipariş gir", href: "/siparis-gir", icon: PlusCircle },
    { label: "Fatura Kes", href: "/fatura-kes", icon: LucideFileSignature }
  ]
  const cardsInfo = [
  { title: "Günlük Satış", value: "₺5.230", bgColor: "bg-green-50" },
  { title: "Sipariş Sayısı", value: "45", bgColor: "" },
  { title: "Bekleyen Sipariş", value: "12", bgColor: "bg-blue-50" },
  { title: "Toplam Ürün", value: "120", bgColor: "bg-yellow-50" },
];
  return (
    <div className="p-6 space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsInfo.map(({ title, value, bgColor }, index) => (
      <Card key={index} className={bgColor}>
        <CardContent className="p-4">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-lg font-bold">{value}</p>
        </CardContent>
      </Card>
    ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent className="p-4 space-y-4">
            {/* <ShoppingCart className="w-4 h-4" /> */}

            <div>
              <h1 className="text-lg font-semibold text-red-600">Kritik Stokta Ürünler</h1>
              <ul className="list-disc pl-6 text-sm">
                <li>Ürün A - 2 adet</li>
                <li>Ürün B - 1 adet</li>
                <li>Ürün C - 4 adet</li>
                <li>Ürün D - 3 adet</li>
                <li>Ürün E - 1 adet</li>
              </ul>
            </div>

            {/* <div>
              <p className="text-sm font-semibold">Hızlı Eylemler</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm">Ürün Ekle</Button>
                <Button size="sm">Sipariş Gir</Button>
                <Button size="sm">Fatura Kes</Button>
              </div>
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm font-semibold">Bekleyen Siparişler</span>
            </div>
            <div className="bg-gray-100 h-32 flex items-center justify-center text-sm text-gray-500">
              Grafik Alanı
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 ">

        <Card >
          <CardContent className="px-4 ">
            <div className="flex flex-col gap-3">
              <span className="flex gap-2  items-center">
                <Clock2 size={'15px'} style={{ color: 'red' }} /> Hızlı İşlemler
              </span>
              <div className=" gap-4 flex">
                {FastTransactions.map(({ label, icon: Icon }) => (
                  <Button variant={"ghost"} 
                  className="bg-gray-900 hover:bg-gray-600 text-white">
                    <Icon className="h-5 w-5" />
                    {label}
                  </Button>
                ))}

              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-semibold mb-2">Son Siparişler</p>
          <RecentOrdersCard />
        </CardContent>
      </Card>
    </div>
  );
}
