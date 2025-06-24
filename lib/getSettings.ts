import { dbConnect } from "@/lib/db";
import Setting from "@/models/Settings";

// En güncel ayarı getirir (varsayılan olarak en son eklenen)

export async function getSettings() {
  await dbConnect();
  const settings = await Setting.findOne();
  return settings;
}
