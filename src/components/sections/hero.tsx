"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { heroSystems, profile, type HeroSystem } from "@/content/profile";
import { Container } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { CountUp, Scramble, SplitChars } from "@/components/ui/text-fx";
import { cn } from "@/lib/utils";

/**
 * The first screen as an operator's board, set on a centre axis.
 *
 * Every portfolio says "I build web products". His claim is narrower and
 * harder: he builds them *and then keeps them running*. A sentence cannot
 * carry that — a panel of the three systems he actually operates can, and it
 * turns the first screen from an assertion into an exhibit. A recruiter gets
 * the name, the role and the right to work in the first two seconds, and the
 * evidence for all of it in the next two, without scrolling.
 *
 * The panel is built only from checkable facts: a product name, whether it is
 * in production or a pilot, and one number he stands behind. There is no
 * invented telemetry in it — see the note on `heroSystems`.
 *
 * Everything hangs off one vertical axis. A centred masthead has no slack to
 * distribute, which is what makes it hold together at any width: there is no
 * long side and short side to fall out of balance, so the composition that
 * works on a laptop is the same one that works on a phone.
 */
export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const [first, ...rest] = profile.name.split(" ");
  const lines = [first, rest.join(" ")];

  // Years and languages only. Uptime and the cost cut are on the board above,
  // and a proof bar that repeats the panel is just the same claim twice.
  const footnote = [t.hero.stats[0], t.hero.stats[3]];

  return (
    <section
      ref={ref}
      id="home"
      className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-ink-950"
    >
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-40"
      />

      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="relative flex flex-1 items-center pt-(--header-h)"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="hero-lift inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[blip_2.4s_ease-in-out_infinite]" />
              <Scramble text={t.hero.available} delay={0.55} />
            </span>

            {/* Two blocks with a real space between them, not two forced
                lines. Each name is an `inline-block`, so a line can break
                between them but never inside one — the phone gets two lines
                and the desktop gets one, from the same markup and without a
                breakpoint deciding it. */}
            <h1 className="mt-3.5 text-[clamp(2.1rem,8.6vw,2.9rem)] font-medium leading-[0.98] tracking-[-0.045em] text-ink-100 sm:text-[clamp(2.6rem,4.6vw,3.9rem)] sm:leading-[1] md:mt-4">
              <SplitChars text={lines[0]} delay={0.14} />{" "}
              <SplitChars text={lines[1]} delay={0.14 + lines[0].length * 0.02} />
            </h1>

            <p
              style={{ animationDelay: "0.42s" }}
              className="hero-lift mt-3.5 text-xl font-medium tracking-tight text-ink-100 sm:text-2xl md:mt-4"
            >
              {t.hero.role}
            </p>

            <p
              style={{ animationDelay: "0.5s" }}
              className="hero-lift mt-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.16em] text-ink-300"
            >
              <Scramble text={t.hero.location} delay={0.78} dwell={26} />
            </p>

            {/* Wide enough to read as a picture of a person rather than a
                headshot crop: at 3:2 the frame holds a little over half the
                source height, which is hair to waist.

                The `svh` cap is what keeps that true across phones. A hero
                this dense — name, role, right-to-work, three systems, three
                actions — has a fixed budget, and on a short screen the
                photograph is the only element that can give height back. It
                yields to a head-and-shoulders band there and opens back up to
                the full 3:2 the moment there is room. */}
            <div
              style={{ animationDelay: "0.3s" }}
              // Two ways of sizing one box. On a phone width is the scarce
              // thing, so the frame takes the column and a height cap trims
              // the ratio — it becomes a shallower band and crops tighter. On
              // a desktop height is the scarce thing, so the height leads and
              // `w-fit` lets the 3:2 resolve the width, which keeps the full
              // hair-to-waist crop instead of shearing the shoulders off.
              className="hero-lift relative mx-auto mt-4 aspect-3/2 max-h-[23svh] w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface shadow-(--shadow-scene) sm:mt-5 md:mt-6 md:h-[22svh] md:max-h-none md:w-fit md:max-w-none"
            >
              <Image
                src="/hero-portrait.webp"
                alt={`${profile.name} — ${t.hero.role}`}
                width={800}
                height={1000}
                preload
                sizes="(max-width: 768px) 24rem, 28rem"
                // 6% down puts the crop at 30–563 of 1000: headroom above the
                // hair, waist at the bottom. `object-top` would cut his chin.
                className="h-full w-full object-cover object-[center_6%]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--bg)]/55 to-transparent"
              />
            </div>

            <SystemBoard />

            <div
              style={{ animationDelay: "0.7s" }}
              className="hero-lift mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:mt-6 md:mt-7 md:gap-3"
            >
              <Magnetic strength={0.28}>
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-100 px-6 py-3 text-[15px] font-medium text-ink-950"
                >
                  <span className="relative z-10">{t.hero.ctaWork}</span>
                  <ArrowDown className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </a>
              </Magnetic>

              {/* A recruiter's first click. The header hides its résumé button
                  behind the menu on a phone, so this is the only one-tap route
                  to the CV. */}
              <Magnetic strength={0.28}>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-[var(--bg)]/50 px-6 py-3 text-[15px] font-medium text-ink-100 backdrop-blur-sm transition-colors duration-300 hover:border-line-hover hover:bg-tint"
                >
                  {t.nav.resume}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>

              {/* Below `sm` these three wrap to two rows and push the board
                  off the screen. The two that survive are the two a recruiter
                  actually clicks; contact stays one tap away in the header
                  menu and is the whole of the last section. */}
              <a
                href="#contact"
                className="group hidden items-center gap-1.5 px-2 text-[15px] font-medium text-ink-300 transition-colors duration-300 hover:text-ink-100 sm:inline-flex"
              >
                {t.hero.ctaContact}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Container>
      </motion.div>

      {/* Dropped on a phone. The board above already carries three systems
          with real numbers, About repeats both of these, and this row is the
          only thing left whose removal buys back a screen's worth of height
          without costing the reader a fact they cannot get elsewhere. */}
      <motion.div
        style={{ opacity: contentFade }}
        className="relative hidden shrink-0 sm:block"
      >
        <Container>
          <div
            style={{ animationDelay: "1.05s" }}
            className="hero-lift mx-auto flex max-w-3xl flex-wrap items-end justify-between gap-x-8 gap-y-2 border-t border-line py-3"
          >
            <dl className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-1.5">
              {footnote.map((stat, i) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-lg font-medium tracking-tight text-ink-100">
                    <CountUp value={stat.value} delay={1.2 + i * 0.14} />
                  </dd>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>

            <a
              href="#about"
              aria-hidden
              tabIndex={-1}
              className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500 sm:flex"
            >
              {t.hero.scroll}
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </motion.span>
            </a>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * The board.
 * ------------------------------------------------------------------ */

function SystemBoard() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t.hero.systemsTitle}
      style={{ animationDelay: "0.6s" }}
      // Opaque, not `bg-surface`: the page's plotting grid runs straight
      // through a 3.5%-alpha fill, and a status panel you can see the
      // wallpaper through does not read as a panel.
      className="hero-lift mt-4 overflow-hidden rounded-2xl border border-line bg-ink-900 text-left shadow-(--shadow-nav) sm:mt-5 md:mt-6"
    >
      <h2 className="border-b border-line bg-surface px-4 py-2 text-center font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-ink-300">
        <Scramble text={t.hero.systemsTitle} delay={0.9} dwell={22} />
      </h2>

      <div className="grid grid-cols-3 divide-x divide-line">
        {heroSystems.map((system, i) => (
          <SystemCell key={system.key} system={system} index={i} />
        ))}
      </div>
    </section>
  );
}

