"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button, buttonStack } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useLanguage } from "@/components/providers/language-provider";
import { heroPortrait, metrics, profile } from "@/content/profile";
import { Tooltip } from "@/components/ui/tooltip";
import { ArchPortrait } from "./arch-portrait";
import { HeroAmbient } from "./hero-ambient";

/**
 * The first screen: who he is, what he does, four numbers, and his face.
 *
 * The section is exactly one viewport minus the nav, and it is a flex column
 * with three parts: the nav's own 74px, a grid that takes everything left
 * over, and the stats row. That is what pins the numbers to the fold — not a
 * hand-tuned padding, which is the usual way this is done and which breaks the
 * moment a line of copy wraps differently in Korean.
 *
 * The headline is the name now. The three claims it replaces were doing the
 * right job in English and the wrong one in Korean, where they read as three
 * unrelated declarative sentences rather than as one argument — and they now
 * live on the OG card, which is English-only and is where a claim aimed at a
 * stranger belongs.
 */

/** One entrance, one cadence. 80ms per step, in the order the eye reads. */
const STEP = 80;
const step = (i: number) => ({ animationDelay: `${120 + i * STEP}ms` });

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      // `mt` rather than `pt`: the nav is fixed, so the height it occupies has
      // to come out of the hero's box, not out of its own min-height.
      //
      // The min-height is capped at 56rem. Without the cap a very tall window
      // stretches the hero to match it, and because the grid inside is
      // `flex-1` and centred, every pixel of that goes into one gap between
      // the meta row and the numbers — 300px of nothing on a 1440-tall screen.
      // Capped, the composition holds its proportions and the overflow becomes
      // the top of the next section, which is a better thing to do with the
      // space anyway: it says there is a page here.
      className="relative mt-[74px] flex min-h-[min(calc(100svh-74px),56rem)] flex-col overflow-hidden"
    >
      <HeroAmbient />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center py-10">
        {/* Below 980 the portrait goes above the text. `flex-col-reverse` puts
            it there without moving it in the DOM, so the reading order stays
            name-first for anything that is not looking at the page. */}
        <div className="flex w-full flex-col-reverse gap-12 min-[980px]:grid min-[980px]:grid-cols-[1.05fr_0.95fr] min-[980px]:items-center min-[980px]:gap-[clamp(2rem,5vw,5rem)]">
          <div>
            {/* `items-start` and a nudge, not `items-center`: the label wraps
                to two lines below about 420px, and a centred dot then sits in
                the gutter between them pointing at nothing. Aligned to the
                first line it keeps meaning "this line is live". */}
            <p className="lift-in label flex items-start gap-2.5" style={step(0)}>
              <span className="mt-[0.45em] size-1.5 shrink-0 animate-breathe rounded-full bg-signal" />
              <span>{t.hero.label}</span>
            </p>

            <h1 className="mt-7 text-ink-100">
              {/* Each line is clipped by its own row so it can rise from
                  underneath rather than fade in place — the difference between
                  type that arrives and type that appears. Two spans, not a
                  splitting library: the break is a decision, so it is written
                  down rather than measured at runtime. */}
              {profile.nameLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span className="display-1 rise-in block" style={step(1 + i)}>
                    {line}
                  </span>
                </span>
              ))}
              <span className="mt-3 block overflow-hidden pb-[0.08em]">
                <span className="hero-role rise-in block" style={step(3)}>
                  {t.hero.role}
                </span>
              </span>
            </h1>

            <p className="lift-in lede measure mt-8" style={step(4)}>
              {t.hero.lead}
            </p>

            {/* Full width and stacked on a phone, side by side from `sm`.
                Two pills of different widths stacked down a narrow screen read
                as a layout accident rather than as a pair, and the ragged
                right edge is the first thing the eye finds. */}
            <div
              className="lift-in mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={step(5)}
            >
              {/* The page's one piece of purely decorative self-starting
                  motion, on the page's one primary action. */}
              <BorderBeam className="w-full sm:w-auto">
                <Button asChild size="lg" className={buttonStack}>
                  <Link href="/#build">
                    {t.hero.ctaWork}
                    <ArrowDown />
                  </Link>
                </Button>
              </BorderBeam>
              <Button asChild variant="outline" size="lg" className={buttonStack}>
                <a href={profile.resume} download>
                  {t.hero.ctaResume}
                  <ArrowUpRight />
                </a>
              </Button>
            </div>

          </div>

          {heroPortrait && (
            // `justify-self` would shrink this cell to fit, and the frame's
            // width is a percentage of the cell — which is the circular
            // definition that resolves to zero. The cell stretches; the frame
            // centres itself inside it.
            <div className="arch-in" style={step(7)}>
              <ArchPortrait portrait={heroPortrait} />
            </div>
          )}
        </div>

        {/* The meta row spans the shell rather than the text column.
            Measured: the three facts need 1008px set on one line, and the
            1.05fr column at 1440px is 609px wide — so inside that column the
            "one line at 1440" rule is arithmetically unreachable without
            cutting the copy. Across the full 1232px it holds, and the row
            reads as the hero's footer, which is what it is. */}
        <div
          className="lift-in mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-label tracking-label text-ink-400"
          style={step(6)}
        >
          <span className="text-signal">{t.hero.availability}</span>
          {/* Punctuation between three separate facts, not content. It is
              deliberately below the text-contrast floor, so it says so — and
              it is gone wherever the row wraps, because a separator that
              starts a line is separating nothing. */}
          <span aria-hidden className="hidden text-ink-800 min-[980px]:inline">
            /
          </span>
          <span>{t.hero.visa}</span>
          <span aria-hidden className="hidden text-ink-800 min-[980px]:inline">
            /
          </span>
          <span>{t.hero.languages}</span>
        </div>
      </div>

      {/* The numbers land on the fold because the grid above them is
          `flex-1`, not because anything here was measured. */}
      <div className="fade-in shell relative z-10 w-full pb-9" style={step(8)}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 border-t border-line pt-7 tabular-nums md:grid-cols-4 md:gap-x-10">
          {metrics.map((m) => {
            const copy = t.metrics[m.key as keyof typeof t.metrics];
            return (
              <div key={m.key}>
                <Tooltip content={copy.source}>
                  <div className="cursor-default">
                    <p className="stat-number text-ink-100">
                      {m.display ? (
                        <span className="tabular-nums">{m.display}</span>
                      ) : (
                        <NumberTicker
                          value={m.value ?? 0}
                          decimals={m.decimals}
                          prefix={m.prefix}
                          suffix={m.suffix}
                          grouped={m.grouped}
                        />
                      )}
                    </p>
                    <p className="mt-2 text-stat-label text-ink-300">
                      {copy.label}
                    </p>
                    <p className="mt-1 caption font-mono tracking-label">
                      {copy.source}
                    </p>
                  </div>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
