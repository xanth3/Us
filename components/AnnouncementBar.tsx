"use client";

import { useState } from "react";
import { X } from "./icons";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="announcement-bar relative flex items-center justify-center px-4 py-2.5">
      <p className="text-center">
        New In: Flight Mode Collection.{" "}
        <a href="#" className="underline underline-offset-2 transition-opacity hover:opacity-70">
          Shop Now
        </a>
        .
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
