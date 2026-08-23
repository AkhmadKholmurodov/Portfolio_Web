"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useLanguage } from "@/components/providers/language-provider";
import { heroPortrait, metrics, profile } from "@/content/profile";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * The first screen. Three sentences that are the whole argument of the site,
 * four numbers that are all checkable, and nothing else.
 */
export function Hero() {
  const { t } = useLanguage();
  const lines = [t.hero.line1, t.hero.line2, t.hero.line3];

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end pt-28 pb-8 md:justify-center md:pt-32 md:pb-10"
    >
      <div className="shell w-full">
        <p
          className="label lift-in flex items-center gap-2.5"
          style={{ animationDelay: "80ms" }}
        >
          <span className="size-1.5 animate-breathe rounded-full bg-signal" />
          {t.hero.label}
        </p>

        <h1 className="display-1 mt-7 text-ink-100">
          {lines.map((line, i) => (
            // Each line is clipped by its own row so it can slide up from
            // underneath rather than fading in place — the difference between
            // type that arrives and type that appears.
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <span
                className="rise-in block"
                style={{ animationDelay: `${140 + i * 110}ms` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* The portrait column, when there is a portrait — see `heroPortrait`
            in `content/profile.ts`, which is the only place that decides.

            It sits beside the lead rather than beside the headline: at full
            size the headline needs the whole measure, and squeezing it to make
            room for a photograph would cost the one thing the first screen is
            actually for. It is also roughly where the schematic's origin node
            is, so on a wide screen the network appears to radiate from behind
            him.

            Below `md` it is dropped either way: on a phone the hero is already
            four screens of type, and a thumbnail-sized portrait squeezing the
            lead paragraph into a ten-line column helps nobody. With no
            portrait the lead simply takes the full measure and the stats come
            up to meet it. */}
        <div
          className={cn(
            "mt-8 grid gap-9 md:items-start md:gap-12 lg:gap-16",
            heroPortrait && "md:grid-cols-[minmax(0,1fr)_auto]",
          )}
        >
          <div>
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
              {/* The page's one piece of purely decorative self-starting
                  motion, on the page's one primary action. */}
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

          {heroPortrait && (
            <div
              className="lift-in hidden md:block"
              style={{ animationDelay: "560ms" }}
            >
              <div className="media-frame lift-card relative w-48 rounded-2xl border border-line lg:w-72">
                <Image
                  src={heroPortrait.src}
                  alt={profile.name}
                  width={heroPortrait.width}
                  height={heroPortrait.height}
                  sizes="(max-width: 1024px) 12rem, 18rem"
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="shell mt-10 w-full md:mt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7 tabular-nums md:grid-cols-4 md:gap-x-10">
          {metrics.map((m, i) => {
            const copy = t.metrics[m.key as keyof typeof t.metrics];
            return (
              <div
                key={m.key}
                className="lift-in "
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
                    <p className="mt-2 text-caption text-ink-300">{copy.label}</p>
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
