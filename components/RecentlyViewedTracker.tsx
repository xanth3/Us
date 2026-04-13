"use client";

import { useEffect } from "react";

const RECENTLY_VIEWED_STORAGE_KEY = "us_recently_viewed";
const MAX_RECENTLY_VIEWED = 20;

export function RecentlyViewedTracker({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
      let recent: string[] = stored ? JSON.parse(stored) : [];

      // Remove if already exists, then add to front
      recent = recent.filter((s) => s !== slug);
      recent = [slug, ...recent].slice(0, MAX_RECENTLY_VIEWED);

      localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(recent));
    } catch {
      /* ignore */
    }
  }, [slug]);

  return null;
}
