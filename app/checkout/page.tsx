"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const { items, clearCart, setCartDrawerOpen } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal > 0 ? subtotal * 0.1 : 0; // 10% tax
  const total = subtotal + shipping + tax;

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
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
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
            <div className="mb-8">
              <h1 className="text-4xl font-light mb-1">Checkout</h1>
            </div>

              {/* Delivery Section */}
              <div className="mb-12">
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

              {/* Shipping Method */}
              <div className="mb-12">
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

              {/* Payment Section */}
              <div className="mb-12">
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
            <div className="lg:col-span-1">
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
      </div>
    </div>
  );
}
