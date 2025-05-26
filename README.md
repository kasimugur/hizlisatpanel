# 🚀 HızlıSat – Mikro Satıcılar İçin Sipariş & Fatura & Kargo Paneli

## 1. Vizyon & Misyon

**Vizyon:**  
Türkiye’deki mikro girişimcilerin her aşamada yanında olan “hepsi-bir-arada” ticaret ortağı olmak.

**Misyon:**  
Siparişten kargoya, faturadan satış analizine kadar tüm operasyonu otomatikleştirerek, satıcının işine odaklanmasını sağlamak.

---

## 2. Temel Sorunlar

### 🔧 Operasyonel Dağınıklık  
Sipariş, fatura ve kargo ayrı panellerde → zaman kaybı ve hata riski

### 📉 Veri Görünürlüğü Eksikliği  
Anlık rapor, öngörü ve stok kontrolü yok

### 🔌 Entegrasyon Karmaşası  
Her pazar yeri ve kargo firması ayrı entegrasyon gerektiriyor

> Mikro satıcı işine odaklanmak ister, sistem karmaşasına değil.

---

## 3. Farklılaşma (USP)

- 🔍 **Akıllı Öngörü Motoru:**  
  Satış trendine göre stok uyarıları, en çok satan ürün bildirimi

- 💬 **Mesajlaşma Asistanı:**  
  “Siparişim nerede?” gibi DM’lere otomatik yanıt (WhatsApp/Instagram)

- 🧱 **Modüler Dikey Paketler:**  
  Sektöre özel modüller: örn. Bebek ürünlerine özel iade yönetimi

---

## 4. Hedef Kitle & Segmentler

| Segment | Sipariş Seviyesi | Acı Nokta | Örnek |
|---------|------------------|-----------|--------|
| Evde Satıcı | < 50 sipariş | Fatura yok, Excel karmaşık | Takı satışı, ev ürünleri |
| Mikro İşletme | 50–300 sipariş | Süreç dağınıklığı, zaman kaybı | Bebek giyim, sabun |
| Yeni Girişim | 0–100 sipariş | Nereden başlayacağını bilmiyor | Trendyol yeni mağaza |

---

## 5. Çözüm Özeti – MVP İçeriği

- ✅ Ürün/Stok/Varyant yönetimi
- ✅ Sipariş takibi (manuel + Trendyol API)
- ✅ PDF fatura oluşturma (PDFKit)
- ✅ Kargo barkodu (Yurtiçi, Trendyol Express)
- ✅ Dashboard (günlük satış, fatura sayısı)
- ✅ Kullanıcı girişi (NextAuth)

---

## 6. Teknik Yapı (Stack)

| Katman      | Teknoloji            |
|-------------|----------------------|
| Framework   | Next.js 15+ (App Router) |
| Backend     | API Routes (`app/api/`) |
| Veritabanı  | MongoDB (Mongoose)   |
| Auth        | NextAuth             |
| UI/UX       | TailwindCSS + shadcn/ui |
| PDF Çıktı   | PDFKit               |
| Hosting     | Vercel               |

---

## 7. Yol Haritası

### 🔹 MVP (4–6 Hafta)
- Panel + ürün/sipariş modülü
- Fatura (PDF)
- Kargo barkodu
- Dashboard

### 🔹 MVP+1 (2 Hafta)
- E-fatura entegrasyonu
- Otomatik stok uyarıları
- WhatsApp botu (Twilio)

### 🔹 Genişleme (6–8 Hafta)
- Hepsiburada, TikTok Shop API
- Dikey modüller
- Çoklu para birimi, dil
- Analiz raporları (Excel, PDF)

---

## 8. Gelir Modeli

| Plan         | Özellikler                                | Fiyat      |
|--------------|--------------------------------------------|------------|
| Ücretsiz     | 10 sipariş, temel modüller                 | 0 ₺        |
| Başlangıç    | 100 sipariş, fatura PDF, stok takibi       | 99 ₺ / ay  |
| Profesyonel  | Trendyol API, kargo barkodu, akıllı modül  | 199 ₺ / ay |
| Kurumsal     | E-fatura, analiz raporu, WhatsApp botu     | 399 ₺ / ay |
| Pay-as-you-go | Entegrasyon başı 50 ₺                     | Opsiyonel  |

**Drip Kampanya:** Ücretsiz → Profesyonel geçişi için otomatik e-posta + in-app bildirim  
**Yıllık Ödeme:** %15 indirim

---

## 9. Pazarlama Stratejisi

- 🎯 Segment bazlı Instagram/Facebook reklamları
- 📦 Mikro influencer iş birlikleri + çekilişler
- 📹 YouTube eğitim serisi: “5 Dakikada Panel Kullanımı”
- 🧲 Referans Programı: “Arkadaşını getir, 1 ay bedava”
- 📧 E-posta kampanyaları (drip onboarding)

---

## 10. Başarı Ölçütleri (KPI)

- MAU (Aylık Aktif Kullanıcı)
- Ücretli kullanıcı dönüşüm oranı
- Sipariş başına kullanıcı sayısı
- Müşteri Memnuniyeti (NPS)
- Destek talebi çözüm süresi

---

## 11. Riskler & Önlemler

| Risk             | Önlem                                |
|------------------|---------------------------------------|
| API gecikmeleri  | Manuel CSV içe aktarma (fallback)     |
| Kargo hataları   | Durum güncelleme botu + destek sistemi|
| Veri kaybı       | Mongo Atlas snapshot + otomatik backup|
| Karışıklık       | Rehber videolar + onboarding ekranı   |

---

## 🎁 Bonus: Landing Page Mesajı (Örnek)

> “Siparişten kargoya, artık her şey HızlıSat’ta.  
Evde satış yapan herkes için, tek panelde profesyonel satış deneyimi.  
🚀 Şimdi ücretsiz deneyin!”

---
## temel Sayfa  yapısı 
/app
│
├── layout.tsx                 → Genel layout (sidebar/topbar)
├── page.tsx                   → Ana landing sayfası (/)
│
├── login
│   └── page.tsx               → Giriş sayfası (/login)
│
├── register
│   └── page.tsx               → Kayıt sayfası (/register)
│
├── dashboard
│   ├── layout.tsx             → Dashboard'a özel layout (sidebar'lı)
│   ├── page.tsx               → Dashboard anasayfa (özetler)
│
│   ├── products
│   │   ├── page.tsx           → Ürün listesi
│   │   └── new
│   │       └── page.tsx       → Yeni ürün ekleme formu
│
│   ├── orders
│   │   ├── page.tsx           → Sipariş listesi
│   │   └── new
│   │       └── page.tsx       → Sipariş oluşturma formu
│
│   ├── invoices
│   │   └── page.tsx           → Fatura listesi
│
│   ├── shipping
│   │   └── page.tsx           → Kargo barkodu ve takip
│
│   └── settings
│       └── page.tsx           → Kullanıcı ayarları
│
├── api
│   ├── products
│   │   └── route.ts           → GET/POST: Ürün API'si
│
│   ├── orders
│   │   └── route.ts           → Sipariş API'si
│
│   ├── invoices
│   │   └── route.ts           → Fatura PDF API'si
│
│   └── auth
│       ├── login
│       │   └── route.ts       → POST: Giriş
│       └── register
│           └── route.ts       → POST: Kayıt


