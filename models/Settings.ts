import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  company: {
    name: { type: String, required: true },
    taxOffice: { type: String },
    taxNumber: { type: String, required: true },
    mersisNumber: { type: String },
    kepAddress: { type: String },
    address: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    logo: { type: String },
  },
  invoice: {
    series: { type: String, default: 'INV-{YIL}-{SIRA}' },
    startNumber: { type: Number, default: 10001 },
    vatRate: { type: Number, enum: [0, 1, 10, 20], default: 20 },
    invoiceType: { type: String, enum: ['e-Arşiv', 'Manuel'], default: 'e-Arşiv' },
    language: { type: String, enum: ['TR', 'EN'], default: 'TR' },
    currency: { type: String, enum: ['TRY', 'USD', 'EUR'], default: 'TRY' },
    timezone: { type: String, default: 'Europe/Istanbul' },
    issueDelayDays: { type: Number, default: 7 },
    note: { type: String, default: 'Teşekkür ederiz!' },
  },
  shipping: {
    carriers: [{ type: String, enum: ['Yurtiçi', 'MNG', 'Aras', 'PTT'] }],
    pricing: {
      type: String,
      enum: ['Sabit', 'Ağırlığa Göre'],
      default: 'Sabit',
    },
    fixedPrice: { type: Number, default: 0 },
    weightPrice: { type: Number, default: 0 }, // kg başına fiyat
    noteTemplate: { type: String, default: 'Kargoya teslim edilmiştir.' },
    deliveryEstimate: { type: String, default: '2-4 iş günü' },
  },
  payment: {
    cashOnDelivery: { type: Boolean, default: true },
    iban: { type: String },
    onlinePayment: { type: String, default: 'Yok' }, // Gelecek için opsiyonel
  },
  customization: {
    theme: { type: String, enum: ['Açık', 'Koyu'], default: 'Açık' },
    logo: { type: String },
    visibleFields: {
      invoiceNumber: { type: Boolean, default: true },
    },
  },
  security: {
    userRoles: [{ type: String, enum: ['Admin', 'Operatör'] }], // Opsiyonel
    sessionTimeout: { type: Number, default: 30 },
    passwordChangeRequired: { type: Boolean, default: false },
    twoFactorAuth: { type: Boolean, default: false }, // Gelecek için
  },
  backup: {
    exportFormat: { type: String, enum: ['JSON', 'CSV'], default: 'JSON' },
    importEnabled: { type: Boolean, default: true },
  },
  notifications: {
    orderEmail: { type: Boolean, default: false },
    shippingEmail: { type: Boolean, default: false },
    shippingSMS: { type: Boolean, default: false },
  },
});

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);