"use client";

import { Section, SectionHeader } from "@/components/site/section";
import { Reveal } from "@/components/magicui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { projects } from "@/content/profile";
import { ProjectCard } from "./project-card";

/**
 * The work, as a deck rather than a list.
 *
 * The cards used to sit in a plain column, which is the correct layout for
 * three items nobody is going to compare — and the wrong one here, because the
 * whole argument of this section is that these are three parts of the same
 * practice. Stacked, scrolling from one to the next is a single continuous
 * gesture: the new card rises over the last one and its shadow lands on it, so
 * the deck reads as one object being dealt through rather than as three
 * unrelated panels going past.
 *
 * The mechanics are four lines of CSS in `stack-card` and nothing else — no
 * scroll listener, no measurement, nothing that can be wrong at a viewport
 * size that was not tested. The offsets below are the whole configuration.
 */

/** Where the first card comes to rest: clear of the 74px nav, with air. */
const STACK_TOP = 7; /* rem */

/** How much of each card's top edge stays visible under the next one. */
const REVEAL_EDGE = 0.875; /* rem — 14px */

export function Build() {
  const { t } = useLanguage();

  return (
    <Section id="build">
      <Reveal>
        <SectionHeader label={t.build.label} title={t.build.title} lead={t.build.lead} />
      </Reveal>

      <div className="mt-14 flex flex-col gap-6 md:mt-20 md:gap-8">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="stack-card"
            style={{
              // Each card rests one edge lower than the last, and stacks in
              // reading order — the later card is the one on top.
              ["--stack-top" as string]: `${STACK_TOP + i * REVEAL_EDGE}rem`,
              zIndex: i + 1,
            }}
          >
            {/* Only the first card gets a travel distance worth noticing. The
                rest arrive shorter and faster, because by card three the reader
                is scrolling to read, not to be shown something. */}
            <Reveal y={i === 0 ? 32 : 18}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          </div>
        ))}
      </div>

      {/* The deck needs somewhere to be dealt *to*. Without this the last card
          unsticks the instant it arrives and the stack never holds still long
          enough to be read as one. Just under a fifth of the fold: enough that
          the last card is read at rest, short enough that it does not become
          the empty screen between two sections. */}
      <div aria-hidden className="hidden h-[18vh] lg:block" />
    </Section>
  );
}
