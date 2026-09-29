<p align="center">
  <img src="docs/logo.svg" alt="personal-site official logo" width="128" height="128">
</p>

<p align="center">
  <a href="https://theworker02.github.io/personal-site/"><img src="https://img.shields.io/badge/docs-live-0B1F33?style=for-the-badge&labelColor=C9A227" alt="Docs"></a>
  <a href="https://github.com/theworker02/personal-site/releases/tag/v1.0.0"><img src="https://img.shields.io/badge/release-v1.0.0-success?style=for-the-badge" alt="Release"></a>
  <a href="https://github.com/theworker02/personal-site/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-see%20LICENSE-blue?style=for-the-badge" alt="License"></a>
  <a href="https://github.com/theworker02/personal-site"><img src="https://img.shields.io/badge/status-maintained-informational?style=for-the-badge" alt="Status"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-0B1F33.svg" alt="version">
  <img src="https://img.shields.io/badge/category-product-C9A227.svg" alt="category">
  <img src="https://img.shields.io/badge/pages-enabled-222.svg" alt="pages">
  <img src="https://img.shields.io/badge/docs-thickened-brightgreen.svg" alt="docs">
  <img src="https://img.shields.io/badge/notes-detailed-lightgrey.svg" alt="notes">
</p>


# theworker02 — Technology Laboratory

Interactive digital identity for **theworker02**: a personal technology laboratory, research archive, project museum, and knowledge graph — **not** a conventional developer portfolio template.

## Acquisition & customization

This project is **available for acquisition**, **for sale**, and **customizable**. Full brief: [ACQUISITION.md](./ACQUISITION.md). Live: [`/acquire`](https://theworker02.netlify.app/acquire) · contact intent **Acquisition**.

**Production is deployed on Netlify** ([theworker02.netlify.app](https://theworker02.netlify.app)).

## Stack

- Next.js (App Router) + TypeScript + React
- Tailwind CSS v4
- Motion-ready client interactions (canvas constellation, SVG demos)
- Zod-validated content schemas
- MDX writing via `next-mdx-remote`
- Fuse.js deterministic full-site search
- Server-side GitHub metadata sync + JSON cache
- **Netlify** hosting (`@netlify/plugin-nextjs`, `netlify.toml`)

## Develop

```bash
npm install
cp .env.example .env.local
npm run sync:github   # optional, seeds data/cache/github.json
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run test` | Vitest unit tests |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run sync:github` | Force GitHub metadata sync into cache |

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — canonical URL
- `GITHUB_TOKEN` — optional, higher GitHub rate limits
- `GITHUB_EXCLUDE_REPOS` — comma-separated repo names to hide
- `CONTACT_WEBHOOK_URL` — optional delivery target for contact form (Slack Incoming Webhook supported)
- `GITHUB_SYNC_SECRET` — optional auth for `POST /api/github/sync`

Without `CONTACT_WEBHOOK_URL`, contact submissions append to `data/cache/contact-log.jsonl` (gitignored).

## Content

- Curated projects: `src/lib/content/projects.ts`
- Research: `src/lib/content/research.ts`
- Lab: `src/lib/content/lab.ts`
- Writing MDX: `content/writing/*.mdx`
- Live “Currently” strip: `src/lib/site.ts` → `currently`
- Graph edges: `src/lib/graph/index.ts` (+ derived related links)

## GitHub synchronization

`src/lib/github/sync.ts` fetches public repos for `theworker02`, filters forks/exclusions, and writes `data/cache/github.json`.

- Visitors read the **cache**, not live GitHub on every page.
- `GET /api/github/sync` refreshes (respects 1h freshness unless `?force=1`).
- Archive merges curated projects with additional cached repositories.

Never invent stars, users, revenue, or benchmarks on the site.

## Deploy (Netlify)

This site **is deployed with Netlify**. Config: `netlify.toml` + `@netlify/plugin-nextjs`.

1. Connect this GitHub repository to Netlify.
2. Build command: `npm run build` (see `netlify.toml`).
3. Set env vars in Netlify UI.
4. Optionally run `npm run sync:github` in a build plugin or commit a fresh cache.

## Documentation

- [CODEX.md](./CODEX.md) — Codex / agent project instructions
- [ACQUISITION.md](./ACQUISITION.md) — acquisition, sale, customization
- [SECURITY.md](./SECURITY.md) — hardening, secrets, limits of obfuscation
- [LICENSE](./LICENSE) — proprietary rights
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — graphite editorial design system
- [DESIGN_REFERENCE.md](./DESIGN_REFERENCE.md)
- [PERFORMANCE.md](./PERFORMANCE.md)
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CHANGELOG.md](./CHANGELOG.md)

## Command palette

`Ctrl/Cmd+K` opens global search + navigation actions.

## Badges & release notes

| Badge | Meaning |
| --- | --- |
| docs live | Public documentation / Pages surface for `personal-site` |
| release v1.0.0 | Stable tagged release with narrative notes |
| license | See repository `LICENSE` for terms |
| status maintained | Actively kept in the @theworker02 portfolio |
| version 1.0.0 | Documentation and brand completeness milestone |
| pages enabled | Site intended at `https://theworker02.github.io/personal-site/` |

Detailed narrative for the stable line lives in [CHANGELOG.md](./CHANGELOG.md) and the [v1.0.0 GitHub Release](https://github.com/theworker02/personal-site/releases/tag/v1.0.0).
