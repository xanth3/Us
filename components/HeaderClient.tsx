"use client";

import Link from "next/link";
import { Menu, Search, Heart, User, ShoppingBag } from "./icons";
import { BrandLogo } from "./BrandLogo";
import { CartBadge } from "./CartBadge";

export function HeaderClient() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center gap-5">
          <button className="nav-link flex items-center gap-2" aria-label="Menu">
            <Menu size={18} />
            <span className="hidden sm:inline">Menu</span>
          </button>
          <button className="nav-link flex items-center gap-2" aria-label="Search">
            <Search size={18} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Centre */}
        <Link href="/">
          <BrandLogo />
        </Link>

        {/* Right */}
        <div className="flex items-center gap-5">
          <a href="#" className="nav-link hidden sm:inline">Contact Us</a>
          <button className="nav-link" aria-label="Wishlist">
            <Heart size={18} />
          </button>
          <button className="nav-link" aria-label="Account">
            <User size={18} />
          </button>
          <button className="nav-link relative" aria-label="Cart">
            <ShoppingBag size={18} />
            <CartBadge />
          </button>
        </div>
      </div>
    </header>
  );
}
