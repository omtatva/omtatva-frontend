/** Build a smaller Unsplash URL for faster LCP and less bandwidth. */
export function unsplash(url: string, width: number, quality = 75): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("w", String(width));
    parsed.searchParams.set("q", String(quality));
    parsed.searchParams.set("auto", "format");
    parsed.searchParams.set("fit", "crop");
    return parsed.toString();
  } catch {
    return url;
  }
}

export const IMAGE_SIZES = {
  hero: 1280,
  pageHero: 1200,
  card: 480,
  bts: 400,
  news: 600,
} as const;
