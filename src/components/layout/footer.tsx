import Link from "next/link";
import { Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_CONSTANTS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold tracking-tight">
                <span className="text-secondary">VELVET</span>{" "}
                <span className="text-white">MX</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              {APP_CONSTANTS.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-white/40 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explorar
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Modelos", href: "/models" },
                { label: "Ciudades", href: "/models?view=cities" },
                { label: "Experiencias", href: "/experiences" },
                { label: "Sobre Nosotros", href: "/about" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Soporte
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Centro de Ayuda", href: "/help" },
                { label: "Contacto", href: "/contact" },
                { label: "Política de Privacidad", href: "/privacy" },
                { label: "Términos de Servicio", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Mail className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                <span>{APP_CONSTANTS.contactEmail}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Phone className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                <span>+52 800 VELVET MX</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} {APP_CONSTANTS.name}. Todos los derechos reservados. +18
            </p>
            <p className="text-xs text-white/40 flex items-center gap-1.5">
              Hecho con <Heart className="h-3 w-3 text-secondary fill-secondary" /> en México
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
