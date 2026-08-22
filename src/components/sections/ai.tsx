"use client";

import { Section } from "@/components/site/section";
import { Reveal } from "@/components/magicui/reveal";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * Its own section rather than a line in the toolkit, because two of the roles
 * he is applying for list this as a hard requirement rather than a bonus.
 *
 * It sits after Break on purpose. Break is the argument that he reviews code
 * adversarially; this is the same argument pointed at a different author. Put
 * inside Run it would be three CV entries below the fold.
 */
export function AiSection() {
  const { t } = useLanguage();

  return (
    <Section id="ai">
      <Reveal>
        <header className="max-w-3xl">
          <p className="label">{t.ai.label}</p>
          <h2 className="display-2 mt-5">{t.ai.title}</h2>
        </header>
      </Reveal>

      <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <p className="lede measure">
            {t.ai.lead}
          </p>
        </Reveal>

        <Reveal y={18}>
          <p className="measure border-l border-line pl-6 text-body text-ink-300">
            {t.ai.body}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
