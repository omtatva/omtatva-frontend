import Link from "next/link";
import Image from "next/image";
import CareerCard from "@/components/cards/CareerCard";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import type { Career } from "@/types";
import type { CareersSectionConfig } from "@/lib/cms/types";

interface CareersSectionProps {
  section: CareersSectionConfig;
  careers: Career[];
}

export default function CareersSection({ section, careers }: CareersSectionProps) {
  if (!section.enabled) return null;

  return (
    <section id="careers" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={section.backgroundImage}
          alt="Studio culture"
          fill
          className="object-cover opacity-20"
          loading="lazy"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="mb-12 rounded-sm glass p-8 md:p-12 text-center" data-gsap-reveal>
          <h3 className="font-display text-3xl md:text-4xl text-foreground glow-text">
            {section.spotlightTitle}
          </h3>
          <p className="mt-4 text-muted max-w-2xl mx-auto">{section.spotlightDescription}</p>
          <MagneticButton href={section.spotlightCtaHref} variant="primary" className="mt-8">
            {section.spotlightCtaLabel}
          </MagneticButton>
        </div>

        <div className="space-y-4">
          {careers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>

        {section.linkHref && section.linkText && (
          <div className="mt-8 text-center">
            <Link
              href={section.linkHref}
              className="text-xs tracking-[0.25em] text-neon uppercase hover:text-white"
            >
              {section.linkText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
