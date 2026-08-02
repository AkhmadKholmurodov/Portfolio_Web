"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { marqueeTech, profile } from "@/content/profile";
import { Container } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { useDeferredMount } from "@/hooks/use-deferred-mount";

// WebGL has no server-rendered form, and the bundle is heavy enough that it
// should not block the first paint of the headline.
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <SceneGlow />,
});

/** Stands in for the canvas so the right half is never an empty rectangle. */
function SceneGlow() {
  return (
    <div
      aria-hidden
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in oklch, var(--color-accent) 14%, transparent), transparent 70%)",
      }}
    />
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const sceneReady = useDeferredMount();
  // Freeze the render loop once the hero has left the viewport.
  const heroInView = useInView(ref, { amount: 0.08 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      ref={ref}
      id="home"
      className="noise relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-10"
    >
      {/* Backdrop layers, furthest first. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, color-mix(in oklch, var(--color-accent) 9%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        aria-hidden
        style={{ scale: sceneScale }}
        className="pointer-events-none absolute inset-0 opacity-45 sm:opacity-60 lg:left-auto lg:right-[-6%] lg:w-[62%] lg:opacity-100"
      >
        {sceneReady ? <HeroScene active={heroInView} /> : <SceneGlow />}
      </motion.div>

      {/* Keeps the headline legible where it overlaps the blob. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/70 to-transparent lg:via-[var(--bg)]/35"
      />

      <Container className="relative">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[blip_2.4s_ease-in-out_infinite]" />
              {t.hero.available}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
              <MapPin className="h-3 w-3" />
              {t.about.photoCaption}
            </span>
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            {[first, rest.join(" ")].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.08 + i * 0.09, ease: EASE }}
                >
                  {i === 1 ? (
                    <span className="text-gradient">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
            className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-accent-soft sm:text-[13px]"
          >
            {t.hero.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-300 sm:text-lg"
          >
            {t.hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
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
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-ink-100 transition-colors duration-300 hover:border-accent/50 hover:bg-accent/[0.06]"
              >
                {t.hero.ctaContact}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.66 }}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="border-l border-white/10 pl-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-medium tracking-tight text-ink-100 sm:text-3xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-[11px] leading-snug text-ink-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative mt-16 sm:mt-20"
      >
        <Marquee items={marqueeTech} />
      </motion.div>

      <motion.a
        href="#about"
        aria-hidden
        tabIndex={-1}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-500 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          {t.hero.scroll}
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
