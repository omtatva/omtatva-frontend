import HeroCinema from "@/components/sections/HeroCinema";
import { mediaProxyUrl } from "@/lib/media";
import type { HeroSection } from "@/lib/cms/types";

interface HeroBannerProps {
  hero: HeroSection;
}

export default function HeroBanner({ hero }: HeroBannerProps) {
  if (!hero.enabled) return null;

  // Resolve storage objects to their public bucket URL. Local and plain
  // external URLs pass through unchanged.
  const resolvedHero: HeroSection = {
    ...hero,
    video: mediaProxyUrl(hero.video),
    image: mediaProxyUrl(hero.image) ?? hero.image,
  };

  return <HeroCinema hero={resolvedHero} />;
}
