"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "Monogram Anniversary", href: "/" },
  { label: "Gifts and Personalization", href: "/" },
  { label: "New", href: "/" },
  { label: "Women", href: "/" },
  { label: "Men", href: "/" },
  { label: "Perfumes and Beauty", href: "/perfumes", chevron: true, bold: true },
  { label: "Services", href: "/" },
  { label: "The Maison Us", href: "/" },
];

const SECONDARY_ITEMS = [
  { label: "Sustainability", href: "/" },
  { label: "Find a Store", href: "/" },
  { label: "Ship to: United States of America", href: "/" },
];

export function MenuDrawer({ open, onClose }: Props) {
  const [enhanced, setEnhanced] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[300px] flex-col bg-white transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigation menu"
      >
        {/* Close */}
        <div className="flex items-center px-5 pt-4 pb-2">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[0.75rem] tracking-wide text-foreground transition-opacity hover:opacity-60"
            aria-label="Close menu"
          >
            <X size={14} />
            <span>Close</span>
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 overflow-y-auto px-5 pt-3 pb-4">
          <ul className="space-y-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between py-2.5 text-[0.85rem] tracking-wide transition-opacity hover:opacity-60 ${
                    item.bold ? "font-semibold" : "font-normal text-foreground"
                  }`}
                >
                  {item.label}
                  {item.chevron && <ChevronRight size={14} className="text-muted-foreground" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-5 border-t border-border" />

          {/* Help */}
          <div className="mb-4">
            <p className="text-[0.72rem] text-muted-foreground">Can we help you?</p>
            <a
              href="tel:+18006600"
              className="text-[0.8rem] font-medium tracking-wide transition-opacity hover:opacity-60"
            >
              +1 800 US-BRAND
            </a>
          </div>

          <div className="my-5 border-t border-border" />

          {/* Secondary links */}
          <ul className="space-y-0">
            {SECONDARY_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2 text-[0.8rem] tracking-wide transition-opacity hover:opacity-60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-5 border-t border-border" />

          {/* Accessibility toggle */}
          <div className="flex items-center justify-between py-1">
            <span className="text-[0.8rem] tracking-wide">Accessibility: Enhanced Contrast</span>
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
      </aside>
    </>
  );
}
