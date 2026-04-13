"use client";

import { AddToCartButton } from "./AddToCartButton";
import { ReadMore } from "./ReadMore";
import { WishlistButton } from "./WishlistButton";
import { Accordion } from "./Accordion";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export function SheetContent({ product }: Props) {
  return (
    <div className="px-6 py-10 sm:px-8 sm:py-16">
      {/* SKU + Wishlist (desktop only) */}
      <div className="mb-6 flex items-start justify-between hidden sm:flex">
        <span className="text-xs tracking-wider text-muted-foreground">{product.ref}</span>
        <WishlistButton
          slug={product.slug}
          productName={product.name}
          productImage={product.images[0]?.src}
        />
      </div>

      {/* Kicker (desktop only - shown in teaser on mobile) */}
      <p className="mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hidden sm:block">
        {product.kicker}
      </p>

      {/* Name (desktop only - shown in teaser on mobile) */}
      <h1 className="product-title mb-1 text-2xl hidden sm:block">{product.name}</h1>

      {/* Price (desktop only - shown in teaser on mobile) */}
      <p className="mb-8 text-base text-foreground hidden sm:block">${product.price.toFixed(2)}</p>

      {/* Sizes */}
      <div className="mb-8">
        <label className="block text-xs font-medium uppercase tracking-[0.15em] mb-3">
          Size
        </label>
        <div className="flex gap-3">
          {[
            { size: "100ML - 3.4 FL.OZ", value: "100ml" },
            { size: "200ML - 6.8 FL.OZ", value: "200ml" },
          ].map(({ size, value }) => (
            <button
              key={value}
              className="flex-1 border border-border rounded px-3 py-3 text-xs font-medium tracking-wide transition-all hover:border-foreground hover:bg-secondary"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Engraving card */}
      <div className="engraving-card mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.serviceOffer.icon}
          alt={product.serviceOffer.title}
          className="h-12 w-12 object-contain"
          loading="lazy"
          width={48}
          height={48}
        />
        <div>
          <p className="cursor-pointer text-sm font-medium underline underline-offset-2">
            {product.serviceOffer.title}
          </p>
          <p className="text-xs" style={{ color: "hsl(var(--engraving-accent))" }}>
            {product.serviceOffer.subtitle}
          </p>
          <p className="text-xs text-muted-foreground">{product.serviceOffer.description}</p>
        </div>
      </div>

      {/* Primary CTA */}
      <AddToCartButton product={product} />

      {/* Contact */}
      <p className="mb-8 mt-4 cursor-pointer text-center text-sm underline underline-offset-2 transition-opacity hover:opacity-60">
        Contact an Advisor
      </p>

      {/* Delivery copy */}
      <div className="mb-8">
        <ReadMore lines={product.deliveryCopy} previewCount={1} />
      </div>

      {/* Read more */}
      <div className="mb-2 border-t border-border pt-4">
        <button className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60">
          Read more
        </button>
      </div>

      {/* Accordions */}
      {product.faqs.map((faq) => (
        <Accordion key={faq.title} title={faq.title} indicator={faq.indicator}>
          {faq.content}
        </Accordion>
      ))}
    </div>
  );
}
