import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FilmCard from "@/components/cards/FilmCard";
import { getCms } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCms();
  return {
    title: "Films & Projects",
    description: `Explore ${cms.site.name}'s portfolio of AI-assisted cinematic productions.`,
  };
}

export default async function FilmsPage() {
  const cms = await getCms();

  return (
    <>
      <PageHero
        title="Films & Projects"
        subtitle="Original productions where human vision meets artificial intelligence."
        image={cms.pageHeroes.films}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cms.films.map((film) => (
              <FilmCard key={film.id} film={film} className="!w-full" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
