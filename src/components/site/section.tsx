import { cn } from "@/lib/utils";

/**
 * Every section on the page has the same skeleton: an id the nav and the 3D
 * field both key off, a mono label, a display heading and one paragraph of
 * lead. Centralising it is what keeps the vertical rhythm identical from the
 * top of the page to the bottom — the thing readers do not notice and
 * absolutely feel.
 */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      // `scroll-mt` clears the fixed header when an anchor link lands here.
      //
      // 64px of air on a phone rather than 80. The gap between two sections is
      // the sum of two of these, and at 80 a reader on a 390px screen scrolls
      // through 160px of nothing between the last project and the next
      // heading — which is a third of the fold spent on punctuation.
      className={cn("shell scroll-mt-24 py-16 md:py-28", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  lead,
  className,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <p className="label">{label}</p>
      <h2 className="display-2 mt-5">{title}</h2>
      {lead && <p className="lede mt-6">{lead}</p>}
      {children}
    </header>
  );
}
