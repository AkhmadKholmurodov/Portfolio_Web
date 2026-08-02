"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { locales, localeLabels, type Locale } from "@/content/i18n";
import { profile, sectionIds, type SectionId } from "@/content/profile";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

const navItems = sectionIds.filter((id) => id !== "home");

/* ------------------------------------------------------------------ *
 * Scroll progress hairline pinned to the top of the viewport.
 * ------------------------------------------------------------------ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
    />
  );
}

/* ------------------------------------------------------------------ *
 * Scroll spy — marks the section currently filling the viewport.
 * ------------------------------------------------------------------ */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      // Band across the middle of the screen, so a section counts as
      // "current" while it occupies the reading area.
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ------------------------------------------------------------------ *
 * Language switcher
 * ------------------------------------------------------------------ */
function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.a11y.languageSwitcher}
      className={cn(
        "relative flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 backdrop-blur",
        className,
      )}
    >
      {locales.map((code: Locale) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            title={localeLabels[code].full}
            className={cn(
              "relative rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider transition-colors duration-300",
              isActive ? "text-ink-950" : "text-ink-500 hover:text-ink-100",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{localeLabels[code].short}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Header
 * ------------------------------------------------------------------ */
export function Nav() {
  const { t } = useLanguage();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollProgress />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
              scrolled
                ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
                : "border border-transparent bg-transparent",
            )}
          >
            <a
              href="#home"
              className="group flex items-center gap-2.5"
              aria-label={profile.name}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-[11px] font-bold text-ink-950">
                {profile.initials}
              </span>
              <span className="hidden text-sm font-medium tracking-tight sm:block">
                {profile.name}
              </span>
            </a>

            <nav className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-[13px] transition-colors duration-300",
                    active === id
                      ? "text-ink-100"
                      : "text-ink-500 hover:text-ink-300",
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t.nav[id]}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher className="hidden sm:flex" />

              <Magnetic strength={0.2} className="hidden sm:inline-block">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 rounded-full bg-ink-100 px-3.5 py-1.5 text-[13px] font-medium text-ink-950 transition-colors hover:bg-accent"
                >
                  {t.nav.resume}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t.a11y.menu}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-300 transition-colors hover:text-ink-100 lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink-950/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <LanguageSwitcher />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.a11y.closeMenu}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1">
                {navItems.map((id, i) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.05,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-baseline gap-4 border-b border-white/5 py-4 text-3xl font-medium tracking-tight text-ink-100"
                  >
                    <span className="font-mono text-xs text-accent/70">
                      0{i + 1}
                    </span>
                    {t.nav[id]}
                  </motion.a>
                ))}
              </nav>

              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-ink-100 py-3.5 font-medium text-ink-950"
              >
                {t.nav.resume}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
