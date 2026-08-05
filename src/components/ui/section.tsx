"use client";

import { motion } from "motion/react";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import { Scramble } from "@/components/ui/text-fx";
import { DUR, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The join between two sections.
 *
 * A hairline that draws itself outward from the middle as it comes into view,
 * with a single mark at the centre. It exists so the page reads as one
 * continuous document rather than a stack of unrelated blocks — which is the
 * whole job of a seam, and why it should be almost invisible while doing it.
 */
export function SectionSeam() {
  const inView = { once: true, margin: "-18% 0px -18% 0px" } as const;

  return (
    <div aria-hidden className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="relative h-px">
        <motion.div
          className="h-px w-full origin-center bg-gradient-to-r from-transparent via-line-strong to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={inView}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.9 }}
          viewport={inView}
          transition={{ duration: DUR.base, delay: 0.4, ease: EASE_OUT }}
        />
      </div>
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      // Anchor jumps must clear the fixed header.
      className={cn("relative scroll-mt-24 py-24 sm:py-32 lg:py-40", className)}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <header
      className={cn(
        "mb-14 sm:mb-20",
        align === "center" && "text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <motion.span
            className="h-px w-8 origin-left bg-gradient-to-r from-transparent to-accent/70"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DUR.slow, ease: EASE_OUT }}
          />
          <span className="eyebrow">
            <Scramble text={eyebrow} delay={0.1} dwell={26} startOnView />
          </span>
        </div>
      </Reveal>

      <h2 className="mt-5 text-balance text-4xl font-medium tracking-[-0.03em] sm:text-5xl lg:text-6xl">
        <SplitWords text={title} />
      </h2>

      {lead && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-300 sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </header>
  );
}
