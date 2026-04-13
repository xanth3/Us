"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/types/product";

interface Props {
  children: React.ReactNode;
  product: Product;
}

export function ProductDetailsSheet({ children, product }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [sheetY, setSheetY] = useState(100);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Map scroll (0-400px) to sheet position (100-0%)
          // Start at bottom (translateY: 100%), move to top (translateY: 0%)
          const progress = Math.min(scrollY / 400, 1);
          setSheetY(100 - progress * 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Scrolling space to trigger sheet animation */}
      <div className="h-[600px] sm:h-0" />

      {/* Animated sheet container */}
      <div
        ref={sheetRef}
        style={{
          transform: `translateY(${sheetY}%)`,
          transition: "transform 0.1s ease-out",
          paddingBottom: "var(--safe-area-inset-bottom, 0)",
        }}
        className="fixed bottom-0 left-0 right-0 z-40 w-full max-h-[calc(100vh-60px)] overflow-hidden rounded-t-2xl bg-background shadow-2xl sm:static sm:rounded-none sm:shadow-none sm:max-h-none sm:overflow-visible sm:transform-none"
      >
        {/* Sheet content with internal scroll */}
        <div className="h-full overflow-y-auto sm:overflow-visible">
          {children}
        </div>
      </div>
    </div>
  );
}
