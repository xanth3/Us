"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Heart, User, ShoppingBag } from "./icons";
import { BrandLogo } from "./BrandLogo";
import { CartBadge } from "./CartBadge";
import { MenuDrawer } from "./MenuDrawer";
import { useCart } from "./CartProvider";

export function HeaderClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setCartDrawerOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white" : "bg-transparent"
        }`}
        style={{
          paddingTop: "var(--safe-area-inset-top, 0)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex items-center gap-2 text-sm tracking-[0.05em] transition-opacity hover:opacity-60 ${
                scrolled ? "text-foreground" : "text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
              }`}
              aria-label="Open menu"
            >
              <Menu size={18} />
              <span className="hidden sm:inline font-medium">Menu</span>
            </button>
            <button
              className={`flex items-center gap-2 text-sm tracking-[0.05em] transition-opacity hover:opacity-60 ${
                scrolled ? "text-foreground" : "text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
              }`}
              aria-label="Search"
            >
              <Search size={18} />
              <span className="hidden sm:inline font-medium">Search</span>
            </button>
          </div>

          {/* Centre */}
          <Link
            href="/"
            className={scrolled ? "text-foreground" : "text-foreground drop-shadow-[0_1px_3px_rgba(255,255,255,0.6)]"}
          >
            <BrandLogo />
          </Link>

          {/* Right */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              className={`hidden sm:inline text-sm tracking-[0.05em] transition-opacity hover:opacity-60 font-medium ${
                scrolled ? "text-foreground" : "text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
              }`}
            >
              Contact Us
            </a>
            <Link
              href="/wishlist"
              className={`transition-opacity hover:opacity-60 ${
                scrolled ? "text-foreground" : "text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
              }`}
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </Link>
            <button
              className={`transition-opacity hover:opacity-60 ${
                scrolled ? "text-foreground" : "text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
              }`}
              aria-label="Account"
            >
              <User size={18} />
            </button>
            <button
              onClick={() => setCartDrawerOpen(true)}
              className={`relative transition-opacity hover:opacity-60 ${
                scrolled ? "text-foreground" : "text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
              }`}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              <CartBadge />
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
