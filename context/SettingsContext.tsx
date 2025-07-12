'use client'
import { defaultSettings } from '@/lib/defaultSettings';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { SettingsType } from "@/types/settings";

type SettingsContextType = {
  settings: SettingsType | null
  updateSettings: (newSettings: Partial<SettingsType>) => Promise<void>
  loading: boolean
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  updateSettings: async () => { },
  loading: true,
})

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings)
  const [loading, setLoading] = useState<boolean>(true)
useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await axios.get<SettingsType>("/api/settings");
        setSettings(res.data);
        setLoading(false)
        console.log("YENİ AYAR GETİRİLDİ",res.data)
      } catch {
        // Eğer ayar yoksa oluştur
        const res = await axios.patch<SettingsType>("/api/settings", defaultSettings);
        setSettings(res.data);
        setLoading(false)

      }
    }
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<SettingsType>) => {
    console.log(newSettings, " context içindeki gönderile newSettings");

    if (!newSettings) {
      console.error("Hata: newSettings undefined veya null");
      throw new Error("newSettings undefined veya null");
    }

    try {
      const response = await axios.patch('/api/settings', newSettings, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setSettings(response.data);
      } else {
        throw new Error(`Beklenmeyen durum: ${response.status}`);
      }

    } catch (err: any) {
      console.error("Ayarlar güncellenemedi:", err.response?.data || err.message);
      throw err; // Hata fırlat
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  )
}
