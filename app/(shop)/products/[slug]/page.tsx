import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { CATALOG, CATALOG_SLUGS, FANTASMAGORY_REC_SLUGS, type CatalogSlug } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { ProductGallery } from "@/components/ProductGallery";
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
    description: `${product.kicker} — ${formatPrice(product.price, product.currency)}`,
  };
}

export default function ProductPage({ params }: Props) {
  const product = CATALOG[params.slug as CatalogSlug];
  if (!product) notFound();

  const recommendations = FANTASMAGORY_REC_SLUGS.filter((s) => s !== params.slug).map(
    (s) => CATALOG[s],
  );

  return (
    <>
      {/* Two-column PDP layout */}
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* LEFT — sticky full-bleed image */}
        <div className="lg:w-[60%]">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* RIGHT — product rail */}
        <div className="flex flex-col bg-white px-8 py-8 lg:w-[40%] lg:px-12 lg:py-10">
          {/* Ref + wishlist row */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs tracking-widest text-brand-muted">{product.ref}</span>
            <WishlistButton slug={product.slug} />
          </div>

          {/* Kicker */}
          <p className="mb-1 text-[10px] font-semibold tracking-[0.25em] text-brand-gold uppercase">
            {product.kicker}
          </p>

          {/* Name */}
          <h1 className="mb-2 font-playfair text-3xl font-normal">{product.name}</h1>

          {/* Price */}
          <p className="mb-6 text-sm">{formatPrice(product.price, product.currency)}</p>

          {/* Service offer card */}
          <div className="mb-6 flex items-start gap-3 border border-brand-border p-4">
            <div className="relative h-12 w-12 flex-none overflow-hidden bg-neutral-100">
              <Image
                src={product.serviceOffer.icon}
                alt={product.serviceOffer.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs underline underline-offset-2">{product.serviceOffer.title}</p>
              <p className="text-xs text-brand-gold">{product.serviceOffer.subtitle}</p>
              <p className="text-xs text-brand-muted">{product.serviceOffer.description}</p>
            </div>
          </div>

          {/* Primary CTA — StickyCartBar watches this element via id */}
          <div id="primary-cta">
            <AddToCartButton product={product} />
          </div>

          {/* Secondary action */}
          <div className="mt-3 text-center">
            <a href="mailto:advisor@us.com" className="text-xs underline underline-offset-2">
              Contact an Advisor
            </a>
          </div>

          {/* Delivery copy */}
          <div className="mt-6">
            <ReadMore lines={product.deliveryCopy} previewCount={1} />
          </div>

          {/* Accordions */}
          <div className="mt-8">
            {product.faqs.map((faq) => (
              <Accordion key={faq.title} title={faq.title} indicator={faq.indicator}>
                {faq.content}
              </Accordion>
            ))}
            {/* Close bottom border */}
            <div className="border-t border-brand-border" />
          </div>
        </div>
      </div>

      {/* Recommendations carousel (below fold) */}
      <RecommendationsCarousel recommended={recommendations} />

      {/* Sticky cart bar (client) — reveals when primary CTA scrolls out of view */}
      <StickyCartBar product={product} ctaId="primary-cta" />
    </>
  );
}
