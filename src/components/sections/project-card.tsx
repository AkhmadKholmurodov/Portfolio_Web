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
    // Opaque enough that the schematic stops crossing the reading area. The
    // traces are the page's atmosphere, not its texture, and a hairline
    // running through a paragraph is noise exactly where the eye is working.
    // Still short of solid, so the card reads as a panel over the field
    // rather than a slab cut out of it.
    <SpotlightCard className="lift-card bg-surface/80">
      <Link
        href={`/work/${project.slug}`}
        // The image column is the wider of the two. A screenshot is the fastest
        // thing on the card to read, and the copy beside it is four short
        // lines — giving them equal width flatters the text, not the work.
        className="grid gap-8 p-6 outline-none md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14"
      >
        <div className={cn("flex flex-col", flipped && "lg:order-2")}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-label tracking-[0.16em] text-ink-400">
              {project.index}
            </span>
            <span className="h-px flex-1 bg-line" />
            <Badge variant={project.status === "live" ? "live" : "outline"}>
              <StatusDot live={project.status === "live"} />
              {t.work.status[project.status]}
            </Badge>
            <span className="font-mono text-label tracking-label text-ink-400">
              {project.year}
            </span>
          </div>

          <h3 className="display-3 mt-6 text-ink-100">{copy.name}</h3>
          <p className="mt-3 text-body text-ink-300">
            {copy.tagline}
          </p>

          <dl
            className={cn(
              "mt-7 grid gap-6 border-t border-line pt-6",
              // Three stats would wrap to a lonely orphan in a two-column
              // grid, so the column count follows the data.
              "tabular-nums",
              // Three stats at 13px labels will not sit in three columns on a
              // 375px screen — "Sites in production" needs three lines to do
              // it. Two columns below `sm`, three above.
              project.stats.length > 2
                ? "grid-cols-2 gap-4 sm:grid-cols-3"
                : "grid-cols-2",
            )}
          >
            {project.stats.map((s) => (
              <div key={s.key}>
                <dd className="font-mono text-xl text-ink-100 tabular-nums">
                  {s.value}
                </dd>
                <dt className="mt-1.5 font-mono text-label tracking-label text-ink-400 uppercase">
                  {t.work.stats[s.key as keyof typeof t.work.stats]}
                </dt>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-label tracking-label text-ink-400"
              >
                {tech}
              </li>
            ))}
          </ul>

          <span className="mt-8 inline-flex items-center gap-2 text-ui text-ink-100">
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
