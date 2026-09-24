import { getSiteStatistics } from "@/lib/stats";
import { clientIp, jsonError, noStoreJson } from "@/lib/security/request";
import { pruneRateLimits, rateLimit } from "@/lib/security/rate-limit";

export async function GET(request: Request) {
  pruneRateLimits();
  const limited = rateLimit(`stats:${clientIp(request)}`, { limit: 60, windowMs: 60_000 });
  if (!limited.ok) {
    return jsonError("Rate limit exceeded.", 429, limited.retryAfterSec);
  }
  const stats = await getSiteStatistics();
  return noStoreJson(stats);
}
