"use client";

import Link from "next/link";
import type { LinkProps } from "next/link";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";

interface DragLiftLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const DRAG_THRESHOLD = 6;

export function DragLiftLink({
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: DragLiftLinkProps) {
  const originRef = useRef({ x: 0, y: 0 });
  const lastRef = useRef({ x: 0, y: 0 });
  const draggedRef = useRef(false);
  const [drag, setDrag] = useState({ active: false, x: 0, y: 0 });

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    originRef.current = { x: event.clientX, y: event.clientY };
    lastRef.current = { x: event.clientX, y: event.clientY };
    draggedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ active: true, x: 0, y: 0 });
  };

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!drag.active) return;

    const rawX = event.clientX - originRef.current.x;
    const rawY = event.clientY - originRef.current.y;
    const moved = Math.hypot(rawX, rawY) > DRAG_THRESHOLD;

    if (moved) {
      event.preventDefault();
      draggedRef.current = true;
      window.scrollBy({ top: -(event.clientY - lastRef.current.y), behavior: "auto" });
    }

    lastRef.current = { x: event.clientX, y: event.clientY };
    setDrag({
      active: true,
      x: rawX * 0.3,
      y: rawY * 0.3,
    });
  };

  const releasePointer = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!drag.active) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDrag({ active: false, x: 0, y: 0 });
  };

  const transform = `translate3d(${drag.x}px, ${drag.y}px, 0) scale(${drag.active ? 1.015 : 1})`;

  return (
    <Link
      {...props}
      className={className}
      style={{
        ...style,
        transform,
        transition: drag.active
          ? "box-shadow var(--lv-motion-instant), transform var(--lv-motion-instant)"
          : "box-shadow var(--lv-motion-fast), transform var(--lv-motion-fast)",
        cursor: drag.active ? "grabbing" : "grab",
        boxShadow: drag.active ? "var(--lv-shadow-lift)" : undefined,
        zIndex: drag.active ? 20 : undefined,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={releasePointer}
      onPointerCancel={releasePointer}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        setDrag({ active: false, x: 0, y: 0 });
        onMouseLeave?.();
      }}
      onClickCapture={(event) => {
        if (!draggedRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        draggedRef.current = false;
      }}
    >
      {children}
    </Link>
  );
}
