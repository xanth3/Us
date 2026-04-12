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
    <div>
      {/* ── Sticky filter bar ─────────────────────────────── */}
      <div className="sticky top-[65px] z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur-sm sm:px-6">
        <button className="flex items-center gap-1.5 text-[0.8rem] tracking-wide transition-opacity hover:opacity-60">
          <span className="font-medium">All Perfumes</span>
          <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[0.75rem] tracking-wide transition-colors hover:bg-secondary">
          <SlidersHorizontal size={13} />
          <span>Filters</span>
        </button>
      </div>

      {/* ── Sections ──────────────────────────────────────── */}
      {sections.map((section) => {
        const visible = visibleCounts[section.name] ?? INITIAL_VISIBLE;
        const hasMore = visible < section.products.length;

        return (
          <div key={section.name}>
            {/* Hero banner */}
            <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={section.heroImage}
                alt={section.heroTitle}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-12 text-white sm:max-w-lg">
                <h2
                  className="text-3xl font-light leading-snug sm:text-4xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.heroTitle}
                </h2>
                {section.heroSubtitle && (
                  <p className="mt-3 text-sm leading-relaxed opacity-90">{section.heroSubtitle}</p>
                )}
                <a
                  href="#"
                  className="mt-5 w-fit border-b border-white/60 pb-0.5 text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-70"
                >
                  Discover More
                </a>
              </div>
            </div>

            {/* Edge-to-edge product grid */}
            <div className="grid grid-cols-4 gap-0">
              {section.products.slice(0, visible).map((product) => (
                <ProductCardGrid key={product.slug} product={product} />
              ))}
            </div>

            {/* View More */}
            {hasMore && (
              <div className="flex justify-center py-10">
                <button
                  onClick={() => showMore(section.name, section.products.length)}
                  className="rounded-full border border-border px-10 py-3 text-[0.8rem] tracking-widest uppercase transition-colors hover:bg-secondary"
                >
                  View More
                </button>
              </div>
            )}

            {/* Section divider (between collections) */}
            {sections.indexOf(section) < sections.length - 1 && (
              <div className="border-t border-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}
