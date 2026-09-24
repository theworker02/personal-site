import { getResearch, researchEntries } from "@/lib/content/research";
import { clientIp, jsonError, noStoreJson } from "@/lib/security/request";
import { pruneRateLimits, rateLimit } from "@/lib/security/rate-limit";

export async function GET(request: Request) {
  pruneRateLimits();
  const limited = rateLimit(`research:${clientIp(request)}`, { limit: 60, windowMs: 60_000 });
  if (!limited.ok) {
    return jsonError("Rate limit exceeded.", 429, limited.retryAfterSec);
  }

  const { searchParams } = new URL(request.url);
  const slug = (searchParams.get("slug") ?? "").slice(0, 120);
  if (slug) {
    const entry = getResearch(slug);
    if (!entry) return jsonError("Not found", 404);
    return noStoreJson(entry);
  }
  return noStoreJson({ research: researchEntries });
}
