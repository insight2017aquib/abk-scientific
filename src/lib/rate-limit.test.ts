import { describe, expect, it } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const key = `test-ok-${Math.random()}`;
    const a = rateLimit(key, { limit: 3, windowMs: 60_000 });
    const b = rateLimit(key, { limit: 3, windowMs: 60_000 });
    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
  });

  it("blocks after limit is exceeded", () => {
    const key = `test-block-${Math.random()}`;
    rateLimit(key, { limit: 2, windowMs: 60_000 });
    rateLimit(key, { limit: 2, windowMs: 60_000 });
    const blocked = rateLimit(key, { limit: 2, windowMs: 60_000 });
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfterSec).toBeGreaterThan(0);
    }
  });
});
