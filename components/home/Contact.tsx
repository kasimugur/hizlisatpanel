// components/Contact.tsx
"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, X, Instagram, Linkedin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-indigo-600 text-white py-20 px-6"
    >

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* İletişim Bilgileri */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6" />
            <Link href="mailto:info@hizlisat.com" className="hover:underline">
              info@hizlisat.com
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6" />
            <Link href="tel:+905551234567" className="hover:underline">
              +90 555 123 45 67
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6" />
            <address className="not-italic">İstanbul, Türkiye</address>
          </div>
          <div className="flex space-x-6 text-2xl">
            <Link
              href="https://twitter.com/hizlisat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-indigo-300 transition"
            >
              <X />
            </Link>
            <Link
              href="https://instagram.com/hizlisat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-indigo-300 transition"
            >
              <Instagram />
            </Link>
            <Link
              href="https://linkedin.com/company/hizlisat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-indigo-300 transition"
            >
              <Linkedin />
            </Link>
          </div>
        </div>

        {/* İletişim Formu */}
        <form
          action="#"
          method="POST"
          aria-label="İletişim formu"
          className="bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <Label htmlFor="name" className="text-black mb-1">
              Ad Soyad
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Adınız ve soyadınız"
              required
              className="text-indigo-900"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-black mb-1">
              E-posta
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="E-posta adresiniz"
              required
              className="text-indigo-900"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-black mb-1">
              Mesajınız
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Mesajınızı yazınız"
              required
              className="text-indigo-900"
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 transition">
            Gönder
          </Button>
        </form>
      </div>
    </section>
  );
}
