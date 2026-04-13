"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeaturedImage {
  src: string;
  alt: string;
  caption: string;
}

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  bold?: boolean;
  submenu?: {
    featured: FeaturedImage[];
    items: SubItem[];
  };
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: "Monogram Anniversary",
    href: "/",
    submenu: {
      featured: [
        { src: "/assets/perfume-hero.jpg", alt: "Monogram", caption: "Monogram Collection" },
        { src: "/assets/perfume-lifestyle.jpg", alt: "Anniversary", caption: "Anniversary Editions" },
      ],
      items: [
        { label: "Limited Editions", href: "/" },
        { label: "Monogram Fragrances", href: "/" },
        { label: "Gift Sets", href: "/" },
        { label: "Personalization", href: "/" },
      ],
    },
  },
  {
    label: "Gifts and Personalization",
    href: "/",
    submenu: {
      featured: [
        { src: "/assets/perfume-detail.jpg", alt: "Gifts", caption: "Gifts" },
        { src: "/assets/product-symphony.jpg", alt: "Personalization", caption: "Personalization" },
      ],
      items: [
        { label: "Gift Sets", href: "/" },
        { label: "Personalized Fragrance", href: "/" },
        { label: "Engraving Services", href: "/" },
        { label: "Gift Cards", href: "/" },
        { label: "Gift Wrapping", href: "/" },
      ],
    },
  },
  {
    label: "New",
    href: "/",
    submenu: {
      featured: [
        { src: "/assets/perfume-hero.jpg", alt: "New Arrivals", caption: "New Arrivals" },
        { src: "/assets/perfume-lifestyle.jpg", alt: "The Essentials", caption: "The Essentials" },
        { src: "/assets/perfume-detail.jpg", alt: "Spring 2026", caption: "Spring 2026" },
        { src: "/assets/product-stellar.jpg", alt: "Summer 2026 Show", caption: "Summer 2026 Show" },
      ],
      items: [
        { label: "New Fragrances", href: "/perfumes" },
        { label: "New Makeup", href: "/" },
        { label: "New Skincare", href: "/" },
        { label: "New Accessories", href: "/" },
      ],
    },
  },
  {
    label: "Women",
    href: "/",
    submenu: {
      featured: [
        { src: "/assets/perfume-hero.jpg", alt: "New Arrivals", caption: "New Arrivals" },
        { src: "/assets/perfume-lifestyle.jpg", alt: "The Essentials", caption: "The Essentials" },
        { src: "/assets/perfume-detail.jpg", alt: "Spring 2026", caption: "Spring 2026" },
        { src: "/assets/product-symphony.jpg", alt: "Spring–Summer 2026 Show", caption: "Spring–Summer 2026 Show" },
      ],
      items: [
        { label: "Small Leather Goods", href: "/" },
        { label: "Accessories", href: "/" },
        { label: "Fashion Jewelry", href: "/" },
        { label: "Ready-to-Wear", href: "/" },
        { label: "Perfumes", href: "/perfumes" },
        { label: "Travel", href: "/" },
      ],
    },
  },
  {
    label: "Men",
    href: "/",
    submenu: {
      featured: [
        { src: "/assets/product-stellar.jpg", alt: "New Arrivals", caption: "New Arrivals" },
        { src: "/assets/perfume-lifestyle.jpg", alt: "The Essentials", caption: "The Essentials" },
        { src: "/assets/perfume-detail.jpg", alt: "Spring 2026", caption: "Spring 2026" },
        { src: "/assets/product-symphony.jpg", alt: "Spring–Summer 2026 Show", caption: "Spring–Summer 2026 Show" },
      ],
      items: [
        { label: "Small Leather Goods", href: "/" },
        { label: "Accessories", href: "/" },
        { label: "Fashion Jewelry", href: "/" },
        { label: "Ready-to-Wear", href: "/" },
        { label: "Perfumes", href: "/perfumes" },
        { label: "Travel", href: "/" },
      ],
    },
  },
  {
    label: "Perfumes and Beauty",
    href: "/perfumes",
    bold: true,
    submenu: {
      featured: [
        { src: "/assets/perfume-hero.jpg", alt: "All Fragrances", caption: "All Fragrances" },
        { src: "/assets/perfume-lifestyle.jpg", alt: "New Arrivals", caption: "New Arrivals" },
        { src: "/assets/perfume-detail.jpg", alt: "Makeup", caption: "Makeup" },
        { src: "/assets/product-symphony.jpg", alt: "Skincare", caption: "Skincare" },
      ],
      items: [
        { label: "All Perfumes", href: "/perfumes" },
        { label: "Makeup", href: "/" },
        { label: "Skincare", href: "/" },
        { label: "Accessories", href: "/" },
        { label: "Gift Sets", href: "/" },
      ],
    },
  },
  {
    label: "Services",
    href: "/",
    submenu: {
      featured: [],
      items: [
        { label: "Bottle Engraving", href: "/" },
        { label: "Gift Wrapping", href: "/" },
        { label: "Click & Collect", href: "/" },
        { label: "After-Sales Service", href: "/" },
        { label: "Store Appointments", href: "/" },
      ],
    },
  },
  {
    label: "The Maison Us",
    href: "/",
    submenu: {
      featured: [
        { src: "/assets/perfume-hero.jpg", alt: "Our Story", caption: "Our Story" },
        { src: "/assets/perfume-lifestyle.jpg", alt: "Our Artisans", caption: "Our Artisans" },
      ],
      items: [
        { label: "Our Story", href: "/" },
        { label: "Master Perfumers", href: "/" },
        { label: "Savoir-Faire", href: "/" },
        { label: "Sustainability", href: "/" },
        { label: "Exhibitions & Events", href: "/" },
      ],
    },
  },
];

