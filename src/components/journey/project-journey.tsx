"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { projectsMeta, signalHex, type ProjectMeta } from "@/content/profile";
import { DESIGN, useFitScale, type SceneSize } from "@/components/journey/stage";
import { SceneWeb } from "@/components/journey/scene-web";
import { SceneSurveillance } from "@/components/journey/scene-surveillance";
import { SceneMobile } from "@/components/journey/scene-mobile";
import { useTheme } from "@/components/providers/theme-provider";
import { useSceneSize } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/**
 * The projects section as a walk through three products.
 *
 * One sticky stage, one scroll timeline. Global progress runs 0 → 1 across the
 * whole track; each project owns an equal slice of it and receives that slice
 * remapped to its own 0 → 1, which every scene uses to choreograph itself.
 * Scenes cross-fade in the overlap between slices.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Track height per project. Longer means a slower, more readable walk — but
 *  on a phone every extra viewport is another thumb flick, so it shortens. */
const SCENE_VH = { wide: 150, compact: 150, narrow: 115 } as const;

/** Where in each scene's local timeline its named beats begin. */
const BEAT_MARKS = [0, 0.3, 0.55, 0.78] as const;

const SCENES = {
  web: SceneWeb,
  surveillance: SceneSurveillance,
  mobile: SceneMobile,
} as const;

