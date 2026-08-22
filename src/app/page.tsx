import { Hero } from "@/components/sections/hero";
import { Build } from "@/components/sections/build";
import { Run } from "@/components/sections/run";
import { BreakSection } from "@/components/sections/break-section";
import { AiSection } from "@/components/sections/ai";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";

/**
 * Build, run, break, then how he works with a model, then the ask. The order
 * is the argument: what he made, that he keeps it alive, that he attacks it
 * himself, that he reads a model's output the same adversarial way — and only
 * then the toolkit, because a list of technologies means nothing until you
 * have seen what was done with them.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Build />
      <Run />
      <BreakSection />
      <AiSection />
      <Stack />
      <Contact />
    </>
  );
}
