// app/dashboard/layout.tsx

import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <div className="flex">
    //   <div className="sticky top-0 h-max">
    //     <Sidebar />
    //   </div>
    //   {children}
    // </div>
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className=" overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
