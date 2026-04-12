"use client";

import { useState } from "react";

interface Props {
  lines: string[];
  previewCount?: number;
}

export function ReadMore({ lines, previewCount = 1 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? lines : lines.slice(0, previewCount);

  return (
    <div className="space-y-1">
      {visible.map((line, i) => (
        <p key={i} className="text-xs text-brand-muted">
          {line}
        </p>
      ))}
      {lines.length > previewCount && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs underline underline-offset-2"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
