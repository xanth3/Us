"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { ChevronDown, ChevronUp } from "lucide-react";

// Generate random 6-digit SKU
const generateSKU = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default function CheckoutPage() {
  const { items, clearCart, setCartDrawerOpen } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    samples: false,
    gifting: false,
  });
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [giftMessage, setGiftMessage] = useState("");
  const [includeGiftBag, setIncludeGiftBag] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal > 0 ? subtotal * 0.1 : 0; // 10% tax
  const total = subtotal + shipping + tax;

  const toggleSection = (section: "samples" | "gifting") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePayPalCheckout = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      alert("Payment successful! Thank you for your purchase.");
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-24 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <h1 className="text-3xl font-light mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before checking out.
            </p>
            <Link
              href="/perfumes"
              className="inline-block bg-black text-white px-8 py-4 text-xs font-light uppercase tracking-widest hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8 lg:mb-8">
                <h1 className="text-2xl lg:text-4xl font-light mb-1">
                  My Shopping Cart ({items.length})
                </h1>
              </div>

              {/* Product Details - Mobile View */}
              <div className="lg:hidden space-y-6 mb-8">
                {items.map((item, index) => (
                  <div key={item.slug} className="border border-border p-4 rounded-lg">
                    {/* Product Image */}
                    <div className="mb-4 bg-gray-50 p-3 rounded flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        className="h-32 w-32 object-contain"
                        width={128}
                        height={128}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      {/* SKU and Name */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{item.sku || generateSKU()}</p>
                        <h3 className="text-sm font-light">{item.name}</h3>
                      </div>

                      {/* Size */}
                      <div>
                        <p className="text-xs font-light">Size: <span className="text-muted-foreground">{item.size || "100ML - 3.4 FL.OZ"}</span></p>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 border border-border rounded">
                          <button className="px-3 py-2 text-lg font-light hover:bg-gray-50">−</button>
                          <span className="px-2 text-sm font-light">{item.quantity}</span>
                          <button className="px-3 py-2 text-lg font-light hover:bg-gray-50">+</button>
                        </div>
                        <p className="text-base font-light">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample Selection - Mobile */}
              <div className="lg:hidden border-t border-border pt-6 mb-6">
                <button
                  onClick={() => toggleSection("samples")}
                  className="w-full flex items-center justify-between py-4"
                >
                  <div>
                    <h3 className="text-sm font-light text-left">Sample Selection</h3>
                    <p className="text-xs text-muted-foreground text-left">Complimentary</p>
                  </div>
                  {expandedSections.samples ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {expandedSections.samples && (
                  <div className="pl-0 space-y-3 pb-4">
                    <p className="text-xs text-muted-foreground mb-3">Choose 2 optional complimentary samples</p>
                    {["Sample 1", "Sample 2", "Sample 3", "Sample 4"].map((sample) => (
                      <label key={sample} className="flex items-center gap-3 p-3 border border-border rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded"
                          onChange={() => setSelectedSample(sample)}
                        />
                        <span className="text-sm font-light">{sample}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Gifting and Packaging - Mobile */}
              <div className="lg:hidden border-t border-border pt-6 mb-6">
                <button
                  onClick={() => toggleSection("gifting")}
                  className="w-full flex items-center justify-between py-4"
                >
                  <div>
                    <h3 className="text-sm font-light text-left">Gifting and Packaging</h3>
                    <p className="text-xs text-muted-foreground text-left">Complimentary</p>
                  </div>
                  {expandedSections.gifting ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {expandedSections.gifting && (
                  <div className="pl-0 space-y-4 pb-4">
                    {/* Include Gift Message */}
                    <div>
                      <label className="flex items-center gap-3 p-3 border border-border rounded hover:bg-gray-50 cursor-pointer mb-3">
                        <input
                          type="checkbox"
                          checked={giftMessage !== ""}
                          className="w-4 h-4 rounded"
                          onChange={(e) => setGiftMessage(e.target.checked ? "" : "")}
                        />
                        <span className="text-sm font-light">Include a Gift Message</span>
                      </label>
                      {giftMessage !== undefined && (
                        <textarea
                          placeholder="Add a personal touch to your order"
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          className="w-full border border-border p-3 text-sm font-light rounded focus:outline-none focus:ring-1 focus:ring-foreground mb-3"
                          rows={3}
                        />
                      )}
                    </div>

                    {/* Include Shopping Bag */}
                    <div>
                      <label className="flex items-center gap-3 p-3 border border-border rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeGiftBag}
                          onChange={(e) => setIncludeGiftBag(e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-light">Include a Shopping Bag</p>
                          <p className="text-xs text-muted-foreground">Your bag preference may not be saved with PayPal Express. For the most seamless experience, please use standard checkout.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Section - Desktop */}
              <div className="hidden lg:block mb-12">
                <h2 className="text-lg font-light mb-6 tracking-wide">Delivery Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="border border-border px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="border border-border px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full border border-border px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Street address"
                    className="w-full border border-border px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="border border-border px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="border border-border px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Zip code"
                      className="border border-border px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method - Desktop */}
              <div className="hidden lg:block mb-12">
                <h2 className="text-lg font-light mb-6 tracking-wide">Shipping & Delivery</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shipping"
                      defaultChecked
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-sm font-light">Complimentary Standard Delivery</p>
                      <p className="text-xs text-muted-foreground">5-7 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shipping"
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-sm font-light">Express Delivery</p>
                      <p className="text-xs text-muted-foreground">2-3 business days - $25.00</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Section - Desktop */}
              <div className="hidden lg:block mb-12">
                <h2 className="text-lg font-light mb-6 tracking-wide">Payment</h2>
                <div className="space-y-3">
                  {/* PayPal Button */}
                  <button
                    onClick={handlePayPalCheckout}
                    disabled={isProcessing}
                    className="w-full bg-[#003087] text-white py-4 text-xs font-light uppercase tracking-widest hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    {isProcessing ? "Processing..." : "Pay with PayPal"}
                  </button>

                  {/* Apple Pay Button */}
                  <button
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        alert("Apple Pay payment successful!");
                        clearCart();
                        setIsProcessing(false);
                      }, 2000);
                    }}
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-4 text-xs font-light uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.05 13.5c-.91 0-1.64.28-2.03.78.32-.71.44-1.66.25-2.64.15-.14.28-.16.41-.16 1.09 0 1.93.84 1.93 1.93 0 1.09-.85 2.09-1.56 2.09M7 11.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m0 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m3-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m8.57-7.14c-.89-.09-1.7.49-1.82 1.37-.12.89.49 1.7 1.37 1.82.89.12 1.7-.49 1.82-1.37.12-.88-.48-1.7-1.37-1.82M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2" />
                    </svg>
                    Apple Pay
                  </button>

                  {/* Credit Card Option */}
                  <button className="w-full border border-border py-4 text-xs font-light uppercase tracking-widest text-foreground hover:bg-gray-50 transition-colors">
                    Credit or Debit Card
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 border border-border p-8">
                <h2 className="text-lg font-light mb-6 tracking-wide">Order Summary</h2>

                {/* Items */}
                <div className="mb-8 space-y-6 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.slug} className="flex gap-4">
                      <div className="shrink-0 bg-gray-50 p-2 rounded">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          className="h-16 w-16 object-contain"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="flex-1 text-sm font-light">
                        <p>{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-light mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-8 space-y-4 text-sm font-light">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Will be calculated on your delivery address</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-light text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Order Summary - Fixed at Bottom */}
        {items.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Price breakdown */}
              <div className="space-y-2 text-sm font-light mb-4">
                <div className="flex justify-between text-xs">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-light text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={handlePayPalCheckout}
                disabled={isProcessing}
                className="w-full bg-black text-white py-4 text-xs font-light uppercase tracking-widest hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity rounded"
              >
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
