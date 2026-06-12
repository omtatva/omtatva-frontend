import { prisma } from "@/lib/db";
import type { CmsData } from "./types";
import { createDefaultCms } from "./seed";
import type {
  BTSItem,
  Career,
  Film,
  NewsItem,
  ProcessStep,
  Studio,
  TeamMember,
} from "@/types";

const META_KEY = "_meta";

export async function readCms(): Promise<CmsData> {
  const [
    films,
    newsItems,
    studios,
    careers,
    processSteps,
    btsItems,
    teamMembers,
    settings,
  ] = await prisma.$transaction([
    prisma.film.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.newsItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.studio.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.career.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.processStep.findMany({ orderBy: { step: "asc" } }),
    prisma.btsItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.siteSetting.findMany(),
  ]);

  const cfg = new Map(
    settings.map((s: { key: string; value: unknown }) => [s.key, s.value])
  );

  // Empty database → bootstrap with defaults so the site works on first run.
  if (!cfg.has("site")) {
    const defaults = createDefaultCms();
    await writeCms(defaults);
    return defaults;
  }

  const meta = (cfg.get(META_KEY) ?? {}) as {
    version?: number;
    updatedAt?: string;
  };

  return {
    version: meta.version ?? 1,
    updatedAt: meta.updatedAt ?? new Date().toISOString(),
    site: cfg.get("site") as unknown as CmsData["site"],
    navigation: cfg.get("navigation") as unknown as CmsData["navigation"],
    hero: cfg.get("hero") as unknown as CmsData["hero"],
    sections: cfg.get("sections") as unknown as CmsData["sections"],
    about: cfg.get("about") as unknown as CmsData["about"],
    team: cfg.get("teamPage") as unknown as CmsData["team"],
    films: films.map(toFilm),
    newsItems: newsItems.map(toNewsItem),
    studios: studios.map(toStudio),
    careers: careers.map(toCareer),
    processSteps: processSteps.map(toProcessStep),
    btsItems: btsItems.map(toBtsItem),
    teamMembers: teamMembers.map(toTeamMember),
  };
}

export async function writeCms(data: CmsData): Promise<CmsData> {
  const updatedAt = new Date().toISOString();
  const version = data.version ?? 1;

  await prisma.$transaction([
    prisma.film.deleteMany(),
    prisma.film.createMany({
      data: data.films.map((f, i) => ({
        id: f.id,
        title: f.title,
        genre: f.genre,
        year: f.year,
        image: f.image,
        description: f.description ?? null,
        featured: f.featured ?? false,
        sortOrder: i,
      })),
    }),
    prisma.newsItem.deleteMany(),
    prisma.newsItem.createMany({
      data: data.newsItems.map((n, i) => ({
        id: n.id,
        title: n.title,
        excerpt: n.excerpt,
        date: n.date,
        category: n.category,
        image: n.image,
        sortOrder: i,
      })),
    }),
    prisma.studio.deleteMany(),
    prisma.studio.createMany({
      data: data.studios.map((s, i) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        sortOrder: i,
      })),
    }),
    prisma.career.deleteMany(),
    prisma.career.createMany({
      data: data.careers.map((c, i) => ({
        id: c.id,
        title: c.title,
        department: c.department,
        location: c.location,
        type: c.type,
        description: c.description ?? null,
        sortOrder: i,
      })),
    }),
    prisma.processStep.deleteMany(),
    prisma.processStep.createMany({
      data: data.processSteps.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        step: p.step,
      })),
    }),
    prisma.btsItem.deleteMany(),
    prisma.btsItem.createMany({
      data: data.btsItems.map((b, i) => ({
        id: b.id,
        title: b.title,
        image: b.image,
        duration: b.duration,
        sortOrder: i,
      })),
    }),
    prisma.teamMember.deleteMany(),
    prisma.teamMember.createMany({
      data: data.teamMembers.map((m, i) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        department: m.department,
        bio: m.bio,
        image: m.image,
        featured: m.featured ?? false,
        socialLinks: m.socialLinks ?? undefined,
        sortOrder: i,
      })),
    }),
    ...settingUpserts({
      site: data.site,
      navigation: data.navigation,
      hero: data.hero,
      sections: data.sections,
      about: data.about,
      teamPage: data.team,
      [META_KEY]: { version, updatedAt },
    }),
  ]);

  return { ...data, version, updatedAt };
}

export function verifyAdminKey(request: Request): boolean {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return false;
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7) === key;
  }
  const header = request.headers.get("x-admin-key");
  return header === key;
}

function settingUpserts(values: Record<string, unknown>) {
  return Object.entries(values).map(([key, value]) =>
    prisma.siteSetting.upsert({
      where: { key },
      create: { key, value: value as object },
      update: { value: value as object },
    })
  );
}

type FilmRow = {
  id: string;
  title: string;
  genre: string;
  year: number;
  image: string;
  description: string | null;
  featured: boolean;
};
function toFilm(r: FilmRow): Film {
  return {
    id: r.id,
    title: r.title,
    genre: r.genre,
    year: r.year,
    image: r.image,
    description: r.description ?? undefined,
    featured: r.featured,
  };
}

type NewsRow = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
};
function toNewsItem(r: NewsRow): NewsItem {
  return {
    id: r.id,
    title: r.title,
    excerpt: r.excerpt,
    date: r.date,
    category: r.category,
    image: r.image,
  };
}

type StudioRow = {
  id: string;
  title: string;
  description: string;
  icon: string;
};
function toStudio(r: StudioRow): Studio {
  return { id: r.id, title: r.title, description: r.description, icon: r.icon };
}

type CareerRow = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
};
function toCareer(r: CareerRow): Career {
  return {
    id: r.id,
    title: r.title,
    department: r.department,
    location: r.location,
    type: r.type,
    description: r.description ?? undefined,
  };
}

type ProcessRow = {
  id: string;
  title: string;
  description: string;
  step: number;
};
function toProcessStep(r: ProcessRow): ProcessStep {
  return { id: r.id, title: r.title, description: r.description, step: r.step };
}

type BtsRow = {
  id: string;
  title: string;
  image: string;
  duration: string;
};
function toBtsItem(r: BtsRow): BTSItem {
  return { id: r.id, title: r.title, image: r.image, duration: r.duration };
}

type TeamRow = {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
  featured: boolean;
  socialLinks: unknown;
};
function toTeamMember(r: TeamRow): TeamMember {
  return {
    id: r.id,
    name: r.name,
    role: r.role,
    department: r.department,
    bio: r.bio,
    image: r.image,
    featured: r.featured,
    socialLinks: (r.socialLinks ?? undefined) as TeamMember["socialLinks"],
  };
}
