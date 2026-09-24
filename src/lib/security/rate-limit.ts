import "server-only";

type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();

/** In-memory sliding window. Adequate for single-instance / Netlify function affinity; not a global cluster limiter. */
export function rateLimit(
  key: string,
  { limit = 30, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const row = buckets.get(key);
  if (!row || now > row.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true };
  }
  if (row.count >= limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((row.reset - now) / 1000)) };
  }
  row.count += 1;
  return { ok: true };
}

/** Bound Map growth in long-lived processes. */
export function pruneRateLimits(max = 5_000) {
  if (buckets.size <= max) return;
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (now > v.reset) buckets.delete(k);
  }
  if (buckets.size > max) {
    const overflow = [...buckets.keys()].slice(0, buckets.size - max);
    for (const k of overflow) buckets.delete(k);
  }
}
