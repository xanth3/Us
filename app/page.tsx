import Link from "next/link";
import { CATALOG, FEATURED_SLUGS } from "@/lib/catalog";
import { ProductCardGrid } from "@/components/ProductCardGrid";

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((s) => CATALOG[s]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[80vh] items-end bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/perfume-hero.jpg"
          alt="Us luxury hero"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 px-8 pb-16 text-white">
          <p className="mb-1 text-xs uppercase tracking-[0.3em]">New Collection</p>
          <h2 className="text-5xl font-light" style={{ fontFamily: "var(--font-display)" }}>
            The Art of
            <br />
            Fantasmagory
          </h2>
          <Link
            href="/products/fantasmagory"
            className="mt-6 inline-block border border-white px-8 py-3 text-xs tracking-widest transition-colors hover:bg-white hover:text-black"
          >
            DISCOVER NOW
          </Link>
        </div>
      </section>

      {/* Featured grid — 2 columns mobile, 4 columns desktop, edge-to-edge, no gaps */}
      <section>
        <div className="grid grid-cols-2 gap-0 sm:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCardGrid key={product.slug} product={product} isFirst={index === 0} />
          ))}
        </div>
      </section>
    </>
  );
}
