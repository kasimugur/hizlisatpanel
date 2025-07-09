'use client'
import { defaultSettings } from '@/lib/defaultSettings';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { SettingsType } from "@/types/settings";


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


  const createInitialSettings = async () => {
    try {
      const res = await axios.post("/api/settings", defaultSettings)
      setSettings(res.data)
    } catch (err) {
      console.error("Ayarlar oluşturulamadı", err)
    }
  }

useEffect(() => {
  const fetchOrCreateSettings = async () => {
    try {
      const res = await axios.get("/api/settings")
      if (res.data) setSettings(res.data)
      else await createInitialSettings()
    } catch {
      await createInitialSettings()
    } finally {
      setLoading(false)
    }
  }

  fetchOrCreateSettings()
}, [])


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
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
