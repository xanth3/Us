"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { WishlistButton } from "./WishlistButton";

interface Props {
  product: Product;
}

export function ProductCardGrid({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i === 0 ? product.images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i === product.images.length - 1 ? 0 : i + 1));
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setImgIndex(0);
      }}
    >
      {/* Quick-view icon — top-left */}
      <div className="absolute left-3 top-3 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Maximize2 size={15} className="text-foreground drop-shadow-sm" />
      </div>

      {/* Wishlist — top-right */}
      <div className="absolute right-3 top-3 z-10">
        <WishlistButton slug={product.slug} />
      </div>

      {/* Image stack */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[hsl(var(--secondary))]">
        {product.images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === imgIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Gallery nav — only when hovered and multiple images */}
        {hovered && product.images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 z-10 flex h-full w-10 -translate-y-1/2 items-center justify-center bg-gradient-to-r from-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:from-black/20"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
                <ChevronLeft size={13} />
              </div>
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-0 top-1/2 z-10 flex h-full w-10 -translate-y-1/2 items-center justify-center bg-gradient-to-l from-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:from-black/20"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
                <ChevronRight size={13} />
              </div>
            </button>
          </>
        )}

        {/* Image dots — bottom center */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full transition-colors ${
                  i === imgIndex ? "bg-foreground" : "bg-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card text */}
      <div className="bg-background px-2 py-3">
        {product.kicker && (
          <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
            {product.kicker}
          </p>
        )}
        <p className="mt-0.5 text-[0.8rem] font-medium tracking-wide">{product.name}</p>
        <p className="mt-0.5 text-[0.75rem] text-muted-foreground">
          From {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
