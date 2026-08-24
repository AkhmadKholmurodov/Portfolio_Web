"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A card whose hairline brightens under the pointer. Two constraints shaped
 * this.
 */
export function SpotlightCard({
  children,
  className,
  radius = 340,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      // No transition or hover border of its own. Every consumer pairs this
      // with `lift-card`, and two transition utilities on one element do not
      // merge — the later one in the sheet wins the property list outright,
      // which is how the lift ended up jumping while the border eased. The
      // card's hover is one rule, in one place.
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-2xl border border-line",
        className,
      )}
    >
      {/* The lit ring. `mask-composite: exclude` cuts the filled rectangle
          back to just its border, so the glow is a hairline rather than a
          wash across the card's content. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-200 ease-(--ease-out-expo) group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 0px), var(--color-line-hover), transparent 70%)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* A very faint fill, so the card lifts off the page as well as
          outlining itself. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 ease-(--ease-out-expo) group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 0px), oklch(1 0 0 / 0.05), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
