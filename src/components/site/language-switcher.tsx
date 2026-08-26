"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { locales, localeLabels } from "@/content/i18n";
import { cn } from "@/lib/utils";

/**
 * Three codes, one lit. The current language is *state*, which is precisely
 * what celadon is for on this site — so this is one of the few places the accent
 * appears without a production system behind it.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label={t.ui.language}
      className={cn(
        "flex shrink-0 items-center gap-px rounded-full border border-line bg-surface-2/75 p-0.5",
        className,
      )}
    >
      {locales.map((code) => {
        const selected = code === locale;
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={localeLabels[code].full}
            onClick={() => setLocale(code)}
            className={cn(
              // Tighter on a phone, tighter again on a 320px one. This now
              // sits on the bar at every width rather than only from `sm` up,
              // and it shares 280px of usable width with the mark, the section
              // readout and the menu toggle on the narrowest screen that still
              // gets built for.
              "rounded-full px-1.5 py-1 font-mono text-label tracking-label transition-colors duration-300 ease-(--ease-out-expo) min-[360px]:px-2 sm:px-2.5",
              selected
                ? "bg-signal-soft text-signal"
                : "text-ink-400 hover:text-ink-200",
            )}
          >
            {localeLabels[code].short}
          </button>
        );
      })}
    </div>
  );
}
