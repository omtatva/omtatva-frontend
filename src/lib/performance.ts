/** True when we should skip heavy visuals (particles, liquid title, scroll FX). */
export function shouldUseLightMode(): boolean {
  if (typeof window === "undefined") return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = "connection" in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const lowMemory = "deviceMemory" in navigator && (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined
    && (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 4;

  return reducedMotion || !!saveData || narrow || lowMemory;
}

/** Hero background video: respect reduced motion and save-data only (plays on mobile). */
export function shouldPlayHeroVideo(): boolean {
  if (typeof window === "undefined") return true;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = "connection" in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

  return !reducedMotion && !saveData;
}

export function onIdle(callback: () => void, timeout = 2000): () => void {
  if (typeof window === "undefined") return () => {};

  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const id = setTimeout(callback, 300);
  return () => clearTimeout(id);
}
