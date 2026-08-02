"use client";

import {
  Code2,
  Database,
  Server,
  ShieldCheck,
  Container as ContainerIcon,
  GitBranch,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { stackGroups } from "@/content/profile";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const icons = {
  frontend: Code2,
  backend: Server,
  data: Database,
  devops: ContainerIcon,
  security: ShieldCheck,
  practice: GitBranch,
} as const;

export function Stack() {
  const { t } = useLanguage();

  return (
    <Section id="stack" className="relative">
      {/* Soft wash so the section separates from the one above it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
      />

      <Container>
        <SectionHeader
          eyebrow={t.stack.eyebrow}
          title={t.stack.title}
          lead={t.stack.lead}
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((group) => {
            const Icon = icons[group.key];
            return (
              <StaggerItem key={group.key} className="h-full">
                <SpotlightCard className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <h3 className="text-sm font-medium tracking-tight text-ink-100">
                      {t.stack.groups[group.key]}
                    </h3>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-ink-300 transition-colors duration-300 group-hover/card:border-white/12"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
