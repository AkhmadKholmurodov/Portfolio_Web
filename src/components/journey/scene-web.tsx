"use client";

import {
  Bell,
  Bike,
  Briefcase,
  ChevronDown,
  Heart,
  House,
  Lock,
  Map as MapIcon,
  MessageCircle,
  Search,
  Smartphone,
  Sofa,
  Sun,
  User,
  Users,
} from "lucide-react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Beat, Lines, Thumb, type SceneProps } from "@/components/journey/stage";

/**
 * Scene 01 — eYaqin on the web.
 *
 * A rebuild of the real app shell: the icon rail, the neighbourhood switcher,
 * the horizontal listing row with its square thumbnail, the map plate, the
 * chat panel and the five-state lifecycle strip. Surfaces use the product's
 * own neumorphic treatment (`.scene-raised`) and prices its own serif; only
 * the accent comes from the shared ramp.
 */

const NAV = [House, MapIcon, MessageCircle, Users, Briefcase, User];

const CATEGORIES = ["Mebel", "Texnika", "Kiyim", "Sport", "Bolalar", "Uy", "Avto"];

const LISTINGS = [
  { Icon: Sofa, title: "Divan · 3 o'rinli, deyarli yangi", meta: "Yunusobod · 2 soat oldin · 1.2 km", price: "1 800 000", likes: 12 },
  { Icon: Smartphone, title: "iPhone 13 · 128GB, quti bilan", meta: "Mirzo Ulug'bek · 5 soat oldin · 2.4 km", price: "4 950 000", likes: 31 },
  { Icon: Bike, title: "Velosiped 26\" · bolalar uchun", meta: "Chilonzor · kecha · 3.1 km", price: "900 000", likes: 7 },
];

const PINS = [
  { x: 22, y: 26, label: "1.8 mln" },
  { x: 62, y: 18, label: "4.9 mln" },
  { x: 70, y: 62, label: "900k" },
  { x: 30, y: 70, label: "2.3 mln" },
];

const CHAT = [
  { mine: false, text: "Salom! Divan hali bormi?" },
  { mine: true, text: "Ha, bor. Bugun kechqurun ko'rsangiz bo'ladi." },
  { mine: false, text: "Zo'r, soat 7 da boraman 👍" },
];

const LIFECYCLE = ["active", "reserved", "escrow", "sold"];

/** One node on the lifecycle strip; lights up once the marker reaches it. */
function LifecycleStep({
  marker,
  index,
  label,
  tint,
}: {
  marker: MotionValue<number>;
  index: number;
  label: string;
  tint: string;
}) {
  const opacity = useTransform(marker, (v) => (v >= index - 0.15 ? 1 : 0.28));

  return (
    <motion.span
      className="relative z-10 flex w-1/4 flex-col items-center gap-1.5"
      style={{ opacity }}
    >
      <span
        className="h-[7px] w-[7px] rounded-full"
        style={{ background: tint, boxShadow: `0 0 0 3px ${tint}26` }}
      />
      <code className="font-mono text-[9px] text-ink-300">{label}</code>
    </motion.span>
  );
}

