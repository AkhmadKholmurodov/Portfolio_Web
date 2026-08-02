"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card surface that tracks the pointer in two ways:
 *  - `--mx` / `--my` feed the `.edge-glow` gradient hairline (see globals.css)
 *  - a soft radial wash follows the cursor inside the card
 *
 * Both are written straight to CSS custom properties so hover never
 * triggers a React render.
 */
export function SpotlightCard({
  children,
  className,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group/card relative overflow-hidden rounded-2xl glass",
        glow && "edge-glow",
        "transition-colors duration-500 hover:bg-white/[0.045]",
        className,
      )}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--color-accent) 12%, transparent), transparent 62%)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
