"use client";

import {
  BatteryFull,
  Bell,
  Briefcase,
  ChevronDown,
  House,
  Map as MapIcon,
  MessageCircle,
  Search,
  Send,
  Signal,
  Sofa,
  Shirt,
  Smartphone,
  Sparkles,
  User,
  Users,
  Wifi,
  Bike,
  Baby,
  Car,
  Package,
} from "lucide-react";
import {
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Beat, Thumb, type SceneProps } from "@/components/journey/stage";

/**
 * Scene 03 — eYaqin in the hand.
 *
 * The same product as scene 01, re-authored for a thumb: neumorphic cards, a
 * tab bar whose pill springs between icons, a sheet you drag up over the map.
 * The scroll swipes between three screens and, at the end, changes the app's
 * palette live — the feature the app calls "Mening designim".
 *
 * Everything inside the frame reads `var(--tint)`, so one animated custom
 * property re-skins the whole device at once, exactly like the real setting.
 */

const SCREEN_W = 282;
const TAB_COUNT = 5;

const TABS = [House, MapIcon, Users, MessageCircle, User];
/** Screen order maps onto tabs 0, 1 and 3. */
const TAB_FOR_SCREEN = [0, 1, 3];
const SCREEN_LABELS = ["Lenta", "Xarita", "Suhbat"];

const CATEGORIES = [
  { Icon: Sofa, label: "Mebel" },
  { Icon: Smartphone, label: "Texnika" },
  { Icon: Shirt, label: "Kiyim" },
  { Icon: Bike, label: "Sport" },
  { Icon: Baby, label: "Bolalar" },
  { Icon: Car, label: "Avto" },
  { Icon: Package, label: "Uy" },
  { Icon: Briefcase, label: "Ish" },
];

const CARDS = [
  { title: "Divan · 3 o'rinli", meta: "Yunusobod · 1.2 km", price: "1 800 000" },
  { title: "iPhone 13 · 128GB", meta: "M. Ulug'bek · 2.4 km", price: "4 950 000" },
  { title: "Velosiped 26\"", meta: "Chilonzor · 3.1 km", price: "900 000" },
];

const BUBBLES = [
  { mine: false, text: "Salom! Divan hali bormi?" },
  { mine: true, text: "Ha, bor. Kechqurun ko'rsangiz bo'ladi." },
  { mine: false, text: "Zo'r, soat 7 da boraman 👍" },
];

/**
 * The app ships nine user-selectable palettes. These nine are re-cut from the
 * portfolio's own ramp so the feature reads without importing three unrelated
 * colour schemes into the section.
 */
const PALETTES = [
  { bg: "#161616", fg: "#FFFFF0" },
  { bg: "#0E1B1A", fg: "#3ADFD7" },
  { bg: "#0F1720", fg: "#51BEFF" },
  { bg: "#16121F", fg: "#AD8DFD" },
  { bg: "#101F1E", fg: "#009C96" },
  { bg: "#111A22", fg: "#1882C0" },
  { bg: "#EEF0F3", fg: "#1B2025" },
  { bg: "#E4F4F3", fg: "#009C96" },
  { bg: "#ECE7F8", fg: "#795DBA" },
];

const ALPHA = (pct: number) =>
  `color-mix(in oklab, var(--tint) ${pct}%, transparent)`;

