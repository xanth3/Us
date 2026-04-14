"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "./icons";
import type { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export function RecommendationsCarousel({ products }: Props) {
  const [activeTab, setActiveTab] = useState<"recommended" | "recent">("recommended");
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -350 : 350, behavior: "smooth" });
  }

  return (
    <section className="px-6 py-12">
      {/* Tabs */}
      <div className="mb-8 flex gap-8 px-2">
        <button
          onClick={() => setActiveTab("recommended")}
          className={`pb-1 text-sm tracking-wide transition-opacity ${
            activeTab === "recommended"
              ? "font-medium underline underline-offset-4"
              : "text-muted-foreground hover:opacity-70"
          }`}
        >
          Recommended for You
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={`pb-1 text-sm tracking-wide transition-opacity ${
            activeTab === "recent"
              ? "font-medium underline underline-offset-4"
              : "text-muted-foreground hover:opacity-70"
          }`}
        >
          Recently Viewed
        </button>
      </div>

      {/* Grid */}
      <div className="relative">
        <div ref={scrollRef} className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
          {products.map((product, i) => (
            <a
              key={i}
              href={`/products/${product.slug}`}
              className="group min-w-[280px] flex-1 cursor-pointer"
            >
              <div className="relative mb-3 aspect-[4/5] overflow-hidden bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[0]?.src ?? ""}
                  alt={product.images[0]?.alt ?? product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={768}
                  height={960}
                />
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute right-3 top-3 transition-opacity hover:opacity-60"
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} className="text-foreground" />
                </button>
              </div>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
            </a>
          ))}
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-[40%] -translate-y-1/2 p-1 text-foreground transition-opacity hover:opacity-50"
          aria-label="Previous"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-[40%] -translate-y-1/2 p-1 text-foreground transition-opacity hover:opacity-50"
          aria-label="Next"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
