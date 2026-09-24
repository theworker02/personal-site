import { getGraph } from "@/lib/graph";
import { clientIp, jsonError, noStoreJson } from "@/lib/security/request";
import { pruneRateLimits, rateLimit } from "@/lib/security/rate-limit";

export async function GET(request: Request) {
  pruneRateLimits();
  const limited = rateLimit(`graph:${clientIp(request)}`, { limit: 60, windowMs: 60_000 });
  if (!limited.ok) {
    return jsonError("Rate limit exceeded.", 429, limited.retryAfterSec);
  }
  return noStoreJson(getGraph());
}
