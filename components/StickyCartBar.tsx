"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  /** id of the primary CTA element — bar hides while it's in the viewport */
  ctaId: string;
}

export function StickyCartBar({ product, ctaId }: Props) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const el = document.getElementById(ctaId);
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ctaId]);

  if (!visible) return null;

  const img = product.images[0];

  function handleClick() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      imageSrc: img?.src ?? "",
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-brand-border bg-white px-6 py-3 shadow-lg">
      {/* Left: thumbnail + name + price */}
      <div className="flex items-center gap-3">
        {img && (
          <div className="relative h-10 w-10 flex-none overflow-hidden bg-neutral-100">
            <Image src={img.src} alt={img.alt} fill sizes="40px" className="object-cover" />
          </div>
        )}
        <div>
          <p className="font-playfair text-sm">{product.name}</p>
          <p className="text-xs text-brand-muted">{formatPrice(product.price, product.currency)}</p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleClick}
        className="bg-brand-black px-8 py-3 text-xs font-semibold tracking-[0.2em] text-white transition-opacity hover:opacity-80"
      >
        PLACE IN CART
      </button>
    </div>
  );
}
