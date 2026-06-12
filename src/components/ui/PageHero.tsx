import Image from "next/image";
import { IMAGE_SIZES, unsplash } from "@/lib/images";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const DEFAULT_HERO = unsplash(
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
  IMAGE_SIZES.pageHero
);

export default function PageHero({
  title,
  subtitle,
  image = DEFAULT_HERO,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[45vh] items-end overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="absolute inset-0 cinematic-vignette" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
        <h1 className="hero-fade-in font-display text-4xl font-bold tracking-wide text-white md:text-6xl glow-text">
          {title}
        </h1>
        {subtitle && (
          <p className="hero-fade-in-delay-1 mt-4 max-w-2xl text-lg font-semibold text-ice/80">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
