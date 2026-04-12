import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight, Plus, Heart } from "lucide-react";
import { CATALOG, CATALOG_SLUGS, FANTASMAGORY_RECS, type CatalogSlug } from "@/lib/catalog";
import { Accordion } from "@/components/Accordion";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ReadMore } from "@/components/ReadMore";
import { RecommendationsCarousel } from "@/components/RecommendationsCarousel";
import { StickyCartBar } from "@/components/StickyCartBar";
import { WishlistButton } from "@/components/WishlistButton";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return CATALOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = CATALOG[params.slug as CatalogSlug];
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: `${product.kicker} — $${product.price.toFixed(2)}`,
  };
}

export default function ProductPage({ params }: Props) {
  const product = CATALOG[params.slug as CatalogSlug];
  if (!product) notFound();

  const recs = (params.slug === "fantasmagory" ? FANTASMAGORY_RECS : CATALOG_SLUGS.filter((s) => s !== params.slug))
    .map((s) => CATALOG[s])
    .filter(Boolean);

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {/* LEFT — scrollable stacked images */}
        <div className="relative lg:w-[55%] xl:w-[60%]">
          <button
            className="absolute left-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm transition-opacity hover:opacity-70"
            aria-label="Back"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex flex-col">
            {product.images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="h-auto w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                width={1536}
                height={1920}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — sticky product info rail */}
        <div className="lg:w-[45%] xl:w-[40%]">
          <div className="lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:overflow-y-auto">
            <div className="px-8 py-10 xl:px-16 lg:py-16">
              {/* SKU + Wishlist */}
              <div className="mb-6 flex items-start justify-between">
                <span className="text-xs tracking-wider text-muted-foreground">{product.ref}</span>
                <WishlistButton slug={product.slug} />
              </div>

              {/* Kicker */}
              <p className="mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {product.kicker}
              </p>

              {/* Name */}
              <h1 className="product-title mb-1 text-2xl">{product.name}</h1>

              {/* Price */}
              <p className="mb-8 text-base text-foreground">${product.price.toFixed(2)}</p>

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
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <RecommendationsCarousel products={recs} />

      {/* Sticky cart bar */}
      <StickyCartBar product={product} />
    </>
  );
}
