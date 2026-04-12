import type { Metadata } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-brand-black" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
