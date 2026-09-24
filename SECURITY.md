# Security

Security notes for the **theworker02** laboratory site. Production is **deployed on Netlify** (`netlify.toml`, `@netlify/plugin-nextjs`). The project is **available for acquisition, sale, and customization** ([ACQUISITION.md](./ACQUISITION.md)).

## Reporting

Email `matthewlooney5@gmail.com` with subject prefix `[SECURITY]`.

## What is protected (real hardening)

| Control | Where |
| --- | --- |
| Security headers (HSTS, COOP, CORP, CSP, frame deny, nosniff, …) | `next.config.ts`, `src/middleware.ts`, `netlify.toml` |
| Probe path blocking (`.env`, `.git`, wp-admin, …) | `src/middleware.ts` |
| No `X-Powered-By`; no production browser source maps; console stripped | `next.config.ts` |
| GitHub sync **locked** without `GITHUB_SYNC_SECRET` in production | `src/app/api/github/sync` |
| Contact: Zod validation, honeypot, JSON size cap, IP rate limit | `src/app/api/contact` |
| Public API rate limits + `Cache-Control: no-store` | `src/lib/security/*`, all `/api/*` |
| Health endpoint minimized in production | `src/app/api/health` |
| GitHub token / sync errors sanitized; `server-only` sync module | `src/lib/github/sync.ts` |
| Proprietary license | [LICENSE](./LICENSE) |

## What obfuscation cannot do

Browser JavaScript, HTML, and CSS delivered to visitors can always be inspected.
“Heavy” client obfuscators break Next.js/React hydration and **do not** protect
secrets or stop a determined copier. This project therefore:

- Minifies for production (Next default) and **disables source maps**
- Keeps secrets **server-side only** (`GITHUB_TOKEN`, `CONTACT_WEBHOOK_URL`, `GITHUB_SYNC_SECRET`)
- Relies on **license + acquisition terms** for IP, not security theater (no “disable right-click”)

## Required production secrets (Netlify UI)

```text
GITHUB_SYNC_SECRET=<long random>
GITHUB_TOKEN=<fine-grained or classic, least privilege>
CONTACT_WEBHOOK_URL=<optional delivery endpoint>
NEXT_PUBLIC_SITE_URL=https://theworker02.netlify.app
```

Without `GITHUB_SYNC_SECRET` in production, `/api/github/sync` returns **503** (fail closed).

Trigger a sync:

```bash
curl -X POST https://theworker02.netlify.app/api/github/sync \
  -H "x-sync-secret: $GITHUB_SYNC_SECRET"
```

## Practices

- No public user accounts in Phase 1
- Secrets only via environment variables (Netlify UI for production)
- External links use `noopener noreferrer`
- Dependency review via `npm audit` during maintenance
- Do not commit `.env.local`, contact logs, or source maps

## Out of scope (for now)

- OAuth / multi-tenant auth
- Public write APIs for content mutation
- Global distributed rate limiting (current limits are per-instance memory)

## Acquisition handoff

Rotate `GITHUB_TOKEN`, `CONTACT_WEBHOOK_URL`, `GITHUB_SYNC_SECRET`, and Netlify access; do not share prior secrets in the repository. See [ACQUISITION.md](./ACQUISITION.md).
