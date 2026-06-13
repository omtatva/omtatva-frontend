import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import NewsCard from "@/components/cards/NewsCard";
import { getCms } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "News & Updates",
    description: "Latest news, releases, and insights from Om Tatva Digitals.",
  };
}

export default async function NewsPage() {
  const cms = await getCms();

  return (
    <>
      <PageHero
        title="News & Updates"
        subtitle="Premieres, partnerships, awards, and the future of AI filmmaking."
        image={cms.pageHeroes.news}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2">
          {cms.newsItems.map((item, i) => (
            <NewsCard key={item.id} item={item} featured={i === 0} />
          ))}
        </div>
      </section>
    </>
  );
}
