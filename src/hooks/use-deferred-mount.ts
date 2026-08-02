"use client";

import { useEffect, useState } from "react";

/**
 * Returns false on first paint, then true once the browser is idle.
 *
 * Used to hold back the WebGL canvas: creating the context and compiling
 * shaders blocks the main thread, and on a software renderer that stall is
 * long enough to delay the headline animations by seconds. The text renders
 * first; the scene arrives when there is room for it.
 */
export function useDeferredMount(timeout = 900) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timerId: number | undefined;

    const start = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout });
    } else {
      timerId = window.setTimeout(start, 300);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [timeout]);

  return ready;
}
