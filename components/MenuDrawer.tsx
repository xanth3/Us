"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight, ChevronLeft, Search, User, ShoppingBag } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { CartBadge } from "./CartBadge";
import { BRAND_NAME } from "@/lib/brand";

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

// ─── Data ─────────────────────────────────────────────────────────────────────

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
    label: `The Maison ${BRAND_NAME}`,
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
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (!open) setActiveLabel(null);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const activeItem = NAV_ITEMS.find((i) => i.label === activeLabel);

  // ── Shared bottom section ────────────────────────────────────────────────
  const bottomSection = (
    <>
      <div className="my-5 border-t border-border" />
      <p className="text-[0.71rem] text-muted-foreground">Can we help you?</p>
      <a
        href="tel:+18006600"
        className="mt-0.5 block text-[0.8rem] font-medium tracking-wide transition-opacity hover:opacity-60"
      >
        +1 800 {BRAND_NAME.toUpperCase()}
      </a>
      <div className="my-5 border-t border-border" />
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
      <div className="mb-10 flex items-center justify-between">
        <span className="text-[0.78rem] tracking-wide">Accessibility: Enhanced Contrast</span>
        <button
          role="switch"
          aria-checked={enhanced}
          onClick={() => setEnhanced((v) => !v)}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
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
    </>
  );

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

      {/* ══════════════════════════════════════════════════
           MOBILE  (<md) — full-screen, sliding panels
          ══════════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-white transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile drawer header (mirrors site header) */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-4">
            <button onClick={onClose} aria-label="Close menu">
              <X size={18} />
            </button>
            <button aria-label="Search">
              <Search size={18} />
            </button>
          </div>
          <Link href="/" onClick={onClose}>
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-4">
            <button aria-label="Account">
              <User size={18} />
            </button>
            <button className="relative" aria-label="Cart">
              <ShoppingBag size={18} />
              <CartBadge />
            </button>
          </div>
        </div>

        {/* Sliding panels container */}
        <div className="relative flex-1 overflow-hidden">

          {/* ── Panel 1: Main nav ── */}
          <div
            className={`absolute inset-0 overflow-y-auto transition-transform duration-300 ease-in-out ${
              activeLabel ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <nav className="px-5 pt-2">
              <ul>
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => setActiveLabel(item.label)}
                      className={`flex w-full items-center justify-between py-[14px] text-left text-[0.95rem] tracking-wide transition-opacity hover:opacity-60 ${
                        item.bold ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {item.label}
                      <ChevronRight size={16} className="shrink-0 text-foreground/50" />
                    </button>
                    <div className="border-t border-border/60" />
                  </li>
                ))}
              </ul>
              {bottomSection}
            </nav>
          </div>

          {/* ── Panel 2: Submenu ── */}
          <div
            className={`absolute inset-0 overflow-y-auto transition-transform duration-300 ease-in-out ${
              activeLabel ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Back row */}
            <button
              onClick={() => setActiveLabel(null)}
              className="flex w-full items-center gap-2 border-b border-border px-5 py-4 text-sm tracking-wide transition-opacity hover:opacity-60"
              aria-label="Back"
            >
              <ChevronLeft size={17} />
              <span>{activeLabel}</span>
            </button>

            {/* Submenu content */}
            {activeItem?.submenu && (
              <div className="px-0">
                {/* First image — full width hero */}
                {activeItem.submenu.featured[0] && (
                  <div className="mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeItem.submenu.featured[0].src}
                      alt={activeItem.submenu.featured[0].alt}
                      className="w-full object-cover"
                      style={{ aspectRatio: "16/9" }}
                      loading="lazy"
                    />
                    <p className="mt-2 text-center text-sm tracking-wide">
                      {activeItem.submenu.featured[0].caption}
                    </p>
                  </div>
                )}

                {/* Remaining images — 2 column */}
                {activeItem.submenu.featured.length > 1 && (
                  <div className="mb-4 grid grid-cols-2">
                    {activeItem.submenu.featured.slice(1).map((img) => (
                      <div key={img.caption}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full object-cover"
                          style={{ aspectRatio: "1/1" }}
                          loading="lazy"
                        />
                        <p className="mt-1 px-1 text-center text-[0.72rem] text-muted-foreground">
                          {img.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Divider + links */}
                <div className="border-t border-border" />
                <ul className="px-5">
                  {activeItem.submenu.items.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-[14px] text-[0.95rem] tracking-wide transition-opacity hover:opacity-60"
                      >
                        {sub.label}
                        <ChevronRight size={16} className="shrink-0 text-foreground/50" />
                      </Link>
                      <div className="border-t border-border/60" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
           DESKTOP  (md+) — two panels side by side
          ══════════════════════════════════════════════════ */}
      <aside
        className={`fixed left-0 top-0 z-[70] hidden h-full transition-transform duration-300 ease-in-out md:flex ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Panel 1: Main nav */}
        <div className="flex w-[280px] shrink-0 flex-col overflow-y-auto bg-white">
          <div className="px-5 pb-1 pt-4">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-[0.72rem] tracking-wide text-foreground transition-opacity hover:opacity-60"
              aria-label="Close menu"
            >
              <X size={13} />
              Close
            </button>
          </div>
          <nav className="flex-1 px-5 pt-4">
            <ul>
              {NAV_ITEMS.map((item) => {
                const isActive = activeLabel === item.label;
                const isHovered = hoveredLabel === item.label;
                const someHovered = hoveredLabel !== null;
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => setActiveLabel(isActive ? null : item.label)}
                      onMouseEnter={() => setHoveredLabel(item.label)}
                      onMouseLeave={() => setHoveredLabel(null)}
                      className={`relative flex w-full items-center justify-between py-[9px] text-left text-[0.85rem] tracking-wide transition-all duration-200 ${
                        item.bold ? "font-semibold" : "font-normal"
                      } ${isActive ? "underline underline-offset-2" : ""} ${
                        someHovered && !isHovered ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      {item.label}
                      <ChevronRight
                        size={13}
                        className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                          isActive ? "rotate-90" : ""
                        }`}
                      />
                      {isHovered && !isActive && (
                        <div className="absolute bottom-0 left-0 h-0.5 bg-foreground animate-underline" style={{ width: "100%" }} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            {bottomSection}
          </nav>
        </div>

        {/* Panel 2: Submenu */}
        <div
          className={`shrink-0 overflow-y-auto border-l border-border bg-white transition-all duration-300 ease-in-out ${
            activeItem?.submenu ? "w-[290px]" : "w-0"
          }`}
        >
          <div className="w-[290px] px-5 py-5">
            {activeItem?.submenu && (
              <>
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
