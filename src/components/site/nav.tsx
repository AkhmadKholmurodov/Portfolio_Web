"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/components/providers/language-provider";
import { useActiveSection } from "@/components/providers/section-provider";
import { navItems, profile } from "@/content/profile";
import { cn } from "@/lib/utils";

/**
 * The nav does two things the visitor should never have to think about: it
 * gets out of the way of the hero, and it says where you are. "Where you are"
 * is marked with the accent, which is the site's rule for state.
 */
export function Nav() {
  const { t } = useLanguage();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // A plain listener rather than a ScrollTrigger: this is one boolean and
    // it does not need to be in sync with anything else on the page.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navItems.map((item) => ({
    ...item,
    label: t.nav[item.id as keyof typeof t.nav],
  }));

  return (
    <>
      {/* Reading progress. Celadon, because it tracks your own scrolling — and one
          pixel tall,
          because it is not information anybody came here for. */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-signal/70"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-(--ease-out-expo)",
          // The only backdrop filter left on the page, and it earns its cost: the nav
          // sits over content as well as over the field, and a solid bar at the top of
          // a full-bleed 3D page reads as a browser chrome bug. Everything else that
          // used to blur now uses an opaque surface — see the note in `ui/button.tsx`.
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={profile.name}
          >
            <span className="flex size-8 items-center justify-center rounded-md border border-line font-mono text-label tracking-widest text-ink-200 transition-colors duration-400 ease-(--ease-out-expo) group-hover:border-line-hover">
              {profile.initials}
            </span>
            <span className="hidden text-ui font-medium text-ink-200 sm:block">
              {profile.name}
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((item) => {
              const current = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-ui transition-colors duration-300 ease-(--ease-out-expo)",
                    current ? "text-signal" : "text-ink-500 hover:text-ink-100",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/about"
              className="rounded-full px-3.5 py-2 text-ui text-ink-500 transition-colors duration-300 ease-(--ease-out-expo) hover:text-ink-100"
            >
              {t.nav.about}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            {/* The contact section has no nav link of its own, so the button
                carries the current-section state instead — otherwise the nav
                goes blank for the last screen of the page. */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className={cn(
                "hidden lg:inline-flex",
                active === "contact" && "border-signal-line text-signal",
              )}
            >
              <Link href="/#contact">{t.nav.contact}</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label={t.ui.menu}
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent title={t.ui.menu}>
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <LanguageSwitcher />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label={t.ui.close}>
                      <X />
                    </Button>
                  </SheetClose>
                </div>

                <div className="flex flex-1 flex-col gap-1 p-5">
                  {links.map((item) => (
                    <SheetClose asChild key={item.id}>
                      <Link
                        href={item.href}
                        className={cn(
                          "display-3 py-2 transition-colors duration-300",
                          active === item.id ? "text-signal" : "text-ink-200",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/about" className="display-3 py-2 text-ink-200">
                      {t.nav.about}
                    </Link>
                  </SheetClose>
                </div>

                <div className="border-t border-line p-5">
                  <Button asChild className="w-full">
                    <a href={`mailto:${profile.email}`}>{t.contact.emailCta}</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
