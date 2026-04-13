"use client";

import { useEffect } from "react";

/** Enables smooth scroll-snap on the page while mounted (product image gallery). */
export function ScrollSnapController() {
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y proximity";
    html.style.scrollBehavior = "smooth";
    return () => {
      html.style.scrollSnapType = "";
      html.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
