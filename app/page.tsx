import Link from "next/link";
import { CATALOG, NEW_BAGS_FOR_HER_SLUGS } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { WishlistButton } from "@/components/WishlistButton";

const CATEGORIES = [
  { label: "Women's Bags",                href: "/", img: "/assets/perfume-lifestyle.jpg" },
  { label: "Women's Small Leather Goods", href: "/", img: "/assets/perfume-detail.jpg"    },
  { label: "Women's Accessories",         href: "/", img: "/assets/product-palette.jpg"   },
  { label: "Women's Shoes",               href: "/", img: "/assets/product-stellar.jpg"   },
  { label: "Men's Bags",                  href: "/", img: "/assets/product-symphony.jpg"  },
  { label: "Men's Small Leather Goods",   href: "/", img: "/assets/product-lipstick.jpg" },
  { label: "Men's Shoes",                 href: "/", img: "/assets/perfume-hero.jpg"      },
  { label: "Perfumes",                    href: "/perfumes", img: "/assets/perfume-thumb.png" },
];

export default function HomePage() {
  const bags = NEW_BAGS_FOR_HER_SLUGS.map((s) => CATALOG[s]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      {/* Negative margin cancels the layout's pt-[60px+safe-area] so the image
          sits flush behind the transparent header instead of leaving a white gap */}
      <section
        className="relative h-screen"
        style={{ marginTop: "calc(-60px - var(--safe-area-inset-top, 0px))" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/perfume-hero.jpg"
          alt="Flight Mode Collection"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        {/* Gradient ensures white navbar text is always legible */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 text-center text-white">
          <p className="mb-2 text-xs uppercase tracking-[0.3em]">New</p>
          <h1
            className="mb-6 text-4xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Flight Mode Collection
          </h1>
          <Link
            href="/perfumes"
            className="border border-white px-8 py-2.5 text-xs tracking-widest transition-colors hover:bg-white hover:text-black"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* ── Shop by Category ─────────────────────────────────────────────────── */}
      <section className="px-8 py-16">
        <h2
          className="mb-10 text-center text-2xl font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} href={cat.href} className="group flex flex-col">
              <div className="aspect-square overflow-hidden bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-center text-xs tracking-wide">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── New Bags for Her ─────────────────────────────────────────────────── */}
      <section className="px-8 pb-16">
        <h2
          className="mb-10 text-center text-2xl font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          New Bags for Her
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
          {bags.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group relative flex flex-col"
            >
              {/* Wishlist */}
              <div className="absolute right-0 top-0 z-10">
                <WishlistButton
                  slug={product.slug}
                  productName={product.name}
                  productImage={product.images[0]?.src}
                />
              </div>

              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="mt-3">
                <p className="text-sm tracking-wide">{product.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {formatPrice(product.price, product.currency)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Shop Now pill button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/perfumes"
            className="rounded-full border border-foreground px-8 py-2.5 text-xs tracking-widest transition-colors hover:bg-foreground hover:text-white"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
