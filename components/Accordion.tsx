"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  title: string;
  children: React.ReactNode;
  indicator?: "+" | "›";
  defaultOpen?: boolean;
}

export function Accordion({ title, children, indicator = "+", defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-brand-border">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-sm"
      >
        <span>{title}</span>
        <span
          className={cn(
            "text-brand-muted transition-transform duration-200",
            indicator === "+" && open && "rotate-45",
            indicator === "›" && open && "rotate-90",
          )}
        >
          {indicator}
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96 pb-4" : "max-h-0",
        )}
      >
        <div className="text-sm leading-relaxed text-brand-muted">{children}</div>
      </div>
    </div>
  );
}
