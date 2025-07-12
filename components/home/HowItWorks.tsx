// components/HowItWorks.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Package as PackageIcon,
  Plug,
  ListChecks,
} from "lucide-react";

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "Hesap Oluştur",
    description: "Hızlı ve kolay kayıt ile hemen kullanmaya başlayın.",
  },
  {
    number: "2",
    icon: PackageIcon,
    title: "Ürünleri ve Siparişleri Ekle",
    description: "Ürünlerinizi ve siparişlerinizi kolayca sisteme ekleyin.",
  },
  {
    number: "3",
    icon: Plug,
    title: "Pazaryeri Entegrasyonlarını Bağla",
    description: "Trendyol, N11, Hepsiburada gibi platformlarla entegre olun.",
  },
  {
    number: "4",
    icon: ListChecks,
    title: "Satış, Fatura ve Kargoyu Yönet",
    description: "Tüm operasyonlarınızı tek panelden kolayca yönetin.",
  },
];

export function HowItWorks() {
  return (
    <div className="grid gap-12 md:grid-cols-4 text-center">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <Card key={step.number} className="border-none shadow-none">
            <CardContent className="space-y-4 px-4">
              <Badge className="w-16 h-16 rounded-full bg-[#3B82F6] text-white text-2xl font-bold grid place-items-center mx-auto">
                {step.number}
              </Badge>
              <Icon className="text-[#3B82F6] w-10 h-10 mx-auto" />
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-[#4B5563]">{step.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
