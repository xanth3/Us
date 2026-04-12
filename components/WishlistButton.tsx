"use client";

import { useEffect, useState } from "react";
import { Heart } from "./icons";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "us_wishlist";

function getWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

interface Props {
  slug: string;
  className?: string;
}

export function WishlistButton({ slug, className }: Props) {
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
      className={cn(
        "flex h-8 w-8 items-center justify-center transition-colors",
        className,
      )}
    >
      <Heart
        size={18}
        className={cn(
          "transition-colors",
          wished ? "fill-brand-black stroke-brand-black" : "stroke-brand-black",
        )}
      />
    </button>
  );
}
