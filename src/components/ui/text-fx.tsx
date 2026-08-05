"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { useReducedMotion } from "@/hooks/use-media";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Three text effects, built on one rule the rest of the page already follows:
 * **the correct text is always in the DOM, and the effect is something that
 * happens to it afterwards.**
 *
 * That is not a stylistic preference. A reveal that starts from `opacity: 0`
 * and waits for JavaScript is a promise to paint later, and every way that
 * promise can break — a stalled bundle, a failed hydration, a crawler that
 * never runs the frameloop, a reader with an extension that kills timers —
 * breaks it into a blank screen. So `SplitChars` animates in CSS with
 * `animation-fill-mode: both`, where the browser owns the end state, and
 * `Scramble` and `CountUp` render the real string on the server and let an
 * effect *replace* it. Turn JavaScript off and the page still reads correctly;
 * it simply arrives already finished.
 *
 * The two JS effects also write through a ref rather than through state. A
 * scramble is roughly sixty text changes a second, and routing each of those
 * through React would re-render the subtree sixty times a second to change one
 * string — so they touch `textContent` directly and React never hears about it.
 */

/* ------------------------------------------------------------------ *
 * SplitChars — a headline set one glyph at a time.
 * ------------------------------------------------------------------ */
/**
 * Each character falls in from above its own clipping row, like rain.
 * Entirely CSS: one class, one inline `animation-delay`, and the compositor
 * does the rest — no frameloop, no main-thread work, and nothing to fail.
 *
 * The delays are staggered *and* jittered. A strictly even stagger reads as a
 * machine dealing out cards; real rain has no queue, and scattering each
 * glyph's start by a fraction of the gap is the whole difference between a
 * sequence and a downpour.
 *
 * The animated glyphs are `aria-hidden` and the accessible name comes from a
 * single `sr-only` copy, because a screen reader handed 11 separate one-letter
 * spans reads out 11 letters.
 */

/**
 * Deterministic 0–1 from an index.
 *
 * `Math.random()` would give a different scatter on the server than on the
 * client, and React would discard the whole server-rendered headline on
 * hydration to fix up the inline styles.
 */
