"use client";

import { useCart } from "./CartProvider";

export function CartBadge() {
  const { count } = useCart();
  return (
    <span className="relative">
      <span className="sr-only">Cart,</span>
      <span>{count}</span>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-black text-[9px] text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </span>
  );
}
