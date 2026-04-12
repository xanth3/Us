"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Heart, User, ShoppingBag } from "./icons";
import { CartBadge } from "./CartBadge";

export function HeaderClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white">
      <div className="flex h-14 items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1.5 text-xs tracking-widest"
            aria-label="Toggle menu"
          >
            <Menu size={16} />
            <span className="hidden sm:inline">Menu</span>
          </button>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-1.5 text-xs tracking-widest"
            aria-label="Search"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Centre wordmark */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-playfair text-xl tracking-[0.15em]"
        >
          U<span className="text-[0.65em]">s</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-5">
          <Link href="/" className="hidden text-xs tracking-widest sm:inline">
            Contact Us
          </Link>
          <button aria-label="Wishlist">
            <Heart size={18} />
          </button>
          <button aria-label="Account">
            <User size={18} />
          </button>
          <button aria-label="Cart" className="flex items-center gap-1 text-xs">
            <ShoppingBag size={18} />
            <CartBadge />
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-brand-border px-6 py-3">
          <input
            autoFocus
            type="search"
            placeholder="Search…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-brand-muted"
            onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
