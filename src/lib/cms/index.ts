import { unstable_cache } from "next/cache";
import type { Film, TeamMember } from "@/types";
import { readCms } from "./store";
import type { CmsData } from "./types";

export type { CmsData, CmsSectionKey, SectionMeta, HeroSection } from "./types";
export { createDefaultCms } from "./seed";
export { readCms, writeCms, verifyAdminKey } from "./store";

export const CMS_CACHE_TAG = "cms";

/**
 * Cached CMS read. All tables are fetched in a single transaction inside
 * `readCms`, then this result is memoized across requests for `revalidate`
 * seconds (or until `revalidateTag(CMS_CACHE_TAG)` is called after a write).
 */
export const getCms = unstable_cache(
  async (): Promise<CmsData> => readCms(),
  ["cms-data"],
  { tags: [CMS_CACHE_TAG], revalidate: 30 }
);

export function resolveFilms(cms: CmsData, ids: string[]): Film[] {
  const map = new Map(cms.films.map((f) => [f.id, f]));
  return ids.map((id) => map.get(id)).filter((f): f is Film => Boolean(f));
}

export function resolveTeamMembers(cms: CmsData, ids: string[], limit?: number): TeamMember[] {
  const map = new Map(cms.teamMembers.map((m) => [m.id, m]));
  const resolved = ids.map((id) => map.get(id)).filter((m): m is TeamMember => Boolean(m));
  return limit ? resolved.slice(0, limit) : resolved;
}
