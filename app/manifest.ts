import type { MetadataRoute } from "next";
import { BRAND_NAME } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} — Luxury Beauty & Fragrance`,
    short_name: BRAND_NAME,
    description: "Luxury fragrances, makeup, and skincare for the modern aesthetic",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/assets/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/assets/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    screenshots: [
      { src: "/assets/screenshot-540.png", sizes: "540x720", type: "image/png" },
      { src: "/assets/screenshot-1280.png", sizes: "1280x720", type: "image/png" },
    ],
    shortcuts: [
      {
        name: "Shop Perfumes",
        short_name: "Shop",
        description: "Browse all fragrances",
        url: "/perfumes",
        icons: [{ src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "My Wishlist",
        short_name: "Wishlist",
        description: "View saved items",
        url: "/wishlist",
        icons: [{ src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
    categories: ["shopping", "lifestyle"],
  };
}
