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

export const PAGE_HERO_IMAGES = {
  films: unsplash("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba", IMAGE_SIZES.pageHero),
  trending: unsplash("https://images.unsplash.com/photo-1535010121840-743a46c928a4", IMAGE_SIZES.pageHero),
  news: unsplash("https://images.unsplash.com/photo-1514525253161-7a46d19cd819", IMAGE_SIZES.pageHero),
  studios: unsplash("https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d", IMAGE_SIZES.pageHero),
  about: unsplash("https://images.unsplash.com/photo-1594909127802-573f457b6a3c", IMAGE_SIZES.pageHero),
  careers: unsplash("https://images.unsplash.com/photo-1522071820081-009f0129c71c", IMAGE_SIZES.pageHero),
  contact: unsplash("https://images.unsplash.com/photo-1558618666-fcd25c85cd64", IMAGE_SIZES.pageHero),
  team: unsplash("https://images.unsplash.com/photo-1522071820081-009f0129c71c", IMAGE_SIZES.pageHero),
} as const;
