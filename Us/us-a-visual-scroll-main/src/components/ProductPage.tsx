import { Heart, Minus, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import perfumeThumb from "@/assets/perfume-thumb.png";
import { Checkbox } from "@/components/ui/checkbox";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(2);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    samples: false,
    gifting: false,
    packaging: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleSample = (sample: string) => {
    setSelectedSamples((prev) =>
      prev.includes(sample) ? prev.filter((s) => s !== sample) : [...prev, sample]
    );
  };

  return (
    <div className="w-full bg-background">
      {/* Mobile Layout - Stacked */}
      <div className="w-full px-6 py-8">
        {/* Cart Header */}
        <h1 className="text-xl font-medium mb-8">My Shopping Cart (2)</h1>

        {/* Product Card */}
        <div className="border border-border rounded mb-8 pb-6">
          {/* Product Image */}
          <div className="mb-4">
            <img
              src={perfumeThumb}
              alt="Ambre Levant"
              className="w-full h-64 object-cover"
              loading="eager"
              width={400}
              height={256}
            />
          </div>

          {/* Product Details */}
          <div className="px-6">
            {/* SKU + Wishlist */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-muted-foreground tracking-wider">LP0429</span>
              <button
                className="hover:opacity-60 transition-opacity"
                aria-label="Add to wishlist"
              >
                <Heart size={18} className="text-foreground" />
              </button>
            </div>

            {/* Product Name */}
            <h2 className="product-title text-lg mb-1">Ambre Levant</h2>

            {/* View Details Link */}
            <button className="text-xs text-muted-foreground underline underline-offset-2 hover:opacity-60 transition-opacity mb-3">
              View Details
            </button>

            {/* Size */}
            <p className="text-xs text-muted-foreground mb-4">Size: 100ML - 3.4 FL OZ</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs text-muted-foreground">Qty:</span>
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:opacity-60 transition-opacity"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-1 text-sm text-center min-w-[40px]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:opacity-60 transition-opacity"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Price */}
            <p className="text-lg font-medium mb-6">$880.00</p>
          </div>
        </div>

        {/* Sample Selection */}
        <div className="border-t border-border pt-6 mb-6">
          <button
            onClick={() => toggleSection("samples")}
            className="w-full flex items-center justify-between py-3"
          >
            <span className="text-base font-medium">Sample Selection</span>
            <span className="text-xs text-muted-foreground">Complimentary</span>
          </button>
          {expandedSections.samples && (
            <div className="pl-0 space-y-3">
              <p className="text-xs text-muted-foreground mb-3">
                Choose 2 optional complimentary samples
              </p>
              {["Sample 1", "Sample 2", "Sample 3"].map((sample) => (
                <div key={sample} className="flex items-center gap-3">
                  <Checkbox
                    id={sample}
                    checked={selectedSamples.includes(sample)}
                    onCheckedChange={() => toggleSample(sample)}
                  />
                  <label htmlFor={sample} className="text-sm cursor-pointer">
                    {sample}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gifting and Packaging */}
        <div className="border-t border-border pt-6 mb-6">
          <button
            onClick={() => toggleSection("gifting")}
            className="w-full flex items-center justify-between py-3"
          >
            <span className="text-base font-medium">Gifting and Packaging</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${
                expandedSections.gifting ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.gifting && (
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <Checkbox id="gift-message" />
                <label htmlFor="gift-message" className="text-sm cursor-pointer flex-1">
                  <div className="font-medium">Include a Gift Message</div>
                  <p className="text-xs text-muted-foreground">
                    Add a personal touch to your order
                  </p>
                </label>
              </div>
              <div className="flex items-start gap-3 border-t border-border pt-4">
                <Checkbox id="shopping-bag" />
                <label htmlFor="shopping-bag" className="text-sm cursor-pointer flex-1">
                  <div className="font-medium">Include a Shopping Bag</div>
                  <p className="text-xs text-muted-foreground">
                    Your bag preference may not be available
                  </p>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Signature Packaging */}
        <div className="border-t border-border pt-6 mb-8">
          <button
            onClick={() => toggleSection("packaging")}
            className="w-full flex items-center justify-between py-3"
          >
            <span className="text-base font-medium">Signature Packaging</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${
                expandedSections.packaging ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.packaging && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                Experience our signature packaging with every order
              </p>
            </div>
          )}
        </div>

        {/* Checkout Button */}
        <button className="btn-cart w-full py-4 mb-4">Proceed to Checkout</button>

        {/* Continue Shopping */}
        <button className="w-full py-4 border border-border text-center text-sm font-medium hover:opacity-60 transition-opacity">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
