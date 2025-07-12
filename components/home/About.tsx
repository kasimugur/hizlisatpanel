// components/About.tsx
"use client";

import Link from "next/link";
import { Section } from "@/components/home/Section";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <Section id="about" title="Hakkımızda">
      <div className="space-y-12 text-center">
        {/* 1. Başlık & Giriş */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">
            HızlıSat ile Dijital Dönüşüme Hoş Geldiniz
          </h3>
          <p className="text-lg text-gray-700">
            Mikro satıcılar için tasarlanmış tek panelde sipariş, fatura ve kargo yönetimi çözümüne adım atın.
          </p>
        </div>

        <Separator />

        {/* 2. Vizyonumuz */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Vizyonumuz</h4>
          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-800">
            “Türkiye’nin her köşesindeki satıcının işini kolaylaştırmak; operasyonel yükü otomatikleştiren, kullanıcı dostu bir ekosistem yaratmak.”
          </blockquote>
        </div>

        {/* 3. Misyonumuz */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Misyonumuz</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>Basitleştirmek:</strong> Karmaşık süreçleri tek bir ekranda topluyoruz.</li>
            <li><strong>Hızlandırmak:</strong> Siparişten kargoya, fatura kesiminden rapora; tüm adımları otomatikleştiriyoruz.</li>
            <li><strong>Büyütmek:</strong> Satıcının müşterisine odaklanmasını, işini büyütmesini sağlıyoruz.</li>
          </ul>
        </div>

        <Separator />

        {/* 4. Değerlerimiz */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Değerlerimiz</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <li className="p-4 border rounded-lg">
              <strong>Güven:</strong> Verinizin gizliliği ve kesintisiz hizmet garantisi.
            </li>
            <li className="p-4 border rounded-lg">
              <strong>Şeffaflık:</strong> Sadelik odaklı arayüz ve açık fiyatlandırma.
            </li>
            <li className="p-4 border rounded-lg">
              <strong>Destek:</strong> 7/24 yardım masası ve kapsamlı dokümantasyon.
            </li>
          </ul>
        </div>

        <Separator />

        {/* 5. Neler Sunuyoruz? */}
      <div className="flex text-start gap-3">
          <div className="space-y-2">
          <h4 className="text-xl font-semibold">Neler Sunuyoruz?</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>Modüler Yapı:</strong> İhtiyacınıza göre seçebileceğiniz sipariş, fatura, kargo, entegrasyon modülleri.</li>
            <li><strong>Entegrasyon Ağı:</strong> Trendyol, Hepsiburada, N11 gibi büyük pazaryerleriyle uyumlu API bağlantıları.</li>
            <li><strong>Raporlama:</strong> Günlük, haftalık satış trendleri ve performans grafikleri.</li>
            <li><strong>Mobil Uyumluluk:</strong> Hem masaüstü hem de tablet–mobil deneyim.</li>
          </ul>
        </div>
          {/* 7. Güvenlik & Uyumluluk */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Güvenlik & Uyumluluk</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>KVKK Uyumlu</strong> veri saklama.</li>
            <li><strong>Güvenli Ödeme</strong> altyapısı (SSL, PCI DSS).</li>
            <li><strong>Yedekleme</strong> ve felaket kurtarma planı.</li>
          </ul>
        </div>
</div>
        <Separator />

        {/* 6. Kurucular & Ekip */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Kurucular & Ekip</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Avatar className="w-20 h-20 mb-2">
                <AvatarImage src="/avatars/kasim.jpg" alt="Kasım Yılmaz" />
                <AvatarFallback>KY</AvatarFallback>
              </Avatar>
              <span className="font-semibold">Kasım Yılmaz</span>
              <span className="text-sm text-gray-500">Kurucu & CTO</span>
              <p className="text-gray-600 text-sm">
                10+ yıllık e-ticaret altyapı tecrübesi, mikro satıcı odaklı çözümler.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Avatar className="w-20 h-20 mb-2">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="font-semibold">Ayşe Demir</span>
              <span className="text-sm text-gray-500">Ürün Yöneticisi</span>
              <p className="text-gray-600 text-sm">
                Kullanıcı deneyimi ve akış tasarımı uzmanı.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Avatar className="w-20 h-20 mb-2">
                <AvatarFallback>DK</AvatarFallback>
              </Avatar>
              <span className="font-semibold">Destek Ekibi</span>
              <span className="text-sm text-gray-500">7/24 Destek</span>
              <p className="text-gray-600 text-sm">
                E-posta ve canlı destek ile sürekli yanınızdayız.
              </p>
            </div>
          </div>
        </div>

        <Separator />

      

      </div>
    </Section>
  );
}
