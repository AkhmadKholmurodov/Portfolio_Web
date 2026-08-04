"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query as an external store. `useSyncExternalStore` is the right shape
 * here — matchMedia is a subscription outside React, and this avoids the
 * setState-in-effect cascade a useState/useEffect pair would cause.
 */
function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  // The server cannot know the viewport; every caller treats false as
  // "assume the richer experience and let the client correct it".
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsTouch() {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}


/**
 * Which of the project journey's three design boxes fits.
 *
 * `compact` (tablet) drops each scene's secondary column; `narrow` (phone)
 * re-lays every scene at roughly its native size, because scaling a tablet
 * composition down to a phone makes its text unreadable.
 */
export function useSceneSize(): "wide" | "compact" | "narrow" {
  const narrow = useMediaQuery("(max-width: 639px)");
  const compact = useMediaQuery("(max-width: 1023px)");
  return narrow ? "narrow" : compact ? "compact" : "wide";
}
