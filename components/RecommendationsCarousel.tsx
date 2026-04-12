"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./icons";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

interface Props {
  recommended: Product[];
  recentlyViewed?: Product[];
}

export function RecommendationsCarousel({ recommended, recentlyViewed = [] }: Props) {
  const [activeTab, setActiveTab] = useState<"recommended" | "recent">("recommended");
  const scrollRef = useRef<HTMLDivElement>(null);

  const products = activeTab === "recommended" ? recommended : recentlyViewed;

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  }

  return (
    <section className="border-t border-brand-border py-12">
      {/* Tabs */}
      <div className="flex gap-6 px-6 pb-6">
        <button
          onClick={() => setActiveTab("recommended")}
          className={
            activeTab === "recommended"
              ? "border-b border-brand-black pb-1 text-sm"
              : "pb-1 text-sm text-brand-muted"
          }
        >
          Recommended for You
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={
            activeTab === "recent"
              ? "border-b border-brand-black pb-1 text-sm"
              : "pb-1 text-sm text-brand-muted"
          }
        >
          Recently Viewed
        </button>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Prev */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p.slug} className="w-[300px] flex-none">
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <p className="px-6 py-12 text-sm text-brand-muted">Nothing here yet.</p>
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
