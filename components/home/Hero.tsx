// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section
      id="landing"
      className="bg-indigo-50 min-h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-20 gap-12"
    >
      {/* Metin Bloğu */}
      <div className="max-w-xl text-center md:text-left space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 leading-tight">
          HızlıSat - Dijital Satış ve Sipariş Yönetimi Çözümü
        </h1>
        <p className="text-lg text-indigo-900/90">
          Çiftçiler, esnaflar ve küçük işletmeler için kolay, hızlı ve güvenilir
          sipariş, fatura ve kargo yönetimi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Button asChild>
            <Link href="#register">Ücretsiz Kayıt Ol</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Demo İncele
            </Link>
          </Button>
        </div>
      </div>

      {/* Görsel Bloğu */}
      <div className="max-w-lg w-full">
        <Image
          src=""
          alt="HızlıSat uygulamasının modern ve kullanıcı dostu arayüzünü gösteren ekran görüntüsü"
          width={600}
          height={400}
          className="rounded-lg shadow-lg mx-auto"
        />
      </div>
    </section>
  );
}
