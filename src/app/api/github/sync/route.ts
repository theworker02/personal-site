import { syncGithub } from "@/lib/github/sync";
import { authorizeGithubSync, clientIp, jsonError, noStoreJson } from "@/lib/security/request";
import { pruneRateLimits, rateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

async function handleSync(request: Request, force: boolean) {
  const denied = authorizeGithubSync(request);
  if (denied) return denied;

  pruneRateLimits();
  const ip = clientIp(request);
  const limited = rateLimit(`github-sync:${ip}`, { limit: 6, windowMs: 60_000 });
  if (!limited.ok) {
    return jsonError("Rate limit exceeded.", 429, limited.retryAfterSec);
  }

  try {
    const cache = await syncGithub({ force });
    return noStoreJson({
      ok: !cache.error,
      syncedAt: cache.syncedAt,
      repoCount: cache.repos.length,
      // Never echo raw upstream errors that may include token fragments.
      error: cache.error ? "Sync failed." : null,
    });
  } catch {
    return jsonError("Sync failed.", 500);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get("force") === "1";
  return handleSync(request, force);
}

export async function POST(request: Request) {
  return handleSync(request, true);
}
