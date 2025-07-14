'use client'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Home, Package, Receipt, Truck, Settings, ShoppingCart } from "lucide-react"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Ürünler", href: "/dashboard/products", icon: Package },
  { label: "Siparişler", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Fatura", href: "/dashboard/invoices", icon: Receipt },
  { label: "Kargo", href: "/dashboard/shipping", icon: Truck },
  { label: "Ayarlar", href: "/dashboard/settings", icon: Settings },
]
  {/* <ShoppingCart className="w-4 h-4" /> */}
export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64  min-h-screen bg-white border-r border-r-blue-50 shadow-sm p-4">
      <div className="text-2xl   font-bold mb-8">
        <Link href="/" className="text-blue-500 hover:text-blue-700">Ana Sayfa  </Link>
      </div>
      <nav className="space-y-2   ">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all",
              pathname === href ? "bg-gray-100 font-medium" : "text-gray-700"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
