import dynamic from "next/dynamic";
import HeroBanner from "@/components/sections/HeroBanner";
import FeaturedFilms from "@/components/sections/FeaturedFilms";
import TrendingSection from "@/components/sections/TrendingSection";
import CreativeStudios from "@/components/sections/CreativeStudios";
import TeamSection from "@/components/sections/TeamSection";
import NewsSection from "@/components/sections/NewsSection";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import { getCms, resolveFilms, resolveTeamMembers } from "@/lib/cms";

const ProcessTimeline = dynamic(() => import("@/components/sections/ProcessTimeline"), {
  loading: () => <SectionSkeleton />,
});

const BehindTheScenes = dynamic(() => import("@/components/sections/BehindTheScenes"), {
  loading: () => <SectionSkeleton />,
});

const NewsletterSection = dynamic(() => import("@/components/sections/NewsletterSection"), {
  loading: () => <SectionSkeleton className="min-h-[200px]" />,
});

export default async function HomePage() {
  const cms = await getCms();
  const { sections } = cms;

  const featuredFilms = resolveFilms(cms, sections.featuredFilms.filmIds).slice(
    0,
    sections.featuredFilms.limit
  );
  const featuredTrending =
    cms.films.find((f) => f.id === sections.trending.featuredFilmId) ?? cms.films[0];
  const sideTrending = resolveFilms(cms, sections.trending.sideFilmIds);
  const homeNews = cms.newsItems.slice(0, sections.news.homeLimit);
  const teamSection = sections.team;
  const homeTeam = resolveTeamMembers(cms, teamSection.memberIds, teamSection.limit);

  return (
    <>
      <HeroBanner hero={cms.hero} />
      <FeaturedFilms section={sections.featuredFilms} films={featuredFilms} />
      <TrendingSection
        section={sections.trending}
        featured={featuredTrending}
        sideFilms={sideTrending}
      />
      <CreativeStudios section={sections.creativeStudios} studios={cms.studios} />
      <ProcessTimeline section={sections.process} steps={cms.processSteps} />
      <BehindTheScenes section={sections.behindTheScenes} items={cms.btsItems} />
      <TeamSection section={teamSection} members={homeTeam} />
      <NewsSection section={sections.news} items={homeNews} />
      <NewsletterSection section={sections.newsletter} />
    </>
  );
}
