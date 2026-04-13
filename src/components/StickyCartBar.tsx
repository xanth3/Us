import { useEffect, useState } from "react";
import perfumeThumb from "@/assets/perfume-thumb.png";

const StickyCartBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <img src={perfumeThumb} alt="Fantasmagory" className="w-10 h-10 object-contain shrink-0" width={40} height={40} />
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium truncate">Fantasmagory</p>
          <p className="text-xs text-muted-foreground">$595.00</p>
        </div>
      </div>
      <button className="bg-primary text-primary-foreground px-4 sm:px-8 py-2 sm:py-3 text-xs tracking-widest uppercase font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
        Place in Cart
      </button>
    </div>
  );
};

export default StickyCartBar;
