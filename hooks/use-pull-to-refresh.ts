import { useEffect, useCallback } from "react";

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
}

export function usePullToRefresh({ onRefresh, threshold = 80 }: UsePullToRefreshOptions) {
  useEffect(() => {
    let startY = 0;
    let isPulling = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY !== 0) return;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY !== 0) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;

      if (diff > threshold && !isPulling) {
        isPulling = true;
        onRefresh();
      }
    };

    const handleTouchEnd = () => {
      startY = 0;
      isPulling = false;
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onRefresh, threshold]);
}
