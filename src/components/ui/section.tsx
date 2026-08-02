"use client";

import { Reveal, SplitWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

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
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70" />
          <span className="eyebrow">{eyebrow}</span>
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
