"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useLanguage } from "@/components/providers/language-provider";
import { profile, socials } from "@/content/profile";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { useReducedMotion } from "@/hooks/use-media";

/** Portrait card that parallaxes gently against the column beside it. */
function Portrait() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y = useSpring(rawY, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={reduced ? undefined : { y }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
      >
        <Image
          src={profile.photo}
          alt={profile.name}
          width={412}
          height={527}
          priority={false}
          sizes="(max-width: 1024px) 70vw, 380px"
          className="w-full object-cover grayscale transition-[filter,transform] duration-700 hover:grayscale-0 hover:scale-[1.02]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
            {t.about.photoCaption}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[blip_2.4s_ease-in-out_infinite]" />
            E-7
          </span>
        </div>
      </motion.div>

      <div className="mt-4 flex flex-wrap gap-2">
        {socials.map((social) => (
          <a
            key={social.key}
            href={social.href}
            target={social.key === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-500 transition-colors duration-300 hover:border-accent/40 hover:text-accent"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const { t } = useLanguage();

  return (
    <Section id="about">
      <Container>
        <SectionHeader
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          lead={t.about.lead}
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div>
            <div className="space-y-6">
              {t.about.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-pretty text-[15px] leading-[1.75] text-ink-300 sm:text-base">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-2">
              {t.about.facts.map((fact) => (
                <StaggerItem
                  key={fact.label}
                  className="bg-[var(--bg)] p-5 transition-colors duration-500 hover:bg-white/[0.02]"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug text-ink-100">
                    {fact.value}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:pt-2">
            <Portrait />
          </div>
        </div>
      </Container>
    </Section>
  );
}
