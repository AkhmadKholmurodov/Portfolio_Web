"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scenes are hand-composed at a fixed pixel size and scaled to whatever room
 * the stage has. A reproduction of a real product UI has dozens of placed
 * elements whose relationship *is* the point; reflowing them responsively
 * would destroy the likeness, and a single transform cannot.
 *
 * There are three boxes because scaling has a floor. A phone gives the stage
 * roughly 340px: rendering the 520px box there means 0.65 scale, which turns
 * 8px UI text into 5px and the whole scene into a grey smudge. Each box is
 * therefore sized so its scale lands near 1, and each scene lays itself out
 * differently inside it — which is what the real products do too.
 */
export const DESIGN = {
  wide: { w: 1040, h: 620 },
  compact: { w: 520, h: 620 },
  narrow: { w: 340, h: 600 },
} as const;

export type SceneSize = keyof typeof DESIGN;

export type SceneProps = {
  p: MotionValue<number>;
  tint: string;
  size: SceneSize;
};

export function useFitScale(w: number, h: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box?.width || !box.height) return;
      setScale(Math.min(box.width / w, box.height / h));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);

  return { ref, scale };
}

/* ------------------------------------------------------------------ *
 * Beat — one animated element on a scene's timeline.
 * ------------------------------------------------------------------ */
export type BeatProps = {
  /** The owning scene's local progress, 0 → 1. */
  p: MotionValue<number>;
  /** Scroll window the element enters over. */
  at: readonly [number, number];
  /** Optional window it leaves over. Omitted means it stays for good. */
  out?: readonly [number, number];
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export function Beat({
  p,
  at,
  out,
  y = 0,
  x = 0,
  scale = 1,
  blur = 0,
  className,
  style,
  children,
}: BeatProps) {
  const [a, b] = at;
  // Local progress is clamped to 0..1, so a default exit window past 1 can
  // never fire — that is how "no exit" is expressed without a branch.
  const [c, d] = out ?? [8, 9];

  const opacity = useTransform(
    p,
    [a, b, Math.max(c, b + 0.001), Math.max(d, b + 0.002)],
    [0, 1, 1, 0],
  );
  const ty = useTransform(p, [a, b], [y, 0]);
  const tx = useTransform(p, [a, b], [x, 0]);
  const sc = useTransform(p, [a, b], [scale, 1]);
  const bl = useTransform(p, [a, b], [blur, 0]);
  const filter = useMotionTemplate`blur(${bl}px)`;

  return (
    <motion.div
      className={className}
      style={{
        opacity,
        ...(y ? { y: ty } : null),
        ...(x ? { x: tx } : null),
        ...(scale !== 1 ? { scale: sc } : null),
        // A filter forces its own compositing layer; only pay for it when the
        // beat actually blurs.
        ...(blur ? { filter } : null),
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** Which named beat the scene is currently on — drives the caption label. */
export function useBeatIndex(p: MotionValue<number>, marks: readonly number[]) {
  const [index, setIndex] = useState(0);

  useMotionValueEvent(p, "change", (v) => {
    let next = 0;
    for (let i = 0; i < marks.length; i++) if (v >= marks[i]) next = i;
    setIndex(next);
  });

  return index;
}

/** Placeholder for product imagery the portfolio does not ship. */
export function Thumb({
  className,
  tint,
  seed = 0,
  children,
}: {
  className?: string;
  tint: string;
  seed?: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden",
        className,
      )}
      style={{
        background: `linear-gradient(${140 + seed * 37}deg, ${tint}2e, ${tint}0a 60%, transparent)`,
        boxShadow: `inset 0 0 0 1px ${tint}1f`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at ${28 + seed * 13}% ${34 + seed * 9}%, ${tint}33, transparent 62%)`,
        }}
      />
      {children}
    </div>
  );
}

/** A run of grey bars standing in for a line of copy. */
export function Lines({
  widths,
  className,
  gap = 5,
  h = 5,
}: {
  widths: number[];
  className?: string;
  gap?: number;
  h?: number;
}) {
  return (
    <div className={cn("flex flex-col", className)} style={{ gap }}>
      {widths.map((w, i) => (
        <span
          key={i}
          className="block rounded-full bg-surface-2"
          style={{ width: w, height: h }}
        />
      ))}
    </div>
  );
}
