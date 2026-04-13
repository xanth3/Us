"use client";

import { useEffect } from "react";

/** Enables smooth scroll-snap on the page while mounted (product image gallery). */
export function ScrollSnapController() {
  useEffect(() => {
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
