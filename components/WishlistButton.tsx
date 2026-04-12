"use client";

import { useEffect, useState } from "react";
import { Heart } from "./icons";

const STORAGE_KEY = "us_wishlist";

function getWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function WishlistButton({ slug, className = "" }: { slug: string; className?: string }) {
  const [wished, setWished] = useState(false);

  useEffect(() => {
    setWished(getWishlist().includes(slug));
  }, [slug]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    const list = getWishlist();
    const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setWished(next.includes(slug));
  }

  return (
    <button
      onClick={toggle}
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      className={`transition-opacity hover:opacity-60 ${className}`}
    >
      <Heart
        size={20}
        className={wished ? "fill-foreground text-foreground" : "text-foreground"}
      />
    </button>
  );
}
