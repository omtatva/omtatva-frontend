export interface MegaMenuItem {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  items: MegaMenuItem[];
}

export interface MegaMenuConfig {
  label: string;
  href: string;
  columns: MegaMenuColumn[];
}

export const STUDIOS_MEGA_MENU: MegaMenuConfig = {
  label: "Studios",
  href: "/studios",
  columns: [
    {
      items: [
        { label: "AI Film Production", href: "/studios#ai-film-production" },
        { label: "Film Distribution — India", href: "/studios#distribution-india" },
        { label: "Film Distribution — International", href: "/studios#distribution-international" },
        { label: "Om Tatva Studios", href: "/studios#om-tatva-studios" },
        { label: "Neural VFX Labs", href: "/studios#neural-vfx" },
        { label: "AI Entertainment", href: "/studios#ai-entertainment" },
        { label: "Marketing", href: "/studios#marketing" },
        { label: "Merchandising", href: "/studios#merchandising" },
        { label: "Licensing", href: "/studios#licensing" },
      ],
    },
    {
      items: [
        { label: "Digital & New Media", href: "/studios#digital-media" },
        { label: "Talent Management", href: "/studios#talent" },
        { label: "Brand Partnerships", href: "/studios#brand-partnerships" },
        { label: "Communications", href: "/studios#communications" },
        { label: "Technical Services", href: "/studios#technical" },
        { label: "Live Events", href: "/studios#live-events" },
        { label: "Innovation Foundation", href: "/studios#innovation-foundation" },
        { label: "Animation Studio", href: "/studios#animation" },
        { label: "Sound & Music", href: "/studios#sound-music" },
      ],
    },
  ],
};

export const ABOUT_MEGA_MENU: MegaMenuConfig = {
  label: "About",
  href: "/about",
  columns: [
    {
      items: [
        { label: "Our Story", href: "/about" },
        { label: "Leadership", href: "/team" },
        { label: "Our Process", href: "/#process" },
        { label: "Awards & Recognition", href: "/news" },
      ],
    },
    {
      items: [
        { label: "Careers", href: "/careers" },
        { label: "Press & Media", href: "/news" },
        { label: "Contact", href: "/contact" },
        { label: "Work With Us", href: "/contact" },
      ],
    },
  ],
};

export const MEGA_MENU_ITEMS = [STUDIOS_MEGA_MENU, ABOUT_MEGA_MENU] as const;
