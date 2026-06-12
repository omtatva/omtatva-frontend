import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamGrid from "@/components/sections/TeamGrid";
import { getCms } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCms();
  return {
    title: "Our Team",
    description: `${cms.team.sectionSubtitle} — ${cms.site.name}.`,
  };
}

export default async function TeamPage() {
  const cms = await getCms();
  const { team, teamMembers } = cms;

  return (
    <>
      <PageHero
        title={team.heroTitle}
        subtitle={team.heroSubtitle}
        image={team.heroImage}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={team.sectionLabel}
            title={team.sectionTitle}
            subtitle={team.sectionSubtitle}
            align="center"
          />
          <TeamGrid members={teamMembers} />
        </div>
      </section>

      <section className="section-padding border-t border-white/10 bg-black/40 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-neon/[0.02] to-transparent pointer-events-none" />
        <div className="mx-auto max-w-3xl text-center" data-gsap-reveal>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4 glow-text">
            {team.ctaTitle}
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            {team.ctaDescription}
          </p>
          <Link
            href={team.ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/[0.06] px-8 py-3 text-sm font-bold tracking-wider text-neon uppercase transition-all duration-300 hover:bg-neon/[0.12] hover:border-neon/50 hover:glow-neon"
          >
            {team.ctaLabel}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
