"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/magicui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { projects, type ProjectSlug } from "@/content/profile";
import { ChannelsDiagram } from "@/components/sections/channels-diagram";
import { cn } from "@/lib/utils";

/**
 * One case study. The shape is fixed across all four — problem, the decisions
 * that mattered, where it landed, what I would do next — because the point of
 * a case study is comparison.
 */
export function CaseStudy({ slug }: { slug: ProjectSlug }) {
  const { t } = useLanguage();
  const project = projects.find((p) => p.slug === slug)!;
  const copy = t.projects[slug];

  const position = projects.findIndex((p) => p.slug === slug);
  const next = projects[(position + 1) % projects.length];

  return (
    <article className="pt-28 md:pt-36">
      <div className="shell">
        <Link
          href="/#build"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-600 uppercase transition-colors duration-300 hover:text-ink-200"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-400 ease-(--ease-out-expo) group-hover:-translate-x-0.5" />
          {t.ui.allWork}
        </Link>

        <header className="mt-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-700">
              {project.index}
            </span>
            <Badge variant={project.status === "live" ? "live" : "outline"}>
              <StatusDot live={project.status === "live"} />
              {t.work.status[project.status]}
            </Badge>
            <span className="font-mono text-[0.6875rem] tracking-wide text-ink-700">
              {project.year}
            </span>
          </div>

          <h1 className="display-1 mt-7 text-ink-100">{copy.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl">
            {copy.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-300">
            {copy.summary}
          </p>

          {project.href && (
            <Button asChild variant="outline" className="mt-8">
              <a href={project.href} target="_blank" rel="noreferrer noopener">
                {t.work.visit}
                <ArrowUpRight />
                <span className="sr-only">{t.ui.external}</span>
              </a>
            </Button>
          )}
        </header>

        {/* The facts strip. Everything a reader might want to scan without
            reading a word of the prose underneath. */}
        <dl className="mt-14 grid gap-x-10 gap-y-8 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="label">{t.work.role}</dt>
            <dd className="mt-3 text-[0.9375rem] text-ink-200">{copy.role}</dd>
          </div>
          <div>
            <dt className="label">{t.work.year}</dt>
            <dd className="mt-3 text-[0.9375rem] text-ink-200">{project.year}</dd>
          </div>
          {project.stats.map((s) => (
            <div key={s.key}>
              <dt className="label">
                {t.work.stats[s.key as keyof typeof t.work.stats]}
              </dt>
              <dd className="mt-3 font-mono text-[0.9375rem] text-ink-200 tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <p className="label">{t.work.stack}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-ink-500"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- cover ---- */}
      <div className="shell mt-16 md:mt-24">
        <Reveal y={26}>
          {project.cover ? (
            <figure>
              <div className="media-frame lift-card rounded-2xl border border-line bg-void">
                <Image
                  src={project.cover.src}
                  alt={t.shots[project.cover.caption as keyof typeof t.shots]}
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes="(max-width: 1024px) 100vw, 84rem"
                  priority
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 max-w-2xl font-mono text-[0.6875rem] leading-relaxed tracking-wide text-ink-600">
                {t.shots[project.cover.caption as keyof typeof t.shots]}
              </figcaption>
            </figure>
          ) : (
            <div className="mx-auto max-w-lg">
              <ChannelsDiagram />
            </div>
          )}
        </Reveal>
      </div>

      {/* ---- problem ---- */}
      <section className="shell mt-24 md:mt-36">
        <Reveal>
          <p className="label">{copy.problem.title}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl">
            {copy.problem.body}
          </p>
        </Reveal>
      </section>

      {/* ---- decisions ---- */}
      <section className="shell mt-24 md:mt-36">
        <Reveal>
          <p className="label">{copy.decisions.title}</p>
        </Reveal>

        <ol className="mt-12 flex flex-col gap-14 md:gap-20">
          {copy.decisions.items.map((item, i) => (
            <li key={i}>
              <Reveal>
                <div className="grid gap-5 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-0">
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-2xl">
                    <h2 className="display-3 text-ink-100">{item.title}</h2>
                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-300 md:text-base">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- evidence ---- */}
      {project.shots.length > 0 && (
        <section className="shell mt-24 md:mt-36">
          <div className="flex flex-col gap-14 md:gap-20">
            {project.shots.map((shot) => {
              const caption = t.shots[shot.caption as keyof typeof t.shots];
              const isPhone = shot.width < shot.height;
              return (
                <Reveal key={shot.src} y={24}>
                  <figure className={isPhone ? "mx-auto max-w-sm" : ""}>
                    <div className="media-frame lift-card rounded-xl border border-line bg-void">
                      <Image
                        src={shot.src}
                        alt={caption}
                        width={shot.width}
                        height={shot.height}
                        sizes={isPhone ? "24rem" : "(max-width: 1024px) 100vw, 84rem"}
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-4 max-w-2xl font-mono text-[0.6875rem] leading-relaxed tracking-wide text-ink-600">
                      {caption}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* ---- outcome + next ---- */}
      {/* `next` is allowed to be empty. A "what I would do next" list that has
          been overtaken by what was actually built is worse than no list, so
          the column disappears rather than being padded out. */}
      <section
        className={cn(
          "shell mt-24 grid gap-14 md:mt-36 lg:gap-20",
          copy.next.items.length > 0 && "lg:grid-cols-2",
        )}
      >
        <Reveal>
          <p className="label">{copy.outcome.title}</p>
          <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-300 md:text-base">
            {copy.outcome.body}
          </p>
        </Reveal>

        {copy.next.items.length > 0 && (
          <Reveal>
            <p className="label">{copy.next.title}</p>
            <ul className="mt-6 flex flex-col gap-4">
              {copy.next.items.map((item, i) => (
                <li
                  key={i}
                  className="relative border-l border-line pl-5 text-[0.9375rem] leading-relaxed text-ink-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>

      {/* ---- next project ---- */}
      <nav className="shell mt-32 md:mt-44">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between gap-6 border-t border-line py-10 transition-colors duration-500 ease-(--ease-out-expo) hover:border-line-hover"
        >
          <div className="min-w-0">
            <span className="label">{t.ui.next}</span>
            <p className="display-3 mt-3 truncate text-ink-100">
              {t.projects[next.slug].name}
            </p>
          </div>
          <ArrowRight className="size-6 shrink-0 text-ink-600 transition-all duration-500 ease-(--ease-out-expo) group-hover:translate-x-1 group-hover:text-signal" />
        </Link>
      </nav>
    </article>
  );
}