export function SceneMobile({
  p,
  tint,
  size,
}: SceneProps) {
  const narrow = size === "narrow";
  const wide = size === "wide";
  const screenX = useTransform(
    p,
    [0.26, 0.4, 0.5, 0.64],
    [0, -SCREEN_W, -SCREEN_W, -SCREEN_W * 2],
  );

  // The pill tracks the swipe rather than the tap — same timings as `screenX`,
  // which is what makes the two feel mechanically linked.
  const tabW = SCREEN_W / TAB_COUNT;
  const pillX = useTransform(
    p,
    [0.26, 0.4, 0.5, 0.64],
    TAB_FOR_SCREEN.flatMap((t, i) => (i === 1 ? [t * tabW, t * tabW] : [t * tabW])),
  );

  // The device turns to face the visitor as it arrives, then drifts past.
  const rotateY = useTransform(p, [0, 0.14, 0.86, 1], [17, 0, 0, -11]);
  const rotateX = useTransform(p, [0, 0.14], [7, 0]);

  // The palette setting, applied for real: one custom property re-skins the app.
  const liveTint = useTransform(p, [0.8, 0.89], [tint, PALETTES[1].fg]);
  const paletteChoice = useTransform(p, (v): number => (v >= 0.845 ? 1 : 0));

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {wide && (
        <>
          <PalettePicker p={p} choice={paletteChoice} />
          <PushCard p={p} tint={tint} />
        </>
      )}

      {/* Grounds the device in the empty stage; the phone is small next to a
          desktop window and floats without it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: narrow ? 330 : 520,
          height: narrow ? 330 : 520,
          background: `radial-gradient(circle, ${tint}14, transparent 66%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Perspective has to sit on the frame's direct parent, so it lives on
          the entrance beat rather than the stage. */}
      <Beat
        p={p}
        at={[-0.05, 0.1]}
        y={46}
        scale={0.94}
        blur={8}
        style={{ perspective: 1600 }}
      >
        <motion.div
          className="relative rounded-[42px] border border-line bg-ink-850 p-[9px] shadow-(--shadow-scene)"
          style={
            {
              width: 300,
              rotateY,
              rotateX,
              transformStyle: "preserve-3d",
              "--tint": liveTint,
            } as React.CSSProperties
          }
        >
          <div
            className="relative overflow-hidden rounded-[34px] bg-ink-900 dark:bg-ink-950"
            style={{ width: SCREEN_W, height: 562 }}
          >
            {/* dynamic island */}
            <span className="absolute left-1/2 top-2.5 z-30 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />

            {/* status bar */}
            <div className="relative z-20 flex h-[34px] items-end justify-between px-5 pb-1">
              <span className="font-mono text-[10px] font-semibold text-ink-100">9:41</span>
              <span className="flex items-center gap-1 text-ink-300">
                <Signal className="h-2.5 w-2.5" />
                <Wifi className="h-2.5 w-2.5" />
                <BatteryFull className="h-3 w-3" />
              </span>
            </div>

            {/* the three screens, swiped by the page scroll */}
            <motion.div
              className="flex h-[472px]"
              style={{ x: screenX, width: SCREEN_W * 3 }}
            >
              <HomeScreen p={p} tint={tint} />
              <MapScreen p={p} tint={tint} />
              <ChatScreen p={p} tint={tint} />
            </motion.div>

            {/* tab bar */}
            <div className="absolute inset-x-0 bottom-0 h-[56px] border-t border-line bg-ink-850/95 backdrop-blur dark:bg-ink-900/95">
              <motion.span
                className="absolute top-[9px] h-[30px] rounded-full"
                style={{
                  width: tabW - 14,
                  x: pillX,
                  marginLeft: 7,
                  background: ALPHA(16),
                }}
              />
              <div className="relative flex h-full">
                {TABS.map((Icon, i) => (
                  <TabIcon key={i} Icon={Icon} index={i} choice={pillX} tabW={tabW} />
                ))}
              </div>
              <span className="absolute bottom-1.5 left-1/2 h-1 w-[92px] -translate-x-1/2 rounded-full bg-line-strong" />
            </div>
          </div>
        </motion.div>
      </Beat>

      {/* Reads as a carousel position: which of the three screens the scroll
          has swiped to. Anchored to the stage rather than the frame, so the
          compact box cannot push it past its own edge. */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SCREEN_LABELS.map((label, i) => (
          <ScreenDot key={label} index={i} screenX={screenX} label={label} />
        ))}
      </div>
    </div>
  );
}

