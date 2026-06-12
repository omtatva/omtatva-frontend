import Link from "next/link";
import TrendingCard from "@/components/cards/TrendingCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Film } from "@/types";
import type { TrendingSection as TrendingSectionConfig } from "@/lib/cms/types";

interface TrendingSectionProps {
  section: TrendingSectionConfig;
  featured: Film;
  sideFilms: Film[];
}

export default function TrendingSection({
  section,
  featured,
  sideFilms,
}: TrendingSectionProps) {
  if (!section.enabled || !featured) return null;

  return (
    <section className="section-padding relative bg-navy-light/40 film-grain">
      <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <SectionHeading
            label={section.label}
            title={section.title}
            subtitle={section.subtitle}
          />
          {section.linkHref && section.linkText && (
            <Link
              href={section.linkHref}
              className="hidden text-xs tracking-[0.2em] text-neon uppercase hover:text-white md:block"
            >
              {section.linkText}
            </Link>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="relative" data-gsap-reveal>
            <TrendingCard film={featured} />
          </div>
          <div className="flex flex-col gap-6">
            {sideFilms.map((film, i) => (
              <div key={film.id} data-gsap-reveal>
                <TrendingCard film={film} rank={i + 2} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
