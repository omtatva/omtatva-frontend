import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CareerCard from "@/components/cards/CareerCard";
import { getCms } from "@/lib/cms";
import { PAGE_HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Om Tatva Digitals and shape the future of AI-powered cinema.",
};

export default async function CareersPage() {
  const cms = await getCms();

  return (
    <>
      <PageHero
        title="Careers"
        subtitle="Join a team of visionaries building the future of cinematic storytelling."
        image={PAGE_HERO_IMAGES.careers}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-4xl space-y-4">
          {cms.careers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      </section>
    </>
  );
}
