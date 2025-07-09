// lib/settings.ts
import merge from "lodash.merge";
import isEqual from "lodash.isequal";
import axios from "axios";
import { toast } from "sonner";
import { defaultSettings } from "@/lib/defaultSettings";
import type { SettingsType } from "@/types/settings";

export async function saveSettings(
  updatedFields: Partial<SettingsType>
): Promise<SettingsType> {
  try {
    const { data: existing } = await axios.get<SettingsType>("/api/settings");
    const defaultKeys  = Object.keys(defaultSettings).sort();
    const existingKeys = Object.keys(existing).sort();
    const schemaChanged = !isEqual(defaultKeys, existingKeys);

    if (!existing || schemaChanged) {
      // CREATE (upsert)
      const payload = merge({}, defaultSettings, updatedFields);
      const res = await axios.post<SettingsType>("/api/settings", payload);
      toast.success("Ayarlar oluşturuldu.");
      return res.data;                          // ← bu satır eklendi
    } else {
      // UPDATE
      const res = await axios.patch<SettingsType>(
        "/api/settings",
        updatedFields
      );
      toast.success("Ayarlar güncellendi.");
      return res.data;                          // ← bu satır eklendi
    }
  } catch (err: any) {
    console.error("Ayar kaydetme hatası:", err.response?.data || err.message);
    toast.error(err.response?.data?.error || "Ayarlar kaydedilemedi!");
    throw err;
  }
}
