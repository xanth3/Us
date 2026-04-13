import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { CATALOG, CATALOG_SLUGS, FANTASMAGORY_RECS, type CatalogSlug } from "@/lib/catalog";
import { StickyCartBar } from "@/components/StickyCartBar";
import { ScrollSnapController } from "@/components/ScrollSnapController";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";
import { ProductDetailsSheet } from "@/components/ProductDetailsSheet";
import { SheetTeaser } from "@/components/SheetTeaser";
import { SheetContent } from "@/components/SheetContent";

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
      <RecentlyViewedTracker slug={product.slug} />
      <ScrollSnapController />
      <div className="flex flex-col lg:flex-row">
        {/* LEFT — scroll-snap image column */}
        <div className="relative lg:w-[55%] xl:w-[60%]">
          {/* Expandable back button — stays above the scroll */}
          <Link
            href="/perfumes"
            className="group absolute left-6 top-[90px] z-20 flex h-10 items-center overflow-hidden rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:pr-4"
            aria-label="Back to All Perfumes"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <ChevronLeft size={18} />
            </div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.8rem] tracking-wide transition-all duration-300 group-hover:max-w-[220px]">
              Perfumes and Beauty — All Perfumes
            </span>
          </Link>

          <div className="flex flex-col">
            {product.images.map((img, i) => (
              // Each image is a full-viewport snap section on large screens
              <div
                key={i}
                className="relative overflow-hidden lg:h-screen lg:snap-start"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-auto w-full object-cover lg:h-full"
                  loading={i === 0 ? "eager" : "lazy"}
                  width={1536}
                  height={1920}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — sticky product info rail (desktop) + animated sheet (mobile) */}
        {/* Mobile: Animated bottom sheet */}
        <div className="sm:hidden w-full">
          <ProductDetailsSheet product={product}>
            <SheetTeaser product={product} />
            <SheetContent product={product} recommendations={recs} />
          </ProductDetailsSheet>
        </div>

        {/* Desktop: Sticky sidebar */}
        <div className="hidden sm:block lg:w-[45%] xl:w-[40%]">
          <div className="lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:overflow-y-auto">
            <SheetContent product={product} recommendations={recs} />
          </div>
        </div>
      </div>

      {/* Sticky cart bar */}
      <StickyCartBar product={product} />
    </>
  );
}
