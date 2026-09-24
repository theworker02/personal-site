# CODEX.md — project instructions for Codex

Guidance for OpenAI Codex (and any agent) working in this repository.

**Production host:** Netlify (`netlify.toml`, `@netlify/plugin-nextjs`) → [theworker02.netlify.app](https://theworker02.netlify.app)  
**Commercial status:** available for **acquisition**, **for sale**, and **customizable** — [ACQUISITION.md](./ACQUISITION.md)

> Note: Root `AGENTS.md` is auto-managed by Next.js (`next dev`). Prefer this file for durable project rules. Codex can load it via `AGENTS.override.md` or `project_doc_fallback_filenames = ["CODEX.md"]`.

## What this is

Interactive digital identity for **theworker02** — a personal technology laboratory, research archive, project museum, and knowledge graph. **Not** a conventional developer portfolio template.

Stack: Next.js App Router + TypeScript + Tailwind CSS v4 + Motion + Zod content + MDX + Fuse search + GitHub JSON cache + **Netlify**.

## Before writing code

1. Read the relevant guide under `node_modules/next/dist/docs/` — this Next.js version has breaking APIs vs training data.
2. Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) before UI work.
3. Read [PERFORMANCE.md](./PERFORMANCE.md) before scroll/canvas/motion work.
4. Read [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) before content edits.
5. Read [ARCHITECTURE.md](./ARCHITECTURE.md) before API or data-flow changes.

## Non-negotiables

- No auth / login / signup / multi-tenant accounts (Phase 1).
- Do not invent stars, users, revenue, benchmarks, partnerships, or citations.
- Do not reintroduce neon lime/cyan “phosphor lab” aesthetics or glass/bento portfolio chrome.
- Brand as **theworker02** (handle), not a corporate org on the site surface.
- Prefer Server Components; client only for interactive islands.
- Never `setState` from continuous scroll or RAF loops — use Motion values / refs / DOM.
- Pause canvas (`TheField`) when offscreen or tab hidden; cap DPR.
- Secrets only via env / Netlify UI — never commit `.env.local` or contact logs.
- Keep the site deployable on **Netlify**.
- **Mobile is required:** stack layouts, 44px touch targets, no sticky scroll traps on small screens, disable parallax/magnetic on coarse pointers, keep form inputs ≥16px.
- **Security:** follow [SECURITY.md](./SECURITY.md). Do not add client-side “obfuscation” packages that break hydration. Keep secrets server-only; require `GITHUB_SYNC_SECRET` in production.

## Design system (summary)

Source of truth: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) + `src/app/globals.css`.

- Worlds: `world-paper` | `world-ink` | `world-workshop` | `world-index`
- Fonts: Syne (display), Newsreader (editorial), IBM Plex Mono (meta)
- Signature motif: `TheField` — never a particle sphere
- Marks: `src/components/visual/Marks.tsx`, `SignalRibbon.tsx`
- Validate experiments on `/design/*` before shipping to main routes

## Key paths

| Area | Path |
| --- | --- |
| Site identity / socials / currently | `src/lib/site.ts` |
| Projects / research / lab / writing meta | `src/lib/content/*` |
| Writing MDX | `content/writing/*.mdx` |
| Graph | `src/lib/graph/index.ts` |
| GitHub sync | `src/lib/github/sync.ts` → `data/cache/github.json` |
| Motion primitives | `src/lib/motion/*`, `src/components/motion/*` |
| Homepage acts | `src/app/page.tsx` |
| Acquisition page | `src/app/acquire/page.tsx` |

## Commands

```bash
npm install
cp .env.example .env.local
npm run sync:github   # optional
npm run dev
npm run test
npm run typecheck
npm run build
```

## Docs map

- [README.md](./README.md)
- [ACQUISITION.md](./ACQUISITION.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- [DESIGN_REFERENCE.md](./DESIGN_REFERENCE.md)
- [PERFORMANCE.md](./PERFORMANCE.md)
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)
- [CHANGELOG.md](./CHANGELOG.md)

## When correcting mistakes

Update this file (and [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) / [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) as relevant) so future Codex sessions inherit the fix.
