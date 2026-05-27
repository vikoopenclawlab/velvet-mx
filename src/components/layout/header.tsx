"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Heart, Calendar, LogOut, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: "CLIENT" | "MODEL" | "ADMIN";
  userName?: string;
}

export function Header({ isAuthenticated = false, userRole = "CLIENT", userName }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Explorar", href: "/models" },
    { label: "Ciudades", href: "/models?view=cities" },
    { label: "Experiencias", href: "/experiences" },
    { label: "Sobre Nosotros", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-secondary">VELVET</span>{" "}
              <span className="text-white">MX</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-secondary transition-colors">
                  <span className="hidden lg:inline">{userName || "Mi cuenta"}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {userRole === "CLIENT" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/reservations" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> Mis Reservas
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/favorites" className="flex items-center gap-2">
                          <Heart className="h-4 w-4" /> Favoritos
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {userRole === "MODEL" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/model-dashboard" className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Mi Panel
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/model-dashboard/calendar" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> Calendario
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {userRole === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" /> Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 text-red-400 cursor-pointer">
                    <LogOut className="h-4 w-4" /> Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Iniciar Sesión</Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-white/70 hover:text-secondary hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="px-4 py-3 text-sm font-medium text-white/70 hover:text-secondary hover:bg-white/5 rounded-lg transition-colors">
                      Mi Dashboard
                    </Link>
                    <button className="px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="px-4 py-3 text-sm font-medium text-white/70 hover:text-secondary hover:bg-white/5 rounded-lg transition-colors">
                      Iniciar Sesión
                    </Link>
                    <Link href="/register" className="px-4 py-3 text-sm font-medium bg-secondary text-primary hover:bg-secondary/90 rounded-lg transition-colors text-center">
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
