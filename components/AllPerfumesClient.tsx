"use client";

import { useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
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

  const [collectionFilter, setCollectionFilter] = useState("All Perfumes");
  const [drawerOpen, setDrawerOpen]             = useState(false);
  const [dropdownOpen, setDropdownOpen]         = useState(false);
  const [pendingBadges, setPendingBadges]       = useState<string[]>([]);
  const [activeBadges, setActiveBadges]         = useState<string[]>([]);

  // Derived: filter sections by collection, then filter products within by badge
  const filteredSections = sections
    .filter((s) => collectionFilter === "All Perfumes" || s.name === collectionFilter)
    .map((s) => ({
      ...s,
      products:
        activeBadges.length === 0
          ? s.products
          : s.products.filter((p) => p.badge !== undefined && activeBadges.includes(p.badge)),
    }))
    .filter((s) => s.products.length > 0);

  // Reset pagination whenever active filters change
  useEffect(() => {
    setVisibleCounts(Object.fromEntries(sections.map((s) => [s.name, INITIAL_VISIBLE])));
  }, [collectionFilter, activeBadges, sections]);

  const showMore = (sectionName: string, total: number) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [sectionName]: Math.min((prev[sectionName] ?? INITIAL_VISIBLE) + 4, total),
    }));
  };

  // Drawer helpers
  const openDrawer = () => {
    setPendingBadges(activeBadges);
    setDropdownOpen(false);
    setDrawerOpen(true);
  };
  const closeDrawer  = () => setDrawerOpen(false);
  const applyFilters = () => { setActiveBadges(pendingBadges); setDrawerOpen(false); };
  const clearAll     = () => { setPendingBadges([]); setActiveBadges([]); setDrawerOpen(false); };
  const togglePendingBadge = (b: string) =>
    setPendingBadges((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );

  return (
    <div>
      {/* ── Sticky filter bar ─────────────────────────────── */}
      <div className="sticky top-[65px] z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur-sm sm:px-6">

        {/* Left: Collection dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-1.5 text-[0.8rem] tracking-wide transition-opacity hover:opacity-60"
          >
            <span className="font-medium">{collectionFilter}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Invisible backdrop to close dropdown on outside click */}
          {dropdownOpen && (
            <div
              className="fixed inset-0 z-30"
              aria-hidden="true"
              onClick={() => setDropdownOpen(false)}
            />
          )}

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[160px] border border-border bg-background py-1 shadow-lg">
              {["All Perfumes", ...sections.map((s) => s.name)].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    setCollectionFilter(label);
                    setDropdownOpen(false);
                  }}
                  className={`block w-full px-4 py-2.5 text-left text-[0.78rem] tracking-wide transition-colors hover:bg-secondary ${
                    collectionFilter === label ? "font-medium" : "font-normal"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Filters button with active-count badge */}
        <button
          onClick={openDrawer}
          className="relative flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[0.75rem] tracking-wide transition-colors hover:bg-secondary"
        >
          <SlidersHorizontal size={13} />
          <span>Filters</span>
          {activeBadges.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[0.6rem] font-medium text-background">
              {activeBadges.length}
            </span>
          )}
        </button>
      </div>

      {/* ── Sections ──────────────────────────────────────── */}
      {filteredSections.map((section, sIdx) => {
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
              {section.products.slice(0, visible).map((product, pIdx) => (
                <ProductCardGrid
                  key={product.slug}
                  product={product}
                  autoAdvance={sIdx === 0 && pIdx === 0}
                />
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
            {sIdx < filteredSections.length - 1 && (
              <div className="border-t border-border" />
            )}
          </div>
        );
      })}

      {/* ── Empty state ───────────────────────────────────── */}
      {filteredSections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-sm tracking-wide text-muted-foreground">
            No products match the selected filters.
          </p>
          <button
            onClick={clearAll}
            className="mt-4 text-[0.75rem] tracking-widest uppercase underline underline-offset-2 transition-opacity hover:opacity-60"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* ── Filter drawer backdrop ─────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Filter drawer panel ───────────────────────────── */}
      <div
        role="dialog"
        aria-label="Filter options"
        className={`fixed right-0 top-0 z-[70] flex h-full w-[320px] flex-col bg-background shadow-xl transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <span className="text-[0.85rem] font-medium tracking-widest uppercase">Filters</span>
          <button
            onClick={closeDrawer}
            aria-label="Close filters"
            className="transition-opacity hover:opacity-60"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable filter body */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div>
            <p className="mb-3 text-[0.72rem] tracking-widest uppercase text-muted-foreground">
              Badge
            </p>
            <div className="space-y-3">
              {(["NEW", "ICON"] as const).map((badge) => (
                <label key={badge} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={pendingBadges.includes(badge)}
                    onChange={() => togglePendingBadge(badge)}
                    className="h-3.5 w-3.5 cursor-pointer accent-foreground"
                  />
                  <span className="text-[0.8rem] tracking-wide">{badge}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={clearAll}
              className="flex-1 py-3 text-[0.75rem] tracking-widest uppercase transition-opacity hover:opacity-60"
            >
              Clear All
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 bg-foreground py-3 text-[0.75rem] tracking-widest uppercase text-background transition-opacity hover:opacity-80"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
