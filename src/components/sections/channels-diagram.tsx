"use client";

import { useLanguage } from "@/components/providers/language-provider";

/** The three places an order can come from. */
const CHANNELS = ["lowshop.net", "Coupang", "Naver SmartStore"];

/**
 * The rails an order can be paid on. These are not channels — nobody browses a
 * catalogue on Toss Pay — and putting them in the same row as Coupang is the
 * single most common way this diagram gets read wrong.
 */
const PAYMENTS = ["Toss Payments", "KG Inicis", "Toss Pay", "Naver Pay", "Kakao Pay"];

/**
 * lowshop.net is the one project with no screenshots — it is a company's
 * production storefront, not something to publish captures of. So it gets a
 * diagram instead, and the diagram is the actual point of the case study: one
 * catalogue, one synchronisation job, three places a price has to be true at
 * once, and a separate row of payment rails underneath.
 */
export function ChannelsDiagram() {
  const { t } = useLanguage();

  return (
    <div className="relative flex h-full w-full min-w-0 flex-col justify-center gap-3 rounded-xl border border-line bg-void/50 p-4 md:min-h-64 md:gap-5 md:p-8">
      <div className="blueprint pointer-events-none absolute inset-0 rounded-[inherit] opacity-50" />

      <div className="relative flex flex-col gap-1">
        <span className="label">SAMBU</span>
        <span className="font-mono text-ui text-ink-200 md:text-body">catalogue</span>
      </div>

      {/* The sync job. Celadon because it is the live piece — the thing that is
          running right now and the thing that, if it stops, makes the three
          boxes below disagree. */}
      <div className="relative flex items-center gap-3">
        <span className="h-px flex-1 bg-linear-to-r from-signal/60 to-signal/10" />
        <span className="rounded-full border border-signal-line px-2.5 py-1 font-mono text-label tracking-label text-signal uppercase">
          sync
        </span>
        <span className="h-px flex-1 bg-linear-to-l from-signal/60 to-signal/10" />
      </div>

      {/* Three boxes, one row — and on a phone that row scrolls sideways
          rather than stacking. Stacked, these three cost 126px of a card that
          has to fit under a 74px nav on an 844px screen; as a swipeable row
          they cost 38 and nothing is dropped. It also keeps the shape of the
          idea intact: three destinations *beside* each other, which is the
          whole reason they are boxes and not a list. The row bleeds to the
          panel's edge so the third box is visibly clipped — that clip is the
          affordance. */}
      <div className="hide-scrollbar relative -mx-4 flex min-w-0 gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-2 sm:overflow-visible sm:px-0">
        {CHANNELS.map((name) => (
          <div
            key={name}
            className="shrink-0 rounded-lg border border-line bg-surface/60 px-3 py-1.5 md:py-2.5"
          >
            <span className="font-mono text-label tracking-label whitespace-nowrap text-ink-300">
              {name}
            </span>
          </div>
        ))}
      </div>

      <p className="relative font-mono text-label tracking-label text-ink-400">
        {t.work.stats.channels} · 3
      </p>

      {/* A separate row, below the divider, so the hierarchy states the thing
          the old diagram got wrong: these are how an order is paid for, not
          where it comes from. */}
      <div className="relative min-w-0 border-t border-line pt-3 md:mt-1 md:pt-4">
        <p className="label mb-2 md:mb-3">{t.work.payments}</p>
        {/* Same trade as the channels above: five rails wrap to three lines on
            a phone and ride in one swipeable line instead. */}
        <ul className="hide-scrollbar -mx-4 flex min-w-0 gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {PAYMENTS.map((name) => (
            <li
              key={name}
              className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-label tracking-label whitespace-nowrap text-ink-400"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