function jitter(i: number) {
  const x = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
export function SplitChars({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.034,
  spread = 0.14,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  /** Seconds before the first character moves. */
  delay?: number;
  /** Seconds between one character and the next. */
  stagger?: number;
  /** Seconds of random scatter added on top of the stagger. */
  spread?: number;
}) {
  // `Array.from` splits by code point, so an emoji or a combining mark stays
  // one character instead of becoming two broken halves.
  const chars = Array.from(text);

  return (
    // `nowrap` because every glyph here is its own `inline-block`, which makes
    // each one a legal break opportunity — a container narrow enough will
    // happily split a name down the middle and put "odov" on its own line.
    // The caller breaks between words by passing them as separate instances.
    <span className={cn("inline-block whitespace-nowrap", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block">
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`}
            // Room for descenders, pulled back out of the layout so the
            // clipping row does not change the line's metrics.
            className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom"
          >
            <span
              className={cn("char-rain inline-block", charClassName)}
              style={{
                // Rounded, and not for tidiness. The browser serialises
                // `animation-delay` to six significant figures, so an
                // unrounded 0.1820105437099701 comes back out of the server
                // HTML as 0.182011 and React calls the whole headline a
                // hydration mismatch.
                animationDelay: `${(delay + i * stagger + jitter(i) * spread).toFixed(3)}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Scramble — a line of monospace that resolves out of noise.
 * ------------------------------------------------------------------ */

/** Glyphs a Latin character may be impersonated by while it is unresolved. */
const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=/\\<>[]{}";
const LATIN = /[A-Za-z0-9]/;

export function Scramble({
  text,
  className,
  delay = 0,
  /** Milliseconds each character spends unresolved before it locks. */
  dwell = 32,
  /**
   * Hold until the line is actually on screen. Anything below the fold needs
   * this — otherwise it resolves during the page load and the reader scrolls
   * down to find a line that has already finished.
   */
  startOnView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  dwell?: number;
  startOnView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  /**
   * The `sr-only` copy, used as the source of truth on cleanup.
   *
   * Cleanup has to restore the *current* text, and the language switcher
   * changes `text` while this stays mounted — so a cleanup closing over the
   * old `text` puts the previous language back on screen. A ref written during
   * render would be the obvious fix and is not allowed to be one; a ref
   * written in its own effect is worse, because cleanups all run before any
   * setup and it would still hold the stale value.
   *
   * React commits DOM mutations before it runs effect cleanups, so by the time
   * this reads the copy React manages, that copy is already correct.
   */
  const truth = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // The node is captured here; its *text* is read at cleanup, which is the
    // whole point — the element never changes, only what React put inside it.
    const truthEl = truth.current;

    const chars = Array.from(text);

    // A Korean or Cyrillic glyph is replaced only by another glyph drawn from
    // this same string. Standing in a Latin letter for a double-width one
    // would change the line's measured width on every frame, and the whole
    // effect depends on the line not moving while it resolves.
    const own = chars.filter((c) => c.trim() && !LATIN.test(c));
    const runFor = chars.length * dwell;

    let raf = 0;

    const start = () => {
      const startAt = performance.now() + delay * 1000;

      const frame = (now: number) => {
        const elapsed = now - startAt;

        if (elapsed >= runFor) {
          el.textContent = text;
          return;
        }

        if (elapsed >= 0) {
          const resolved = elapsed / dwell;
          el.textContent = chars
            .map((char, i) => {
              if (i < resolved || !char.trim()) return char;
              if (LATIN.test(char)) {
                return NOISE[Math.floor(Math.random() * NOISE.length)];
              }
              return own.length
                ? own[Math.floor(Math.random() * own.length)]
                : char;
            })
            .join("");
        }

        raf = requestAnimationFrame(frame);
      };

      raf = requestAnimationFrame(frame);
    };

    let observer: IntersectionObserver | undefined;

    if (startOnView) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          start();
        },
        { rootMargin: "-10% 0px -10% 0px" },
      );
      observer.observe(el);
    } else {
      start();
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(raf);
      // Cancelling mid-resolve would otherwise strand a line of noise.
      el.textContent = truthEl?.textContent ?? text;
    };
  }, [text, delay, dwell, reduced, startOnView]);

  return (
    <span className={className}>
      <span ref={truth} className="sr-only">
        {text}
      </span>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * CountUp — a proof number that arrives by counting.
 * ------------------------------------------------------------------ */

/** Leading symbols, the number itself, then whatever trails it: `99.9%`,
 *  `100×`, `3+`, and Korean's `3년+` all split correctly. */
const NUMERIC = /^(\D*)(\d+(?:[.,]\d+)?)(.*)$/;

export function CountUp({
  value,
  className,
  delay = 0,
  duration = 1.5,
}: {
  value: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  /** Source of truth on cleanup — see the note in `Scramble`. */
  const truth = useRef<HTMLSpanElement>(null);

  // The staged delay exists so the number starts climbing just as the proof
  // bar finishes fading in — during it, the counter sits at zero behind an
  // element that is still transparent, so nobody sees the zero. That is only
  // true on the first run. A language switch re-runs this against a bar that
  // is already on screen, where a second of visible "0" is just a glitch, so
  // subsequent runs start immediately.
  const firstRun = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const truthEl = truth.current;

    const match = value.match(NUMERIC);
    if (!match) return;

    const [, prefix, digits, suffix] = match;
    const separator = digits.includes(",") ? "," : ".";
    const target = Number(digits.replace(",", "."));
    const decimals = digits.split(/[.,]/)[1]?.length ?? 0;
    if (!Number.isFinite(target)) return;

    const controls = animate(0, target, {
      duration,
      delay: firstRun.current ? delay : 0,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent =
          prefix + v.toFixed(decimals).replace(".", separator) + suffix;
      },
      // Float formatting is not guaranteed to land exactly on the source
      // string, so the real one is restored rather than recomputed.
      onComplete: () => {
        el.textContent = value;
      },
    });

    firstRun.current = false;

    return () => {
      controls.stop();
      el.textContent = truthEl?.textContent ?? value;
    };
  }, [value, delay, duration, reduced]);

  return (
    // Proportional digits change width as they count, which makes a row of
    // these jitter sideways for the whole animation.
    <span className={cn("tabular-nums", className)}>
      <span ref={truth} className="sr-only">
        {value}
      </span>
      <span ref={ref} aria-hidden>
        {value}
      </span>
    </span>
  );
}
