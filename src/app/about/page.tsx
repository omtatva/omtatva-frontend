import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { getCms } from "@/lib/cms";
export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCms();
  return {
    title: "About",
    description: `Learn about ${cms.site.name} — a luxury AI-powered film production studio.`,
  };
}

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  ),
  Instagram: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 2.714.124 4.091 1.528 4.216 4.216.044.968.052 1.322.052 3.752 0 2.43-.008 2.784-.052 3.752-.124 2.686-1.514 4.09-4.216 4.216-.968.044-1.322.052-3.752.052-2.43 0-2.784-.008-3.752-.052-2.714-.124-4.091-1.528-4.216-4.216-.044-.968-.052-1.322-.052-3.752 0-2.43.008-2.784.052-3.752.124-2.686 1.514-4.09 4.216-4.216.968-.044 1.322-.052 3.752-.052zm-.093 1.8c-2.404 0-2.688.009-3.637.052-2.072.095-2.83.864-2.925 2.925-.043.949-.052 1.233-.052 3.637 0 2.405.009 2.688.052 3.637.095 2.062.844 2.83 2.925 2.925.949.043 1.233.052 3.637.052 2.405 0 2.688-.009 3.637-.052 2.072-.095 2.83-.864 2.925-2.925.043-.949.052-1.233.052-3.637 0-2.405-.009-2.688-.052-3.637-.095-2.062-.844-2.83-2.925-2.925-.949-.043-1.233-.052-3.637-.052zm0 3.262a4.938 4.938 0 100 9.877 4.938 4.938 0 000-9.877zm0 8.077a3.138 3.138 0 110-6.275 3.138 3.138 0 010 6.275zm5.857-8.02a1.162 1.162 0 100-2.324 1.162 1.162 0 000 2.324z" clipRule="evenodd" />
    </svg>
  ),
  LinkedIn: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  ),
  YouTube: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
    </svg>
  ),
  X: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
};

export default async function AboutPage() {
  const cms = await getCms();
  const { about, site } = cms;

  return (
    <>
      <PageHero
        title={about.heroTitle}
        subtitle={about.heroSubtitle}
        image={about.heroImage}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2 lg:items-center">
          <div data-gsap-reveal>
            <p className="mb-4 text-xs tracking-[0.3em] text-neon uppercase">
              {about.storyLabel}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              {about.storyTitle}
            </h2>
            {about.storyParagraphs.map((paragraph, i) => (
              <p key={i} className="text-muted leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm" data-gsap-reveal>
            <Image
              src={about.storyImage}
              loading="lazy"
              alt={`${site.name} studio`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </div>
      </section>
      
      {/* Social Section */}
      <section className="section-padding border-t border-white/10 bg-black/40 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-neon/[0.01] to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl text-center" data-gsap-reveal>
          <p className="mb-4 text-xs tracking-[0.3em] text-neon uppercase">
            Connect
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Follow Our Journey
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-10 text-sm leading-relaxed">
            Stay updated with our latest cinematic projects, behind-the-scenes footage, and updates from the cutting edge of AI filmmaking.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {site.socialLinks.map((social) => {
              const icon = socialIcons[social.label] || null;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-muted hover:text-neon hover:border-neon/30 hover:bg-neon/[0.02] transition-all duration-300"
                >
                  {icon}
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
