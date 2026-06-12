import { SITE_NAME, SITE_DESCRIPTION, TAGLINE, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { films, HERO_IMAGE } from "@/lib/data/films";
import { newsItems } from "@/lib/data/news";
import { studios } from "@/lib/data/studios";
import { careers } from "@/lib/data/careers";
import { processSteps } from "@/lib/data/process";
import { btsItems } from "@/lib/data/bts";
import { teamMembers } from "@/lib/data/team";
import {
  ABOUT_MEGA_MENU,
  STUDIOS_MEGA_MENU,
} from "@/lib/data/megaMenu";
import { IMAGE_SIZES, PAGE_HERO_IMAGES, unsplash } from "@/lib/images";
import { HERO_VIDEO } from "@/lib/media";
import type { CmsData } from "./types";

export function createDefaultCms(): CmsData {
  const featured = films.find((f) => f.featured) ?? films[0];
  const sideFilms = films.filter((f) => f.id !== featured.id).slice(0, 3);

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    site: {
      name: SITE_NAME,
      tagline: TAGLINE,
      description: SITE_DESCRIPTION,
      socialLinks: SOCIAL_LINKS.map((s) => ({ ...s })),
    },
    navigation: {
      links: NAV_LINKS.map((l) => ({ ...l })),
      megaMenus: [STUDIOS_MEGA_MENU, ABOUT_MEGA_MENU],
    },
    hero: {
      enabled: true,
      eyebrow: "Luxury AI Film Production",
      title: TAGLINE,
      subtitle:
        "We craft cinematic experiences at the intersection of human storytelling and artificial intelligence — where every frame is engineered for emotion.",
      image: HERO_IMAGE,
      video: HERO_VIDEO,
      primaryCta: { label: "Explore Our Work", href: "/films" },
      secondaryCta: { label: "Watch Showreel", href: "#showreel" },
      scrollLabel: "Scroll",
    },
    sections: {
      featuredFilms: {
        enabled: true,
        label: "Portfolio",
        title: "Featured Films",
        subtitle:
          "Original productions crafted with AI-assisted cinematography and human creative direction.",
        linkText: "View All →",
        linkHref: "/films",
        limit: 5,
        filmIds: films.slice(0, 5).map((f) => f.id),
      },
      trending: {
        enabled: true,
        label: "Now",
        title: "Trending",
        subtitle: "The stories captivating audiences worldwide.",
        linkText: "See All →",
        linkHref: "/trending",
        featuredFilmId: featured.id,
        sideFilmIds: sideFilms.map((f) => f.id),
      },
      creativeStudios: {
        enabled: true,
        label: "Capabilities",
        title: "Creative Studios",
        subtitle: "Six specialized divisions powering the future of cinematic storytelling.",
        linkText: "Explore All Studios →",
        linkHref: "/studios",
      },
      process: {
        enabled: true,
        label: "Pipeline",
        title: "Our Process",
        subtitle:
          "From script to screen — a seamless fusion of human vision and AI precision.",
      },
      behindTheScenes: {
        enabled: true,
        label: "BTS",
        title: "Behind the Scenes",
        subtitle: "Go inside our studio pipeline and creative process.",
        linkText: "Watch More →",
        linkHref: "/films",
      },
      news: {
        enabled: true,
        label: "Press",
        title: "News & Updates",
        subtitle: "Release announcements, industry insights, and studio milestones.",
        linkText: "All News →",
        linkHref: "/news",
        homeLimit: 4,
        recognition: {
          label: "Recognition",
          title: "Award-Winning AI Cinematography",
          description:
            "Honored at FilmTech Awards, Cannes Innovation Pavilion, and Global AI Creative Summit 2026.",
        },
      },
      careers: {
        enabled: true,
        label: "Join Us",
        title: "Careers",
        subtitle:
          "Shape the future of cinema with a team of visionaries, engineers, and artists.",
        linkText: "All Positions →",
        linkHref: "/careers",
        spotlightTitle: "We're Hiring Creators & Innovators",
        spotlightDescription:
          "Join a culture where bold ideas meet cutting-edge technology. Remote-friendly, creatively driven, and obsessed with storytelling excellence.",
        spotlightCtaLabel: "View Open Positions",
        spotlightCtaHref: "/careers",
        backgroundImage: unsplash(
          "https://images.unsplash.com/photo-1485846234645-a62644f84728",
          IMAGE_SIZES.pageHero
        ),
      },
      team: {
        enabled: true,
        label: "Our People",
        title: "Meet the Team",
        subtitle:
          "Filmmakers, technologists, and creative pioneers driving the next era of AI-powered cinema.",
        linkText: "See All Team Members →",
        linkHref: "/team",
        limit: 3,
        memberIds: ["1", "2", "3"],
        buttonLabel: "See All Team Members",
      },
      newsletter: {
        enabled: true,
        label: "Stay Connected",
        title: "Subscribe to Our Studio",
        subtitle:
          "Exclusive premieres, behind-the-scenes access, and industry insights delivered to your inbox.",
        successMessage: "Thank you for subscribing. Welcome to the future of cinema.",
        placeholder: "your@email.com",
        buttonLabel: "Subscribe",
      },
    },
    films: [...films],
    newsItems: [...newsItems],
    studios: [...studios],
    careers: [...careers],
    processSteps: [...processSteps],
    btsItems: [...btsItems],
    about: {
      heroTitle: "About Us",
      heroSubtitle: TAGLINE,
      heroImage: PAGE_HERO_IMAGES.about,
      storyLabel: "Our Story",
      storyTitle: "Where Art Meets Artificial Intelligence",
      storyParagraphs: [
        `${SITE_NAME} was founded on a singular belief: that the future of cinema lies not in replacing human creativity, but in amplifying it. We are a luxury film production studio that harnesses cutting-edge AI to craft stories of unparalleled visual and emotional depth.`,
        "From our headquarters in Mumbai to collaborations across Hollywood and beyond, we partner with visionary directors, studios, and brands to produce work that defines the next era of storytelling.",
      ],
      storyImage: unsplash(
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
        IMAGE_SIZES.pageHero
      ),
    },
    team: {
      heroTitle: "Our Team",
      heroSubtitle: "The visionaries, artists, and engineers shaping the future of cinema.",
      heroImage: PAGE_HERO_IMAGES.team,
      sectionLabel: "Leadership & Talent",
      sectionTitle: "Meet the Minds Behind the Magic",
      sectionSubtitle:
        "A collective of filmmakers, technologists, and creative pioneers united by a passion for storytelling at the intersection of art and AI.",
      ctaTitle: "Join Our Studio",
      ctaDescription:
        "We're always looking for bold creators and innovators to push the boundaries of cinematic storytelling.",
      ctaLabel: "View Open Positions",
      ctaHref: "/careers",
    },
    teamMembers: [...teamMembers],
  };
}
