'use client'
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
import MarketplaceIntegrations from '@/components/Integrations/MarketplaceIntegrations';
import { useSettings } from '@/context/SettingsContext';
import { SettingsType } from '@/types/settings';
import { defaultSettings } from '@/lib/defaultSettings';

export default function SettingsPage() {
  const { updateSettings, settings ,loading} = useSettings()
  const [localSettings, setLocalSettings] = useState<SettingsType>(defaultSettings);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }

  }, [settings]);
console.log("YENİ AYAR  settingspage", settings)
console.log("YENİ AYAR  localSettings", localSettings)
  const handleSave = async () => {
    if (!localSettings) {
      toast.error('Ayarlar yüklenemedi veya boş!');
      return;
    }
    try {
      await updateSettings(localSettings);
      toast.success('Ayarlar başarıyla kaydedildi!');
    } catch (error) {
      toast.error('Ayarlar kaydedilemedi!');
      console.error(error);
    }
  };
  
 const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'company' | 'customization') => {
    const file = e.target.files?.[0];
    if (file && localSettings) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalSettings({
          ...localSettings,
          [field]: { ...localSettings[field], logo: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };
   if (loading) {
    return <div className=" text-center"> yükleniyor...</div>;
  }

  return (
    <div className="">
      <Tabs defaultValue="company" className="w-full bg-white rounded-sm">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="company">Firma Bilgileri</TabsTrigger>
          <TabsTrigger value="invoice">Fatura Ayarları</TabsTrigger>
          <TabsTrigger value="shipping">Kargo Ayarları</TabsTrigger>
          <TabsTrigger value="payment">Ödeme Ayarları</TabsTrigger>
          <TabsTrigger value="customization">Panel Özelleştirme</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
          <TabsTrigger value="backup">Yedekleme</TabsTrigger>
          <TabsTrigger value="entegrasyon">Entegrasyon </TabsTrigger>
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
                  value={localSettings.company.name}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings?.company, name: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-office">Vergi Dairesi</Label>
                <Input
                  id="tax-office"
                  value={localSettings.company.taxOffice}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, taxOffice: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-number">Vergi No / TCKN</Label>
                <Input
                  id="tax-number"
                  value={localSettings.company.taxNumber}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, taxNumber: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mersis-number">Mersis No</Label>
                <Input
                  id="mersis-number"
                  value={localSettings.company.mersisNumber}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, mersisNumber: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kep-address">KEP Adresi</Label>
                <Input
                  id="kep-address"
                  value={localSettings.company.kepAddress}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, kepAddress: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Input
                  id="address"
                  value={localSettings.company.address}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, address: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  value={localSettings.company.email}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, email: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Web Sitesi</Label>
                <Input
                  id="website"
                  value={localSettings.company.website}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, website: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">İl / İlçe</Label>
                <Input
                  id="city"
                  value={localSettings.company.city}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, city: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Posta Kodu</Label>
                <Input
                  id="postalCode"
                  value={localSettings.company.postalCode}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, postalCode: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={localSettings.company.phone}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      company: { ...localSettings.company, phone: e.target.value },
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
                  {localSettings.company.logo && (
                    <img src={localSettings.company.logo} alt="Firma Logosu" className="w-20 h-20 object-contain" />
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
                  value={localSettings.invoice.series}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      invoice: { ...localSettings.invoice, series: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-number">Başlangıç Numarası</Label>
                <Input
                  id="start-number"
                  type="number"
                  value={localSettings.invoice.startNumber}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      invoice: { ...localSettings.invoice, startNumber: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat-rate">Varsayılan KDV Oranı</Label>
                <Select
                  value={localSettings.invoice.vatRate.toString()}
                  onValueChange={(value) =>
                    setLocalSettings({
                      ...localSettings,
                      invoice: { ...localSettings.invoice, vatRate: Number(value) },
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
                  value={localSettings.invoice.invoiceType}
                  onValueChange={(value) =>
                    setLocalSettings({
                      ...localSettings,
                      invoice: { ...localSettings.invoice, invoiceType: value },
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
                  value={localSettings.invoice.currency}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      invoice: { ...localSettings.invoice, currency: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zaman Dilimi (örn. Europe/Istanbul)</Label>
                <Input
                  id="timezone"
                  value={localSettings.invoice.timezone}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      invoice: { ...localSettings.invoice, timezone: e.target.value },
                    })
                  }
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="issue-delay">Fatura Düzenlenme Süresi (Gün)</Label>
                <Input
                  id="issue-delay"
                  type="number"
                  value={localSettings.invoice.issueDelayDays}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      invoice: { ...localSettings.invoice, issueDelayDays: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-note">Fatura Notu</Label>
                <Input
                  id="invoice-note"
                  value={localSettings.invoice.note}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      invoice: { ...localSettings.invoice, note: e.target.value },
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
                      checked={localSettings?.shipping.carriers.includes(carrier)}
                      onCheckedChange={(checked) => {
                        const updatedCarriers = checked
                          ? [...localSettings?.shipping?.carriers, carrier]
                          : localSettings?.shipping.carriers.filter((c) => c !== carrier);
                        setLocalSettings({
                          ...localSettings,
                          shipping: { ...localSettings?.shipping, carriers: updatedCarriers },
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
                  value={localSettings?.shipping.pricing}
                  onValueChange={(value) =>
                    setLocalSettings({
                      ...localSettings,
                      shipping: { ...localSettings?.shipping, pricing: value },
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
              {localSettings?.shipping.pricing === 'Sabit' && (
                <div className="space-y-2">
                  <Label htmlFor="fixed-price">Sabit Kargo Fiyatı (₺)</Label>
                  <Input
                    id="fixed-price"
                    type="number"
                    value={localSettings?.shipping.fixedPrice}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        shipping: { ...localSettings?.shipping, fixedPrice: Number(e.target.value) },
                      })
                    }
                  />
                </div>
              )}
              {localSettings?.shipping.pricing === 'Ağırlığa Göre' && (
                <div className="space-y-2">
                  <Label htmlFor="weight-price">Kg Başına Fiyat (₺)</Label>
                  <Input
                    id="weight-price"
                    type="number"
                    value={localSettings?.shipping.weightPrice}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        shipping: { ...localSettings?.shipping, weightPrice: Number(e.target.value) },
                      })
                    }
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="note-template">Kargo Açıklama Şablonu</Label>
                <Input
                  id="note-template"
                  value={localSettings?.shipping.noteTemplate}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      shipping: { ...localSettings?.shipping, noteTemplate: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-estimate">Teslim Süresi Varsayımı</Label>
                <Input
                  id="delivery-estimate"
                  value={localSettings?.shipping.deliveryEstimate}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      shipping: { ...localSettings?.shipping, deliveryEstimate: e.target.value },
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
                  checked={localSettings.payment.cashOnDelivery}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      payment: { ...localSettings.payment, cashOnDelivery: !!checked },
                    })
                  }
                />
                <Label htmlFor="cash-on-delivery">Kapıda Ödeme Aktif</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN Bilgisi</Label>
                <Input
                  id="iban"
                  value={localSettings.payment.iban}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      payment: { ...localSettings.payment, iban: e.target.value },
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
                  value={localSettings.customization.theme}
                  onValueChange={(value) =>
                    setLocalSettings({
                      ...localSettings,
                      customization: { ...localSettings.customization, theme: value },
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
                  {localSettings.customization.logo && (
                    <img
                      src={localSettings.customization.logo}
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
                    checked={localSettings.customization.visibleFields.invoiceNumber}
                    onCheckedChange={(checked) =>
                      setLocalSettings({
                        ...localSettings,
                        customization: {
                          ...localSettings.customization,
                          visibleFields: { ...localSettings.customization.visibleFields, invoiceNumber: !!checked },
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
                  value={localSettings.security.sessionTimeout}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      security: { ...localSettings.security, sessionTimeout: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="password-change-required"
                  checked={localSettings.security.passwordChangeRequired}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      security: { ...localSettings.security, passwordChangeRequired: !!checked },
                    })
                  }
                />
                <Label htmlFor="password-change-required">Şifre Değiştirme Zorunlu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="two-factor-auth"
                  checked={localSettings.security.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      security: { ...localSettings.security, twoFactorAuth: !!checked },
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
                  value={localSettings.backup.exportFormat}
                  onValueChange={(value) =>
                    setLocalSettings({
                      ...localSettings,
                      backup: { ...localSettings.backup, exportFormat: value },
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
                  checked={localSettings.backup.importEnabled}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      backup: { ...localSettings.backup, importEnabled: !!checked },
                    })
                  }
                />
                <Label htmlFor="import-enabled">İçe Aktarma Aktif</Label>
              </div>
              <Button onClick={handleSave}>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Entegrasyon Ayarları */}
        <TabsContent value="entegrasyon">
          <Card>
            <CardHeader>
              <CardTitle>Entegrasyon Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 grid md:grid-cols-2 gap-4">
              <MarketplaceIntegrations />
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
                  checked={localSettings.notifications.orderEmail}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      notifications: { ...localSettings.notifications, orderEmail: !!checked },
                    })
                  }
                />
                <Label htmlFor="order-email">Sipariş Geldiğinde E-posta Bildirimi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shipping-email"
                  checked={localSettings.notifications.shippingEmail}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      notifications: { ...localSettings.notifications, shippingEmail: !!checked },
                    })
                  }
                />
                <Label htmlFor="shipping-email">Kargo Statüsü Değişince E-posta</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shipping-sms"
                  checked={localSettings.notifications.shippingSMS}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      notifications: { ...localSettings.notifications, shippingSMS: !!checked },
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