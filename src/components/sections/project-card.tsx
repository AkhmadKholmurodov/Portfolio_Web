"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { Badge, StatusDot } from "@/components/ui/badge";
import { useLanguage } from "@/components/providers/language-provider";
import type { Project } from "@/content/profile";
import { cn } from "@/lib/utils";
import { CoverMorph } from "@/components/view-transition";

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
  const isPhone = project.cover.width < project.cover.height;

  return (
    // Solid, and it has to be: these cards stack (see `Build`), and a card you
    // can see the previous one through is not covering it. It was 80% while
    // they sat in a column, to keep the schematic from crossing the reading
    // area — that job is now done by the card being opaque outright, which is
    // the stronger version of the same guarantee.
    <SpotlightCard className="lift-card bg-surface">
      <Link
        href={`/work/${project.slug}`}
        // The image column is the wider of the two. A screenshot is the fastest
        // thing on the card to read, and the copy beside it is four short
        // lines — giving them equal width flatters the text, not the work.
        //
        // On a phone the card is a sticky element in a deck (see `Build`), so
        // every pixel of its height is a pixel of its bottom edge that falls
        // off the screen. The phone values here are not a smaller version of
        // the desktop rhythm, they are a budget: 20px padding, 20px between
        // the copy and the picture. `md:` restores the roomy set.
        className="grid gap-5 p-5 outline-none md:gap-8 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14"
      >
        <div className={cn("flex min-w-0 flex-col", flipped && "lg:order-2")}>
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

          <h3 className="display-3 mt-4 text-ink-100 md:mt-6">{copy.name}</h3>
          <p className="mt-2 text-body text-ink-300 md:mt-3">
            {copy.tagline}
          </p>

          <dl
            className={cn(
              "mt-4 grid gap-6 border-t border-line pt-4 md:mt-7 md:pt-6",
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
                <dd className="font-mono text-lg text-ink-100 tabular-nums md:text-xl">
                  {s.value}
                </dd>
                <dt className="mt-1.5 font-mono text-label tracking-label text-ink-400 uppercase">
                  {t.work.stats[s.key as keyof typeof t.work.stats]}
                </dt>
              </div>
            ))}
          </dl>

          <ul className="mt-4 flex flex-wrap gap-1.5 md:mt-6">
            {project.tech.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-label tracking-label text-ink-400"
              >
                {tech}
              </li>
            ))}
          </ul>

          <span className="mt-5 inline-flex items-center gap-2 text-ui text-ink-100 md:mt-8">
            {t.work.caseStudy}
            <ArrowUpRight className="size-4 transition-transform duration-400 ease-(--ease-out-expo) group-hover/spot:translate-x-0.5 group-hover/spot:-translate-y-0.5" />
          </span>
        </div>

        <div className={cn("relative min-w-0", flipped && "lg:order-1")}>
          {/* The cover is the door. It carries the same `view-transition-name`
              as the hero on the case-study page (see `coverTransition`), so
              clicking the card grows this picture into that one rather than
              cutting to a new screen. The name is a plain CSS custom property
              the browser matches across the navigation. */}
          <CoverMorph slug={project.slug}>
            <div
              className={cn(
                // The screenshot lifts off the card under the pointer — a soft
                // shadow behind it, keyed to the card's own hover, so the image
                // reads as a raised object rather than a flat inset. The scale
                // below rides the image; this shadow rides its frame.
                "relative overflow-hidden rounded-xl border border-line bg-void shadow-card transition-shadow duration-500 ease-(--ease-out-expo) group-hover/spot:shadow-card-hover",
                // A portrait screenshot is 2.2 times as tall as it is wide.
                // Shown whole on a phone it is 620px of card — more than the
                // copy, the stats and the chips put together, and enough on
                // its own to push the card's bottom edge off a sticky
                // screen. So on a phone it is cropped to a landscape window
                // anchored at the top of the shot: the app's header and its
                // first rows, at the full width of the card, which is more
                // of the product than a 130px-wide whole screen would show.
                // The full capture is one tap away in the case study.
                isPhone ? "aspect-[3/2] md:mx-auto md:aspect-auto md:max-w-72" : "",
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
                className={cn(
                  "h-auto w-full transition-transform duration-700 ease-(--ease-out-expo) group-hover/spot:scale-[1.045]",
                  isPhone && "h-full object-cover object-top md:h-auto",
                )}
              />
            </div>
          </CoverMorph>
        </div>
      </Link>
    </SpotlightCard>
  );
}
