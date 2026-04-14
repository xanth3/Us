"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  /**
   * rootMargin for the IntersectionObserver. The default pulls the trigger
   * inward from the bottom of the viewport so the lift animation starts just
   * as the section first appears, reinforcing the "pull the next sheet up"
   * feel during scroll.
   */
  rootMargin?: string;
}

/**
 * Wraps a section and plays the `liftIn` animation the moment it first enters
 * the viewport. Initial state (translated 60px down + transparent) is applied
 * inline so sections below the fold don't flash their final position before
 * the observer attaches. The observer disconnects after firing once.
 */
export function FadeInSection({
  children,
  className = "",
  rootMargin = "0px 0px -10% 0px",
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion preference: skip animation entirely.
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
      { rootMargin, threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={`${visible ? "animate-lift-in" : ""} ${className}`.trim()}
      style={visible ? undefined : { opacity: 0, transform: "translateY(60px)" }}
    >
      {children}
    </div>
  );
}
