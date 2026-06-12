import Link from "next/link";
import FilmCard from "@/components/cards/FilmCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Film } from "@/types";
import type { FeaturedFilmsSection } from "@/lib/cms/types";

interface FeaturedFilmsProps {
  section: FeaturedFilmsSection;
  films: Film[];
}

export default function FeaturedFilms({ section, films }: FeaturedFilmsProps) {
  if (!section.enabled) return null;

  return (
    <section id="films" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            label={section.label}
            title={section.title}
            subtitle={section.subtitle}
            className="!mb-0"
          />
          {section.linkHref && section.linkText && (
            <Link
              href={section.linkHref}
              className="shrink-0 text-xs tracking-[0.2em] text-neon uppercase transition-colors hover:text-white"
            >
              {section.linkText}
            </Link>
          )}
        </div>

        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5"
          data-gsap-reveal
        >
          {films.map((film) => (
            <FilmCard key={film.id} film={film} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