function ScreenDot({
  index,
  screenX,
  label,
}: {
  index: number;
  screenX: MotionValue<number>;
  label: string;
}) {
  const active = useTransform(screenX, (v): number =>
    Math.round(-v / SCREEN_W) === index ? 1 : 0,
  );
  const opacity = useTransform(active, [0, 1], [0.28, 1]);
  const width = useTransform(active, [0, 1], [5, 18]);

  return (
    <motion.span
      aria-label={label}
      className="h-[5px] rounded-full bg-ink-500"
      style={{ opacity, width }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Screens
 * ------------------------------------------------------------------ */
function HomeScreen({ p, tint }: { p: MotionValue<number>; tint: string }) {
  return (
    <div className="flex flex-col px-4 pt-1" style={{ width: SCREEN_W }}>
      <Beat p={p} at={[0.06, 0.15]} y={-10} className="flex items-center gap-2">
        <span
          className="flex items-center gap-1 text-[12.5px] font-semibold"
          style={{ color: "var(--tint)" }}
        >
          Yunusobod
          <ChevronDown className="h-3 w-3" />
        </span>
        <span className="flex-1" />
        <Search className="h-4 w-4 text-ink-500" />
        <Bell className="h-4 w-4 text-ink-500" />
      </Beat>

      <Beat p={p} at={[0.09, 0.19]} y={12} className="mt-3 grid grid-cols-4 gap-y-3">
        {CATEGORIES.map(({ Icon, label }) => (
          <span key={label} className="flex flex-col items-center gap-1.5">
            <span
              className="scene-raised grid h-[38px] w-[38px] place-items-center rounded-2xl"
              style={{ boxShadow: `inset 0 0 0 1px ${ALPHA(10)}` }}
            >
              <Icon className="h-4 w-4" style={{ color: "var(--tint)" }} strokeWidth={1.8} />
            </span>
            <span className="text-[8.5px] text-ink-500">{label}</span>
          </span>
        ))}
      </Beat>

      <Beat p={p} at={[0.13, 0.22]} y={10} className="mt-4 flex items-baseline justify-between">
        <span className="text-[12px] font-semibold text-ink-100">Yaqin atrofda</span>
        <span className="font-mono text-[9px] text-ink-700">3 km</span>
      </Beat>

      <div className="mt-2 flex flex-col gap-2">
        {CARDS.map((c, i) => (
          <Beat
            key={c.title}
            p={p}
            at={[0.15 + i * 0.035, 0.24 + i * 0.035]}
            y={18}
            className="scene-raised flex items-center gap-2.5 rounded-2xl border border-line p-2"
          >
            <Thumb className="h-[52px] w-[52px] rounded-xl" tint={tint} seed={i}>
              <span
                className="absolute inset-0"
                style={{ background: ALPHA(10) }}
              />
            </Thumb>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-[11px] font-medium text-ink-100">{c.title}</span>
              <span className="truncate text-[9px] text-ink-700">{c.meta}</span>
              <span
                className="font-serif text-[12px] font-semibold"
                style={{ color: "var(--tint)" }}
              >
                {c.price}
              </span>
            </span>
          </Beat>
        ))}
      </div>
    </div>
  );
}

function MapScreen({ p, tint }: { p: MotionValue<number>; tint: string }) {
  const pins = [
    { x: 26, y: 24, label: "1.8 mln" },
    { x: 64, y: 34, label: "4.9 mln" },
    { x: 40, y: 56, label: "900k" },
  ];

  return (
    <div className="relative" style={{ width: SCREEN_W }}>
      {/* Same plate as the desktop map, drawn heavier — at phone scale the
          desktop line weight disappears. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--ink-100) 9%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--ink-100) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <span
        className="absolute left-1/2 top-[42%] h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: `1px dashed ${ALPHA(46)}`, background: ALPHA(9) }}
      />
      {/* where the buyer is standing */}
      <span
        className="absolute left-1/2 top-[42%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "var(--tint)", boxShadow: `0 0 0 4px ${ALPHA(22)}` }}
      />

      <Beat
        p={p}
        at={[0.3, 0.38]}
        y={-10}
        className="absolute inset-x-3 top-3 flex items-center gap-2 rounded-full border border-line bg-ink-900/85 px-3 py-1.5 backdrop-blur"
      >
        <Search className="h-3 w-3 text-ink-500" />
        <span className="text-[9.5px] text-ink-500">Yunusobod · 3 km ichida</span>
      </Beat>

      {pins.map((pin, i) => (
        <Beat
          key={pin.label}
          p={p}
          at={[0.35 + i * 0.03, 0.42 + i * 0.03]}
          scale={0.4}
          className="absolute -translate-x-1/2 rounded-full px-2 py-[3px] text-[9px] font-bold whitespace-nowrap"
          style={{
            left: `${pin.x}%`,
            top: `${pin.y}%`,
            background: "var(--tint)",
            color: "var(--color-on-accent)",
          }}
        >
          {pin.label}
        </Beat>
      ))}

      <Beat
        p={p}
        at={[0.42, 0.5]}
        y={70}
        className="scene-raised absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-line px-4 pb-6 pt-2.5"
      >
        <span className="mx-auto block h-1 w-9 rounded-full bg-line-strong" />
        <div className="mt-3 flex items-center gap-2.5">
          <Thumb className="h-[46px] w-[46px] rounded-xl" tint={tint} seed={2} />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-[11px] font-medium text-ink-100">
              Divan · 3 o&apos;rinli
            </span>
            <span className="truncate text-[9px] text-ink-700">1.2 km · 8 daqiqa piyoda</span>
            <span
              className="font-serif text-[12px] font-semibold"
              style={{ color: "var(--tint)" }}
            >
              1 800 000
            </span>
          </span>
        </div>
      </Beat>
    </div>
  );
}

function ChatScreen({ p, tint }: { p: MotionValue<number>; tint: string }) {
  return (
    <div className="flex flex-col px-4 pt-1" style={{ width: SCREEN_W }}>
      <Beat p={p} at={[0.52, 0.6]} y={-8} className="flex items-center gap-2 pb-2.5">
        <Thumb className="h-7 w-7 rounded-full" tint={tint} seed={1} />
        <span className="flex flex-col">
          <span className="text-[11.5px] font-medium text-ink-100">Aziz R.</span>
          <span className="text-[9px] text-ink-700">onlayn</span>
        </span>
        <span className="flex-1" />
        <span
          className="rounded-full px-2 py-[3px] font-mono text-[8.5px]"
          style={{ background: ALPHA(16), color: "var(--tint)" }}
        >
          42.3°C
        </span>
      </Beat>

      <div className="flex flex-1 flex-col justify-end gap-2 pb-3">
        {BUBBLES.map((b, i) => (
          <Beat
            key={i}
            p={p}
            at={[0.57 + i * 0.035, 0.65 + i * 0.035]}
            y={12}
            className={`max-w-[78%] rounded-2xl px-2.5 py-2 text-[10.5px] leading-snug ${
              b.mine ? "self-end" : "self-start"
            }`}
            style={
              b.mine
                ? { background: "var(--tint)", color: "var(--color-on-accent)" }
                : { background: "var(--surface-2)", color: "var(--color-ink-300)" }
            }
          >
            {b.text}
          </Beat>
        ))}
      </div>

      <Beat p={p} at={[0.6, 0.67]} y={14} className="mb-2 flex items-center gap-2">
        <span className="scene-inset flex-1 rounded-full px-3 py-2 text-[10px] text-ink-700">
          Xabar yozing…
        </span>
        <span
          className="grid h-8 w-8 place-items-center rounded-full"
          style={{ background: "var(--tint)" }}
        >
          <Send className="h-3.5 w-3.5" style={{ color: "var(--color-on-accent)" }} />
        </span>
      </Beat>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Chrome & satellites
 * ------------------------------------------------------------------ */
function TabIcon({
  Icon,
  index,
  choice,
  tabW,
}: {
  Icon: typeof House;
  index: number;
  choice: MotionValue<number>;
  tabW: number;
}) {
  const active = useTransform(choice, (v): number =>
    Math.round(v / tabW) === index ? 1 : 0,
  );
  const opacity = useTransform(active, [0, 1], [0.42, 1]);
  const scale = useTransform(active, [0, 1], [1, 1.1]);

  return (
    <motion.span
      className="grid flex-1 place-items-center pb-3"
      style={{ opacity, scale }}
    >
      <Icon className="h-[18px] w-[18px]" style={{ color: "var(--tint)" }} strokeWidth={1.9} />
    </motion.span>
  );
}

function PalettePicker({
  p,
  choice,
}: {
  p: MotionValue<number>;
  choice: MotionValue<number>;
}) {
  return (
    <Beat
      p={p}
      at={[0.71, 0.8]}
      x={-26}
      className="absolute left-4 top-1/2 w-[186px] -translate-y-1/2 rounded-2xl border border-line bg-ink-900/90 p-3.5 backdrop-blur"
    >
      <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-ink-500 uppercase">
        <Sparkles className="h-3 w-3" />
        Mening designim
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {PALETTES.map((pal, i) => (
          <PaletteSwatch key={i} palette={pal} index={i} choice={choice} />
        ))}
      </div>
      <p className="mt-3 text-[9.5px] leading-relaxed text-ink-700">
        Tanlov qurilmada saqlanadi — ilova butunlay qayta bo&apos;yaladi.
      </p>
    </Beat>
  );
}

function PaletteSwatch({
  palette,
  index,
  choice,
}: {
  palette: { bg: string; fg: string };
  index: number;
  choice: MotionValue<number>;
}) {
  const ring = useTransform(choice, (v) =>
    v === index ? `0 0 0 2px ${palette.fg}` : "0 0 0 1px var(--line)",
  );

  return (
    <motion.span
      className="relative grid h-[34px] place-items-center rounded-xl"
      style={{ background: palette.bg, boxShadow: ring }}
    >
      <span
        className="h-3 w-3 rounded-full"
        style={{ background: palette.fg }}
      />
    </motion.span>
  );
}

function PushCard({ p, tint }: { p: MotionValue<number>; tint: string }) {
  return (
    <Beat
      p={p}
      at={[0.6, 0.69]}
      x={40}
      className="absolute right-5 top-[16%] flex w-[248px] items-start gap-2.5 rounded-2xl border border-line bg-ink-900/92 p-3 backdrop-blur"
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] font-serif text-[13px] font-bold"
        style={{ background: tint, color: "var(--color-on-accent)" }}
      >
        e
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-baseline gap-1.5">
          <span className="text-[11px] font-semibold text-ink-100">eYaqin</span>
          <span className="font-mono text-[8.5px] text-ink-700">hozir</span>
        </span>
        <span className="truncate text-[10px] text-ink-300">
          Aziz R.: Zo&apos;r, soat 7 da boraman 👍
        </span>
      </span>
    </Beat>
  );
}
