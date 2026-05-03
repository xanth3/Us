"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { WishlistButton } from "./WishlistButton";
import { DragLiftLink } from "./DragLiftLink";

interface Props {
  product: Product;
  isFirst?: boolean;
  overlayInfoOnHover?: boolean;
}

export function ProductCardGrid({ product, isFirst = false, overlayInfoOnHover = false }: Props) {
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

  const handleDragEnd = ({ x, y }: { x: number; y: number }) => {
    if (!isFirst || product.images.length < 2 || Math.abs(x) < 36 || Math.abs(x) <= Math.abs(y)) return;
    setImgIndex((i) => {
      if (x > 0) return i === 0 ? product.images.length - 1 : i - 1;
      return i === product.images.length - 1 ? 0 : i + 1;
    });
  };

  return (
    <DragLiftLink
      href={`/products/${product.slug}`}
      className="group relative block overflow-hidden m-0 p-0"
      style={{ animation: "fadeInDelayed 0.6s ease-out 0.5s both" }}
      dragDirection="free"
      onDragEnd={handleDragEnd}
      onMouseEnter={() => {
        setHovered(true);
        if (isFirst && product.images.length > 1) setImgIndex(1);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setImgIndex(0);
      }}
    >
      {/* Card dimensions */}
      <div className="aspect-[9/14] w-full sm:aspect-[3/4]" />
      {!overlayInfoOnHover && <div className="h-[60px] sm:h-[72px]" />}

      {/* ── Image layer ─────────────────────────────────────────── */}
      <div
        className={`absolute inset-x-0 top-0 overflow-hidden bg-[hsl(var(--secondary))] ${
          overlayInfoOnHover ? "bottom-0" : "h-[calc(100%-60px)] sm:h-[calc(100%-72px)]"
        }`}
      >
        {/* Quick-view */}
        <div className="absolute left-3 top-3 z-10 hidden sm:block opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Maximize2 size={15} className="text-foreground drop-shadow-sm" />
        </div>

        {/* Wishlist */}
        <div className="absolute right-3 top-3 z-10">
          <WishlistButton
            slug={product.slug}
            productName={product.name}
            productImage={product.images[0]?.src}
          />
        </div>

        {/* Images — crossfade only, no slide/drawer */}
        {product.images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className={`absolute inset-0 h-full w-full cursor-grab object-cover transition-opacity duration-500 active:cursor-grabbing ${
              i === imgIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Nav arrows — visible on hover when manually cycling (first card only) */}
        {isFirst && hovered && product.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label="Previous image"
              className="absolute inset-y-0 left-0 z-20 hidden w-[22%] cursor-w-resize items-center justify-start px-2 text-foreground opacity-0 transition-opacity duration-200 hover:opacity-60 group-hover:opacity-100 sm:flex"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label="Next image"
              className="absolute inset-y-0 right-0 z-20 hidden w-[22%] cursor-e-resize items-center justify-end px-2 text-foreground opacity-0 transition-opacity duration-200 hover:opacity-60 group-hover:opacity-100 sm:flex"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </>
        )}

        {/* Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 hidden sm:flex -translate-x-1/2 gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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

        {overlayInfoOnHover && (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/55 via-black/20 to-transparent px-3 pb-3 pt-12 text-white transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {product.kicker && (
              <p className="text-[0.6rem] uppercase tracking-[0.12em] text-white/75">
                {product.kicker}
              </p>
            )}
            <p className="mt-0.5 text-[0.72rem] font-medium tracking-wide">
              {product.name}
            </p>
            <p className="mt-0.5 text-[0.68rem] text-white/90">
              From {formatPrice(product.price, product.currency)}
            </p>
          </div>
        )}
      </div>

      {/* ── Text layer — transparent on hover ───────────────────── */}
      {!overlayInfoOnHover && (
      <div className={`absolute inset-x-0 bottom-0 px-3 py-2 sm:py-3 transition-colors duration-300 ${hovered ? "bg-transparent" : "bg-white"}`}>
        {product.kicker && (
          <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
            {product.kicker}
          </p>
        )}
        <p className="mt-0.5 text-[0.7rem] sm:text-[0.8rem] font-medium tracking-wide text-foreground">
          {product.name}
        </p>
        <p className="mt-0.5 text-[0.65rem] sm:text-[0.75rem] text-foreground">
          From {formatPrice(product.price, product.currency)}
        </p>
      </div>
      )}
    </DragLiftLink>
  );
}

