"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/components/providers/language-provider";
import { useActiveSection } from "@/components/providers/section-provider";
import { useReducedMotion } from "@/hooks/use-media";
import { navItems, profile, sections } from "@/content/profile";
import { DUR, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The nav does two things the visitor should never have to think about: it
 * gets out of the way of the hero, and it says where you are. "Where you are"
 * is marked with the accent, which is the site's rule for state.
 *
 * It says it in two different ways, because the two layouts have different
 * amounts of room. On desktop the section names are all present and a pill
 * travels between them. On a phone there is no room for five names, so the bar
 * carries a single readout that *changes as you scroll* — the name of the site
 * while you are still at the top, and the current section's own label once you
 * are past it. Same fact, one line instead of five.
 */

/**
 * The menu mark: two rules that fold into a cross.
 *
 * Transform only, and both bars start life at the same place — dead centre —
 * with the closed state pushing them 5px apart. That is the whole trick: there
 * is nothing to interpolate between `top: 0` and `top: 50%`, and a hamburger
 * animated on `top` is the one that jitters. Rotating about a shared centre
 * cannot.
 */
function MenuMark({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-[22px]">
      <span
        className={cn(
          "absolute top-1/2 left-0 h-px w-full bg-ink-100 transition-transform duration-[420ms] ease-(--ease-out-expo)",
          open ? "rotate-45" : "-translate-y-[5px]",
        )}
      />
      <span
        className={cn(
          "absolute top-1/2 left-0 h-px w-full bg-ink-100 transition-transform duration-[420ms] ease-(--ease-out-expo)",
          open ? "-rotate-45" : "translate-y-[5px]",
        )}
      />
    </span>
  );
}

export function Nav() {
  const { t } = useLanguage();
  const active = useActiveSection();
  // `useActiveSection` only knows about the home page's sections, so on any
  // other route the nav had nothing marked at all — including on /about, where
  // the answer is not ambiguous.
  const pathname = usePathname();
  const onAbout = pathname === "/about";
  // A case study is the third kind of place a visitor can be, and on a phone
  // it is the one where the bar is otherwise completely empty: no section to
  // report, no room for the name. The slug is the answer and it is right there
  // in the URL.
  const workSlug = pathname.startsWith("/work/")
    ? pathname.slice("/work/".length)
    : undefined;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
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

  /**
   * The mobile readout, in two pieces.
   *
   * It reads exactly as the section's own label does — "02 — Run" in the bar
   * over "02 — Run" on the page — because it is assembled from the same two
   * facts rather than shortened into a second set of names. Telling a visitor
   * one thing twice is the point; two different names for one section is how a
   * nav stops being trustworthy.
   *
   * It is assembled rather than taken whole from `t.<section>.label` so that
   * the ordinal can be dropped on the narrowest screens. Below 360px there is
   * roughly 90px for this line, and "01 — Xavfsizlik" is not 90px in any
   * typeface. The number is the half that can go: it is a nicety, and the name
   * is the answer to the question the line exists to answer.
   */
  // Stack is excluded from the numbering: it is the toolkit, printed as
  // "Toolkit" with no ordinal, so counting it would push Contact from 05 to
  // 06. It still gets a trigger (see `sections`) so the readout leaves AI.
  const numbered = sections.filter((s) => s.id !== "home" && s.id !== "stack");
  const sectionNo = (id: string) => {
    const i = numbered.findIndex((s) => s.id === id);
    return i < 0 ? undefined : String(i + 1).padStart(2, "0");
  };
  // Empty until the page has actually moved. The obvious thing to put here at
  // the top of the page is the name — and it is the wrong thing: the name is
  // already on screen at 40px directly underneath, so the bar would be
  // repeating the largest text on the page in the smallest. The slot filling
  // as you leave the hero is also the clearer signal that this line is
  // *reporting* rather than labelling.
  const workName = workSlug
    ? t.projects[workSlug as keyof typeof t.projects]?.name
    : undefined;
  const readoutId = workSlug
    ? `work:${workSlug}`
    : onAbout
      ? "about"
      : scrolled
        ? active
        : undefined;
  const readout = readoutId
    ? {
        no:
          workSlug || onAbout || readoutId === "stack"
            ? undefined
            : sectionNo(readoutId),
        name:
          workName ??
          (onAbout
            ? t.nav.about
            : readoutId === "stack"
              ? t.stack.label
              : (t.nav[readoutId as keyof typeof t.nav] as string | undefined)),
      }
    : undefined;

  const menuItems = [
    ...links.map((item, i) => ({
      ...item,
      /** Matches the section's own number on the page. */
      n: String(i + 1).padStart(2, "0"),
      current: active === item.id,
    })),
    // About is a route, not a section, so it gets no number. The empty slot is
    // deliberate — the column of numbers still lines up, and a fifth number
    // here would claim a place in the page's sequence that About does not have.
    { id: "about", href: "/about", label: t.nav.about, n: "", current: onAbout },
  ];

  return (
    <>
      {/* Reading progress. Celadon, because it tracks your own scrolling — and one
          pixel tall,
          because it is not information anybody came here for. */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-signal"
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
        <nav className="shell flex h-[74px] items-center justify-between gap-3 sm:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5 lg:gap-3"
              aria-label={profile.name}
            >
              <span className="font-mono text-label tracking-widest text-ink-500 transition-colors duration-300 ease-(--ease-out-expo) group-hover:text-ink-300">
                {profile.initials}
              </span>
              <span className="hidden text-ui font-medium text-ink-200 lg:block">
                {profile.name}
              </span>
            </Link>

            {/* The readout. Both states are absolutely positioned inside a
                fixed-height clip, so the outgoing line leaves through the top
                while the incoming one arrives from underneath — they overlap,
                which is what makes it read as one line changing rather than as
                two lines taking turns. */}
            <div
              aria-hidden
              className="relative h-5 min-w-0 flex-1 overflow-hidden lg:hidden"
            >
              {/* The inner span is not redundant: `text-overflow: ellipsis`
                  is a property of a block container, and the anonymous text
                  inside a flex container is not one — so `truncate` on the
                  flex parent clips the label dead, with no ellipsis to say it
                  was clipped. It has to sit on the element that holds the
                  text. */}
              {reduced ? (
                readout?.name && (
                  <span className="label absolute inset-0 flex items-center">
                    <ReadoutText {...readout} />
                  </span>
                )
              ) : (
                <AnimatePresence initial={false}>
                  {readout?.name && (
                    <motion.span
                      key={readoutId}
                      className="label absolute inset-0 flex items-center"
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-110%", opacity: 0 }}
                      transition={{ duration: DUR.fast, ease: EASE_OUT }}
                    >
                      <ReadoutText {...readout} />
                    </motion.span>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* The links sit in a tray of their own. On a near-black page the
              nav was legible against anything behind it; on paper it is dark
              text over a hero photograph and a schematic, and a tray is the
              cheapest way to guarantee the contrast without painting the whole
              bar in. */}
          <div className="hidden items-center gap-0.5 rounded-full border border-line bg-surface-2/75 p-1 lg:flex">
            {links.map((item) => {
              const current = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-ui transition-colors duration-300 ease-(--ease-out-expo)",
                    current ? "text-signal" : "text-ink-500 hover:text-ink-100",
                  )}
                >
                  {/* One pill, moved between the links rather than one pill
                      per link faded in and out. `layoutId` is what makes the
                      difference readable: the marker travels, so the nav is
                      showing you that you moved from Build to Run rather than
                      just asserting where you are now.

                      Tween, not spring. A spring is the obvious choice for a
                      marker like this and it is the wrong one here — it
                      overshoots, and nothing on this page overshoots. */}
                  {current &&
                    (reduced ? (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-signal-soft"
                      />
                    ) : (
                      <motion.span
                        aria-hidden
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-signal-soft"
                        transition={{ duration: DUR.fast, ease: EASE_OUT }}
                      />
                    ))}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
            <Link
              href="/about"
              aria-current={onAbout ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-ui transition-colors duration-300 ease-(--ease-out-expo)",
                onAbout ? "text-signal" : "text-ink-500 hover:text-ink-100",
              )}
            >
              {onAbout &&
                (reduced ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-signal-soft"
                  />
                ) : (
                  <motion.span
                    aria-hidden
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-signal-soft"
                    transition={{ duration: DUR.fast, ease: EASE_OUT }}
                  />
                ))}
              <span className="relative">{t.nav.about}</span>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Always on the bar, at every width. It used to appear below
                `sm` only inside the menu, which put the one control a visitor
                might need in their own language behind a button labelled in a
                language they may not read. */}
            <LanguageSwitcher />
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
                <button
                  type="button"
                  aria-label={t.ui.menu}
                  className="-mr-2.5 flex size-11 items-center justify-center rounded-full outline-none lg:hidden"
                >
                  <MenuMark open={open} />
                </button>
              </SheetTrigger>

              <SheetContent title={t.ui.menu}>
                {/* The panel's header is the bar, rebuilt to the same
                    measurements: same 74px, same shell padding, mark on the
                    left, language and the toggle on the right. Nothing appears
                    to move when the menu opens except the page behind it —
                    which is the only thing that actually did. */}
                <div className="shell flex h-[74px] shrink-0 items-center justify-between gap-4 border-b border-line">
                  <span className="font-mono text-label tracking-widest text-ink-500">
                    {profile.initials}
                  </span>
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <SheetClose asChild>
                      <button
                        type="button"
                        aria-label={t.ui.close}
                        className="-mr-2.5 flex size-11 items-center justify-center rounded-full outline-none"
                      >
                        <MenuMark open />
                      </button>
                    </SheetClose>
                  </div>
                </div>

                {/* The links arrive one after another, 60ms apart, on the
                    page's own arrival curve. The panel unmounts when it
                    closes, so mounting *is* the trigger — no state to keep in
                    sync, and the stagger replays every time it is opened. */}
                <div className="shell flex flex-1 flex-col justify-center py-6">
                  {menuItems.map((item, i) => (
                    <SheetClose asChild key={item.id}>
                      <Link
                        href={item.href}
                        aria-current={item.current ? "true" : undefined}
                        className="lift-in group flex items-center gap-5 border-b border-line py-4 last:border-b-0"
                        style={{ animationDelay: `${140 + i * 60}ms` }}
                      >
                        <span
                          className={cn(
                            "w-7 shrink-0 font-mono text-label tracking-label tabular-nums",
                            item.current ? "text-signal" : "text-ink-600",
                          )}
                        >
                          {item.n}
                        </span>
                        <span
                          className={cn(
                            "display-3 transition-colors duration-300",
                            item.current ? "text-signal" : "text-ink-100",
                          )}
                        >
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "ml-auto size-4 shrink-0 transition-transform duration-400 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                            item.current ? "text-signal" : "text-ink-600",
                          )}
                        />
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div
                  className="lift-in shell shrink-0 border-t border-line py-6"
                  style={{ animationDelay: `${140 + menuItems.length * 60}ms` }}
                >
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <a href={`mailto:${profile.email}`}>{t.contact.emailCta}</a>
                    </Button>
                  </SheetClose>
                  <p className="mt-4 font-mono text-label tracking-label text-ink-400">
                    {t.hero.availability}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}

/**
 * The ordinal and the name. `tabular-nums` because the number changes under a
 * fixed-width slot as you scroll, and proportional figures would shift the
 * name sideways every time the section did.
 */
function ReadoutText({ no, name }: { no?: string; name?: string }) {
  return (
    <>
      {no && (
        <span className="hidden shrink-0 tabular-nums min-[360px]:inline">
          {no}&nbsp;—&nbsp;
        </span>
      )}
      <span className="truncate">{name}</span>
    </>
  );
}
