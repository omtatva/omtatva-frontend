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

/** Pause smooth scrolling (e.g. while a modal/lightbox is open). */
export function stopScroll() {
  lenis?.stop();
}

/** Resume smooth scrolling after a modal/lightbox closes. */
export function startScroll() {
  lenis?.start();
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

/**
 * Smoothly scroll to the element matching a hash (e.g. "#showreel").
 * Returns true if a matching target existed and the scroll was handled,
 * so callers can fall back to default navigation when it returns false.
 */
export function scrollToHash(hash: string): boolean {
  if (typeof window === "undefined") return false;

  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (lenis) {
    lenis.scrollTo(target, { immediate: reduceMotion, duration: reduceMotion ? 0 : 1.1 });
  } else {
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  return true;
}
