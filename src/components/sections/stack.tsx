"use client";

import { Section } from "@/components/site/section";
import { Marquee } from "@/components/magicui/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/magicui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { stackGroups } from "@/content/profile";

/**
 * The skills list, kept in its place. It sits after the work rather than
 * before it, because a list of technologies is only interesting once you have
 * seen what was built with them.
 */
export function Stack() {
  const { t } = useLanguage();
  const all = stackGroups.flatMap((g) => g.items);

  return (
    <Section id="stack">
      <Reveal>
        <p className="label">{t.stack.label}</p>
        <h2 className="display-2 mt-5 max-w-2xl">{t.stack.title}</h2>
      </Reveal>

      <Reveal className="mt-14" y={14}>
        <Marquee className="border-y border-line py-5">
          {all.map((item) => (
            <span
              key={item}
              className="px-5 font-mono text-[0.8125rem] tracking-wide whitespace-nowrap text-ink-600"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </Reveal>

      <RevealGroup
        className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {stackGroups.map((group) => (
          <RevealItem key={group.key}>
            <h3 className="label pb-4">
              {t.stack.groups[group.key as keyof typeof t.stack.groups]}
            </h3>
            <ul className="flex flex-col gap-2 border-t border-line pt-4">
              {group.items.map((item) => (
                <li key={item} className="text-[0.9375rem] text-ink-300">
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
