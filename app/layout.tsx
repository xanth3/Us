import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { AccountDrawer } from "@/components/AccountDrawer";
import { ToastProvider } from "@/components/ToastProvider";
import { GesturesClient } from "@/components/GesturesClient";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} — Luxury Beauty & Fragrance`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: `Discover the ${BRAND_NAME} collection of luxury fragrances, makeup, and skincare.`,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: BRAND_NAME,
    startupImage: "/assets/splash-screen.png",
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  icons: {
    icon: "/assets/favicon.ico",
    apple: [
      { url: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": BRAND_NAME,
    "theme-color": "#000000",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CartProvider>
            <GesturesClient />
            <Header />
            <main className="pt-[calc(60px+var(--safe-area-inset-top,0px))]">{children}</main>
            <Footer />
            <CartDrawer />
            <AccountDrawer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
