"use client";

import {
  Code2,
  Database,
  Server,
  ShieldCheck,
  Container as ContainerIcon,
  GitBranch,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/components/providers/language-provider";
import { stackGroups } from "@/content/profile";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const EASE = [0.16, 1, 0.3, 1] as const;

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
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface text-accent transition-[border-color,background-color] duration-500 group-hover/card:border-line-hover group-hover/card:bg-tint">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <h3 className="text-sm font-medium tracking-tight text-ink-100">
                      {t.stack.groups[group.key]}
                    </h3>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.18 + i * 0.045,
                          ease: EASE,
                        }}
                        className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-ink-300 transition-[color,border-color,transform] duration-300 hover:-translate-y-px hover:border-line-hover hover:text-ink-100"
                      >
                        {item}
                      </motion.li>
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
