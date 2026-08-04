"use client";

import { Check, ScanLine, X } from "lucide-react";
import { motion, useMotionTemplate, useTransform } from "motion/react";
import { Beat, type SceneProps } from "@/components/journey/stage";

/**
 * Scene 02 — SmartGuard.
 *
 * Two halves, and the cut between them is the whole idea. Above: the shop
 * after closing, seen through a camera, with the detector locking on. Below: a
 * sheet of paper that rises over it, because the product's answer to "what
 * happened last night" is a page a human reads and signs off — not a wall of
 * alerts.
 *
 * The real product signs that page in highlighter lime on cold paper. Here the
 * contrast is carried by *value* — the site's one light surface against its
 * darkest — so the section keeps a single hue family.
 */

const HOURS = [0, 3, 6, 9, 12, 15, 18, 21, 24];

/** Hour, and whether a human confirmed it. */
const TICKS = [
  { h: 19.4, alarm: false },
  { h: 21.1, alarm: false },
  { h: 22.8, alarm: true },
  { h: 23.5, alarm: false },
  { h: 2.2, alarm: true },
];

const EVENTS = [
  { time: "22:48", cam: "CAM 02 · Savdo zali", text: "Yopilgandan keyin harakat", verdict: "confirmed" },
  { time: "23:31", cam: "CAM 01 · Kirish", text: "Eshik 40 soniya ochiq qoldi", verdict: "confirmed" },
  { time: "02:12", cam: "CAM 03 · Ombor", text: "Mushuk — yolg'on signal", verdict: "false" },
];

function pad(n: number) {
  return String(Math.floor(n)).padStart(2, "0");
}

