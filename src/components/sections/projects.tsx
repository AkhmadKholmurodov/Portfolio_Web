"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Lock, X } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import {
  lifecycleStates,
  projectsMeta,
  signalHex,
  type ProjectMeta,
} from "@/content/profile";
import type { Dict } from "@/content/i18n";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { ProjectJourney } from "@/components/journey/project-journey";
import { useTheme } from "@/components/providers/theme-provider";
import { useIsTouch, useReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

type ProjectKey = ProjectMeta["key"];
type Project = Dict["projects"]["items"][ProjectKey];
type DeepDive = Project["deepDive"];

/**
 * The eYaqin deep dive is a state machine keyed by state name; the other two
 * are ordered pipelines. Both render as the same connected flow.
 */
function flowSteps(deepDive: DeepDive): { label: string; body: string }[] {
  if ("states" in deepDive) {
    return lifecycleStates.map((state) => ({
      label: state,
      body: deepDive.states[state],
    }));
  }
  return [...deepDive.steps];
}

/* ------------------------------------------------------------------ *
 * Card
 * ------------------------------------------------------------------ */
function ProjectCard({
  meta,
  project,
  onOpen,
}: {
  meta: ProjectMeta;
  project: Project;
  onOpen: () => void;
}) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const hue = signalHex(meta.signal, isDark);
  const hue2 = signalHex(projectsMeta[1].signal, isDark);
  const ref = useRef<HTMLElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const tiltOff = isTouch || reduced;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 22 });

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const wash = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, ${hue}22, transparent 60%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    mx.set(px * 100);
    my.set(py * 100);
    if (!tiltOff) {
      rx.set((0.5 - py) * 6);
      ry.set((px - 0.5) * 8);
    }
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tiltOff ? undefined : { rotateX, rotateY, transformPerspective: 1400 }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-9 lg:p-11"
    >
      <motion.div
        aria-hidden
        style={{ background: wash }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${hue}, ${hue2}, transparent)`,
        }}
      />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink-500">
              {meta.index} / {meta.year}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{
                borderColor: `${hue}44`,
                color: hue,
                background: `${hue}0f`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-[blip_2.4s_ease-in-out_infinite]"
                style={{ background: hue }}
              />
              {project.status}
            </span>
          </div>

          <h3 className="mt-5 text-3xl font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            {project.name}
          </h3>
          <p className="mt-2 text-[15px] text-ink-300">{project.subtitle}</p>

          <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-[1.75] text-ink-300">
            {project.summary}
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-[14px] leading-[1.7] text-ink-500">
            {project.role}
          </p>

          <ul className="mt-8 flex flex-wrap gap-1.5">
            {meta.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-ink-500"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.22}>
              <button
                type="button"
                onClick={onOpen}
                className="group/btn inline-flex items-center gap-2 rounded-full bg-ink-100 px-5 py-2.5 text-sm font-medium text-ink-950 transition-colors duration-300 hover:bg-accent"
              >
                {t.projects.caseStudy}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </Magnetic>

            {meta.href ? (
              <a
                href={meta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink-300 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                {t.projects.viewLive}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink-500">
                <Lock className="h-3.5 w-3.5" />
                {t.projects.privateRepo}
              </span>
            )}
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-px self-start overflow-hidden rounded-2xl border border-line bg-surface-2 lg:grid-cols-1">
          {project.highlights.map((highlight) => (
            <div key={highlight.label} className="bg-[var(--bg)] p-4 lg:p-5">
              <dt className="sr-only">{highlight.label}</dt>
              <dd
                className="text-lg font-medium tracking-tight sm:text-xl"
                style={{ color: hue }}
              >
                {highlight.value}
              </dd>
              <p className="mt-1 text-[11px] leading-snug text-ink-500">
                {highlight.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ *
 * Case study dialog
 * ------------------------------------------------------------------ */
function CaseStudy({
  meta,
  project,
  onClose,
}: {
  meta: ProjectMeta;
  project: Project;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const hue = signalHex(meta.signal, isDark);
  const hue2 = signalHex(projectsMeta[2].signal, isDark);
  const closeRef = useRef<HTMLButtonElement>(null);
  const steps = flowSteps(project.deepDive);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0 bg-ink-950/94 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        // Lenis must not swallow the wheel events inside the sheet.
        data-lenis-prevent
        initial={{ y: 40, opacity: 0, scale: 0.985 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-ink-900 sm:max-h-[88svh] sm:rounded-3xl"
      >
        <div
          aria-hidden
          className="pointer-events-none sticky top-0 z-10 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${hue}, ${hue2}, transparent)`,
          }}
        />

        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-ink-900/92 px-6 py-5 backdrop-blur sm:px-9">
          <div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink-500">
              {meta.index} / {meta.year}
            </span>
            <h3 className="mt-1.5 text-2xl font-medium tracking-tight sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-ink-500">{project.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.projects.close}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink-300 transition-colors hover:border-line-strong hover:text-ink-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-12 px-6 py-9 sm:px-9 sm:py-11">
          {/* Proof first. Everything below this is a claim; these are captures
              of the thing actually running. */}
          {meta.shots && "shots" in project && (
            <div>
              <h4 className="eyebrow">{t.projects.shotsTitle}</h4>
              <div className="mt-5 space-y-6">
                {meta.shots.map((shot, i) => (
                  <figure key={shot}>
                    <div className="overflow-hidden rounded-2xl border border-line bg-ink-950">
                      <Image
                        src={`/shots/${shot}.webp`}
                        alt={project.shots[i].alt}
                        width={1000}
                        height={625}
                        sizes="(min-width: 640px) 46rem, 100vw"
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-2.5 text-[13px] leading-relaxed text-ink-500">
                      {project.shots[i].caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div>
            <h4 className="eyebrow">{t.projects.featuresTitle}</h4>
            <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-surface-2 sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="bg-ink-900 p-5 transition-colors duration-500 hover:bg-surface"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: hue }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h5 className="text-sm font-medium text-ink-100">
                      {feature.title}
                    </h5>
                  </div>
                  <p className="mt-2 pl-[1.9rem] text-[13px] leading-relaxed text-ink-500">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep dive */}
          <div>
            <h4 className="text-xl font-medium tracking-tight sm:text-2xl">
              {project.deepDive.title}
            </h4>
            <p className="mt-3 max-w-2xl text-pretty text-[15px] leading-[1.7] text-ink-300">
              {project.deepDive.body}
            </p>

            <ol className="mt-7 space-y-2">
              {steps.map((step, i) => (
                <li
                  key={step.label}
                  className="relative flex flex-col gap-1 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:gap-5"
                >
                  <div className="flex shrink-0 items-center gap-3 sm:w-56">
                    <span
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-[10px]"
                      style={{
                        background: `${hue}18`,
                        color: hue,
                      }}
                    >
                      {i + 1}
                    </span>
                    <code className="font-mono text-[13px] text-ink-100">
                      {step.label}
                    </code>
                  </div>
                  <p className="text-[13px] leading-relaxed text-ink-500 sm:pl-5 sm:border-l sm:border-line">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-7 rounded-2xl border border-line bg-surface p-5">
              <h5 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {project.deepDive.whyTitle}
              </h5>
              <ul className="mt-3 space-y-2">
                {project.deepDive.why.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[14px] leading-relaxed text-ink-300"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: hue }}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architecture */}
          <div className="grid gap-4 sm:grid-cols-3">
            {project.architecture.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <h5 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
                  {block.title}
                </h5>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
                  {block.body}
                </p>
              </div>
            ))}
          </div>

          {/* Next */}
          <div className="border-t border-line pt-7">
            <h5 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
              {project.nextTitle}
            </h5>
            <ul className="mt-3 space-y-2">
              {project.next.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[14px] leading-relaxed text-ink-300"
                >
                  <span aria-hidden className="text-ink-700">
                    →
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {meta.href && (
            <a
              href={meta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink-100 px-5 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-accent"
            >
              {t.projects.viewLive}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */
export function Projects() {
  const { t } = useLanguage();
  const [openKey, setOpenKey] = useState<ProjectKey | null>(null);
  const reduced = useReducedMotion();

  const openMeta = projectsMeta.find((p) => p.key === openKey);

  return (
    <Section id="projects" className={cn(!reduced && "pb-16 sm:pb-24 lg:pb-28")}>
      <Container>
        <SectionHeader
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          lead={t.projects.lead}
        />
      </Container>

      {/* The walkthrough is the section. Under reduced motion a scroll-driven
          stage is not a downgrade to soften — it is the wrong thing entirely,
          so that visitor gets the same three projects as static cards. */}
      {reduced ? (
        <Container>
          <div className="space-y-6 sm:space-y-8">
            {projectsMeta.map((meta, i) => (
              <Reveal key={meta.key} delay={i * 0.06} y={40}>
                <ProjectCard
                  meta={meta}
                  project={t.projects.items[meta.key]}
                  onOpen={() => setOpenKey(meta.key)}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      ) : (
        <ProjectJourney onOpen={setOpenKey} />
      )}

      <AnimatePresence>
        {openMeta && (
          <CaseStudy
            meta={openMeta}
            project={t.projects.items[openMeta.key]}
            onClose={() => setOpenKey(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
