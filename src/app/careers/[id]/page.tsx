import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import CareerApplicationForm from "@/components/sections/CareerApplicationForm";
import { getCms } from "@/lib/cms";
import { getCareerById } from "@/lib/careers";
import { PAGE_HERO_IMAGES } from "@/lib/images";

interface CareerDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const cms = await getCms();
  return cms.careers.map((career) => ({ id: career.id }));
}

export async function generateMetadata({ params }: CareerDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const cms = await getCms();
  const career = getCareerById(cms.careers, id);

  if (!career) {
    return { title: "Position not found" };
  }

  return {
    title: `${career.title} — Careers`,
    description: `Apply for ${career.title} at Om Tatva Digitals. Upload your resume (PDF only).`,
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { id } = await params;
  const cms = await getCms();
  const career = getCareerById(cms.careers, id);

  if (!career) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={career.title}
        subtitle={`${career.department} · ${career.location} · ${career.type}`}
        image={PAGE_HERO_IMAGES.careers}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/careers"
            className="mb-8 inline-flex text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-neon"
          >
            ← All positions
          </Link>

          {career.description && (
            <p className="mb-10 text-base leading-relaxed text-ice/90" data-gsap-reveal>
              {career.description}
            </p>
          )}

          <div className="glass rounded-sm p-8 md:p-12" data-gsap-reveal>
            <h2 className="mb-2 font-display text-2xl tracking-wide text-foreground">
              Apply for this role
            </h2>
            <p className="mb-8 text-sm text-muted">
              Submit your details and upload your resume as a PDF (maximum 5 MB).
            </p>
            <CareerApplicationForm careerId={career.id} careerTitle={career.title} />
          </div>
        </div>
      </section>
    </>
  );
}
