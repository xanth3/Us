"use client";

import { useCallback } from "react";
import { useHaptics } from "@/hooks/use-haptics";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  className?: string;
}

export function AddToCartButtonWithHaptics({ product, className }: Props) {
  const { trigger } = useHaptics();

  const handleClick = useCallback(() => {
    trigger("success");
    // Add to cart logic here
  }, [trigger]);

  return (
    <button
      onClick={handleClick}
      className={`btn-cart rounded-full min-h-[44px] ${className || ""}`}
    >
      Place in Cart
    </button>
  );
}
