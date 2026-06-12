import type Lenis from "lenis";

let lenis: Lenis | null = null;
const scrollListeners = new Set<() => void>();

function notifyScroll() {
  scrollListeners.forEach((listener) => listener());
}

export function setSmoothScroller(instance: Lenis | null) {
  if (lenis) {
    lenis.off("scroll", notifyScroll);
  }

  lenis = instance;

  if (lenis) {
    lenis.on("scroll", notifyScroll);
  }
}

export function getScrollY(): number {
  if (typeof window === "undefined") return 0;
  return lenis?.scroll ?? window.scrollY;
}

export function subscribeScroll(listener: () => void): () => void {
  scrollListeners.add(listener);
  return () => scrollListeners.delete(listener);
}

export function scrollToTop() {
  if (typeof window === "undefined") return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (lenis) {
    lenis.scrollTo(0, { immediate: reduceMotion, duration: reduceMotion ? 0 : 1.1 });
    return;
  }

  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}
