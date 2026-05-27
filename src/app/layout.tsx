import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { APP_CONSTANTS } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_CONSTANTS.name} - ${APP_CONSTANTS.tagline}`,
    template: `%s | ${APP_CONSTANTS.name}`,
  },
  description: APP_CONSTANTS.description,
  keywords: ["acompanantes", "companionship", "Mexico", "premium", "Velvet MX"],
  authors: [{ name: APP_CONSTANTS.name }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: APP_CONSTANTS.name,
    title: `${APP_CONSTANTS.name} - ${APP_CONSTANTS.tagline}`,
    description: APP_CONSTANTS.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
