"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useLanguage } from "@/components/providers/language-provider";
import { heroPortrait, metrics, profile } from "@/content/profile";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { IdentityBadge, IdentityCard } from "./identity-card";

/**
 * The first screen: who he is, what he does, four numbers, and his face.
 *
 * The figure is positioned against the section rather than placed in the grid,
 * so it can bleed off the right edge and stand on the rule above the stats
 * instead of sitting in a box beside the lead. The text column is capped
 * instead — `md:max-w-[58%] lg:max-w-[57%]` is the single thing guaranteeing the headline
 * never runs underneath him, and it does that without either element needing
 * to know the other's size.
 */
export function Hero() {
  const { t } = useLanguage();
  // Name on the first two lines, role on the third.
  const lines = [t.hero.line1, t.hero.line2, t.hero.line3];

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-8 md:pt-32 md:pb-10"
    >
      {/* The content row owns the figure, not the section. That is what puts
          his feet on the rule above the stats instead of letting him run down
          behind them — the numbers are the one thing on this screen that must
          never be obstructed. */}
      <div className="relative flex flex-1 flex-col justify-end md:justify-center">
        <div className="shell relative z-10 w-full">
          <div
            className={cn(
              "grid items-center gap-10",
              heroPortrait &&
                "md:grid-cols-[minmax(0,1fr)_minmax(0,272px)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16",
            )}
          >
            <div>
              <div
                className="lift-in flex items-center gap-3.5"
                style={{ animationDelay: "80ms" }}
              >
                {heroPortrait && <IdentityBadge src={heroPortrait.avatar} />}
                <p className="label flex items-center gap-2.5">
                  <span className="size-1.5 animate-breathe rounded-full bg-signal" />
                  {t.hero.label}
                </p>
              </div>

              <h1 className="mt-7 text-ink-100">
                {lines.map((line, i) => (
                  // Each line is clipped by its own row so it can slide up from
                  // underneath rather than fading in place — the difference between
                  // type that arrives and type that appears.
                  <span key={i} className="block overflow-hidden pb-[0.06em]">
                    <span
                      className={cn(
                        "rise-in block",
                        // The name dominates; the role is a subtitle in the accent.
                        // Set at display-1 the role became the loudest thing on the
                        // page, which is the wrong way round — and at that size it
                        // could not sit beside the figure anyway.
                        i === lines.length - 1
                          ? "display-3 pt-2 text-signal"
                          : "display-1",
                      )}
                      style={{ animationDelay: `${140 + i * 110}ms` }}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <div className="mt-8">
                <p
                  className="lift-in max-w-xl text-body text-ink-300"
                  style={{ animationDelay: "520ms" }}
                >
                  {t.hero.lead}
                </p>

                <div
                  className="lift-in mt-8 flex flex-wrap items-center gap-3"
                  style={{ animationDelay: "620ms" }}
                >
                  {/* The page's one piece of purely decorative self-starting motion,
                  on the page's one primary action. */}
                  <BorderBeam>
                    <Button asChild size="lg">
                      <Link href="/#build">
                        {t.hero.ctaWork}
                        <ArrowDown />
                      </Link>
                    </Button>
                  </BorderBeam>
                  <Button asChild variant="outline" size="lg">
                    <a href={profile.resume} download>
                      {t.hero.ctaResume}
                      <ArrowUpRight />
                    </a>
                  </Button>
                </div>

                <div
                  className="lift-in mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-label tracking-label text-ink-400"
                  style={{ animationDelay: "700ms" }}
                >
                  <span className="text-signal">{t.hero.availability}</span>
                  {/* Punctuation between three separate facts, not content. It is
                  deliberately below the text-contrast floor, so it says so. */}
                  <span aria-hidden className="text-ink-800">
                    /
                  </span>
                  <span>{t.hero.visa}</span>
                  <span aria-hidden className="text-ink-800">
                    /
                  </span>
                  <span>{t.hero.languages}</span>
                </div>
              </div>
            </div>

            {heroPortrait && <IdentityCard portrait={heroPortrait} />}
          </div>
        </div>
      </div>

      <div className="shell relative z-10 mt-10 w-full md:mt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7 tabular-nums md:grid-cols-4 md:gap-x-10">
          {metrics.map((m, i) => {
            const copy = t.metrics[m.key as keyof typeof t.metrics];
            return (
              <div
                key={m.key}
                className="lift-in"
                style={{ animationDelay: `${780 + i * 70}ms` }}
              >
                <Tooltip content={copy.source}>
                  <div className="cursor-default">
                    <p className="display-3 text-ink-100">
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
                    <p className="mt-2 text-caption text-ink-300">
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
