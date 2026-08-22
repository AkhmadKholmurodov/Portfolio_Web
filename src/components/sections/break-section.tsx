"use client";

import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/magicui/reveal";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { useLanguage } from "@/components/providers/language-provider";
import { certifications, securityWork } from "@/content/profile";

/**
 * The third verb, in two weights.
 *
 * Three cards for the work — things he did, each with something to read at the
 * end of it — and a plain list for the certifications underneath. Six equal
 * cards would put a freeCodeCamp certificate at the same visual weight as
 * reproducing an RCE, which is the opposite of what this section is arguing.
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

      <RevealGroup className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2" stagger={0.08}>
        {securityWork.map((item, i) => {
          const copy = t.break.items[item.key as keyof typeof t.break.items];
          const href = "href" in item ? item.href : undefined;
          // An odd card count leaves a ragged half-row. The last one takes the
          // full width instead — it is the shortest of the three and it reads
          // as the section's closing line rather than a stub.
          const wide = i === securityWork.length - 1 && securityWork.length % 2 === 1;

          const inner = (
            <>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium text-ink-100">{copy.title}</h3>
                {item.year && (
                  <span className="mt-1 shrink-0 font-mono text-label tracking-label text-ink-400">
                    {item.year}
                  </span>
                )}
              </div>
              <p className="measure mt-4 text-body text-ink-300">
                {copy.body}
              </p>
              {href && (
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-100">
                  {t.break.read}
                  <ArrowUpRight className="size-3.5 transition-transform duration-400 ease-(--ease-out-expo) group-hover/spot:translate-x-0.5 group-hover/spot:-translate-y-0.5" />
                  <span className="sr-only">{t.ui.external}</span>
                </span>
              )}
            </>
          );

          return (
            <RevealItem key={item.key} className={wide ? "md:col-span-2" : undefined}>
              <SpotlightCard className="lift-card h-full bg-surface/45">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-full flex-col p-6 outline-none md:p-8"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex h-full flex-col p-6 md:p-8">{inner}</div>
                )}
              </SpotlightCard>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Certifications. A list, not cards — see the note above. */}
      <Reveal className="mt-12 md:mt-14" y={16}>
        <p className="label">{t.break.certsTitle}</p>
        <ul className="mt-5 flex flex-col border-t border-line">
          {certifications.map((cert) => {
            const copy = t.break.items[cert.key as keyof typeof t.break.items];
            return (
              <li
                key={cert.key}
                className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-body text-ink-200">{copy.title}</span>
                <span className="font-mono text-label tracking-label text-ink-400">
                  {copy.body}
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
