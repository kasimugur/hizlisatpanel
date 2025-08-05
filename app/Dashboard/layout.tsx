// app/dashboard/layout.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth' // Fonksiyonunu import et

import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import { IntegrationsProvider } from '@/context/IntegrationsContext'
import { OrdersProvider } from '@/context/OrdersContext'
import { SettingsProvider } from '@/context/SettingsContext'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. Token'ı cookie'den çek
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  // 2. Token yoksa login'e yönlendir
  if (!token) {
    redirect('/login')
  }

  // 3. Token'ı verify et. Geçersizse yine login'e at.
  try {
    verifyToken(token) // User obje dönüyorsa burada da kullanabilirsin
  } catch (err) {
    redirect('/login')
  }

  // 4. Layout'u döndür
  return (
    <IntegrationsProvider>
      <OrdersProvider>
        <SettingsProvider>
          <div className="flex bg-gray-100 text-gray-800">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <TopBar />
              <main className="overflow-y-auto p-6">{children}</main>
            </div>
          </div>
        </SettingsProvider>
      </OrdersProvider>
    </IntegrationsProvider>
  )
}
