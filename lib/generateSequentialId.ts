import Counter from "@/models/Counter";
import { dbConnect } from "./db"; // bağlantı fonksiyonun

export async function generateSequentialId(prefix: string) {
  await dbConnect();

  const now = new Date();
  const year = now.getFullYear();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');

  const counter = await Counter.findOneAndUpdate(
    { _id: prefix },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const number = String(counter.seq).padStart(5, "0");

  return `${prefix.toUpperCase()}-${year}${month}${day}-${number}`;
}
