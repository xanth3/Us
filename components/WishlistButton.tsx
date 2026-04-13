"use client";

import { useEffect, useState, useCallback } from "react";
import { Heart } from "./icons";
import { useToast } from "./ToastProvider";
import { useHaptics } from "@/hooks/use-haptics";

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
  const { trigger } = useHaptics();

  useEffect(() => {
    setWished(getWishlist().includes(slug));
  }, [slug]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const list = getWishlist();
      const isAdding = !list.includes(slug);
      const next = isAdding
        ? [...list, slug]
        : list.filter((s) => s !== slug);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      setWished(next.includes(slug));

      // Haptic feedback
      trigger(isAdding ? "success" : "light");

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
    },
    [slug, trigger, productName, productImage, addToast]
  );

  return (
    <button
      onClick={toggle}
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center justify-center min-h-[44px] min-w-[44px] transition-opacity hover:opacity-60 ${className}`}
    >
      <Heart
        size={20}
        className={wished ? "fill-foreground text-foreground" : "text-foreground"}
      />
    </button>
  );
}
