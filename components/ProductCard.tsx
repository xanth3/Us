import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { WishlistButton } from "./WishlistButton";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const img = product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col bg-neutral-100"
    >
      {/* Wishlist */}
      <div className="absolute right-3 top-3 z-10">
        <WishlistButton slug={product.slug} />
      </div>

      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-neutral-200" />
        )}
      </div>

      {/* Meta */}
      <div className="p-3">
        <p className="font-playfair text-sm">{product.name}</p>
        <p className="mt-0.5 text-xs text-brand-muted">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
