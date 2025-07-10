// lib/defaultSettings.ts
import { SettingsType } from "@/types/settings";

export const defaultSettings: SettingsType = {
  company: {
    name: "Firma Adı",
    taxOffice: "Kadıköy Vergi Dairesi",
    taxNumber: "1234567890",
    mersisNumber: "",
    kepAddress: "",
    address: "Adres örnek cadde 12",
    email: "info@firma.com",
    website: "",
    city: "İstanbul",
    postalCode: "34000",
    phone: "02125551234",
    logo: "",
  },
  invoice: {
    series: 'INV-{YIL}-{SIRA}',
    startNumber: 10001,
    vatRate: 20,
    invoiceType: 'e-Arşiv',
    language: 'TR',
    currency: 'TRY',
    timezone: 'Europe/Istanbul',
    issueDelayDays: 7,
    note: 'Teşekkür ederiz!',
  },
  shipping: {
    carriers: [],
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
  integrations: {
    trendyol: {
      connected: false,
      apiKey: '',
      apiSecret: '',
      supplierId: '',
    },
    n11: {
      connected: false,
      apiKey: '',
      apiSecret: '',
    },
    hepsiburada: {
      connected: false,
      apiKey: '',
      apiSecret: '',
    },
  },
};
