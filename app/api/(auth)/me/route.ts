import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'  // kendi jwt doğrulama fonksiyonun
import User from '@/models/User'
import { dbConnect } from '@/lib/db'

export async function GET(req: NextRequest) {
  await dbConnect()
  const token = req.cookies.get('token')?.value  // Cookie’den token al
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 })
  }

  try {
    const decoded: any = verifyToken(token)
    const user = await User.findById(decoded.sub).select('-password')
    if (!user) throw new Error('User not found')
    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
