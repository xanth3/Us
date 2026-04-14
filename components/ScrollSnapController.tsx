"use client";

import { useEffect } from "react";

/** Enables smooth scroll-snap on the page while mounted (product image gallery). Desktop (lg+) only. */
export function ScrollSnapController() {
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const html = document.documentElement;
    html.style.scrollSnapType = "y mandatory";
    html.style.scrollPaddingTop = "65px";
    return () => {
      html.style.scrollSnapType = "";
      html.style.scrollPaddingTop = "";
    };
  }, []);

  return null;
}
