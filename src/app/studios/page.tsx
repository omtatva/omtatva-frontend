import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StudioCard from "@/components/cards/StudioCard";
import StudiosDirectory from "@/components/sections/StudiosDirectory";
import { getCms } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Creative Studios",
  description:
    "Six specialized creative studios powering AI-assisted film production at Om Tatva Digitals.",
};

export default async function StudiosPage() {
  const cms = await getCms();

  return (
    <>
      <PageHero
        title="Creative Studios"
        subtitle="Specialized divisions united by a single vision — cinematic excellence."
        image={cms.pageHeroes.studios}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cms.studios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      </section>
      {/* <StudiosDirectory /> */}
    </>
  );
}
