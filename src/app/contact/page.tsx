import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import { getCms } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Om Tatva Digitals for partnerships and productions.",
};

export default async function ContactPage() {
  const cms = await getCms();

  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Let's create something extraordinary together."
        image={cms.pageHeroes.contact}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-2xl">
          <div className="glass rounded-sm p-8 md:p-12" data-gsap-reveal>
            <ContactForm />
          </div>
          <div className="mt-12 grid gap-8 text-center sm:grid-cols-3" data-gsap-reveal>
            <div>
              <p className="mb-2 text-xs tracking-[0.2em] text-neon uppercase">Email</p>
              <p className="text-sm text-muted">itsupport@omtatvadigitals.com</p>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-[0.2em] text-neon uppercase">Studio Address</p>
              <p className="text-sm text-muted">ODC-216, 2nd floor,H-160, BSI business park PVT LTD, Sec-63, Noida, India</p>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-[0.2em] text-neon uppercase">Contact</p>
              <p className="text-sm text-muted">+91-9667566556</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
