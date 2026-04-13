"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATALOG } from "@/lib/catalog";
import type { Product } from "@/types/product";
import { ProductCardGrid } from "@/components/ProductCardGrid";

const WISHLIST_STORAGE_KEY = "us_wishlist";
const RECENTLY_VIEWED_STORAGE_KEY = "us_recently_viewed";

function getWishlisted(): string[] {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function getRecentlyViewed(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export default function WishlistPage() {
  const [wishlisted, setWishlisted] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const wishlistSlugs = getWishlisted();
    const wishlistProducts = wishlistSlugs
      .map((slug) => CATALOG[slug as keyof typeof CATALOG])
      .filter(Boolean);
    setWishlisted(wishlistProducts);

    const recentlySlugs = getRecentlyViewed().slice(0, 4);
    const recentlyProducts = recentlySlugs
      .map((slug) => CATALOG[slug as keyof typeof CATALOG])
      .filter(Boolean);
    setRecentlyViewed(recentlyProducts);

    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {wishlisted.length === 0 ? (
          <div className="text-center">
            {/* Empty Wishlist State */}
            <div className="mb-16 py-20">
              <h1 className="mb-4 text-3xl font-light tracking-wide">Your wishlist is empty.</h1>
              <p className="mb-2 text-sm text-muted-foreground">
                Save products and looks to your wishlist and share them.
              </p>
              <p className="mb-8 text-xs text-muted-foreground">Need inspiration?</p>

              {/* Sign In Button */}
              <button
                className="mb-16 rounded-full bg-black px-12 py-3 text-xs font-medium tracking-widest text-white transition-opacity hover:opacity-90"
                onClick={() => alert("Sign in functionality would be integrated with auth provider")}
              >
                Sign In
              </button>
            </div>

            {/* Recently Viewed Section */}
            {recentlyViewed.length > 0 && (
              <div>
                <h2 className="mb-8 text-2xl font-light tracking-wide">Recently Viewed</h2>
                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
                  {recentlyViewed.map((product) => (
                    <ProductCardGrid key={product.slug} product={product} isFirst={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Continue Shopping Link */}
            <div className="mt-16 border-t border-border pt-8">
              <Link
                href="/perfumes"
                className="inline-block border border-foreground px-8 py-3 text-xs font-light uppercase tracking-widest transition-colors hover:bg-foreground hover:text-white"
              >
                Explore Our Collection
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Wishlist with items */}
            <h1 className="mb-8 text-3xl font-light tracking-wide">My Wishlist ({wishlisted.length})</h1>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {wishlisted.map((product) => (
                <ProductCardGrid key={product.slug} product={product} isFirst={false} />
              ))}
            </div>

            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-8 text-2xl font-light tracking-wide">Recently Viewed</h2>
                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
                  {recentlyViewed.map((product) => (
                    <ProductCardGrid key={product.slug} product={product} isFirst={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
