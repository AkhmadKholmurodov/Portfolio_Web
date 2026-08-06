"use client";

import { useLanguage } from "@/components/providers/language-provider";

const CHANNELS = ["lowshop.net", "Coupang", "Naver SmartStore", "Toss"];

/**
 * lowshop.net is the one project with no screenshots — it is a company's
 * production storefront, not something to publish captures of. So it gets a
 * diagram instead, and the diagram is the actual point of the case study: one
 * catalogue, one synchronisation job, four places a price has to be true at
 * once.
 */
export function ChannelsDiagram() {
  const { t } = useLanguage();

  return (
    <div className="relative flex h-full min-h-64 w-full flex-col justify-center gap-6 rounded-xl border border-line bg-void/50 p-6 md:p-8">
      <div className="blueprint pointer-events-none absolute inset-0 rounded-[inherit] opacity-50" />

      <div className="relative flex flex-col gap-1">
        <span className="label">SAMBU</span>
        <span className="font-mono text-[0.8125rem] text-ink-200">catalogue</span>
      </div>

      {/* The sync job. Amber because it is the live piece — the thing that is
          running right now and the thing that, if it stops, makes the four
          boxes below disagree. */}
      <div className="relative flex items-center gap-3">
        <span className="h-px flex-1 bg-linear-to-r from-signal/60 to-signal/10" />
        <span className="rounded-full border border-signal-line px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-signal uppercase">
          sync
        </span>
        <span className="h-px flex-1 bg-linear-to-l from-signal/60 to-signal/10" />
      </div>

      <div className="relative grid grid-cols-2 gap-2">
        {CHANNELS.map((name) => (
          <div
            key={name}
            className="rounded-lg border border-line bg-surface/60 px-3 py-2.5"
          >
            <span className="font-mono text-[0.6875rem] tracking-wide text-ink-300">
              {name}
            </span>
          </div>
        ))}
      </div>

      <p className="relative font-mono text-[0.625rem] leading-relaxed tracking-wide text-ink-700">
        {t.work.stats.channels} · 4
      </p>
    </div>
  );
}
