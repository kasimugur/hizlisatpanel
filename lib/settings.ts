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
    const res = await axios.get<SettingsType>("/api/settings");
    const existing = res.data || {};

    const defaultKeys = Object.keys(defaultSettings).sort();
    const existingKeys = Object.keys(existing).sort();
    const schemaChanged = !isEqual(defaultKeys, existingKeys);

    if (!existing || schemaChanged) {
      // CREATE (upsert)
      const payload = merge({}, defaultSettings, updatedFields);
      const postRes = await axios.post<SettingsType>("/api/settings", payload);
      toast.success("Ayarlar oluşturuldu.");
      return postRes.data;
    } else {
      // UPDATE
      const patchRes = await axios.patch<SettingsType>(
        "/api/settings",
        updatedFields
      );
      toast.success("Ayarlar güncellendi.");
      return patchRes.data;
    }
  } catch (err: any) {
    console.error(
      "Ayar kaydetme hatası:",
      JSON.stringify(err.response?.data || err.message, null, 2)
    );
    toast.error(err.response?.data?.error || "Ayarlar kaydedilemedi!");
    throw err;
  }
}
