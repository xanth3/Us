"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "./icons";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { items, cartDrawerOpen, setCartDrawerOpen, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = cartDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartDrawerOpen]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          cartDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-lg bg-white transition-transform duration-300 ease-in-out flex flex-col ${
          cartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-base font-light tracking-wide">
            My Shopping Cart <span className="font-normal">({items.length})</span>
          </h2>
          <button
            onClick={() => setCartDrawerOpen(false)}
            aria-label="Close cart"
            className="transition-opacity hover:opacity-60"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-12">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4">
                  <div className="shrink-0 bg-gray-50 p-3 rounded">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="h-24 w-24 object-contain"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-light text-sm leading-tight">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Size: 100ML
                    </p>
                    <p className="font-light mb-3">
                      {item.currency} {item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 border border-border rounded">
                      <button
                        onClick={() => updateQuantity(item.slug, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1.5 text-sm font-light transition-opacity hover:opacity-60"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-sm font-light flex-1 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="px-3 py-1.5 text-sm font-light transition-opacity hover:opacity-60"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-border px-6 py-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-light">Subtotal</span>
              <span className="text-sm font-light">${total.toFixed(2)}</span>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              {/* Proceed to Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setCartDrawerOpen(false)}
                className="block w-full bg-black text-white text-center py-4 text-xs font-light uppercase tracking-widest transition-opacity hover:opacity-90"
              >
                Proceed to Checkout
              </Link>

              {/* Apple Pay Button */}
              <button className="w-full bg-black text-white py-4 text-xs font-light uppercase tracking-widest flex items-center justify-center gap-2 transition-opacity hover:opacity-90">
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

              {/* Continue Shopping */}
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="w-full border border-border py-4 text-xs font-light uppercase tracking-widest text-foreground transition-opacity hover:opacity-60"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
