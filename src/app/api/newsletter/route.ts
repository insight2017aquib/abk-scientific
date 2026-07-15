import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Newsletter signup. Logs or Resend audience if configured.
// Honeypot: company_website non-empty → silent success.

const LIMIT = 8;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`newsletter:${ip}`, { limit: LIMIT, windowMs: WINDOW_MS });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (json && typeof json === "object" && "company_website" in json) {
    const pot = (json as { company_website?: unknown }).company_website;
    if (typeof pot === "string" && pot.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }
  }

  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed." },
      { status: 422 }
    );
  }

  const { email } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (apiKey && audienceId) {
    try {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      if (!res.ok && res.status !== 409) {
        const body = await res.text();
        console.error("Resend audience error:", res.status, body);
        return NextResponse.json(
          { error: "Could not subscribe right now. Try again later." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Resend audience request failed:", err);
      return NextResponse.json(
        { error: "Could not subscribe right now. Try again later." },
        { status: 502 }
      );
    }
  } else {
    console.log(
      JSON.stringify({ event: "newsletter_subscribe", email, ts: new Date().toISOString() })
    );
  }

  return NextResponse.json({ ok: true });
}
