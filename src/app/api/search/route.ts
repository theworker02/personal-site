import { searchSite } from "@/lib/search";
import { clientIp, jsonError, noStoreJson } from "@/lib/security/request";
import { pruneRateLimits, rateLimit } from "@/lib/security/rate-limit";

export async function GET(request: Request) {
  pruneRateLimits();
  const limited = rateLimit(`search:${clientIp(request)}`, { limit: 40, windowMs: 60_000 });
  if (!limited.ok) {
    return jsonError("Rate limit exceeded.", 429, limited.retryAfterSec);
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").slice(0, 120);
  const result = await searchSite(q);
  return noStoreJson(result);
}
