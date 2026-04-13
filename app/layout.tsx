import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: {
    default: "Us — Luxury Beauty & Fragrance",
    template: "%s | Us",
  },
  description: "Discover the Us collection of luxury fragrances, makeup, and skincare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
