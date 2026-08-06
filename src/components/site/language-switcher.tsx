"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { locales, localeLabels } from "@/content/i18n";
import { cn } from "@/lib/utils";

/**
 * Three codes, one lit. The current language is *state*, which is precisely
 * what amber is for on this site — so this is one of the few places the accent
 * appears without a production system behind it.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label={t.ui.language}
      className={cn(
        "flex items-center gap-px rounded-full border border-line bg-surface/70 p-0.5",
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
              "rounded-full px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.1em] transition-colors duration-300 ease-(--ease-out-expo)",
              selected
                ? "bg-signal-soft text-signal"
                : "text-ink-600 hover:text-ink-200",
            )}
          >
            {localeLabels[code].short}
          </button>
        );
      })}
    </div>
  );
}
