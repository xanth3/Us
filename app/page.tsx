import Image from "next/image";
import Link from "next/link";
import { CATALOG, FEATURED_SLUGS } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { WishlistButton } from "@/components/WishlistButton";

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((s) => CATALOG[s]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[80vh] items-end bg-neutral-100">
        {/* Background image — user drops assets/hero.jpg */}
        <div className="absolute inset-0">
          <Image
            src="/assets/hero.jpg"
            alt="Us luxury hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 px-8 pb-16 text-white">
          <p className="mb-1 text-xs tracking-[0.3em] uppercase">New Collection</p>
          <h2 className="font-playfair text-5xl font-normal leading-tight">
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
        <h2 className="mb-8 font-playfair text-2xl font-normal">Featured</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featured.map((product) => {
            const img = product.images[0];
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative flex flex-col bg-neutral-100"
              >
                {/* Wishlist */}
                <div className="absolute right-3 top-3 z-10">
                  <WishlistButton slug={product.slug} />
                </div>

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {img ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-200" />
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="font-playfair text-sm">{product.name}</p>
                  <p className="mt-0.5 text-xs text-brand-muted">
                    {formatPrice(product.price, product.currency)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
