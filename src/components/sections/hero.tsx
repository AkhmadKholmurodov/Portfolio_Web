"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useLanguage } from "@/components/providers/language-provider";
import { metrics, profile } from "@/content/profile";
import { Tooltip } from "@/components/ui/tooltip";

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

        {/* The portrait sits beside the lead rather than beside the headline:
            at full size the headline needs the whole measure, and squeezing it
            to make room for a photograph would cost the one thing the first
            screen is actually for.

            It is also where the schematic's origin node is — the traces
            behind it radiate out from roughly this point, so on a wide screen
            the network appears to come out from behind him. That is the
            section's whole claim, drawn.

            Below `md` it is dropped: on a phone the hero is already four
            screens of type, and a thumbnail-sized portrait squeezing the lead
            paragraph into a ten-line column helps nobody. The face arrives
            further down instead, at full width. */}
        <div className="mt-9 grid gap-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12 lg:gap-16">
          <div>
            <p
              className="lift-in max-w-xl text-[0.9375rem] leading-relaxed text-ink-300 md:text-base"
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
              className="lift-in mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] tracking-wide text-ink-600"
              style={{ animationDelay: "700ms" }}
            >
              <span className="text-signal">{t.hero.availability}</span>
              <span className="text-ink-800">/</span>
              <span>{t.hero.visa}</span>
              <span className="text-ink-800">/</span>
              <span>{t.hero.languages}</span>
            </div>
          </div>

          <div
            className="lift-in hidden md:block"
            style={{ animationDelay: "560ms" }}
          >
            <div className="media-frame lift-card relative w-48 rounded-2xl border border-line lg:w-72">
              <Image
                src="/photos/portrait.webp"
                alt={profile.name}
                width={901}
                height={1280}
                sizes="(max-width: 1024px) 12rem, 18rem"
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

     
      <div className="shell mt-14 w-full md:mt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 md:grid-cols-4 md:gap-x-10">
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
                      <NumberTicker
                        value={m.value}
                        decimals={m.decimals}
                        prefix={"prefix" in m ? m.prefix : ""}
                        suffix={m.suffix}
                      />
                    </p>
                    <p className="mt-2 text-[0.8125rem] text-ink-300">{copy.label}</p>
                    <p className="mt-1 font-mono text-[0.6875rem] tracking-wide text-ink-700">
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
