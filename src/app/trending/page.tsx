import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import TrendingCard from "@/components/cards/TrendingCard";
import { getCms } from "@/lib/cms";
import { PAGE_HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Trending",
  description: "Trending films and projects from Om Tatva Digitals.",
};

export default async function TrendingPage() {
  const cms = await getCms();
  const [featured, ...rest] = cms.films;

  return (
    <>
      <PageHero
        title="Trending"
        subtitle="The stories captivating audiences and redefining AI cinema."
        image={PAGE_HERO_IMAGES.trending}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl space-y-8">
          <div data-gsap-reveal>
            <TrendingCard film={featured} />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((film, i) => (
              <div key={film.id} data-gsap-reveal>
                <TrendingCard film={film} rank={i + 2} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
