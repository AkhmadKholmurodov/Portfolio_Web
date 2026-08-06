"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "@/content/profile";
import { sceneState } from "@/lib/scene-state";
import {
  getActiveSection,
  getServerActiveSection,
  setActiveSection,
  subscribeActiveSection,
} from "@/lib/active-section";

/**
 * One set of scroll triggers, two consumers. The nav needs to know which
 * section is current, and the 3D field needs to know which formation to head
 * for.
 */
export function SectionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers = sections.flatMap(({ id, phase }) => {
      const el = document.getElementById(id);
      // Routes other than the home page have none of these, which is why this
      // can sit in the root layout without knowing anything about routing.
      if (!el) return [];

      const enter = () => {
        setActiveSection(id);
        sceneState.targetPhase = phase;
      };

      return ScrollTrigger.create({
        trigger: el,
        // A band across the middle of the viewport rather than a line: the
        // section that owns the centre of the screen is the one being read.
        start: "top 55%",
        end: "bottom 55%",
        onEnter: enter,
        onEnterBack: enter,
      });
    });

    // The topmost section never fires `onEnter` — the page loads already
    // inside it — so it has to be seeded, and a case study page has to clear
    // whatever the home page left behind.
    const first = sections[0];
    if (document.getElementById(first.id)) {
      setActiveSection(first.id);
      sceneState.targetPhase = first.phase;
    } else {
      setActiveSection("");
      sceneState.targetPhase = 0;
    }

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [pathname]);

  return <>{children}</>;
}

export function useActiveSection() {
  return useSyncExternalStore(
    subscribeActiveSection,
    getActiveSection,
    getServerActiveSection,
  );
}
