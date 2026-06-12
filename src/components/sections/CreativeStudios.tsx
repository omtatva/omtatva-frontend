import Link from "next/link";
import StudioCard from "@/components/cards/StudioCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Studio } from "@/types";
import type { SectionMeta } from "@/lib/cms/types";

interface CreativeStudiosProps {
  section: SectionMeta;
  studios: Studio[];
}

export default function CreativeStudios({ section, studios }: CreativeStudiosProps) {
  if (!section.enabled) return null;

  return (
    <section id="studios" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/[0.02] to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl relative">
        <SectionHeading
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
        {section.linkHref && section.linkText && (
          <div className="mt-12 text-center">
            <Link
              href={section.linkHref}
              className="text-xs tracking-[0.25em] text-neon uppercase transition-colors hover:text-white"
            >
              {section.linkText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
