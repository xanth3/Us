"use client";

import { WishlistButton } from "./WishlistButton";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export function SheetTeaser({ product }: Props) {
  return (
    <div className="flex items-start justify-between border-b border-border bg-background px-6 py-4 sm:hidden">
      <div className="flex-1">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">
          {product.kicker}
        </p>
        <h2 className="product-title text-lg font-medium">{product.name}</h2>
        <p className="text-sm text-foreground mt-1">${product.price.toFixed(2)}</p>
      </div>
      <WishlistButton
        slug={product.slug}
        productName={product.name}
        productImage={product.images[0]?.src}
      />
    </div>
  );
}
