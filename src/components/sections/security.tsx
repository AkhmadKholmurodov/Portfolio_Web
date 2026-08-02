"use client";

import { motion } from "motion/react";
import { Award, BadgeCheck, ShieldAlert, Terminal } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { certifications, languages } from "@/content/profile";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const cardIcons = [ShieldAlert, Terminal, BadgeCheck];

export function Security() {
  const { t } = useLanguage();

  return (
    <Section id="security" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, color-mix(in oklch, var(--color-accent-2) 7%, transparent), transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeader
          eyebrow={t.security.eyebrow}
          title={t.security.title}
          lead={t.security.lead}
        />

        <Stagger className="grid gap-4 lg:grid-cols-3">
          {t.security.cards.map((card, i) => {
            const Icon = cardIcons[i] ?? ShieldAlert;
            return (
              <StaggerItem key={i} className="h-full">
                <SpotlightCard className="h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-medium tracking-tight text-ink-100">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
                    {card.body}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-16 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Certifications */}
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                {t.security.certsTitle}
              </h3>
              <ul className="mt-5 divide-y divide-white/[0.07]">
                {certifications.map((cert) => (
                  <li
                    key={cert.key}
                    className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm text-ink-100">{cert.name}</p>
                      <p className="mt-0.5 text-[12px] text-ink-500">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-accent">
                      {cert.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Languages */}
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                {t.security.languagesTitle}
              </h3>
              <ul className="mt-5 space-y-5">
                {languages.map((lang, i) => (
                  <li key={lang.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-ink-100">
                        {t.security.languageNames[lang.key]}
                      </span>
                      <span className="font-mono text-[11px] text-ink-500">
                        {t.security.languageLevels[lang.key]}
                      </span>
                    </div>
                    <div className="mt-2 h-px w-full bg-white/10">
                      <motion.div
                        className="h-px bg-gradient-to-r from-accent to-accent-2"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: lang.level / 100 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{
                          duration: 1.1,
                          delay: 0.1 + i * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Awards — the human line at the end of a technical section. */}
        <Reveal delay={0.12}>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center gap-2.5">
              <Award className="h-4 w-4 text-accent" strokeWidth={1.6} />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                {t.security.awardsTitle}
              </h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.security.awards.map((award) => (
                <li
                  key={award}
                  className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[12px] text-ink-300"
                >
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
