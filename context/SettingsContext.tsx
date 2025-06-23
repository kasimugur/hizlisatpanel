'use client'
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

type SettingsType = {
  _id: {
    $oid: string;
  };
  __v: number;
  backup: {
    exportFormat: string;
    importEnabled: boolean;
  };
  company: {
    name: string;
    taxOffice: string;
    taxNumber: string;
    mersisNumber: string;
    kepAddress: string;
    address: string;
    phone: string;
    logo: string;
  };
  customization: {
    visibleFields: {
      invoiceNumber: boolean;
    };
    theme: string;
    logo: string;
  };
  invoice: {
    series: string;
    startNumber: number;
    vatRate: number;
    invoiceType: string;
    language: string;
    issueDelayDays: number;
    note: string;
  };
  notifications: {
    orderEmail: boolean;
    shippingEmail: boolean;
    shippingSMS: boolean;
  };
  payment: {
    cashOnDelivery: boolean;
    iban: string;
    onlinePayment: string;
  };
  security: {
    userRoles: string[];
    sessionTimeout: number;
    passwordChangeRequired: boolean;
    twoFactorAuth: boolean;
  };
  shipping: {
    carriers: string[];
    pricing: string;
    fixedPrice: number;
    weightPrice: number;
    noteTemplate: string;
    deliveryEstimate: string;
  };

}

type SettingsContextType = {
  settings: SettingsType | null
  updateSettings: (newSettings: Partial<SettingsType>) => Promise<void>
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  updateSettings: async () => { },
})

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get<SettingsType>("/api/settings")
        setSettings(response.data)
      } catch (error) {
        console.error("Ayarlar alınamadı", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const updateSettings = async (newSettings: Partial<SettingsType>) => {
  try {
    const response = await axios.patch('/api/settings', newSettings, {
      headers: { 'Content-Type': 'application/json' },
    });
    setSettings(response.data);
  } catch (err) {
    console.error("Ayarlar güncellenemedi", err);
  }
};

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
