"use client";

import { useCart } from "./CartProvider";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, setCartDrawerOpen } = useCart();

  return (
    <button
      onClick={() => {
        addItem({
          slug: product.slug,
          name: product.name,
          price: product.price,
          currency: product.currency,
          imageSrc: product.serviceOffer.icon,
        });
        setCartDrawerOpen(true);
      }}
      className="btn-cart"
    >
      Place in Cart
    </button>
  );
}
