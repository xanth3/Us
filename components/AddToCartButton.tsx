"use client";

import { useCart } from "./CartProvider";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();

  function handleClick() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      imageSrc: product.images[0]?.src ?? "",
    });
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-brand-black py-4 text-xs font-semibold tracking-[0.2em] text-white transition-opacity hover:opacity-80 active:opacity-70"
    >
      PLACE IN CART
    </button>
  );
}
