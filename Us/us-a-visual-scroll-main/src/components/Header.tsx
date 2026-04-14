import { useState, useEffect } from "react";
import { Menu, Search, User, ShoppingBag } from "lucide-react";
import BrandLogo from "./BrandLogo";
import AnnouncementBar from "./AnnouncementBar";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBar />
      <div
        className={`flex items-center justify-between px-4 h-[54px] transition-colors duration-300 ${
          scrolled
            ? "bg-background border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center gap-5">
          <button className="nav-link" aria-label="Menu">
            <Menu size={20} />
          </button>
          <button className="nav-link" aria-label="Search">
            <Search size={20} />
          </button>
        </div>

        <BrandLogo />

        <div className="flex items-center gap-5">
          <button className="nav-link" aria-label="Account">
            <User size={20} />
          </button>
          <button className="nav-link relative" aria-label="Cart">
            <ShoppingBag size={20} />
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
