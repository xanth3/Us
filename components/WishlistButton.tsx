"use client";

import { useEffect, useState } from "react";
import { Heart } from "./icons";
import { useToast } from "./ToastProvider";

const STORAGE_KEY = "us_wishlist";

function getWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function WishlistButton({
  slug,
  className = "",
  productName = "",
  productImage = "",
}: {
  slug: string;
  className?: string;
  productName?: string;
  productImage?: string;
}) {
  const [wished, setWished] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setWished(getWishlist().includes(slug));
  }, [slug]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    const list = getWishlist();
    const isAdding = !list.includes(slug);
    const next = isAdding ? [...list, slug] : list.filter((s) => s !== slug);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setWished(next.includes(slug));

    // Show toast only when adding to wishlist
    if (isAdding && productName) {
      addToast({
        type: "success",
        message: `The item ${productName} has been added to your wishlist`,
        productName,
        productImage,
        link: {
          text: "Access your wishlist",
          href: "/wishlist",
        },
      });
    }
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
