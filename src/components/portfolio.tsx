"use client";

import { LanguageProvider } from "@/components/providers/language-provider";
import { Nav } from "@/components/nav";
import { Cursor } from "@/components/ui/cursor";
import { WaterGlass } from "@/components/ui/water-glass";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Security } from "@/components/sections/security";
import { Contact, Footer } from "@/components/sections/contact";
import { SectionSeam } from "@/components/ui/section";

/**
 * Single client boundary for the whole page: the language context, the 3D hero
 * and every scroll-driven animation live below it.
 */
export function Portfolio() {
  return (
    <LanguageProvider>
      <SmoothScroll />
      <WaterGlass />
      <Cursor />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink-100 focus:px-4 focus:py-2 focus:text-sm focus:text-ink-950"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />

        {/* The hero is sticky, so this is what climbs over it: an opaque sheet
            with a lifted top edge. The hand-off reads as the next page
            arriving rather than the first one leaving, and it costs one
            wrapper — the scroll doing the work is the real one. */}
        <div className="relative z-10 rounded-t-[2rem] bg-ink-950 shadow-[0_-26px_60px_-30px_var(--line-strong)] sm:rounded-t-[2.5rem]">
          <About />
          <SectionSeam />
          <Stack />
          <SectionSeam />
          <Experience />
          <SectionSeam />
          <Projects />
          <SectionSeam />
          <Security />
          <SectionSeam />
          <Contact />
        </div>
      </main>

      <Footer />
    </LanguageProvider>
  );
}
