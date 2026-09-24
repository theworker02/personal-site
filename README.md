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