export function SceneWeb({
  p,
  tint,
  size,
}: SceneProps) {
  const narrow = size === "narrow";
  const wide = size === "wide";
  // The chip rail drifts as the visitor scrolls, the way it would under a
  // thumb — the detail that sells it as a live surface rather than a still.
  const chipsX = useTransform(p, [0.2, 0.72], [0, -76]);
  const markerX = useTransform(p, [0.8, 0.95], [0, 3]);
  const rowsDim = useTransform(p, [0.72, 0.82], [1, 0.42]);
  const trackFill = useTransform(p, [0.8, 0.95], [0, 1]);

  // Window width, less the rail and the main column's padding. Each box drops
  // the next column: wide keeps the map, compact keeps the rail, narrow keeps
  // neither — which is what the real app does at those widths too.
  const listW = wide ? 572 : narrow ? 314 : 422;
  const railW = narrow ? 0 : wide ? 72 : 56;
  const pad = narrow ? 12 : 20;

  return (
    <Beat
      p={p}
      at={[-0.05, 0.08]}
      scale={0.95}
      blur={9}
      className="h-full w-full"
      style={{ transformOrigin: "50% 55%" }}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-950 shadow-(--shadow-scene)">
        {/* ---- browser chrome ---- */}
        <div className="flex h-10 shrink-0 items-center gap-3 border-b border-line bg-ink-900/70 px-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-surface-2" />
            ))}
          </div>
          <div className="mx-auto flex h-[22px] w-[286px] items-center justify-center gap-1.5 rounded-full bg-surface text-[10px] text-ink-500">
            <Lock className="h-2.5 w-2.5" />
            eyaqin-app.vercel.app
          </div>
          <Sun className="h-3.5 w-3.5 text-ink-500" />
        </div>

        <div className="flex min-h-0 flex-1">
          {/* ---- icon rail ---- *
           * At phone width the real app moves this to a bottom tab bar, so the
           * scene does the same rather than shrinking a side rail no thumb
           * could reach. */}
          {!narrow && (
            <div
              className="flex shrink-0 flex-col items-center gap-1.5 border-r border-line py-4"
              style={{ width: railW }}
            >
              {NAV.map((Icon, i) => (
                <Beat
                  key={i}
                  p={p}
                  at={[0.05 + i * 0.012, 0.15 + i * 0.012]}
                  x={-10}
                  className="grid h-9 w-9 place-items-center rounded-xl"
                  style={
                    i === 0
                      ? { background: `${tint}1c`, boxShadow: `inset 0 0 0 1px ${tint}33` }
                      : undefined
                  }
                >
                  <Icon
                    className={i === 0 ? "h-[17px] w-[17px]" : "h-[17px] w-[17px] text-ink-700"}
                    style={i === 0 ? { color: tint } : undefined}
                    strokeWidth={i === 0 ? 2.2 : 1.7}
                  />
                </Beat>
              ))}
            </div>
          )}

          {/* ---- main column ---- */}
          <div
            className="relative flex min-w-0 flex-1 flex-col"
            style={{ padding: pad }}
          >
            {/* header */}
            <Beat p={p} at={[0.08, 0.18]} y={-12} className="flex items-center gap-2.5">
              <span
                className="flex h-[30px] items-center gap-1.5 rounded-full px-3 text-[11px] font-medium"
                style={{ background: `${tint}18`, color: tint }}
              >
                Yunusobod · 3 km
                <ChevronDown className="h-3 w-3" />
              </span>
              <span className="scene-inset flex h-[30px] min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-full px-3 text-[11px] whitespace-nowrap text-ink-700">
                <Search className="h-3 w-3 shrink-0" />
                Nima qidiryapsiz?
              </span>
              <span className="scene-raised relative grid h-[30px] w-[30px] place-items-center rounded-full">
                <Bell className="h-3.5 w-3.5 text-ink-500" />
                <span
                  className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full"
                  style={{ background: tint }}
                />
              </span>
            </Beat>

            {/* category chips — the rail scrolls, so it has to fade at the
                edges rather than hard-clip a half-drawn chip. */}
            <div className="mask-fade-x mt-3.5 overflow-hidden">
              <motion.div className="flex gap-1.5" style={{ x: chipsX }}>
                {CATEGORIES.map((c, i) => (
                  <Beat
                    key={c}
                    p={p}
                    at={[0.12 + i * 0.014, 0.21 + i * 0.014]}
                    y={10}
                    className="shrink-0 rounded-full px-3 py-1.5 text-[10.5px] whitespace-nowrap"
                    style={
                      i === 0
                        ? { background: tint, color: "var(--color-on-accent)", fontWeight: 600 }
                        : { background: "var(--surface)", color: "var(--color-ink-500)" }
                    }
                  >
                    {c}
                  </Beat>
                ))}
              </motion.div>
            </div>

            {/* listings + map */}
            <div className="mt-3.5 flex min-h-0 flex-1 gap-4">
              <motion.div
                className="flex flex-col gap-2.5"
                style={{ width: listW, opacity: rowsDim }}
              >
                {LISTINGS.map((l, i) => (
                  <Beat
                    key={l.title}
                    p={p}
                    at={[0.18 + i * 0.05, 0.29 + i * 0.05]}
                    y={22}
                    className="scene-raised flex items-center gap-3 rounded-2xl border border-line p-2.5"
                  >
                    <Thumb className="h-[68px] w-[68px] rounded-xl" tint={tint} seed={i}>
                      <l.Icon
                        className="relative h-6 w-6"
                        style={{ color: `${tint}66` }}
                        strokeWidth={1.4}
                      />
                    </Thumb>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <p className="truncate text-[12.5px] font-medium text-ink-100">
                        {l.title}
                      </p>
                      <p className="truncate text-[10.5px] text-ink-700">{l.meta}</p>
                      <p
                        className="font-serif text-[14px] font-semibold"
                        style={{ color: tint }}
                      >
                        {l.price}
                        <span className="ml-1 text-[10px] font-normal text-ink-500">
                          so&apos;m
                        </span>
                      </p>
                    </div>
                    <span className="flex flex-col items-center gap-0.5 pr-1 text-ink-700">
                      <Heart className="h-3.5 w-3.5" />
                      <span className="font-mono text-[9px]">{l.likes}</span>
                    </span>
                  </Beat>
                ))}
              </motion.div>

              {wide && (
                <Beat
                  p={p}
                  at={[0.24, 0.34]}
                  scale={0.96}
                  className="scene-inset relative w-[340px] overflow-hidden rounded-2xl border border-line"
                >
                  <div className="map-grid absolute inset-0" />
                  {/* radius the search actually runs over */}
                  <Beat
                    p={p}
                    at={[0.34, 0.46]}
                    scale={0.35}
                    className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      border: `1px dashed ${tint}55`,
                      background: `radial-gradient(circle, ${tint}14, transparent 70%)`,
                    }}
                  />
                  <span
                    className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4"
                    style={{ background: tint, boxShadow: `0 0 0 4px ${tint}22` }}
                  />
                  {PINS.map((pin, i) => (
                    <Beat
                      key={pin.label}
                      p={p}
                      at={[0.32 + i * 0.03, 0.39 + i * 0.03]}
                      scale={0.4}
                      y={-8}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-[3px] text-[9.5px] font-bold whitespace-nowrap"
                      style={{
                        left: `${pin.x}%`,
                        top: `${pin.y}%`,
                        background: tint,
                        color: "var(--color-on-accent)",
                      }}
                    >
                      {pin.label}
                    </Beat>
                  ))}
                  <Beat
                    p={p}
                    at={[0.42, 0.5]}
                    y={12}
                    className="absolute inset-x-2.5 bottom-2.5 rounded-xl border border-line bg-ink-900/90 p-2.5 backdrop-blur"
                  >
                    <p className="text-[10.5px] text-ink-300">
                      3 km ichida{" "}
                      <span style={{ color: tint }} className="font-semibold">
                        48 ta e&apos;lon
                      </span>
                    </p>
                    <Lines widths={[120, 74]} className="mt-1.5" h={4} gap={4} />
                  </Beat>
                </Beat>
              )}
            </div>

            {/* ---- lifecycle strip ---- */}
            {/* Wide: sits under the listings with the chat panel beside it.
                Otherwise the two stack, because there is no room to sit side
                by side once the map column is gone. */}
            <Beat
              p={p}
              at={[0.74, 0.82]}
              y={44}
              className="absolute rounded-2xl border border-line bg-ink-900/95 p-3 backdrop-blur"
              style={{
                width: listW,
                left: pad,
                bottom: wide ? pad : narrow ? 186 : 216,
              }}
            >
              <p className="mb-2.5 font-mono text-[9px] tracking-[0.18em] text-ink-700 uppercase">
                listing lifecycle
              </p>
              <div className="relative flex items-center justify-between">
                <span className="absolute inset-x-3 top-[9px] h-px bg-surface-2" />
                <motion.span
                  className="absolute top-[9px] h-px origin-left"
                  style={{ left: 12, right: 12, background: tint, scaleX: trackFill }}
                />
                {LIFECYCLE.map((state, i) => (
                  <LifecycleStep
                    key={state}
                    marker={markerX}
                    index={i}
                    label={state}
                    tint={tint}
                  />
                ))}
              </div>
            </Beat>

            {/* ---- chat panel ---- */}
            <Beat
              p={p}
              at={[0.5, 0.6]}
              y={230}
              className="scene-raised absolute bottom-0 flex flex-col overflow-hidden rounded-t-2xl border border-b-0 border-line"
              style={{
                width: wide ? 316 : listW,
                height: wide ? 268 : narrow ? 172 : 200,
                right: pad,
              }}
            >
              <div className="flex items-center gap-2.5 border-b border-line px-3 py-2.5">
                <Thumb className="h-7 w-7 rounded-full" tint={tint} seed={4} />
                <div className="flex-1">
                  <p className="text-[11.5px] font-medium text-ink-100">Aziz R.</p>
                  <p className="text-[9.5px] text-ink-700">Yunusobod · onlayn</p>
                </div>
                <span
                  className="rounded-full px-2 py-[3px] font-mono text-[9px]"
                  style={{ background: `${tint}1c`, color: tint }}
                >
                  42.3°C
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-end gap-2 px-3 py-3">
                {CHAT.map((m, i) => (
                  <Beat
                    key={i}
                    p={p}
                    at={[0.57 + i * 0.04, 0.64 + i * 0.04]}
                    y={14}
                    className={`max-w-[76%] rounded-2xl px-2.5 py-2 text-[11px] leading-snug ${
                      m.mine ? "self-end" : "self-start"
                    }`}
                    style={
                      m.mine
                        ? { background: tint, color: "var(--color-on-accent)" }
                        : { background: "var(--surface-2)", color: "var(--color-ink-300)" }
                    }
                  >
                    {m.text}
                  </Beat>
                ))}
                <Beat
                  p={p}
                  at={[0.7, 0.74]}
                  className="flex w-fit gap-1 self-start rounded-full bg-surface-2 px-2.5 py-2"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-ink-500"
                      style={{ animation: `blip 1.2s ${i * 0.15}s ease-in-out infinite` }}
                    />
                  ))}
                </Beat>
              </div>
            </Beat>
          </div>
        </div>

        {/* ---- bottom tabs, phone width only ---- */}
        {narrow && (
          <div className="flex h-11 shrink-0 items-stretch border-t border-line bg-ink-900/80">
            {NAV.slice(0, 5).map((Icon, i) => (
              <Beat
                key={i}
                p={p}
                at={[0.05 + i * 0.012, 0.15 + i * 0.012]}
                y={8}
                className="relative grid flex-1 place-items-center"
              >
                {i === 0 && (
                  <span
                    className="absolute h-7 w-11 rounded-full"
                    style={{ background: `${tint}1c` }}
                  />
                )}
                <Icon
                  className={i === 0 ? "relative h-[17px] w-[17px]" : "relative h-[17px] w-[17px] text-ink-700"}
                  style={i === 0 ? { color: tint } : undefined}
                  strokeWidth={i === 0 ? 2.2 : 1.7}
                />
              </Beat>
            ))}
          </div>
        )}
      </div>
    </Beat>
  );
}
