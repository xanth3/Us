import Link from "next/link";
import { CATALOG, FEATURED_SLUGS } from "@/lib/catalog";
import { WishlistButton } from "@/components/WishlistButton";

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

      {/* Featured grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>
          Featured
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group relative flex flex-col bg-secondary"
            >
              <div className="absolute right-3 top-3 z-10">
                <WishlistButton slug={product.slug} />
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[0]?.src ?? ""}
                  alt={product.images[0]?.alt ?? product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
