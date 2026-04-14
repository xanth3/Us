"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface DesktopImageFadeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Per-image fade-in for the desktop PDP column. Opacity 0 → 1 over ~0.4s when
 * the image first enters the viewport. Tuned for tall hero images: fires as
 * soon as any pixel is visible (threshold: 0). Disconnects after firing.
 */
export function DesktopImageFade({ children, className = "" }: DesktopImageFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "animate-fade-in-short" : ""} ${className}`.trim()}
      style={visible ? undefined : { opacity: 0 }}
    >
      {children}
    </div>
  );
}
