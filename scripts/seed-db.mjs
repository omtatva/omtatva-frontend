import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const prisma = new PrismaClient();

async function main() {
  const raw = await readFile(path.join(root, "data", "cms.json"), "utf-8");
  const cms = JSON.parse(raw);

  if (!cms.site) {
    throw new Error(
      "data/cms.json does not contain full CMS data. Run `npm run dev` once to generate it, then re-run this seed."
    );
  }

  const updatedAt = new Date().toISOString();
  const version = cms.version ?? 1;

  await prisma.$transaction([
    prisma.film.deleteMany(),
    prisma.film.createMany({
      data: (cms.films ?? []).map((f, i) => ({
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
      data: (cms.newsItems ?? []).map((n, i) => ({
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
      data: (cms.studios ?? []).map((s, i) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        sortOrder: i,
      })),
    }),
    prisma.career.deleteMany(),
    prisma.career.createMany({
      data: (cms.careers ?? []).map((c, i) => ({
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
      data: (cms.processSteps ?? []).map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        step: p.step,
      })),
    }),
    prisma.btsItem.deleteMany(),
    prisma.btsItem.createMany({
      data: (cms.btsItems ?? []).map((b, i) => ({
        id: b.id,
        title: b.title,
        image: b.image,
        duration: b.duration,
        sortOrder: i,
      })),
    }),
    prisma.teamMember.deleteMany(),
    prisma.teamMember.createMany({
      data: (cms.teamMembers ?? []).map((m, i) => ({
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
    ...[
      ["site", cms.site],
      ["navigation", cms.navigation],
      ["hero", cms.hero],
      ["sections", cms.sections],
      ["about", cms.about],
      ["teamPage", cms.team],
      ["_meta", { version, updatedAt }],
    ].map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      })
    ),
  ]);

  console.log("Seeded CMS data into PostgreSQL:");
  console.log(`  films:        ${cms.films?.length ?? 0}`);
  console.log(`  newsItems:    ${cms.newsItems?.length ?? 0}`);
  console.log(`  studios:      ${cms.studios?.length ?? 0}`);
  console.log(`  careers:      ${cms.careers?.length ?? 0}`);
  console.log(`  processSteps: ${cms.processSteps?.length ?? 0}`);
  console.log(`  btsItems:     ${cms.btsItems?.length ?? 0}`);
  console.log(`  teamMembers:  ${cms.teamMembers?.length ?? 0}`);
  console.log("  settings:     site, navigation, hero, sections, about, teamPage");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
