"use client";

import { useCart } from "./CartProvider";

export function CartBadge() {
  const { count } = useCart();
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[0.6rem] text-background">
      {count > 99 ? "99+" : count}
    </span>
  );
}
