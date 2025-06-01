// lib/db.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("MongoDB bağlantı URI'si tanımlı değil (.env.local)")
}

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'hizlisat',
      bufferCommands: false,
    })
    console.log('veri tabanı bağlantısı başarılı')
  }

  cached.conn = await cached.promise
  return cached.conn
}
