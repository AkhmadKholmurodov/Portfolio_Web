"use client";

import { LanguageProvider } from "@/components/providers/language-provider";
import { Nav } from "@/components/nav";
import { Cursor } from "@/components/ui/cursor";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Security } from "@/components/sections/security";
import { Contact, Footer } from "@/components/sections/contact";

/**
 * Single client boundary for the whole page: the language context, the 3D
 * hero and every scroll-driven animation live below it.
 */
export function Portfolio() {
  return (
    <LanguageProvider>
      <SmoothScroll />
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
        <About />
        <Stack />
        <Experience />
        <Projects />
        <Security />
        <Contact />
      </main>

      <Footer />
    </LanguageProvider>
  );
}
