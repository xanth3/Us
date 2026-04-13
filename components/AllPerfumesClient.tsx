"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCardGrid } from "./ProductCardGrid";

interface CollectionSection {
  name: string;
  description: string;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  products: Product[];
}

interface Props {
  sections: CollectionSection[];
}

const INITIAL_VISIBLE = 4;

export function AllPerfumesClient({ sections }: Props) {
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    () => Object.fromEntries(sections.map((s) => [s.name, INITIAL_VISIBLE]))
  );

  const showMore = (sectionName: string, total: number) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [sectionName]: Math.min((prev[sectionName] ?? INITIAL_VISIBLE) + 4, total),
    }));
  };

  return (
    // pt-[73px] offsets the fixed navbar so the filter bar sits flush below it
    <div className="pt-[73px]">

      {/* ── Sticky filter bar ─────────────────────────────── */}
      <div className="sticky top-[73px] z-40 flex items-center justify-between border-b border-border bg-white px-6 py-3">
        <button className="flex items-center gap-1.5 text-[0.8rem] tracking-wide transition-opacity hover:opacity-60">
          <span>All Perfumes</span>
          <ChevronDown size={13} strokeWidth={1.5} />
        </button>
        <button className="flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[0.75rem] tracking-wide transition-colors hover:bg-secondary">
          <SlidersHorizontal size={12} strokeWidth={1.5} />
          <span>Filters</span>
        </button>
      </div>

      {/* ── Sections ──────────────────────────────────────── */}
      {sections.map((section) => {
        const visible = visibleCounts[section.name] ?? INITIAL_VISIBLE;
        const hasMore = visible < section.products.length;

        return (
          <div key={section.name}>

            {/* Hero banner — fills remaining viewport height */}
            <div
              className="relative overflow-hidden"
              style={{ height: "calc(100vh - 120px)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={section.heroImage}
                alt={section.heroTitle}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-12 text-white sm:max-w-sm">
                <h2
                  className="text-2xl font-light leading-snug sm:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.heroTitle}
                </h2>
                {section.heroSubtitle && (
                  <p className="mt-3 text-[0.78rem] leading-relaxed opacity-90">
                    {section.heroSubtitle}
                  </p>
                )}
                <a
                  href="#"
                  className="mt-5 w-fit border-b border-white/60 pb-0.5 text-[0.7rem] tracking-[0.12em] uppercase transition-opacity hover:opacity-70"
                >
                  Discover More
                </a>
              </div>
            </div>

            {/* Edge-to-edge product grid with 1px dividers */}
            <div className="grid grid-cols-4 border-l border-t border-border">
              {section.products.slice(0, visible).map((product) => (
                <div key={product.slug} className="border-b border-r border-border">
                  <ProductCardGrid product={product} />
                </div>
              ))}
            </div>

            {/* View More */}
            {hasMore && (
              <div className="flex justify-center py-12">
                <button
                  onClick={() => showMore(section.name, section.products.length)}
                  className="rounded-full border border-border px-10 py-3 text-[0.75rem] tracking-widest uppercase transition-colors hover:bg-secondary"
                >
                  View More
                </button>
              </div>
            )}

            {sections.indexOf(section) < sections.length - 1 && (
              <div className="border-t border-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}
