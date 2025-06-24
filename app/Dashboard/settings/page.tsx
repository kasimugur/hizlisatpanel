'use client';
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import axios from 'axios';
import { useSettings } from '@/context/SettingsContext';

export default function SettingsPage() {
  const { updateSettings } = useSettings()
  const [settings, setSettings] = useState({
    company: {
      name: '',
      taxOffice: '',
      taxNumber: '',
      mersisNumber: '',
      kepAddress: '',
      address: '',
      email: '',
      website: '',
      city: '',
      postalCode: '',
      phone: '',
      logo: '',
    },
    invoice: {
      series: 'INV-{YIL}-{SIRA}',
      startNumber: 10001,
      vatRate: 20,
      invoiceType: 'e-Arşiv',
      currency: 'TRY',
      timezone: '',
      language: 'TR',
      issueDelayDays: 7,
      note: 'Teşekkür ederiz!',
    },
    shipping: {
      carriers: ['Yurtiçi'],
      pricing: 'Sabit',
      fixedPrice: 0,
      weightPrice: 0,
      noteTemplate: 'Kargoya teslim edilmiştir.',
      deliveryEstimate: '2-4 iş günü',
    },
    payment: {
      cashOnDelivery: true,
      iban: '',
      onlinePayment: 'Yok',
    },
    customization: {
      theme: 'Açık',
      logo: '',
      visibleFields: {
        invoiceNumber: true,
      },
    },
    security: {
      userRoles: ['Admin'],
      sessionTimeout: 30,
      passwordChangeRequired: false,
      twoFactorAuth: false,
    },
    backup: {
      exportFormat: 'JSON',
      importEnabled: true,
    },
    notifications: {
      orderEmail: false,
      shippingEmail: false,
      shippingSMS: false,
    },
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await axios.get('/api/settings');

        setSettings(res.data);
      } catch (error) {
        console.error('Ayarlar yüklenemedi:', error);
        toast.error('Ayarlar yüklenemedi!');
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
  console.log(settings, " kaydet butonundaki settings");
  
  try {
    const res = await axios.patch('/api/settings', settings);
    
    if (res.status === 200) {
      await updateSettings(settings);
      toast.success('Ayarlar başarıyla kaydedildi!');
    } else {
      throw new Error(`Beklenmeyen durum: ${res.status}`);
    }

  } catch (error:any) {
    console.error('Ayarlar kaydedilemedi:', error.response?.data || error.message);
    toast.error('Ayarlar kaydedilemedi!');
  }
};

useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await axios.post('/api/settings');

        setSettings(res.data);
      } catch (error) {
        console.error('Ayarlar yüklenemedi:', error);
        toast.error('Ayarlar yüklenemedi!');
      }
    }
    fetchSettings();
  }, []);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'company' | 'customization') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({
          ...settings,
          [field]: { ...settings[field], logo: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      <Tabs defaultValue="company" className="w-full bg-white rounded-sm">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="company">Firma Bilgileri</TabsTrigger>
          <TabsTrigger value="invoice">Fatura Ayarları</TabsTrigger>
          <TabsTrigger value="shipping">Kargo Ayarları</TabsTrigger>
          <TabsTrigger value="payment">Ödeme Ayarları</TabsTrigger>
          <TabsTrigger value="customization">Panel Özelleştirme</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
          <TabsTrigger value="backup">Yedekleme</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
        </TabsList>

        {/* Firma Bilgileri */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Firma Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Firma Adı / İsim</Label>
                <Input
                  id="company-name"
                  value={settings.company.name}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, name: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-office">Vergi Dairesi</Label>
                <Input
                  id="tax-office"
                  value={settings.company.taxOffice}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, taxOffice: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-number">Vergi No / TCKN</Label>
                <Input
                  id="tax-number"
                  value={settings.company.taxNumber}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, taxNumber: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mersis-number">Mersis No</Label>
                <Input
                  id="mersis-number"
                  value={settings.company.mersisNumber}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, mersisNumber: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kep-address">KEP Adresi</Label>
                <Input
                  id="kep-address"
                  value={settings.company.kepAddress}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, kepAddress: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Input
                  id="address"
                  value={settings.company.address}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, address: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  value={settings.company.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, email: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Web Sitesi</Label>
                <Input
                  id="website"
                  value={settings.company.website}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, website: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">İl / İlçe</Label>
                <Input
                  id="city"
                  value={settings.company.city}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, city: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Posta Kodu</Label>
                <Input
                  id="postalCode"
                  value={settings.company.postalCode}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, postalCode: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={settings.company.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, phone: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-logo">Logo Yükle</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="company-logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'company')}
                  />
                  {settings.company.logo && (
                    <img src={settings.company.logo} alt="Firma Logosu" className="w-20 h-20 object-contain" />
                  )}
                </div>
              </div>
              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fatura Ayarları */}
        <TabsContent value="invoice">
          <Card>
            <CardHeader>
              <CardTitle>Fatura Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-series">Seri Numarası Formatı</Label>
                <Input
                  id="invoice-series"
                  value={settings.invoice.series}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      invoice: { ...settings.invoice, series: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-number">Başlangıç Numarası</Label>
                <Input
                  id="start-number"
                  type="number"
                  value={settings.invoice.startNumber}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      invoice: { ...settings.invoice, startNumber: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat-rate">Varsayılan KDV Oranı</Label>
                <Select
                  value={settings.invoice.vatRate.toString()}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      invoice: { ...settings.invoice, vatRate: Number(value) },
                    })
                  }
                >
                  <SelectTrigger id="vat-rate">
                    <SelectValue placeholder="KDV Oranı" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="1">1%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="20">20%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-type">Fatura Tipi</Label>
                <Select
                  value={settings.invoice.invoiceType}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      invoice: { ...settings.invoice, invoiceType: value },
                    })
                  }
                >
                  <SelectTrigger id="invoice-type">
                    <SelectValue placeholder="Fatura Tipi" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value="e-Arşiv">e-Arşiv</SelectItem>
                    <SelectItem value="Manuel">Manuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Para Birimi</Label>
                <Input
                  id="currency"
                  value={settings.invoice.currency}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      invoice: { ...settings.invoice, currency: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zaman Dilimi (örn. Europe/Istanbul)</Label>
                <Input
                  id="timezone"
                  value={settings.invoice.timezone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      invoice: { ...settings.invoice, timezone: e.target.value },
                    })
                  }
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="issue-delay">Fatura Düzenlenme Süresi (Gün)</Label>
                <Input
                  id="issue-delay"
                  type="number"
                  value={settings.invoice.issueDelayDays}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      invoice: { ...settings.invoice, issueDelayDays: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-note">Fatura Notu</Label>
                <Input
                  id="invoice-note"
                  value={settings.invoice.note}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      invoice: { ...settings.invoice, note: e.target.value },
                    })
                  }
                />
              </div>
              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Kargo Ayarları */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Kargo Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Anlaşmalı Kargo Firmaları</Label>
                {['Yurtiçi', 'MNG', 'Aras', 'PTT'].map((carrier) => (
                  <div key={carrier} className="flex items-center space-x-2">
                    <Checkbox
                      id={carrier}
                      checked={settings.shipping.carriers.includes(carrier)}
                      onCheckedChange={(checked) => {
                        const updatedCarriers = checked
                          ? [...settings.shipping.carriers, carrier]
                          : settings.shipping.carriers.filter((c) => c !== carrier);
                        setSettings({
                          ...settings,
                          shipping: { ...settings.shipping, carriers: updatedCarriers },
                        });
                      }}
                    />
                    <Label htmlFor={carrier}>{carrier}</Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricing">Kargo Fiyatlandırma</Label>
                <Select
                  value={settings.shipping.pricing}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, pricing: value },
                    })
                  }
                >
                  <SelectTrigger id="pricing">
                    <SelectValue placeholder="Fiyatlandırma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sabit">Sabit</SelectItem>
                    <SelectItem value="Ağırlığa Göre">Ağırlığa Göre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {settings.shipping.pricing === 'Sabit' && (
                <div className="space-y-2">
                  <Label htmlFor="fixed-price">Sabit Kargo Fiyatı (₺)</Label>
                  <Input
                    id="fixed-price"
                    type="number"
                    value={settings.shipping.fixedPrice}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        shipping: { ...settings.shipping, fixedPrice: Number(e.target.value) },
                      })
                    }
                  />
                </div>
              )}
              {settings.shipping.pricing === 'Ağırlığa Göre' && (
                <div className="space-y-2">
                  <Label htmlFor="weight-price">Kg Başına Fiyat (₺)</Label>
                  <Input
                    id="weight-price"
                    type="number"
                    value={settings.shipping.weightPrice}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        shipping: { ...settings.shipping, weightPrice: Number(e.target.value) },
                      })
                    }
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="note-template">Kargo Açıklama Şablonu</Label>
                <Input
                  id="note-template"
                  value={settings.shipping.noteTemplate}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, noteTemplate: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-estimate">Teslim Süresi Varsayımı</Label>
                <Input
                  id="delivery-estimate"
                  value={settings.shipping.deliveryEstimate}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, deliveryEstimate: e.target.value },
                    })
                  }
                />
              </div>
              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ödeme Ayarları */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Ödeme Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cash-on-delivery"
                  checked={settings.payment.cashOnDelivery}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      payment: { ...settings.payment, cashOnDelivery: !!checked },
                    })
                  }
                />
                <Label htmlFor="cash-on-delivery">Kapıda Ödeme Aktif</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN Bilgisi</Label>
                <Input
                  id="iban"
                  value={settings.payment.iban}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payment: { ...settings.payment, iban: e.target.value },
                    })
                  }
                />
              </div>

              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Panel Özelleştirme */}
        <TabsContent value="customization">
          <Card>
            <CardHeader>
              <CardTitle>Panel Özelleştirme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema Seçimi</Label>
                <Select
                  value={settings.customization.theme}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      customization: { ...settings.customization, theme: value },
                    })
                  }
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Açık">Açık</SelectItem>
                    <SelectItem value="Koyu">Koyu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customization-logo">Panel Logosu Yükle</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="customization-logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'customization')}
                  />
                  {settings.customization.logo && (
                    <img
                      src={settings.customization.logo}
                      alt="Panel Logosu"
                      className="w-20 h-20 object-contain"
                    />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Görünür Alanlar</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="invoice-number"
                    checked={settings.customization.visibleFields.invoiceNumber}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        customization: {
                          ...settings.customization,
                          visibleFields: { ...settings.customization.visibleFields, invoiceNumber: !!checked },
                        },
                      })
                    }
                  />
                  <Label htmlFor="invoice-number">Fatura Numarasını Göster</Label>
                </div>
              </div>
              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Güvenlik */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Oturum Süresi (Dakika)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="password-change-required"
                  checked={settings.security.passwordChangeRequired}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, passwordChangeRequired: !!checked },
                    })
                  }
                />
                <Label htmlFor="password-change-required">Şifre Değiştirme Zorunlu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="two-factor-auth"
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, twoFactorAuth: !!checked },
                    })
                  }
                />
                <Label htmlFor="two-factor-auth">İki Aşamalı Doğrulama</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Yeni Şifre</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Yeni şifre girin"
                  onChange={(e) => {
                    // Şifre değiştirme için ayrı bir API çağrısı yapılabilir
                    console.log('Yeni şifre:', e.target.value);
                  }}
                />
              </div>
              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Yedekleme */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Yedekleme / İçe Aktarma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="export-format">Yedekleme Formatı</Label>
                <Select
                  value={settings.backup.exportFormat}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      backup: { ...settings.backup, exportFormat: value },
                    })
                  }
                >
                  <SelectTrigger id="export-format">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JSON">JSON</SelectItem>
                    <SelectItem value="CSV">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="import-enabled"
                  checked={settings.backup.importEnabled}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      backup: { ...settings.backup, importEnabled: !!checked },
                    })
                  }
                />
                <Label htmlFor="import-enabled">İçe Aktarma Aktif</Label>
              </div>
              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bildirimler */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="order-email"
                  checked={settings.notifications.orderEmail}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, orderEmail: !!checked },
                    })
                  }
                />
                <Label htmlFor="order-email">Sipariş Geldiğinde E-posta Bildirimi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shipping-email"
                  checked={settings.notifications.shippingEmail}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, shippingEmail: !!checked },
                    })
                  }
                />
                <Label htmlFor="shipping-email">Kargo Statüsü Değişince E-posta</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shipping-sms"
                  checked={settings.notifications.shippingSMS}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, shippingSMS: !!checked },
                    })
                  }
                />
                <Label htmlFor="shipping-sms">Kargo Statüsü Değişince SMS</Label >
              </div>
              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}