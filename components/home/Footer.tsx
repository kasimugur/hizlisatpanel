// components/Footer.tsx
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-indigo-900 text-indigo-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* İletişim Bilgileri */}
        <div>
          <h3 className="font-semibold text-lg mb-4">İletişim Bilgileri</h3>
          <p className="flex items-center">
            <Mail className="mr-2" />
            <Link href="mailto:info@hizlisat.com" className="hover:underline">
              info@hizlisat.com
            </Link>
          </p>
          <p className="flex items-center">
            <Phone className="mr-2" />
            <Link href="tel:+905551234567" className="hover:underline">
              +90 555 123 45 67
            </Link>
          </p>
          <p className="flex items-center">
            <MapPin className="mr-2" />
            İstanbul, Türkiye
          </p>
        </div>

        {/* Sosyal Medya */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Sosyal Medya</h3>
          <div className="flex space-x-6 text-indigo-300 text-2xl">
            <Link
              href="https://twitter.com/hizlisat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-indigo-100 transition"
            >
              <X />
            </Link>
            <Link
              href="https://instagram.com/hizlisat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-indigo-100 transition"
            >
              <Instagram />
            </Link>
            <Link
              href="https://linkedin.com/company/hizlisat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-indigo-100 transition"
            >
              <Linkedin />
            </Link>
          </div>
        </div>

        {/* Yasal */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Yasal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#privacy" className="hover:underline">
                Gizlilik Politikası
              </Link>
            </li>
            <li>
              <Link href="#terms" className="hover:underline">
                Kullanım Şartları
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-indigo-400 text-sm select-none">
        © 2024 HızlıSat. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
