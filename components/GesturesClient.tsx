"use client";

import { useSwipeBack } from "@/hooks/use-swipe-back";
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh";

export function GesturesClient() {
  // Enable swipe back gesture
  useSwipeBack({ enabled: true, edgeWidth: 30 });

  // Enable pull-to-refresh gesture
  usePullToRefresh({
    onRefresh: async () => {
      // Refresh current page content
      window.location.reload();
    },
    threshold: 80,
  });

  return null;
}
