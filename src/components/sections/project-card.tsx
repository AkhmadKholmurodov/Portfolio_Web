"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { Badge, StatusDot } from "@/components/ui/badge";
import { useLanguage } from "@/components/providers/language-provider";
import type { Project } from "@/content/profile";
import { cn } from "@/lib/utils";
import { ChannelsDiagram } from "./channels-diagram";

/**
 * One product, at a glance. The card leads with the *number* rather than with
 * the picture, because the numbers are the part a hiring manager can act on
 * and the picture is the part they will look at anyway.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { t } = useLanguage();
  const copy = t.projects[project.slug];
  const flipped = index % 2 === 1;
  const isPhone = project.cover ? project.cover.width < project.cover.height : false;

  return (
    <SpotlightCard className="lift-card bg-surface/45">
      <Link
        href={`/work/${project.slug}`}
        // The image column is the wider of the two. A screenshot is the fastest
        // thing on the card to read, and the copy beside it is four short
        // lines — giving them equal width flatters the text, not the work.
        className="grid gap-8 p-6 outline-none md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14"
      >
        <div className={cn("flex flex-col", flipped && "lg:order-2")}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-700">
              {project.index}
            </span>
            <span className="h-px flex-1 bg-line" />
            <Badge variant={project.status === "live" ? "live" : "outline"}>
              <StatusDot live={project.status === "live"} />
              {t.work.status[project.status]}
            </Badge>
            <span className="font-mono text-[0.6875rem] tracking-wide text-ink-700">
              {project.year}
            </span>
          </div>

          <h3 className="display-3 mt-6 text-ink-100">{copy.name}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-300">
            {copy.tagline}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-line pt-6">
            {project.stats.map((s) => (
              <div key={s.key}>
                <dd className="font-mono text-xl text-ink-100 tabular-nums">
                  {s.value}
                </dd>
                <dt className="mt-1.5 font-mono text-[0.625rem] tracking-[0.1em] text-ink-600 uppercase">
                  {t.work.stats[s.key as keyof typeof t.work.stats]}
                </dt>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-wide text-ink-600"
              >
                {tech}
              </li>
            ))}
          </ul>

          <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink-100">
            {t.work.caseStudy}
            <ArrowUpRight className="size-4 transition-transform duration-400 ease-(--ease-out-expo) group-hover/spot:translate-x-0.5 group-hover/spot:-translate-y-0.5" />
          </span>
        </div>

        <div className={cn("relative", flipped && "lg:order-1")}>
          {project.cover ? (
            <div
              className={cn(
                "relative overflow-hidden rounded-xl border border-line bg-void",
                isPhone ? "mx-auto max-w-72" : "",
              )}
            >
              {/* Keyed to the card, not to the frame: the whole card is the
                  link, so the picture should react wherever the pointer is
                  inside it. `media-frame` is for standalone figures. */}
              <Image
                src={project.cover.src}
                alt={t.shots[project.cover.caption as keyof typeof t.shots]}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(max-width: 1024px) 90vw, 52vw"
                className="h-auto w-full transition-transform duration-700 ease-(--ease-out-expo) group-hover/spot:scale-[1.045]"
              />
            </div>
          ) : (
            <ChannelsDiagram />
          )}
        </div>
      </Link>
    </SpotlightCard>
  );
}