export function ProjectJourney({
  onOpen,
}: {
  onOpen: (key: ProjectMeta["key"]) => void;
}) {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const size = useSceneSize();
  const count = projectsMeta.length;

  const { scrollYProgress: trackedProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /**
   * Mirrored into a plain value, and every consumer reads this one.
   *
   * `useScroll` tags its progress as hardware-accelerable, and any
   * `useTransform` taken straight off it is handed to the compositor as a
   * ViewTimeline over the target's `contain` range — the window in which the
   * target fits entirely inside the viewport. This track is three viewports
   * tall, so that range never opens and those transforms sit frozen at their
   * first keyframe. The mirror drops the tag, putting the whole stage back on
   * the JS path where its timings are actually honoured.
   */
  const scrollYProgress = useMotionValue(0);
  useMotionValueEvent(trackedProgress, "change", (v) => scrollYProgress.set(v));

  const design = DESIGN[size];
  const sceneVh = SCENE_VH[size];
  const { ref: fitRef, scale } = useFitScale(design.w, design.h);

  // Two indices drive everything textual: which project, and which beat within
  // it. Both change a handful of times over the whole track, so deriving them
  // as state costs three renders rather than one per frame.
  const [{ scene, beat }, setCursor] = useState({ scene: 0, beat: 0 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const raw = v * count;
    const nextScene = Math.min(count - 1, Math.max(0, Math.floor(raw)));
    const local = raw - nextScene;

    let nextBeat = 0;
    for (let i = 0; i < BEAT_MARKS.length; i++) {
      if (local >= BEAT_MARKS[i]) nextBeat = i;
    }

    if (nextScene !== scene || nextBeat !== beat) {
      setCursor({ scene: nextScene, beat: nextBeat });
    }
  });

  const meta = projectsMeta[scene];
  const project = t.projects.items[meta.key];
  const beats = t.projects.journey.beats[meta.key];
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${count * sceneVh}vh` }}
    >
      {/* Anchor targets for the rail. Lenis owns in-page hash clicks, so a
          plain <a href="#…"> is the one way to jump that does not fight it.
          Each sits a quarter into its scene, where that scene has finished
          assembling — landing on 0 would drop the visitor on a bare stage. */}
      {projectsMeta.map((m, i) => (
        <span
          key={m.key}
          id={`journey-${m.key}`}
          aria-hidden
          className="absolute left-0 h-px w-px"
          style={{
            top: `${(((i + 0.28) / count) * (count * sceneVh - 100)) / (count * sceneVh) * 100}%`,
          }}
        />
      ))}

      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div
          className="mx-auto flex h-full w-full max-w-7xl flex-col px-5 pb-6 sm:px-8"
          style={{ paddingTop: "calc(var(--header-h) + 0.75rem)" }}
        >
          <Rail
            progress={scrollYProgress}
            count={count}
            activeScene={scene}
            beatLabel={beats[beat]}
          />

          <div ref={fitRef} className="relative mt-4 min-h-0 flex-1">
            {projectsMeta.map((m, i) => (
              <SceneLayer
                key={m.key}
                meta={m}
                index={i}
                count={count}
                progress={scrollYProgress}
                design={design}
                scale={scale}
                size={size}
              />
            ))}

            <motion.p
              style={{ opacity: hintOpacity }}
              className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-mono text-[10px] tracking-[0.2em] text-ink-500 uppercase"
            >
              {t.projects.journey.hint}
            </motion.p>
          </div>

          <Caption
            meta={meta}
            name={project.name}
            subtitle={project.subtitle}
            status={project.status}
            size={size}
            onOpen={() => onOpen(meta.key)}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Scene layer — owns one project's slice of the timeline.
 * ------------------------------------------------------------------ */
function SceneLayer({
  meta,
  index,
  count,
  progress,
  design,
  scale,
  size,
}: {
  meta: ProjectMeta;
  index: number;
  count: number;
  progress: MotionValue<number>;
  design: { w: number; h: number };
  scale: number;
  size: SceneSize;
}) {
  const { isDark } = useTheme();
  const hue = signalHex(meta.signal, isDark);

  const start = index / count;
  const end = (index + 1) / count;
  const fade = 0.5 / count / 6;
  const stops = [start - fade, start + fade, end - fade, end + fade];

  const local = useTransform(progress, [start, end], [0, 1]);

  // The first and last scenes have no neighbour to hand over to, so they hold
  // against the section's edges instead of fading into nothing.
  const opacity = useTransform(progress, stops, [
    index === 0 ? 1 : 0,
    1,
    1,
    index === count - 1 ? 1 : 0,
  ]);

  const depth = useTransform(progress, stops, [
    index === 0 ? 1 : 1.04,
    1,
    1,
    index === count - 1 ? 1 : 0.96,
  ]);

  const Scene = SCENES[meta.scene];

  return (
    <motion.div
      className="absolute inset-0 grid place-items-center"
      style={{ opacity, pointerEvents: "none", willChange: "opacity" }}
    >
      {/* Fit first, then the cross-fade's own depth move — two transforms that
          must not overwrite each other, hence two elements. */}
      <div
        style={{
          width: design.w,
          height: design.h,
          transform: `scale(${scale})`,
          // Until the stage has measured itself there is no honest size to
          // draw at; a frame of unscaled 1040px artwork would blow the layout.
          visibility: scale ? "visible" : "hidden",
        }}
      >
        <motion.div className="h-full w-full" style={{ scale: depth }}>
          <Scene p={local} tint={hue} size={size} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Rail
 * ------------------------------------------------------------------ */
function Rail({
  progress,
  count,
  activeScene,
  beatLabel,
}: {
  progress: MotionValue<number>;
  count: number;
  activeScene: number;
  beatLabel: string;
}) {
  const { t } = useLanguage();

  return (
    <div className="flex shrink-0 items-end gap-4">
      <div className="flex min-w-0 flex-1 gap-2 sm:gap-4">
        {projectsMeta.map((m, i) => (
          <RailSegment
            key={m.key}
            meta={m}
            index={i}
            count={count}
            progress={progress}
            name={t.projects.items[m.key].name}
            active={i === activeScene}
          />
        ))}
      </div>

      <div className="hidden h-8 items-center sm:flex">
        <AnimatePresence mode="wait">
          <motion.span
            key={beatLabel}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.34, ease: EASE }}
            className="text-right text-[13px] text-ink-300"
          >
            {beatLabel}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function RailSegment({
  meta,
  index,
  count,
  progress,
  name,
  active,
}: {
  meta: ProjectMeta;
  index: number;
  count: number;
  progress: MotionValue<number>;
  name: string;
  active: boolean;
}) {
  const { isDark } = useTheme();
  const hue = signalHex(meta.signal, isDark);
  const fill = useTransform(progress, [index / count, (index + 1) / count], [0, 1]);

  return (
    <a
      href={`#journey-${meta.key}`}
      className="group min-w-0 flex-1 outline-offset-4"
      aria-current={active ? "step" : undefined}
    >
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-mono text-[10px] tracking-[0.18em] transition-colors duration-500"
          style={{ color: active ? hue : undefined }}
        >
          <span className={cn(!active && "text-ink-700")}>{meta.index}</span>
        </span>
        <span
          className={cn(
            "truncate text-[12px] transition-colors duration-500 sm:text-[13px]",
            active ? "text-ink-100" : "text-ink-700 group-hover:text-ink-500",
          )}
        >
          {name}
        </span>
      </div>
      <div className="mt-2 h-px w-full bg-surface-2">
        <motion.div
          className="h-full origin-left"
          style={{ scaleX: fill, background: hue }}
        />
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Caption
 * ------------------------------------------------------------------ */
function Caption({
  meta,
  name,
  subtitle,
  status,
  size,
  onOpen,
}: {
  meta: ProjectMeta;
  name: string;
  subtitle: string;
  status: string;
  size: SceneSize;
  onOpen: () => void;
}) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const hue = signalHex(meta.signal, isDark);

  return (
    <div className="mt-4 flex shrink-0 flex-col gap-4 border-t border-line pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      {/* `mode="wait"` empties this slot for the length of the exit. Reserving
          the height stops the stage above from lurching on every handover. */}
      <div className="min-w-0 sm:min-h-[104px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={meta.key}
            initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            transition={{ duration: 0.36, ease: EASE }}
            className="min-w-0"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-500">
                {meta.index} / {meta.year}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em]"
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
                {status}
              </span>
            </div>

            <h3 className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                {name}
              </span>
              <span className="text-[13px] text-ink-500 sm:text-[14px]">{subtitle}</span>
            </h3>

            {size === "wide" && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {meta.tech.slice(0, 6).map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[10px] text-ink-500"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onOpen}
          className="group/btn inline-flex items-center gap-2 rounded-full bg-ink-100 px-4 py-2 text-[13px] font-medium text-ink-950 transition-colors duration-300 hover:bg-accent"
        >
          {t.projects.caseStudy}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>

        {meta.href ? (
          <a
            href={meta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[13px] text-ink-300 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
          >
            {t.projects.viewLive}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] text-ink-500">
            <Lock className="h-3 w-3" />
            {t.projects.privateRepo}
          </span>
        )}
      </div>
    </div>
  );
}
