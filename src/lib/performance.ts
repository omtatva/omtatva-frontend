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

/**
 * Hero background video: only skip when the user is on a metered/Save-Data
 * connection. We intentionally do NOT gate on `prefers-reduced-motion`: iOS
 * maps Settings → Accessibility → Reduce Motion to that query, which would
 * otherwise drop the muted background loop entirely on many iPhones. The heavy
 * scroll/liquid effects are still disabled separately via `shouldUseLightMode`.
 */
export function shouldPlayHeroVideo(): boolean {
  if (typeof window === "undefined") return true;

  const saveData = "connection" in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

  return !saveData;
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
