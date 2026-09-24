import { projects } from "@/lib/content/projects";
import { researchEntries } from "@/lib/content/research";
import { labEntries } from "@/lib/content/lab";
import { writingEntries } from "@/lib/content/writing";
import { getGithubRepos } from "@/lib/github/sync";

export async function getSiteStatistics() {
  const languages = new Set<string>();
  const domains = new Set<string>();
  for (const p of projects) {
    p.languages.forEach((l) => languages.add(l));
    p.domains.forEach((d) => domains.add(d));
  }

  let repoCount = projects.length;
  let releaseHint = 0;
  try {
    const gh = await getGithubRepos();
    repoCount = gh.repos.length;
    gh.repos.forEach((r) => {
      if (r.language) languages.add(r.language);
    });
    // Stars/forks are real GitHub fields — expose only as optional totals, never invented.
    releaseHint = gh.repos.filter((r) => r.topics?.includes("release")).length;
  } catch {
    // fall back to curated project count
  }

  const years = new Set(
    projects
      .map((p) => p.startedAt?.slice(0, 4))
      .filter(Boolean) as string[],
  );

  return {
    repositories: repoCount,
    curatedProjects: projects.length,
    languages: languages.size,
    domains: domains.size,
    researchEfforts: researchEntries.length,
    labEntries: labEntries.length,
    writing: writingEntries.length,
    reposTaggedRelease: releaseHint,
    yearsBuilding: years.size || 1,
    computedAt: new Date().toISOString(),
  };
}
