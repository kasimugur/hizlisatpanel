// types/settings.ts

export type CompanySettings = {
  name: string;
  taxOffice: string;
  taxNumber: string;
  mersisNumber: string;
  kepAddress: string;
  address: string;
  email: string;
  website: string;
  city: string;
  postalCode: string;
  phone: string;
  logo: string;
};

export type InvoiceSettings = {
  series: string;
  startNumber: number;
  vatRate: 0 | 1 | 10 | 20;
  invoiceType: 'e-Arşiv' | 'Manuel';
  language: 'TR' | 'EN';
  currency: 'TRY' | 'USD' | 'EUR';
  timezone: string;
  issueDelayDays: number;
  note: string;
};

export type ShippingSettings = {
  carriers: string[];
  pricing: 'Sabit' | 'Ağırlığa Göre';
  fixedPrice: number;
  weightPrice: number;
  noteTemplate: string;
  deliveryEstimate: string;
};

export type PaymentSettings = {
  cashOnDelivery: boolean;
  iban: string;
  onlinePayment: string;
};

export type CustomizationSettings = {
  theme: 'Açık' | 'Koyu';
  logo: string;
  visibleFields: {
    invoiceNumber: boolean;
  };
};

export type SecuritySettings = {
  userRoles: string[];
  sessionTimeout: number;
  passwordChangeRequired: boolean;
  twoFactorAuth: boolean;
};

export type BackupSettings = {
  exportFormat: 'JSON' | 'CSV';
  importEnabled: boolean;
};

export type NotificationsSettings = {
  orderEmail: boolean;
  shippingEmail: boolean;
  shippingSMS: boolean;
};

export type IntegrationSettings = {
  trendyol: {
    connected: boolean;
    apiKey: string;
    apiSecret: string;
    supplierId: string;
  };
  n11: {
    connected: boolean;
    apiKey: string;
    apiSecret: string;
  };
  hepsiburada: {
    connected: boolean;
    apiKey: string;
    apiSecret: string;
  };
};

export type SettingsType = {
  company: CompanySettings;
  invoice: InvoiceSettings;
  shipping: ShippingSettings;
  payment: PaymentSettings;
  customization: CustomizationSettings;
  security: SecuritySettings;
  backup: BackupSettings;
  notifications: NotificationsSettings;
  integrations: IntegrationSettings;
};
