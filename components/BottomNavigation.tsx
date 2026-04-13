"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, User } from "./icons";
import { useCart } from "./CartProvider";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/perfumes", label: "Shop", icon: ShoppingBag },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account", label: "Account", icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background sm:hidden"
      style={{
        paddingBottom: "var(--safe-area-inset-bottom, 0)",
      }}
    >
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-4 transition-opacity ${
                isActive
                  ? "text-foreground opacity-100"
                  : "text-muted-foreground opacity-60 hover:opacity-100"
              }`}
              aria-label={label}
            >
              <div className="relative">
                <Icon size={24} />
                {label === "Shop" && count > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[0.65rem] font-medium">
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[0.65rem] font-medium tracking-wide uppercase">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
