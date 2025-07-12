// components/Features.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, Plug, FileText, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Kolay Sipariş ve Stok Yönetimi",
    description:
      "Tüm siparişlerinizi ve stoklarınızı tek panelden hızlıca yönetin.",
  },
  {
    icon: Plug,
    title: "Entegrasyonlar ile Pazaryerlerine Bağlanma",
    description:
      "Trendyol, N11, Hepsiburada ve diğer pazaryerlerine kolayca bağlanın.",
  },
  {
    icon: FileText,
    title: "Hızlı Fatura ve Kargo Takibi",
    description:
      "Yasal PDF faturalar oluşturun ve kargo barkodlarınızı kolayca yönetin.",
  },
  {
    icon: Shield,
    title: "Güvenli Ödeme Seçenekleri",
    description:
      "İşlemlerinizi güvenli ödeme altyapıları ile hızlıca tamamlayın.",
  },
  {
    icon: Users,
    title: "Basit ve Kullanıcı Dostu Arayüz",
    description:
      "Her seviyeden kullanıcı için tasarlanmış, kolay anlaşılır ve hızlı arayüz.",
    spanFull: true,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <Card
              key={feat.title}
              className={`text-center px-4 border-0 ${
                feat.spanFull ? "lg:col-span-4" : ""
              }`}
            >
              <CardContent className="space-y-4">
                <Icon width={45} height={45} className="text-[#3B82F6] text-9xl mx-auto" />
                <h3 className="text-xl font-semibold">{feat.title}</h3>
                <p className="text-[#4B5563]">{feat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
