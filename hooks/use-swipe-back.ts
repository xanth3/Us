import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseSwipeBackOptions {
  edgeWidth?: number; // pixels from left edge to trigger swipe
  enabled?: boolean;
}

export function useSwipeBack({ edgeWidth = 20, enabled = true }: UseSwipeBackOptions = {}) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    let startX = 0;
    let isBackSwipe = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isBackSwipe = startX < edgeWidth;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isBackSwipe) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      // If swiped right more than 50px from left edge, go back
      if (diff > 50) {
        router.back();
      }

      isBackSwipe = false;
      startX = 0;
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [router, edgeWidth, enabled]);
}
