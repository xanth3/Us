import Image from "next/image";
import type { ProductImage } from "@/types/product";

interface Props {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: Props) {
  const primary = images[0];
  const secondary = images.slice(1);

  return (
    <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden bg-neutral-100">
      {primary && (
        <div className="relative h-full w-full">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-center"
          />
        </div>
      )}
      {secondary.length > 0 && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          {secondary.map((img, i) => (
            <div key={i} className="relative h-16 w-16 overflow-hidden border border-white/40">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="64px"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
