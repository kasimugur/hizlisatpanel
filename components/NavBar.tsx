// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#landing", label: "Ana Sayfa" },
    { href: "#features", label: "Özellikler" },
    { href: "#how-it-works", label: "Nasıl Çalışır?" },
    { href: "#about", label: "Hakkımızda" },
    { href: "#contact", label: "İletişim" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="#landing" className="flex items-center space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://storage.googleapis.com/a1aa/image/d9313a74-76e5-4950-1094-8399a930c14b.jpg"
                alt="HızlıSat"
              />
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
            <span className="font-bold text-xl text-indigo-600 select-none">
              HızlıSat
            </span>
          </Link>

          {/* Masaüstü navigasyon */}
          <nav className="hidden md:flex space-x-8 font-semibold text-gray-700">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-indigo-600 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Masaüstü butonlar */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="#login"
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
            >
              Giriş Yap
            </Link>
            <Button asChild>
              <Link href="#register">Kayıt Ol</Link>
            </Button>
          </div>

          {/* Mobil menü */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" aria-label="Menüyü aç">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="mt-4 space-y-1 font-semibold text-gray-700">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 rounded hover:bg-indigo-50 hover:text-indigo-600 transition"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="#login"
                    className="block px-3 py-2 rounded text-indigo-600 hover:bg-indigo-50 font-semibold transition"
                    onClick={() => setOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                  <Button
                    asChild
                    className="w-full mt-2"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="#register">Kayıt Ol</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
