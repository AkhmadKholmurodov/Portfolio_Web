"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { experienceMeta } from "@/content/profile";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  // The rail fills as the timeline scrolls past.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="work">
      <Container>
        <SectionHeader
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          lead={t.experience.lead}
        />

        <div ref={trackRef} className="relative">
          {/* Rail: static hairline plus an accent fill driven by scroll. */}
          <div
            aria-hidden
            className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-white/10 sm:block"
          >
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-2"
            />
          </div>

          <div className="space-y-16 sm:space-y-24 sm:pl-10">
            {experienceMeta.map((meta) => {
              const role = t.experience.roles[meta.key];
              return (
                <article key={meta.key} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-10 top-2 hidden h-2.5 w-2.5 -translate-x-[calc(50%-0.5px)] rounded-full border-2 border-[var(--bg)] bg-accent sm:block"
                  />

                  <Reveal>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                        {meta.period.replace("Present", t.experience.present)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-500">
                        <MapPin className="h-3 w-3" />
                        {role.location}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
                      {role.company}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <p className="text-[15px] text-ink-300">{role.role}</p>
                      {meta.site && (
                        <a
                          href={meta.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-ink-500 transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                        >
                          {meta.site.replace("https://", "")}
                          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                    </div>

                    <p className="mt-2 text-[13px] text-ink-500">{role.context}</p>
                  </Reveal>

                  <ul className="mt-7 space-y-3.5 border-l border-white/[0.07] pl-5 sm:border-l-0 sm:pl-0">
                    {role.bullets.map((bullet, i) => (
                      <Reveal as="li" key={i} delay={0.06 * i} y={16}>
                        <div className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60"
                          />
                          <p className="text-pretty text-[15px] leading-[1.7] text-ink-300">
                            {bullet}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
