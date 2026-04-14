"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export function StickyCartBar({ product }: Props) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Find the visible in-page CTA button (the first one with a non-zero bounding rect)
    const buttons = Array.from(document.querySelectorAll<HTMLElement>("[data-pdp-cta]"));
    const target = buttons.find((btn) => btn.getBoundingClientRect().width > 0) ?? null;
    if (!target) return;

    ioRef.current = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px -40px 0px", threshold: 0 }
    );
    ioRef.current.observe(target);
    return () => ioRef.current?.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-border bg-background px-6 py-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.serviceOffer.icon}
          alt={product.name}
          className="h-10 w-10 object-contain"
          width={40}
          height={40}
        />
        <div>
          <p className="text-sm font-medium">{product.name}</p>
          <p className="text-xs text-muted-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        onClick={() =>
          addItem({
            slug: product.slug,
            name: product.name,
            price: product.price,
            currency: product.currency,
            imageSrc: product.serviceOffer.icon,
          })
        }
        className="bg-primary px-8 py-3 text-xs font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
      >
        Place in Cart
      </button>
    </div>
  );
}
