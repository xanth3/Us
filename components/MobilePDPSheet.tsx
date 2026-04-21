"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DraggableSheet, type SnapPoint } from "./DraggableSheet";
import { SheetTeaser } from "./SheetTeaser";
import { SheetContent } from "./SheetContent";
import { RecommendationsCarousel } from "./RecommendationsCarousel";
import { WishlistButton } from "./WishlistButton";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  recommendations: Product[];
}

export function MobilePDPSheet({ product, recommendations }: Props) {
  const [index, setIndex] = useState(0);
  const [snap, setSnap] = useState<SnapPoint>("peek");
  const heroRef = useRef<HTMLDivElement>(null);
  const yRef = useRef(0);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const update = () => setVh(window.visualViewport?.height ?? window.innerHeight);
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  const prev = () => setIndex((i) => (i === 0 ? product.images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === product.images.length - 1 ? 0 : i + 1));

  const current = product.images[index];

  const handleY = (v: number) => {
    yRef.current = v;
    if (!heroRef.current || vh <= 0) return;
    // Normalize: 1 when sheet is at peek (yPeek ~ vh - 148), 0 when at full.
    const peekY = vh - 148;
    const fullY = vh - Math.round(vh * 0.94);
    const t = Math.min(1, Math.max(0, (v - fullY) / (peekY - fullY)));
    // As sheet rises (t → 0), scale image up subtly and darken.
    const scale = 1 + (1 - t) * 0.06;
    const darken = (1 - t) * 0.35;
    heroRef.current.style.transform = `scale(${scale})`;
    heroRef.current.style.setProperty("--hero-overlay", darken.toFixed(3));
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-black sm:hidden"
      style={{
        height: "100dvh",
        marginTop: "calc(-60px - var(--safe-area-inset-top, 0px))",
      }}
    >
      {/* Hero image — fills viewport, scales with sheet position */}
      <div
        ref={heroRef}
        className="absolute inset-0 origin-center transition-transform duration-100 ease-out will-change-transform"
      >
        {current && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="h-full w-full object-cover"
            loading="eager"
            width={1536}
            height={1920}
          />
        )}
        {/* Darken overlay driven by --hero-overlay (set inline above) */}
        <div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: "var(--hero-overlay, 0)" }}
        />
        {/* Top gradient keeps chrome legible */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* Back + wishlist chrome — floats over hero */}
      <Link
        href="/perfumes"
        aria-label="Back to All Perfumes"
        className="absolute left-4 top-[88px] z-20 text-white transition-opacity active:opacity-60"
      >
        <ChevronLeft size={22} strokeWidth={1.5} />
      </Link>
      <div className="absolute right-4 top-[88px] z-20">
        <WishlistButton
          slug={product.slug}
          className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
        />
      </div>

      {/* Image paging — hidden once sheet rises past peek */}
      {product.images.length > 1 && snap === "peek" && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 p-2 text-white transition-opacity active:opacity-50"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 p-2 text-white transition-opacity active:opacity-50"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
          <div
            className="absolute left-1/2 z-20 flex -translate-x-1/2 gap-1.5"
            style={{ bottom: "calc(148px + 16px + env(safe-area-inset-bottom, 0px))" }}
          >
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Image ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* The sheet itself */}
      <DraggableSheet
        initial="peek"
        peekPx={148}
        midRatio={0.55}
        fullRatio={0.94}
        onSnapChange={setSnap}
        yValueRef={handleY}
        header={<SheetTeaser product={product} />}
      >
        <SheetContent product={product} recommendations={[]} />

        {/* Remaining images inside the sheet body */}
        {product.images.slice(1).map((img, i) => (
          <div key={i} className="w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-auto w-full object-cover"
              loading="lazy"
              width={1536}
              height={1920}
            />
          </div>
        ))}

        {recommendations.length > 0 && (
          <RecommendationsCarousel products={recommendations} />
        )}
        <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </DraggableSheet>
    </div>
  );
}
