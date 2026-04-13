"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
  /** Optional delay in ms before the transition starts. */
  delay?: number;
}

/**
 * Full-width image that fades in once it enters the viewport.
 * Drop-in replacement for the raw <img> inside each PDP image slot.
 */
export function FadeInImage({ src, alt, loading = "lazy", delay = 0 }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className="h-auto w-full object-cover lg:h-full"
      loading={loading}
      width={1536}
      height={1920}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    />
  );
}
