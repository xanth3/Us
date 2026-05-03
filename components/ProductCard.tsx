import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { WishlistButton } from "./WishlistButton";
import { DragLiftLink } from "./DragLiftLink";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const img = product.images[0];

  return (
    <DragLiftLink
      href={`/products/${product.slug}`}
      className="group relative flex flex-col bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            className="cursor-grab object-cover object-center transition-transform duration-500 active:cursor-grabbing group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      {/* Meta */}
      <div className="p-3">
        <p className="font-display text-sm leading-5">{product.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </DragLiftLink>
  );
}
