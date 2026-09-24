# Architecture

Personal technology laboratory for **theworker02**. Production is **deployed on Netlify** (`netlify.toml`, `@netlify/plugin-nextjs`). The site and codebase are **available for acquisition, sale, and customization** — see [ACQUISITION.md](./ACQUISITION.md).

## Layers

1. **Environment** — fixed atmospheric gradients + structural grid (`lab-env`, `lab-grid`)
2. **Shell** — header, footer, currently strip, command palette
3. **Content** — Zod-validated projects, research, lab, writing
4. **Interactive systems** — constellation canvas, knowledge graph, timeline, archive filters, project demos
5. **Overlays** — command palette / dialogs
6. **APIs** — GitHub sync, search, graph, projects, research, stats, contact, health

## Data flow

```text
content/*.ts + content/writing/*.mdx
        │
        ▼
   Zod schemas ──► pages (RSC) ──► client islands
        │
        ├──► search index (Fuse)
        ├──► graph builder
        └──► stats

GitHub API ──(server sync)──► data/cache/github.json ──► archive / search / stats
```

## API surface

| Route | Role | Hardening |
| --- | --- | --- |
| `GET /api/health` | Liveness | Minimal in production; rate limited |
| `GET/POST /api/github/sync` | Refresh GitHub cache | **Secret required** in production |
| `GET /api/search?q=` | Grouped full-site search | Query capped; rate limited |
| `GET /api/graph` | Nodes + edges | Rate limited |
| `GET /api/projects` | Curated projects (`?slug=`) | Rate limited |
| `GET /api/research` | Research entries (`?slug=`) | Rate limited |
| `GET /api/stats` | Computed statistics | Rate limited |
| `POST /api/contact` | Validated contact + honeypot | Size cap + rate limit |

Security helpers: `src/lib/security/*`, edge middleware `src/middleware.ts`. See [SECURITY.md](./SECURITY.md).

## Rendering strategy

- Server Components for indexable text and metadata.
- Client Components only for constellation, graph, archive filters, timeline, command palette, contact form, and demos.
- No Three.js on routes that do not need it (Phase 1 uses Canvas 2D + SVG).

## Deployment

- Host: **Netlify** (production: [theworker02.netlify.app](https://theworker02.netlify.app))
- Build: `npm run build` via `@netlify/plugin-nextjs`
- Security headers and Node 22 set in `netlify.toml`

## Acquisition

This architecture document describes transferrable product IP. For sale / customization terms: [ACQUISITION.md](./ACQUISITION.md). Public listing surface: `/acquire`.

## Future extension points

- Swap JSON GitHub cache for SQLite/Postgres without changing page APIs.
- Add AI retrieval beside Fuse without removing deterministic search.
- Expand MDX component map for diagrams/equations.
