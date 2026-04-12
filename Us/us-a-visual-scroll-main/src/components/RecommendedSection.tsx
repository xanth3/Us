import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import productSymphony from "@/assets/product-symphony.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
import productStellar from "@/assets/product-stellar.jpg";
import productPalette from "@/assets/product-palette.jpg";

const products = [
  { name: "Symphony", price: "$595.00", image: productSymphony },
  { name: "Us Rouge - Satin Lipstick", price: "$160.00", image: productLipstick },
  { name: "Stellar Times", price: "$595.00", image: productStellar },
  { name: "Us Ombres - Eyeshadow Palette", price: "$250.00", image: productPalette },
];

const RecommendedSection = () => {
  const [activeTab, setActiveTab] = useState<"recommended" | "recent">("recommended");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -350 : 350, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 px-6">
      {/* Tabs */}
      <div className="flex gap-8 mb-8 px-2">
        <button
          onClick={() => setActiveTab("recommended")}
          className={`text-sm tracking-wide pb-1 transition-opacity ${
            activeTab === "recommended"
              ? "underline underline-offset-4 font-medium"
              : "text-muted-foreground hover:opacity-70"
          }`}
        >
          Recommended for You
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={`text-sm tracking-wide pb-1 transition-opacity ${
            activeTab === "recent"
              ? "underline underline-offset-4 font-medium"
              : "text-muted-foreground hover:opacity-70"
          }`}
        >
          Recently Viewed
        </button>
      </div>

      {/* Product Grid */}
      <div className="relative">
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {products.map((product, i) => (
            <div key={i} className="min-w-[280px] flex-1 group cursor-pointer">
              <div className="relative bg-secondary aspect-[4/5] mb-3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={768}
                  height={960}
                />
                <button
                  className="absolute top-3 right-3 hover:opacity-60 transition-opacity"
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} className="text-foreground" />
                </button>
              </div>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.price}</p>
            </div>
          ))}
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-[40%] -translate-y-1/2 bg-background/80 rounded-full w-9 h-9 flex items-center justify-center shadow hover:opacity-70 transition-opacity"
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-[40%] -translate-y-1/2 bg-background/80 rounded-full w-9 h-9 flex items-center justify-center shadow hover:opacity-70 transition-opacity"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default RecommendedSection;
