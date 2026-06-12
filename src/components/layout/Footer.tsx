import Link from "next/link";
import Logo from "@/components/ui/Logo";
import type { SiteSettings, NavigationSettings } from "@/lib/cms/types";

interface FooterProps {
  site: SiteSettings;
  navigation: NavigationSettings;
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

export default function Footer({ site, navigation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black film-grain">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo siteName={site.name} />
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.tagline}</p>
            <div className="mt-6 flex gap-4">
              {site.socialLinks.map((social) => {
                const icon = socialIcons[social.label] || (
                  <span className="text-xs tracking-wider uppercase">{social.label.slice(0, 2)}</span>
                );
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-neon"
                    aria-label={social.label}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] text-neon uppercase">Navigation</h4>
            <ul className="space-y-2">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] text-neon uppercase">Studios</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>AI Film Production</li>
              <li>Visual Effects</li>
              <li>Animation Studio</li>
              <li>Sound & Music</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] text-neon uppercase">Newsletter</h4>
            <p className="text-sm text-muted mb-4">
              Get studio updates and premiere invitations.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                aria-label="Newsletter email"
                className="flex-1 rounded-sm border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white placeholder:text-muted focus:border-neon focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-sm bg-neon/90 px-4 py-2 text-xs font-medium tracking-wider text-white uppercase transition-colors hover:bg-neon"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ice/10 pt-8 md:flex-row">
          <p className="text-xs text-muted">
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
