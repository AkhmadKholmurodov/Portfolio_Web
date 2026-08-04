"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE_OUT, lead } from "@/lib/motion";

/**
 * The first screen: one photograph, edge to edge, and the words in the light
 * beside him.
 *
 * The photograph is art-directed rather than cropped. A 4:5 studio frame
 * cannot be `object-fit: cover`-ed into both a 16:9 laptop and a 9:19 phone
 * without the frame cutting through him, so rather than ask the browser to
 * choose what to lose, two frames are built ahead of time: on a laptop the
 * backdrop is extended sideways and he stands to the right, on a phone it is
 * extended upward and he stands at the foot. Both extensions are the same
 * wall, sampled row by row out of the photograph itself, so the join is a
 * colour match rather than a blend. `<picture>` fetches exactly one of them.
 *
 * The empty half is not empty by accident — it is where the type goes, and it
 * is why the composition has room to breathe at every width.
 *
 * Leaving is part of it. The section is sticky, so the rest of the page rises
 * over the photograph and covers it while he settles back and dims. Nothing
 * scrolls away; the next page arrives on top.
 */
export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageDim = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [first, ...rest] = profile.name.split(" ");
  const lines = [first, rest.join(" ")];
  const proof = t.hero.stats.slice(0, 3);

  return (
    <section
      ref={ref}
      id="home"
      className="sticky top-0 h-[100svh] overflow-hidden bg-ink-950"
    >
      <motion.div
        style={{ scale: imageScale, opacity: imageDim }}
        className="absolute inset-0"
      >
        <picture>
          <source media="(min-width: 768px)" srcSet="/hero-wide.webp" />
          <img
            src="/hero-tall.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[62%_top] md:object-[72%_center]"
          />
        </picture>
      </motion.div>

      {/* The wall is bright, but it is a photograph: a whisper of the page
          colour under the type guarantees the copy never lands on a highlight. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--bg)]/80 via-[var(--bg)]/25 to-transparent md:bg-gradient-to-r md:from-[var(--bg)]/85 md:via-[var(--bg)]/35 md:to-transparent"
      />

      <motion.div
        style={{ y: copyY, opacity: copyFade }}
        className="relative flex h-full flex-col justify-start pt-28 md:justify-center md:pt-0"
      >
        <Container>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={lead(0.7)}
            className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[blip_2.4s_ease-in-out_infinite]" />
            {t.hero.available}
          </motion.span>

          <h1 className="mt-6 text-[clamp(2.6rem,11vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.045em] text-ink-100 md:mt-7 md:text-[clamp(3rem,7.4vw,6.6rem)] md:leading-[0.86]">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.07em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.15, delay: 0.12 + i * 0.1, ease: EASE_OUT }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={lead(0.8, 0.44)}
            className="mt-6 max-w-sm text-pretty text-base leading-snug text-ink-300 sm:text-lg md:mt-7 md:max-w-md md:text-xl"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={lead(0.8, 0.54)}
            className="mt-8 flex flex-wrap items-center gap-3 md:mt-9"
          >
            <Magnetic strength={0.28}>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-100 px-6 py-3 text-sm font-medium text-ink-950"
              >
                <span className="relative z-10">{t.hero.ctaWork}</span>
                <ArrowDown className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
              </a>
            </Magnetic>

            <Magnetic strength={0.28}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-[var(--bg)]/50 px-6 py-3 text-sm font-medium text-ink-100 backdrop-blur-sm transition-colors duration-300 hover:border-line-hover hover:bg-tint"
              >
                {t.hero.ctaContact}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>
        </Container>
      </motion.div>

      {/* The proof, and the only invitation to keep going. */}
      <motion.div style={{ opacity: copyFade }} className="absolute inset-x-0 bottom-0">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-line py-5"
          >
            <dl className="flex flex-wrap items-baseline gap-x-7 gap-y-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-500">
              {proof.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[15px] tracking-normal text-ink-100">{stat.value}</dd>
                  <p>{stat.label}</p>
                </div>
              ))}
            </dl>

            <a
              href="#about"
              aria-hidden
              tabIndex={-1}
              className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 sm:flex"
            >
              {t.hero.scroll}
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </motion.span>
            </a>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