export function SceneSurveillance({
  p,
  tint,
  size,
}: SceneProps) {
  const narrow = size === "narrow";
  const wide = size === "wide";
  // The timecode is scrubbed by the page, not by a clock — the visitor is
  // literally scrolling through the night.
  const clock = useTransform(p, (v) => {
    const secs = 19 * 3600 + 42 * 60 + Math.round(v * 8 * 3600);
    return `${pad((secs / 3600) % 24)}:${pad((secs / 60) % 60)}:${pad(secs % 60)}`;
  });

  const nightDim = useTransform(p, [0.42, 0.58], [1, 0.45]);
  const nightBlurPx = useTransform(p, [0.42, 0.58], [0, 3]);
  const nightBlur = useMotionTemplate`blur(${nightBlurPx}px)`;
  const sheetY = useTransform(p, [0.44, 0.6], ["102%", "0%"]);
  const zoneDraw = useTransform(p, [0.8, 0.94], [1, 0]);
  const markerSweep = useTransform(p, [0.64, 0.72], [0, 1]);

  return (
    <Beat
      p={p}
      at={[-0.05, 0.07]}
      scale={0.96}
      blur={8}
      // Only the frame follows the site theme. Everything inside is a shop at
      // night seen through a camera — that is the subject, not the chrome, so
      // it stays dark in both themes and the report sheet keeps its contrast.
      className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-[oklch(0.12_0.006_250)] shadow-(--shadow-scene)"
    >
      {/* ---------------- the shop, after closing ---------------- */}
      <motion.div
        className="scanlines crt-roll absolute inset-0 overflow-hidden"
        style={{ opacity: nightDim, filter: nightBlur }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ink-900),var(--color-ink-950))]" />

        {/* the one lamp left on, hanging over the till */}
        <span
          className="absolute left-[26%] top-6 h-2 w-2 -translate-x-1/2 rounded-full"
          style={{ background: tint, boxShadow: `0 0 24px 8px ${tint}66` }}
        />
        <div
          className="absolute left-[26%] top-6 h-[400px] w-[420px] -translate-x-1/2"
          style={{
            background: `radial-gradient(ellipse 46% 100% at 50% 0%, ${tint}4d, ${tint}1c 40%, transparent 74%)`,
            filter: "blur(22px)",
          }}
        />
        {/* the pool of light it throws on the floor */}
        <div
          className="absolute bottom-[11%] left-[26%] h-[86px] w-[330px] -translate-x-1/2 rounded-[50%]"
          style={{
            background: `radial-gradient(ellipse, ${tint}3d, transparent 70%)`,
            filter: "blur(16px)",
          }}
        />

        {/* shelving, and the aisle between it */}
        {[
          { l: 4, w: 15, h: 44 },
          { l: 21, w: 13, h: 36 },
          { l: 62, w: 16, h: 40 },
          { l: 80, w: 15, h: 33 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute bottom-[16%] rounded-sm"
            style={{
              left: `${s.l}%`,
              width: `${s.w}%`,
              height: `${s.h}%`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03) 30%, rgba(0,0,0,0.4))",
              // Light comes from the left, so only the left cheek catches it.
              boxShadow: `inset 2px 0 0 ${tint}30, inset 0 1px 0 rgba(255,255,255,0.14)`,
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-[16%] h-px bg-white/[0.1]" />

        {/* the thing the detector is about to notice */}
        <Beat
          p={p}
          at={[0.1, 0.2]}
          className="absolute bottom-[17%] left-[45%]"
          style={{ width: 46, height: 118 }}
        >
          <span
            className="absolute left-1/2 top-0 h-[26px] w-[26px] -translate-x-1/2 rounded-full bg-[#0a0806]"
            style={{ boxShadow: `-1.5px -1px 0 ${tint}55, 0 0 20px rgba(0,0,0,0.9)` }}
          />
          <span
            className="absolute inset-x-1.5 top-[24px] bottom-0 rounded-t-[18px] bg-[#0a0806]"
            style={{ boxShadow: `-1.5px 0 0 ${tint}4d` }}
          />
        </Beat>

        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_42%,transparent_46%,rgba(0,0,0,0.72)_100%)]" />
      </motion.div>

      {/* ---------------- camera overlay ---------------- */}
      <Beat p={p} at={[0.05, 0.15]} className="pointer-events-none absolute inset-0">
        {/* framing brackets */}
        {[
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-b border-l",
          "right-3 bottom-3 border-b border-r",
        ].map((cls, i) => (
          <span
            key={i}
            className={`absolute h-5 w-5 ${cls}`}
            style={{ borderColor: `${tint}88` }}
          />
        ))}

        <div className="absolute left-6 top-4 flex flex-col gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.16em] text-white/70">
            CAM 02 · SAVDO ZALI
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] text-white/45">
            <span
              className="h-1.5 w-1.5 rounded-full bg-rec"
              style={{ animation: "rec-blink 1.6s linear infinite" }}
            />
            REC · 1920×1080 · 24 fps
          </span>
        </div>
        <motion.div
          className="absolute right-6 top-4 font-mono text-[10px] tracking-[0.16em]"
          style={{ color: tint }}
        >
          {clock}
        </motion.div>
      </Beat>

      {/* the lock-on: a loose box that tightens onto the figure */}
      <Beat
        p={p}
        at={[0.16, 0.3]}
        scale={1.45}
        className="pointer-events-none absolute"
        style={{ left: "43%", bottom: "16%", width: 66, height: 128 }}
      >
        <span
          className="absolute inset-0 rounded-[3px]"
          style={{ boxShadow: `0 0 0 1.5px ${tint}, 0 0 22px ${tint}44` }}
        />
        <Beat
          p={p}
          at={[0.26, 0.34]}
          y={-6}
          className="absolute -top-[19px] left-0 rounded-[3px] px-1.5 py-[2px] font-mono text-[9px] font-semibold whitespace-nowrap"
          style={{ background: tint, color: "var(--color-on-accent)" }}
        >
          odam · 0.94
        </Beat>
      </Beat>

      <Beat
        p={p}
        at={[0.32, 0.42]}
        scale={1.3}
        className="pointer-events-none absolute"
        style={{ right: "9%", bottom: "17%", width: 54, height: 92 }}
      >
        <span
          className="absolute inset-0 rounded-[3px]"
          style={{ boxShadow: `0 0 0 1.5px ${tint}77` }}
        />
        <span
          className="absolute -top-[18px] right-0 rounded-[3px] px-1.5 py-[2px] font-mono text-[9px] whitespace-nowrap"
          style={{ background: `${tint}26`, color: tint }}
        >
          eshik · ochiq
        </span>
      </Beat>

      {/* ---------------- the day, as a sheet of paper ---------------- */}
      <motion.div
        className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-2xl bg-paper text-paper-ink shadow-[0_-30px_70px_-20px_rgba(0,0,0,0.85)]"
        style={{ height: "77%", y: sheetY }}
      >
        <div className="paper-rule absolute inset-0 opacity-40" />

        <div className="relative flex h-full gap-6" style={{ padding: narrow ? 14 : 24 }}>
          {/* ---- report ---- */}
          <div className="flex min-w-0 flex-1 flex-col">
            <Beat p={p} at={[0.54, 0.62]} y={10} className="flex items-baseline justify-between">
              <span className="font-mono text-[9.5px] tracking-[0.18em] text-paper-ink-2 uppercase">
                Seshanba · 3 avgust 2026
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.18em] text-paper-ink-2 uppercase">
                <ScanLine className="h-3 w-3" />
                SmartGuard
              </span>
            </Beat>

            <Beat p={p} at={[0.58, 0.67]} y={14} className="mt-4">
              <h4 className={narrow ? "text-[19px] leading-[1.1] font-bold tracking-[-0.03em]" : "text-[27px] leading-[1.08] font-bold tracking-[-0.035em]"}>
                <span className="relative inline-block">
                  {/* The product's signature: a marker stroke, drawn not printed.
                      It sits under the glyphs as a sibling — a negative z-index
                      would drop it behind the sheet itself. */}
                  <motion.span
                    aria-hidden
                    className="absolute -inset-x-1 bottom-[3px] top-[6px] origin-left rounded-[2px]"
                    style={{ background: `${tint}59`, rotate: -0.7, scaleX: markerSweep }}
                  />
                  <span className="relative">2 ta holat</span>
                </span>{" "}
                sizni kutmoqda.
              </h4>
              <p className="mt-2.5 max-w-[46ch] text-[12px] leading-relaxed text-paper-ink-2">
                Har birini ko&apos;rib chiqing va tasdiqlang yoki yolg&apos;on signal deb
                belgilang. Bu tizimni aniqroq qiladi.
              </p>
            </Beat>

            {/* ---- the night as a ruler ---- */}
            <Beat p={p} at={[0.68, 0.76]} y={12} className="relative mt-6 h-9">
              <span className="absolute inset-x-0 top-3 h-px bg-paper-rule" />
              {(narrow ? HOURS.filter((h) => h % 6 === 0) : HOURS).map((h) => (
                <span
                  key={h}
                  className="absolute top-3 flex -translate-x-1/2 flex-col items-center"
                  style={{ left: `${(h / 24) * 100}%` }}
                >
                  <span className="h-1.5 w-px bg-paper-rule" />
                  <span className="mt-1 font-mono text-[8.5px] text-paper-ink-2">
                    {pad(h)}
                  </span>
                </span>
              ))}
              {TICKS.map((t, i) => (
                <Beat
                  key={i}
                  p={p}
                  at={[0.71 + i * 0.012, 0.77 + i * 0.012]}
                  scale={0.2}
                  className="absolute top-[3px] h-[19px] w-[3px] -translate-x-1/2 rounded-full"
                  style={{
                    left: `${(t.h / 24) * 100}%`,
                    background: t.alarm ? tint : "var(--color-paper-rule)",
                    transformOrigin: "50% 100%",
                  }}
                />
              ))}
            </Beat>

            {/* ---- what a human decided ---- */}
            <div className="mt-5 flex items-center gap-3">
              <Beat p={p} at={[0.72, 0.78]} className="text-[11.5px] font-semibold">
                Bugungi holatlar
              </Beat>
              <Beat p={p} at={[0.73, 0.79]} className="h-px flex-1 bg-paper-rule" />
              <Beat p={p} at={[0.74, 0.8]} className="font-mono text-[10px] text-paper-ink-2">
                {EVENTS.length}
              </Beat>
            </div>

            <div className="mt-2.5 flex flex-col">
              {EVENTS.map((e, i) => (
                <Beat
                  key={e.time}
                  p={p}
                  at={[0.76 + i * 0.04, 0.84 + i * 0.04]}
                  x={-14}
                  className="flex items-center gap-3 border-b border-paper-rule py-2.5 last:border-0"
                >
                  <code className="w-[38px] shrink-0 font-mono text-[11px] tabular-nums">
                    {e.time}
                  </code>
                  <span
                    className="h-[30px] w-[44px] shrink-0 rounded-[3px]"
                    style={{
                      background: `linear-gradient(135deg, ${tint}2e, var(--color-paper-2))`,
                    }}
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[11.5px] font-medium">{e.text}</span>
                    <span className="truncate font-mono text-[9px] text-paper-ink-2">
                      {e.cam}
                    </span>
                  </span>
                  <span
                    className="flex shrink-0 items-center gap-1 rounded-[3px] px-1.5 py-1 font-mono text-[9px]"
                    style={
                      e.verdict === "confirmed"
                        ? { background: "var(--color-paper-ink)", color: "var(--color-paper)" }
                        : { boxShadow: "inset 0 0 0 1px var(--color-paper-rule)", color: "var(--color-paper-ink-2)" }
                    }
                  >
                    {e.verdict === "confirmed" ? (
                      <Check className="h-2.5 w-2.5" />
                    ) : (
                      <X className="h-2.5 w-2.5" />
                    )}
                    {e.verdict === "confirmed" ? "tasdiqlandi" : "yolg'on"}
                  </span>
                </Beat>
              ))}
            </div>
          </div>

          {/* ---- the zone a human drew for the model ---- */}
          {wide && (
            <Beat p={p} at={[0.78, 0.86]} x={20} className="w-[236px] shrink-0">
              <p className="font-mono text-[9.5px] tracking-[0.16em] text-paper-ink-2 uppercase">
                Kuzatuv zonasi
              </p>
              <div className="mt-2.5 overflow-hidden rounded-[4px] bg-ink-950">
                <svg viewBox="0 0 236 148" className="block h-[148px] w-full">
                  <defs>
                    <linearGradient id="sg-floor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
                    </linearGradient>
                  </defs>
                  <rect width="236" height="148" fill="url(#sg-floor)" />
                  {[36, 72, 108].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="236"
                      y2={y}
                      stroke="rgba(255,255,255,0.05)"
                    />
                  ))}
                  <motion.polygon
                    points="30,116 66,54 168,44 210,110"
                    fill={`${tint}1c`}
                    stroke={tint}
                    strokeWidth="1.5"
                    pathLength={1}
                    strokeDasharray={1}
                    style={{ strokeDashoffset: zoneDraw }}
                  />
                  {[
                    [30, 116],
                    [66, 54],
                    [168, 44],
                    [210, 110],
                  ].map(([cx, cy]) => (
                    <circle key={`${cx}`} cx={cx} cy={cy} r="3.5" fill={tint} />
                  ))}
                </svg>
              </div>
              <p className="mt-2.5 text-[10.5px] leading-relaxed text-paper-ink-2">
                Model faqat shu ko&apos;pburchak ichidagi harakatni hisobga oladi — ko&apos;cha
                va kassa ortidagi yo&apos;lak yolg&apos;on signal bermaydi.
              </p>

              <div className="mt-3.5 rounded-[4px] bg-paper-2 p-2.5">
                <p className="font-mono text-[9px] tracking-[0.14em] text-paper-ink-2 uppercase">
                  Aniqlik
                </p>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-[20px] font-bold tracking-tight">94</span>
                  <span className="text-[10px] text-paper-ink-2">
                    % — 30 kunlik tasdiqlangan javoblar
                  </span>
                </div>
              </div>
            </Beat>
          )}
        </div>
      </motion.div>
    </Beat>
  );
}
