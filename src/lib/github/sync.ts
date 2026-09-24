import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { siteConfig } from "@/lib/site";

export type GithubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  default_branch: string;
};

export type GithubCache = {
  syncedAt: string;
  user: string;
  repos: GithubRepo[];
  error?: string;
};

const CACHE_PATH = path.join(process.cwd(), "data", "cache", "github.json");

function excludedNames(): Set<string> {
  const fromEnv = (process.env.GITHUB_EXCLUDE_REPOS ?? "theworker02,winget-pkgs")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return new Set(fromEnv);
}

export async function readGithubCache(): Promise<GithubCache | null> {
  try {
    const raw = await fs.readFile(CACHE_PATH, "utf8");
    return JSON.parse(raw) as GithubCache;
  } catch {
    return null;
  }
}

export async function writeGithubCache(cache: GithubCache) {
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
}

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "theworker02-site",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const repos: GithubRepo[] = [];
  let page = 1;
  while (page <= 10) {
    const url = `https://api.github.com/users/${siteConfig.githubUser}/repos?per_page=100&page=${page}&sort=updated`;
    const res = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    }
    const batch = (await res.json()) as GithubRepo[];
    if (!batch.length) break;
    repos.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  const exclude = excludedNames();
  return repos.filter((r) => !r.fork && !exclude.has(r.name));
}

function sanitizeError(message: string) {
  return message
    .replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/ghp_[A-Za-z0-9_]+/g, "[redacted]")
    .replace(/github_pat_[A-Za-z0-9_]+/g, "[redacted]")
    .slice(0, 240);
}

export async function syncGithub(options?: { force?: boolean }): Promise<GithubCache> {
  const existing = await readGithubCache();
  if (
    !options?.force &&
    existing?.syncedAt &&
    Date.now() - new Date(existing.syncedAt).getTime() < 1000 * 60 * 60
  ) {
    return existing;
  }

  try {
    const repos = await fetchGithubRepos();
    const cache: GithubCache = {
      syncedAt: new Date().toISOString(),
      user: siteConfig.githubUser,
      repos,
    };
    await writeGithubCache(cache);
    return cache;
  } catch (error) {
    const message = sanitizeError(
      error instanceof Error ? error.message : "Unknown sync error",
    );
    if (existing) {
      return { ...existing, error: message };
    }
    const empty: GithubCache = {
      syncedAt: new Date().toISOString(),
      user: siteConfig.githubUser,
      repos: [],
      error: message,
    };
    await writeGithubCache(empty);
    return empty;
  }
}

export async function getGithubRepos() {
  const cache = (await readGithubCache()) ?? (await syncGithub({ force: true }));
  return cache;
}
