"use client";

import { useCallback } from "react";
import { useCart } from "./CartProvider";
import { useHaptics } from "@/hooks/use-haptics";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, setCartDrawerOpen } = useCart();
  const { trigger } = useHaptics();

  const handleClick = useCallback(() => {
    trigger("success");
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      imageSrc: product.serviceOffer.icon,
    });
    setCartDrawerOpen(true);
  }, [addItem, setCartDrawerOpen, trigger, product.slug, product.name, product.price, product.currency, product.serviceOffer.icon]);

  return (
    <button
      onClick={handleClick}
      className="btn-cart rounded-full min-h-[44px]"
    >
      Place in Cart
    </button>
  );
}
