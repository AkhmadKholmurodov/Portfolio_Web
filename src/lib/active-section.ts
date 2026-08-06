/**
 * Which section is currently being read. An external store rather than React
 * state, for the same reason `language-provider.tsx` uses one: the value is
 * produced by something outside React — a set of ScrollTriggers — and pushing
 * it through a context provider means every consumer of that context
 * re-renders each time the reader crosses a section boundary.
 */
const listeners = new Set<() => void>();
let current = "";

export function setActiveSection(id: string) {
  if (current === id) return;
  current = id;
  listeners.forEach((listener) => listener());
}

export function subscribeActiveSection(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function getActiveSection() {
  return current;
}

/**
 * The server cannot know where the reader is, and neither can the client on
 * its first render — so both start empty and nothing in the markup depends
 * on a guess. No hydration mismatch, no highlighted nav item that jumps.
 */
export function getServerActiveSection() {
  return "";
}
