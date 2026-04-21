import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { CATALOG, CATALOG_SLUGS, FANTASMAGORY_RECS, type CatalogSlug } from "@/lib/catalog";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";
import { SheetContent } from "@/components/SheetContent";
import { MobilePDPSheet } from "@/components/MobilePDPSheet";
import { DesktopImageFade } from "@/components/DesktopImageFade";

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

      {/* ===== MOBILE LAYOUT (< 640px): LV-style draggable sheet over hero ===== */}
      <MobilePDPSheet product={product} recommendations={recs} />

      {/* ===== DESKTOP LAYOUT (≥ 640px): two-column, natural scroll with per-image fade ===== */}
      <div
        className="hidden sm:flex sm:flex-col lg:flex-row"
        style={{ marginTop: "calc(-60px - var(--safe-area-inset-top, 0px))" }}
      >
        {/* LEFT — image column, each image fades in as it enters view */}
        <div className="relative lg:w-[55%] xl:w-[60%]">
          <Link
            href="/perfumes"
            className="group absolute left-6 top-[90px] z-20 flex items-center gap-1 text-white transition-opacity hover:opacity-60"
            aria-label="Back to All Perfumes"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.8rem] tracking-wide transition-all duration-300 group-hover:max-w-[220px]">
              Perfumes and Beauty — All Perfumes
            </span>
          </Link>

          <div className="flex flex-col">
            {product.images.map((img, i) => (
              <DesktopImageFade key={i} className="relative overflow-hidden lg:h-screen">
                {/* Gradient on first image only — keeps white navbar text legible on landing */}
                {i === 0 && (
                  <div className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/30 to-transparent" />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-auto w-full object-cover lg:h-full"
                  loading={i === 0 ? "eager" : "lazy"}
                  width={1536}
                  height={1920}
                />
              </DesktopImageFade>
            ))}
          </div>
        </div>

        {/* RIGHT — sticky product info sidebar (padding compensates for the negative margin on the row) */}
        <div
          className="lg:w-[45%] xl:w-[40%]"
          style={{ paddingTop: "calc(60px + var(--safe-area-inset-top, 0px))" }}
        >
          <div className="lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:overflow-y-auto">
            <SheetContent product={product} recommendations={recs} />
          </div>
        </div>
      </div>
    </>
  );
}
