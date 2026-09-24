#!/usr/bin/env node
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const user = "theworker02";
const exclude = new Set(
  (process.env.GITHUB_EXCLUDE_REPOS ?? "theworker02,winget-pkgs")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "theworker02-site-sync",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const repos = [];
for (let page = 1; page <= 10; page += 1) {
  const res = await fetch(
    `https://api.github.com/users/${user}/repos?per_page=100&page=${page}&sort=updated`,
    { headers },
  );
  if (!res.ok) {
    console.error(`GitHub API ${res.status}`);
    process.exit(1);
  }
  const batch = await res.json();
  if (!batch.length) break;
  repos.push(...batch);
  if (batch.length < 100) break;
}

const filtered = repos.filter((r) => !r.fork && !exclude.has(r.name));
const cache = {
  syncedAt: new Date().toISOString(),
  user,
  repos: filtered,
};

const out = path.join(process.cwd(), "data", "cache", "github.json");
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(cache, null, 2));
console.log(`Wrote ${filtered.length} repos to ${out}`);
