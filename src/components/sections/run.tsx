"use client";

import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/magicui/reveal";
import { TextReveal } from "@/components/magicui/text-reveal";
import { TracingRail } from "@/components/aceternity/tracing-rail";
import { useLanguage } from "@/components/providers/language-provider";
import { experience } from "@/content/profile";

/**
 * The operations half of the argument, and the CV. This is the only place on
 * the site that uses the word-by-word reveal.
 */
export function Run() {
  const { t } = useLanguage();

  return (
    <Section id="run">
      <Reveal>
        <header className="max-w-3xl">
          <p className="label">{t.run.label}</p>
          <h2 className="display-2 mt-5">{t.run.title}</h2>
        </header>
      </Reveal>

      <TextReveal
        text={t.run.lead}
        className="lede measure mt-7"
      />

      <div className="relative mt-20 md:mt-28">
        <p className="label mb-10">{t.run.timeline}</p>

        {/* The rail sits in the gutter on desktop and hugs the left edge on
            mobile, where there is no gutter to sit in. */}
        <TracingRail className="left-0 md:left-[9.5rem]" />

        <ol className="flex flex-col gap-16 md:gap-24">
          {experience.map((entry) => {
            const copy = t.experience[entry.key as keyof typeof t.experience];
            return (
              <li key={entry.key} className="relative pl-8 md:pl-0">
                <Reveal>
                  <div className="grid gap-6 md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-0">
                    <div className="md:pr-10 md:text-right">
                      <span className="font-mono text-label tracking-label whitespace-nowrap text-ink-400">
                        {entry.period.replace("Present", t.run.present)}
                      </span>
                    </div>

                    <div className="md:pl-10">
                      <h3 className="display-3 text-ink-100">{copy.company}</h3>
                      <p className="mt-2 text-body text-ink-300">{copy.role}</p>
                      <p className="measure mt-1 font-mono text-label tracking-label text-ink-400">
                        {copy.context}
                      </p>

                      {copy.bullets.length > 0 && (
                        <ul className="measure mt-6 flex flex-col gap-3.5 text-body">
                          {copy.bullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="relative pl-5 text-ink-300"
                            >
                              <span className="absolute top-[0.6em] left-0 size-1 rounded-full bg-ink-500" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}

                      {"href" in entry && entry.href && (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-6 inline-flex items-center gap-1.5 text-ui text-ink-100 underline decoration-line-strong underline-offset-[6px] transition-colors duration-300 hover:decoration-ink-500"
                        >
                          {entry.href.replace("https://", "")}
                          <ArrowUpRight className="size-3.5" />
                          <span className="sr-only">{t.ui.external}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
