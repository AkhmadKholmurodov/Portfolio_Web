"use client";

import { Section, SectionHeader } from "@/components/site/section";
import { Reveal } from "@/components/magicui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { projects } from "@/content/profile";
import { ProjectCard } from "./project-card";

export function Build() {
  const { t } = useLanguage();

  return (
    <Section id="build">
      <Reveal>
        <SectionHeader label={t.build.label} title={t.build.title} lead={t.build.lead} />
      </Reveal>

      <div className="mt-14 flex flex-col gap-6 md:mt-20 md:gap-8">
        {projects.map((project, i) => (
          // Only the first card gets a travel distance worth noticing. The
          // rest arrive shorter and faster, because by card three the reader
          // is scrolling to read, not to be shown something.
          <Reveal key={project.slug} y={i === 0 ? 32 : 18}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
