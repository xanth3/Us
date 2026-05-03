import Link from "next/link";
import { CATALOG, MENS_READY_TO_WEAR_SLUGS } from "@/lib/catalog";
import { ProductCardGrid } from "@/components/ProductCardGrid";

const CATEGORIES = [
  { label: "Perfumes", href: "/perfumes", img: "/assets/heritage/fames-full-ghorm-clear.png" },
  { label: "Men's Ready to Wear", href: "#mens-ready-to-wear", img: "/assets/outerwear/fames-black-hoodie.png" },
];

export default function HomePage() {
  const mensReadyToWear = MENS_READY_TO_WEAR_SLUGS.map((s) => CATALOG[s]);

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
          src="/assets/heritage/fames-bad-blood-hero.png"
          alt="Flight Mode Collection"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        {/* Gradient ensures white navbar text is always legible */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 text-center text-primary-foreground">
          <p className="mb-2 text-xs uppercase tracking-[0.3em]">New</p>
          <h1
            className="mb-6 text-4xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Flight Mode Collection
          </h1>
          <Link
            href="/perfumes"
            className="inline-flex min-h-[44px] items-center justify-center border border-primary-foreground px-8 py-2.5 text-xs tracking-widest transition-colors hover:bg-primary-foreground hover:text-primary active:opacity-80"
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
                  className="h-full w-full cursor-grab object-cover transition-transform duration-500 active:cursor-grabbing group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-center text-xs tracking-wide">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── New Bags for Her ─────────────────────────────────────────────────── */}
      <section id="mens-ready-to-wear" className="px-8 pb-16">
        <h2
          className="mb-10 text-center text-2xl font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Men&apos;s Ready to Wear
        </h2>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-4 gap-y-8">
          {mensReadyToWear.map((product, index) => (
            <ProductCardGrid
              key={product.slug}
              product={product}
              isFirst={index === 0}
              overlayInfoOnHover
            />
          ))}
        </div>
      </section>

    </>
  );
}
