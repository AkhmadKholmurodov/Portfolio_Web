"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export const themes = ["light", "dark"] as const;
export type Theme = (typeof themes)[number];

/** Light is the site's own choice, not the operating system's. */
export const defaultTheme: Theme = "light";

const STORAGE_KEY = "ak.theme";

/**
 * Runs before first paint, from the document head.
 *
 * Without it the server's light markup would render, then the effect would
 * swap a returning dark-mode visitor to dark — a white flash on every load.
 * Kept as a string so it can be inlined verbatim; it must not depend on any
 * bundle having downloaded.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)});if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;else document.documentElement.dataset.theme=${JSON.stringify(
  defaultTheme,
)}}catch(e){document.documentElement.dataset.theme=${JSON.stringify(
  defaultTheme,
)}}})()`;

/* ------------------------------------------------------------------ *
 * Store — same shape as the locale store, and for the same reason: the
 * server cannot know the preference, so `useSyncExternalStore` reconciles
 * the default render against the client's real value.
 * ------------------------------------------------------------------ */
const listeners = new Set<() => void>();
let cached: Theme | null = null;

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function detect(): Theme {
  // The inline script has already written the attribute; trust it so the two
  // can never disagree.
  const applied = document.documentElement.dataset.theme;
  if (isTheme(applied)) return applied;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // Storage can be denied in private mode; the default still applies.
  }
  return defaultTheme;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Theme {
  cached ??= detect();
  return cached;
}

function getServerSnapshot(): Theme {
  return defaultTheme;
}

function writeTheme(next: Theme) {
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
type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  setTheme: (next: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    // Colour transitions are enabled only after the first paint, so the
    // initial render never animates from the default theme into the stored one.
    const id = requestAnimationFrame(() =>
      document.documentElement.classList.add("theme-ready"),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const setTheme = useCallback((next: Theme) => writeTheme(next), []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggle: () => writeTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
