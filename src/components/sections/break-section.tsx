"use client";

import { Section, SectionHeader } from "@/components/site/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/magicui/reveal";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { useLanguage } from "@/components/providers/language-provider";
import { security } from "@/content/profile";

/**
 * The third verb. Presented as four flat statements with no badges, no scores
 * and no logos.
 */
export function BreakSection() {
  const { t } = useLanguage();

  return (
    <Section id="break" className="relative isolate">
      {/* A scan line crossing the section — the literal picture of what this
          section is about, at an opacity where it registers as atmosphere
          rather than as a widget. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-1 h-full overflow-hidden"
      >
        <div className="animate-sweep h-32 w-full bg-linear-to-b from-transparent via-signal/6 to-transparent" />
      </div>

      <Reveal>
        <SectionHeader label={t.break.label} title={t.break.title} lead={t.break.lead} />
      </Reveal>

      <RevealGroup className="mt-16 grid gap-4 md:mt-24 md:grid-cols-2" stagger={0.08}>
        {security.map((item) => {
          const copy = t.break.items[item.key as keyof typeof t.break.items];
          return (
            <RevealItem key={item.key}>
              <SpotlightCard className="lift-card h-full bg-surface/45 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-medium text-ink-100">{copy.title}</h3>
                  {item.year && (
                    <span className="mt-1 shrink-0 font-mono text-[0.6875rem] tracking-wide text-ink-700">
                      {item.year}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-300">
                  {copy.body}
                </p>
              </SpotlightCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