function SystemCell({ system, index }: { system: HeroSystem; index: number }) {
  const { t } = useLanguage();
  const copy = t.hero.systems[system.key];
  const live = system.state === "live";

  return (
    <a
      href={system.href}
      className="group relative flex min-w-0 flex-col items-center px-2.5 py-3 text-center transition-colors duration-500 hover:bg-tint sm:px-4"
    >
      <div className="flex max-w-full items-center gap-1.5">
        {/* Filled and pulsing for something in production, a hollow ring for
            something still piloting. The difference is the honest part. */}
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            live
              ? "bg-accent animate-[blip_2.4s_ease-in-out_infinite]"
              : "border border-accent/60",
          )}
        />
        <span className="truncate font-mono text-[11.5px] font-medium uppercase tracking-[0.1em] text-ink-300 sm:text-xs">
          {system.name}
        </span>
        <span className="sr-only">
          {live ? t.hero.stateLive : t.hero.statePilot}
        </span>
      </div>

      <p className="mt-2.5 text-2xl font-medium tracking-tight text-ink-100 sm:text-3xl">
        <CountUp value={copy.value} delay={1.15 + index * 0.12} />
      </p>
      <p className="mt-1 text-pretty font-mono text-[10.5px] uppercase leading-tight tracking-[0.08em] text-ink-500 sm:text-[11px]">
        {copy.label}
      </p>

      {/* What the thing is actually made of — the only reason to put anything
          in this space is that it is true. Dropped on a phone, where three
          columns leave it about nine characters of room and it would be a
          truncated ellipsis in every cell. */}
      <span
        aria-hidden
        style={{ animationDelay: `${1.05 + index * 0.12}s` }}
        className="draw-in mt-3 hidden h-px w-full bg-line sm:block"
      />
      <p className="mt-2 hidden truncate font-mono text-[11px] uppercase tracking-[0.08em] text-ink-500 sm:block">
        {system.tech.join(" · ")}
      </p>
    </a>
  );
}
