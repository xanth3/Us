import { Menu, Search, Heart, User, ShoppingBag } from "lucide-react";
import BrandLogo from "./BrandLogo";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-5">
          <button className="nav-link flex items-center gap-2" aria-label="Menu">
            <Menu size={18} />
            <span className="hidden sm:inline">Menu</span>
          </button>
          <button className="nav-link flex items-center gap-2" aria-label="Search">
            <Search size={18} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        <BrandLogo />

        <div className="flex items-center gap-3 sm:gap-5">
          <a href="#" className="nav-link hidden sm:inline">Contact Us</a>
          <button className="nav-link" aria-label="Wishlist">
            <Heart size={18} />
          </button>
          <button className="nav-link" aria-label="Account">
            <User size={18} />
          </button>
          <button className="nav-link relative" aria-label="Cart">
            <ShoppingBag size={18} />
            <span className="absolute -top-1.5 -right-1.5 text-[0.6rem] bg-foreground text-background rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
