import { X } from "lucide-react";
import { useState } from "react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="announcement-bar flex items-center justify-center py-2 sm:py-2.5 px-3 sm:px-4 relative">
      <p className="text-center text-xs sm:text-sm">
        New In: Flight Mode Collection.{" "}
        <a href="#" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
          Shop Now
        </a>
        .
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity flex-shrink-0"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
