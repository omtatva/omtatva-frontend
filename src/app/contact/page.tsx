import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import { PAGE_HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Om Tatva Digitals for partnerships and productions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Let's create something extraordinary together."
        image={PAGE_HERO_IMAGES.contact}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-2xl">
          <div className="glass rounded-sm p-8 md:p-12" data-gsap-reveal>
            <ContactForm />
          </div>
          <div className="mt-12 grid gap-8 text-center sm:grid-cols-3" data-gsap-reveal>
            <div>
              <p className="mb-2 text-xs tracking-[0.2em] text-neon uppercase">Email</p>
              <p className="text-sm text-muted">hello@omtatvadigitals.com</p>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-[0.2em] text-neon uppercase">Studio</p>
              <p className="text-sm text-muted">Mumbai, India</p>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-[0.2em] text-neon uppercase">Partnerships</p>
              <p className="text-sm text-muted">partners@omtatvadigitals.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
