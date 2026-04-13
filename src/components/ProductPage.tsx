import { Heart, ChevronLeft, Plus, ChevronRight } from "lucide-react";
import perfumeHero from "@/assets/perfume-hero.jpg";
import perfumeDetail from "@/assets/perfume-detail.jpg";
import perfumeLifestyle from "@/assets/perfume-lifestyle.jpg";
import perfumeThumb from "@/assets/perfume-thumb.png";

const images = [perfumeHero, perfumeDetail, perfumeLifestyle];

const ProductPage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left: Scrollable Images */}
      <div className="lg:w-[55%] xl:w-[60%] relative">
        <button
          className="absolute top-6 left-6 z-10 bg-background rounded-full w-10 h-10 flex items-center justify-center shadow-sm hover:opacity-70 transition-opacity"
          aria-label="Back"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex flex-col">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Product view ${i + 1}`}
              className="w-full h-auto object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              width={1536}
              height={1920}
            />
          ))}
        </div>
      </div>

      {/* Right: Sticky Product Info */}
      <div className="lg:w-[45%] xl:w-[40%]">
        <div className="lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-16 py-8 sm:py-10 lg:py-16">
            {/* SKU + Wishlist */}
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs text-muted-foreground tracking-wider">LP0429</span>
              <button className="hover:opacity-60 transition-opacity" aria-label="Add to wishlist">
                <Heart size={20} className="text-foreground" />
              </button>
            </div>

            {/* Product Info */}
            <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase mb-2">
              Personalizable & Refillable
            </p>
            <h1 className="product-title text-2xl mb-1">Fantasmagory</h1>
            <p className="text-base text-foreground mb-8">$595.00</p>

            {/* Engraving */}
            <div className="engraving-card mb-8">
              <img
                src={perfumeThumb}
                alt="Bottle engraving"
                className="w-12 h-12 object-contain"
                loading="lazy"
                width={48}
                height={48}
              />
              <div>
                <p className="text-sm font-medium underline underline-offset-2 cursor-pointer">
                  Bottle Engraving
                </p>
                <p className="text-xs" style={{ color: 'hsl(var(--engraving-accent))' }}>
                  Complimentary
                </p>
                <p className="text-xs text-muted-foreground">With your initials or numbers</p>
              </div>
            </div>

            {/* CTA */}
            <button className="btn-cart mb-4">Place in Cart</button>

            <p className="text-center text-sm underline underline-offset-2 cursor-pointer hover:opacity-60 transition-opacity mb-8">
              Contact an Advisor
            </p>

            <p className="text-xs text-muted-foreground mb-2">
              Complimentary Standard Delivery or Collect-in-Store.
            </p>
            <p className="text-xs text-muted-foreground mb-8">
              Available exclusively on us.com and in selected Us stores.
            </p>

            {/* Read more */}
            <div className="border-t border-border pt-4 mb-2">
              <button className="text-sm font-medium underline underline-offset-4 hover:opacity-60 transition-opacity">
                Read more
              </button>
            </div>

            {/* Expandable Sections */}
            <div className="section-divider">
              <span className="text-sm">Find in Store</span>
              <Plus size={16} />
            </div>
            <div className="section-divider">
              <span className="text-sm">Delivery & Returns</span>
              <ChevronRight size={16} />
            </div>
            <div className="section-divider">
              <span className="text-sm">Gifting</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
