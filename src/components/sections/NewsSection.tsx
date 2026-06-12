import Link from "next/link";
import NewsCard from "@/components/cards/NewsCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { NewsItem } from "@/types";
import type { NewsSectionConfig } from "@/lib/cms/types";

interface NewsSectionProps {
  section: NewsSectionConfig;
  items: NewsItem[];
}

export default function NewsSection({ section, items }: NewsSectionProps) {
  if (!section.enabled || items.length === 0) return null;

  const [featured, ...rest] = items;

  return (
    <section id="news" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NewsCard item={featured} featured />
          {rest.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12 rounded-sm glass p-8 text-center" data-gsap-reveal>
          <p className="text-xs tracking-[0.3em] text-neon uppercase mb-2">
            {section.recognition.label}
          </p>
          <h3 className="font-display text-2xl text-foreground">
            {section.recognition.title}
          </h3>
          <p className="mt-2 text-sm text-muted max-w-xl mx-auto">
            {section.recognition.description}
          </p>
        </div>

        {section.linkHref && section.linkText && (
          <div className="mt-8 text-center">
            <Link
              href={section.linkHref}
              className="text-xs tracking-[0.25em] text-neon uppercase hover:text-white transition-colors"
            >
              {section.linkText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
