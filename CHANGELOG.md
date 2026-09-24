# Changelog

## 0.1.0 — 2026-09-24

First public semantic release of the **theworker02** technology laboratory site.

### Added

- Next.js App Router laboratory (not a portfolio template): homepage acts, projects, research, lab, writing (MDX), archive, timeline, knowledge graph
- Graphite editorial design system (worlds, type, Field, marks) with design-lab routes
- Motion system with mobile-safe sticky/parallax behavior
- Command palette + Fuse deterministic search
- GitHub server sync + JSON cache
- Acquisition and contact flows (Slack Incoming Webhook delivery)
- Security hardening: CSP/HSTS/COOP, middleware probe blocking, API rate limits, production sync secret lock, no source maps, proprietary LICENSE
- Mobile optimization: viewport/safe-area, touch targets, nav Search, command palette sheet
- Docs: README, CODEX, ACQUISITION, ARCHITECTURE, DESIGN_SYSTEM, DESIGN_REFERENCE, PERFORMANCE, CONTENT_GUIDE, SECURITY, CONTRIBUTING

### Deploy

- Production on **Netlify** (`@netlify/plugin-nextjs`)
- Secrets-scan omit for public config keys; `SYNC_TOKEN_SECRET` alias for sync lock

### Fixed

- Netlify `npm install` peer conflict (`@vitejs/plugin-react` vs Vitest/Vite)
- Netlify secrets scanning false positives on `NEXT_PUBLIC_SITE_URL` / `GITHUB_EXCLUDE_REPOS`
