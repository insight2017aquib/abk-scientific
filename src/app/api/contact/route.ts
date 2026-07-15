import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Consulting inquiry endpoint.
// - Rate limited (best-effort in-memory; per-instance, not a hard global guarantee).
// - Validates with Zod.
// - Honeypot (company_website): non-empty → silent 200, no email.
// - Sends via Resend if RESEND_API_KEY + CONTACT_INBOX + CONTACT_FROM set.
//   When email is NOT configured: in dev we log and return success so the flow
//   is testable without keys; in production we fail loudly (503) rather than
//   silently drop the lead — a misconfigured deploy must not look successful.

const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`contact:${ip}`, { limit: LIMIT, windowMs: WINDOW_MS });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes, or email me directly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot check before full validation so bots never hit 422 on filled pot.
  if (json && typeof json === "object" && "company_website" in json) {
    const pot = (json as { company_website?: unknown }).company_website;
    if (typeof pot === "string" && pot.trim().length > 0) {
      console.log(JSON.stringify({ event: "contact_honeypot", ip, ts: new Date().toISOString() }));
      return NextResponse.json({ ok: true });
    }
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed." },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Defensive second check after parse
  if (data.company_website && data.company_website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM; // e.g. "ABK Scientific <inquiries@yourdomain.com>"

  if (apiKey && to && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject: `New consulting inquiry — ${data.name}${data.organization ? ` (${data.organization})` : ""}`,
          text: [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Organization: ${data.organization || "—"}`,
            `Role: ${data.role || "—"}`,
            `Project type: ${data.projectType || "—"}`,
            `Budget: ${data.budget || "—"}`,
            "",
            "Message:",
            data.message,
          ].join("\n"),
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("Resend error:", res.status, body);
        return NextResponse.json(
          { error: "Could not send right now. Please email me directly." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Resend request failed:", err);
      return NextResponse.json(
        { error: "Could not send right now. Please email me directly." },
        { status: 502 }
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    // Email not configured in production: do not pretend the inquiry was received.
    console.error("[contact] inquiry dropped — email delivery not configured in production");
    return NextResponse.json(
      { error: "Could not send right now. Please email me directly." },
      { status: 503 }
    );
  } else {
    console.log("[contact] inquiry (email not configured):", {
      name: data.name,
      email: data.email,
      organization: data.organization,
      projectType: data.projectType,
    });
  }

  return NextResponse.json({ ok: true });
}
