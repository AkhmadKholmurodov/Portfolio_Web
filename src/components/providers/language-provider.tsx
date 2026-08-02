"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  defaultLocale,
  dictionaries,
  htmlLang,
  isLocale,
  type Dict,
  type Locale,
} from "@/content/i18n";

const STORAGE_KEY = "ak.locale";

/* ------------------------------------------------------------------ *
 * Locale store
 *
 * Kept outside React so the server can render `defaultLocale` while the
 * client resolves the real preference — `useSyncExternalStore` reconciles
 * the two without a hydration mismatch or a setState-in-effect cascade.
 * ------------------------------------------------------------------ */
const listeners = new Set<() => void>();
let cached: Locale | null = null;

function detect(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage can be denied in private mode; fall through to the browser.
  }

  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Locale {
  cached ??= detect();
  return cached;
}

function getServerSnapshot(): Locale {
  return defaultLocale;
}

function writeLocale(next: Locale) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Persisting is a nicety; switching still works for this session.
  }
  listeners.forEach((listener) => listener());
}

/* ------------------------------------------------------------------ *
 * Context
 * ------------------------------------------------------------------ */
type LanguageContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  const setLocale = useCallback((next: Locale) => writeLocale(next), []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

/** Shorthand for components that only need the dictionary. */
export function useT() {
  return useLanguage().t;
}
