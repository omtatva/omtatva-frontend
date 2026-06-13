import type {
  BTSItem,
  Career,
  Film,
  NewsItem,
  ProcessStep,
  Studio,
  TeamMember,
} from "@/types";
import type { MegaMenuConfig } from "@/lib/data/megaMenu";

export interface SectionMeta {
  enabled: boolean;
  label: string;
  title: string;
  subtitle: string;
  linkText?: string;
  linkHref?: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  socialLinks: { href: string; label: string }[];
}

export interface HeroSection {
  enabled: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Poster / fallback when video is unavailable or reduced motion is preferred */
  image: string;
  /** Full-bleed background MP4 (optional) */
  video?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  scrollLabel: string;
}

export interface FeaturedFilmsSection extends SectionMeta {
  limit: number;
  filmIds: string[];
}

export interface TrendingSection extends SectionMeta {
  featuredFilmId: string;
  sideFilmIds: string[];
}

export interface NewsSectionConfig extends SectionMeta {
  homeLimit: number;
  recognition: {
    label: string;
    title: string;
    description: string;
  };
}

export interface CareersSectionConfig extends SectionMeta {
  spotlightTitle: string;
  spotlightDescription: string;
  spotlightCtaLabel: string;
  spotlightCtaHref: string;
  backgroundImage: string;
}

export interface TeamSectionConfig extends SectionMeta {
  limit: number;
  memberIds: string[];
  buttonLabel: string;
}

export interface AboutPage {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  storyLabel: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyImage: string;
}

export interface TeamPage {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  sectionLabel: string;
  sectionTitle: string;
  sectionSubtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface NavigationSettings {
  links: { href: string; label: string }[];
  megaMenus: MegaMenuConfig[];
}

/** Hero background images for the standalone listing/detail pages. */
export interface PageHeroesConfig {
  films: string;
  trending: string;
  news: string;
  studios: string;
  contact: string;
  careers: string;
}

export interface CmsData {
  version: number;
  updatedAt: string;
  site: SiteSettings;
  navigation: NavigationSettings;
  hero: HeroSection;
  sections: {
    featuredFilms: FeaturedFilmsSection;
    trending: TrendingSection;
    creativeStudios: SectionMeta;
    process: SectionMeta;
    behindTheScenes: SectionMeta;
    news: NewsSectionConfig;
    careers: CareersSectionConfig;
    team: TeamSectionConfig;
    newsletter: SectionMeta & {
      successMessage: string;
      placeholder: string;
      buttonLabel: string;
    };
  };
  pageHeroes: PageHeroesConfig;
  films: Film[];
  newsItems: NewsItem[];
  studios: Studio[];
  careers: Career[];
  processSteps: ProcessStep[];
  btsItems: BTSItem[];
  about: AboutPage;
  team: TeamPage;
  teamMembers: TeamMember[];
}

export type CmsSectionKey =
  | "site"
  | "navigation"
  | "hero"
  | "pageHeroes"
  | "featuredFilms"
  | "trending"
  | "creativeStudios"
  | "process"
  | "behindTheScenes"
  | "news"
  | "careers"
  | "team"
  | "newsletter"
  | "films"
  | "newsItems"
  | "studios"
  | "careersList"
  | "processSteps"
  | "btsItems"
  | "about"
  | "team"
  | "teamMembers";