const SECONDARY_LINKS = [
  { label: "Sustainability", href: "/" },
  { label: "Find a Store", href: "/" },
  { label: "Ship to: United States of America", href: "/" },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MenuDrawer({ open, onClose }: Props) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [enhanced, setEnhanced] = useState(false);

  // Reset submenu when drawer closes
  useEffect(() => {
    if (!open) setActiveLabel(null);
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const activeItem = NAV_ITEMS.find((i) => i.label === activeLabel);
  const hasSubmenu = !!activeItem?.submenu;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer — two panels side by side */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ── Panel 1: Main nav ─────────────────────────────────── */}
        <div className="flex w-[280px] shrink-0 flex-col overflow-y-auto bg-white">
          {/* Close */}
          <div className="px-5 pt-4 pb-1">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-[0.72rem] tracking-wide text-foreground transition-opacity hover:opacity-60"
              aria-label="Close menu"
            >
              <X size={13} />
              Close
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-5 pt-4">
            <ul>
              {NAV_ITEMS.map((item) => {
                const isActive = activeLabel === item.label;
                return (
                  <li key={item.label}>
                    <button
                      onClick={() =>
                        setActiveLabel(isActive ? null : item.label)
                      }
                      className={`flex w-full items-center justify-between py-[9px] text-left text-[0.85rem] tracking-wide transition-opacity hover:opacity-60 ${
                        item.bold ? "font-semibold" : "font-normal"
                      } ${isActive ? "underline underline-offset-2" : ""}`}
                    >
                      {item.label}
                      <ChevronRight
                        size={13}
                        className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                          isActive ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="my-5 border-t border-border" />

            {/* Help */}
            <p className="text-[0.71rem] text-muted-foreground">Can we help you?</p>
            <a
              href="tel:+18006600"
              className="mt-0.5 block text-[0.8rem] font-medium tracking-wide transition-opacity hover:opacity-60"
            >
              +1 800 US-BRAND
            </a>

            <div className="my-5 border-t border-border" />

            {/* Secondary links */}
            <ul>
              {SECONDARY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-1.5 text-[0.8rem] tracking-wide transition-opacity hover:opacity-60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-5 border-t border-border" />

            {/* Accessibility toggle */}
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[0.78rem] tracking-wide">
                Accessibility: Enhanced Contrast
              </span>
              <button
                role="switch"
                aria-checked={enhanced}
                onClick={() => setEnhanced((v) => !v)}
                className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${
                  enhanced ? "bg-foreground" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                    enhanced ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* ── Panel 2: Submenu ──────────────────────────────────── */}
        <div
          className={`shrink-0 overflow-y-auto border-l border-border bg-white transition-all duration-300 ease-in-out ${
            hasSubmenu ? "w-[290px]" : "w-0"
          }`}
        >
          {/* Inner is fixed-width so layout doesn't jump as it opens */}
          <div className="w-[290px] px-5 py-5">
            {activeItem?.submenu && (
              <>
                {/* Featured images — 2-column grid */}
                {activeItem.submenu.featured.length > 0 && (
                  <div className="mb-5 grid grid-cols-2 gap-2">
                    {activeItem.submenu.featured.map((img) => (
                      <div key={img.caption} className="flex flex-col">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                        <p className="mt-1 text-[0.72rem] tracking-wide text-muted-foreground">
                          {img.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeItem.submenu.featured.length > 0 && (
                  <div className="mb-4 border-t border-border" />
                )}

                {/* Sub-items */}
                <ul>
                  {activeItem.submenu.items.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        onClick={onClose}
                        className="block py-2 text-[0.85rem] tracking-wide transition-opacity hover:opacity-60"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
