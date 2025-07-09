// app/dashboard/layout.tsx

import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import { IntegrationsProvider } from '@/context/IntegrationsContext'
import { OrdersProvider } from '@/context/OrdersContext'
import { SettingsProvider } from '@/context/SettingsContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <IntegrationsProvider>
      <OrdersProvider>
        <SettingsProvider>
          <div className="flex  bg-gray-100 text-gray-800">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <TopBar />
              <main className=" overflow-y-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </SettingsProvider>
      </OrdersProvider>
    </IntegrationsProvider>
  )
}
