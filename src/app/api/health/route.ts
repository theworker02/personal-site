import { readGithubCache } from "@/lib/github/sync";
import { clientIp, isProduction, jsonError, noStoreJson } from "@/lib/security/request";
import { pruneRateLimits, rateLimit } from "@/lib/security/rate-limit";

export async function GET(request: Request) {
  pruneRateLimits();
  const limited = rateLimit(`health:${clientIp(request)}`, { limit: 60, windowMs: 60_000 });
  if (!limited.ok) {
    return jsonError("Rate limit exceeded.", 429, limited.retryAfterSec);
  }

  if (isProduction()) {
    // Minimal liveness — do not leak cache/error internals publicly.
    return noStoreJson({ ok: true });
  }

  const cache = await readGithubCache();
  return noStoreJson({
    ok: true,
    service: "theworker02-lab",
    time: new Date().toISOString(),
    githubCache: cache
      ? { syncedAt: cache.syncedAt, repos: cache.repos.length, error: cache.error ?? null }
      : null,
  });
}
