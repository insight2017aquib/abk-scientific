/**
 * Best-effort in-memory sliding-window rate limiter.
 *
 * Suitable for single-instance / single-region deploys. On multi-instance
 * serverless, each instance has its own map — still reduces burst spam,
 * not a hard global guarantee. For strict global limits use Upstash Redis.
 */

type Entry = { timestamps: number[] };

const store = new Map<string, Entry>();

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; remaining: 0; retryAfterSec: number };

export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - opts.windowMs;
  const entry = store.get(key) ?? { timestamps: [] };

  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  if (entry.timestamps.length >= opts.limit) {
    const oldest = entry.timestamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + opts.windowMs - now) / 1000));
    store.set(key, entry);
    return { ok: false, remaining: 0, retryAfterSec };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  // Opportunistic prune to avoid unbounded growth
  if (store.size > 5000) {
    for (const [k, v] of store) {
      v.timestamps = v.timestamps.filter((t) => t > windowStart);
      if (v.timestamps.length === 0) store.delete(k);
    }
  }

  return { ok: true, remaining: opts.limit - entry.timestamps.length };
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "unknown";
}
