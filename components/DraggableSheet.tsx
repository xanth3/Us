"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useHaptics } from "@/hooks/use-haptics";

export type SnapPoint = "peek" | "mid" | "full";

interface Props {
  peekPx?: number;
  midRatio?: number;
  fullRatio?: number;
  initial?: SnapPoint;
  header: ReactNode;
  children: ReactNode;
  onSnapChange?: (snap: SnapPoint) => void;
  yValueRef?: (y: number) => void;
}

const SPRING = { type: "spring" as const, stiffness: 320, damping: 34, mass: 0.9 };
const VELOCITY_THRESHOLD = 500;

export function DraggableSheet({
  peekPx = 148,
  midRatio = 0.55,
  fullRatio = 0.94,
  initial = "peek",
  header,
  children,
  onSnapChange,
  yValueRef,
}: Props) {
  const [vh, setVh] = useState(0);
  const [snap, setSnap] = useState<SnapPoint>(initial);
  const [bodyScrollable, setBodyScrollable] = useState(false);
  const y = useMotionValue(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { trigger } = useHaptics();

  useEffect(() => {
    const update = () => {
      const h = window.visualViewport?.height ?? window.innerHeight;
      setVh(h);
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  const sheetHeight = Math.round(vh * fullRatio);
  const yPeek = vh - peekPx;
  const yMid = vh - Math.round(vh * midRatio);
  const yFull = vh - sheetHeight;

  const snapTo = useCallback(
    (next: SnapPoint, opts: { haptic?: boolean } = { haptic: true }) => {
      const target = next === "peek" ? yPeek : next === "mid" ? yMid : yFull;
      animate(y, target, SPRING);
      if (opts.haptic && next !== snap) trigger("light");
      if (next !== snap) {
        setSnap(next);
        onSnapChange?.(next);
      }
    },
    [y, yPeek, yMid, yFull, snap, trigger, onSnapChange],
  );

  useEffect(() => {
    if (vh > 0) {
      const initialY = initial === "peek" ? yPeek : initial === "mid" ? yMid : yFull;
      y.set(initialY);
    }
  }, [vh, initial, yPeek, yMid, yFull, y]);

  useMotionValueEvent(y, "change", (v) => {
    yValueRef?.(v);
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const current = y.get();
    const velocity = info.velocity.y;

    let next: SnapPoint;
    if (velocity < -VELOCITY_THRESHOLD) {
      next = snap === "peek" ? "mid" : "full";
    } else if (velocity > VELOCITY_THRESHOLD) {
      next = snap === "full" ? "mid" : "peek";
    } else {
      const options: Array<[SnapPoint, number]> = [
        ["peek", Math.abs(current - yPeek)],
        ["mid", Math.abs(current - yMid)],
        ["full", Math.abs(current - yFull)],
      ];
      options.sort((a, b) => a[1] - b[1]);
      next = options[0][0];
    }
    snapTo(next);
  };

  useEffect(() => {
    setBodyScrollable(snap === "full");
    if (scrollRef.current && snap !== "full") {
      scrollRef.current.scrollTop = 0;
    }
  }, [snap]);

  const onBodyScroll = () => {
    // Keep internal scroll in sync; no external action needed for now.
  };

  const opacity = useTransform(y, [yFull, yPeek], [1, 0.92]);

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-40 flex flex-col overflow-hidden rounded-t-[22px] bg-background shadow-[0_-18px_60px_rgba(0,0,0,0.22)] will-change-transform"
      style={{
        y,
        height: sheetHeight,
        opacity,
        touchAction: "none",
      }}
      drag="y"
      dragConstraints={{ top: yFull, bottom: yPeek }}
      dragElastic={{ top: 0.06, bottom: 0.12 }}
      dragMomentum={false}
      onDragEnd={onDragEnd}
    >
      <div
        className="flex cursor-grab touch-none select-none flex-col active:cursor-grabbing"
        onDoubleClick={() => snapTo(snap === "full" ? "peek" : "full")}
      >
        <div className="flex justify-center pb-1 pt-2">
          <div className="h-[5px] w-10 rounded-full bg-foreground/25" />
        </div>
        {header}
      </div>

      <div
        ref={scrollRef}
        onScroll={onBodyScroll}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{
          touchAction: bodyScrollable ? "pan-y" : "none",
          pointerEvents: bodyScrollable ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
