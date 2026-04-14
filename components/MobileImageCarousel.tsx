"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WishlistButton } from "./WishlistButton";
import type { ProductImage } from "@/types/product";

interface Props {
  images: ProductImage[];
  slug: string;
}

export function MobileImageCarousel({ images, slug }: Props) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const current = images[index];

  return (
    <div className="relative w-full select-none overflow-hidden bg-secondary">
      {/* Top gradient keeps white navbar readable */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Back button — plain black chevron, no circle */}
      <Link
        href="/perfumes"
        aria-label="Back to All Perfumes"
        className="absolute left-4 top-[88px] z-20 text-white transition-opacity hover:opacity-60"
      >
        <ChevronLeft size={22} strokeWidth={1.5} />
      </Link>

      {/* Wishlist — top right */}
      <div className="absolute right-4 top-[88px] z-20">
        <WishlistButton slug={slug} className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />
      </div>

      {/* Image */}
      {current && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          src={current.src}
          alt={current.alt}
          className="h-auto w-full object-cover"
          loading="eager"
          width={1536}
          height={1920}
        />
      )}

      {/* Prev / Next — plain black chevrons, no circle */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 p-2 text-foreground transition-opacity hover:opacity-50"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 p-2 text-foreground transition-opacity hover:opacity-50"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Image ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-foreground" : "bg-foreground/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
