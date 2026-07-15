# IMPLEMENTATION-PLAN.md — acting on probe.md findings

**Date:** 2026-07-15
**Companion to:** [probe.md](probe.md) (the audit this plan responds to).

## Context

The audit in [probe.md](probe.md) found the site is technically healthy (green build, clean lint, honest copy) but **not launch-ready**, and its dev_docs have drifted from the code. This plan turns those findings into concrete changes.

Owner decisions baked into this plan:
- **Rate limiting:** keep the code, fix the docs (the limiter is a free best-effort spam brake).
- **Contact form:** fail loudly in production when email isn't wired; keep log-and-succeed only in dev.
- **Hero:** sharpen to one concrete ICP now (early-stage biotech), don't defer.

Work is grouped: **A. Code fixes**, **B. Doc reconciliation**, **C. Ops/business actions** (need owner input — cannot be coded blind).

---

## A. Code fixes

### A1 — 🔴 Contact form must fail loudly in production
**File:** `src/app/api/contact/route.ts`
When `RESEND_API_KEY` / `CONTACT_INBOX` / `CONTACT_FROM` are missing, the handler `console.log`s the inquiry and returns `{ ok: true }` — so a misconfigured deploy silently loses every lead while the UI says "message received."

**Change:** in the no-Resend branch, gate on environment:
- `process.env.NODE_ENV === "production"` → return `503` with `{ error: "Could not send right now. Please email me directly." }` (the shape the client already renders on error).
- Otherwise (dev) → keep `console.log` + `{ ok: true }` so local testing works without keys.

`ContactForm.tsx` already surfaces `body.error` on non-OK responses — no UI change needed. Update the route header comment to match.

### A2 — 🔴 Stop shipping a fake `mailto:` — make email default empty
**File:** `src/content/site.ts`
`email` defaults to `hello@abk-scientific.com`, rendered in live `mailto:` links (contact page, ContactForm ×2, footer). If the domain isn't owned, those links bounce.

**Change:** default `email` to `""` (like `scholar`/`calUrl`). Footer/contact/ContactForm already guard on non-empty email, so links hide gracefully until `NEXT_PUBLIC_CONTACT_EMAIL` is set. Keep `url`'s placeholder default (required for `metadataBase`/canonicals) but flag it must-set in C1. Wrap the ContactForm "Prefer email?" line in a `hasEmail` guard if not already, so an empty `mailto:` never prints.

### A3 — 🟠 Sharpen the hero to one ICP
**File:** `src/components/marketing/Hero.tsx`
Commit to the early-stage-biotech ICP while keeping the "medicinal chemist who codes" differentiator:
- **H1:** "RDKit Pipelines and Custom Scientific Software for **Early-Stage Biotech**" (teal highlight on the ICP phrase).
- **Subtitle:** "I'm a medicinal chemist who ships production software. I help seed and early-stage biotech teams build cheminformatics pipelines and automate research workflows — without hiring a full-time computational-chemistry engineer."

Services/about stay broad; only the hero commits to the sharp ICP.

### A4 — 🟡 Fix copy typo
**File:** `src/content/case-studies.ts` — "compute **a agreed** descriptor set" → "**an agreed**".

### A5 — 🟡 Remove unused dependency
**File:** `package.json` — remove `next-mdx-remote` (imported nowhere in `src/`) and `@types/mdx` (blog renders raw markdown via `react-markdown`). Reinstall to update the lockfile.

---

## B. Doc reconciliation

### B1 — 🟠 AGENTS.md scope, directory map, stack table are stale
**File:** `dev_docs/AGENTS.md` — move Projects, Case Studies, Blog, Newsletter, Download from "Deferred to phase 2" into "Shipped"; add the `product/`, `projects/`, `blog/` components, blog lib + content dir, `rate-limit.ts`, and the two extra API routes to the directory map; add `@vercel/analytics`, `react-markdown`/`remark-gfm`/`gray-matter`, and `vitest` to the stack table.

### B2 — 🟠 Reconcile the rate-limit contradiction
**Files:** `dev_docs/PROJECT-CONTEXT.md` (decision log), `src/app/api/contact/route.ts` (comment). Decision log says "In-memory rate limiting removed" — false. Replace with the real state: kept as a best-effort per-instance spam brake; honeypot + Resend limits remain the primary defense; not a hard global guarantee on multi-instance serverless.

### B3 — 🟡 Cross-link
Annotate `dev_docs/probe.md` to point at this plan.

---

## C. Ops / business actions (owner input required — not codeable here)

- **C1 — 🔴** Set `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_CONTACT_EMAIL`; confirm the domain is owned.
- **C2 — 🔴** Wire Resend (`RESEND_API_KEY` + `CONTACT_INBOX` + `CONTACT_FROM`), send a live test inquiry, confirm it lands.
- **C3 — 🟠** One real Chemistry Companion screenshot/workflow to replace labelled mocks.
- **C4 — 🟡** Set `NEXT_PUBLIC_CAL_URL` to enable the booking CTA.
- **C5 — 🟡** Settle the company name (needs domain + trademark check).

---

## Verification

1. `npm run build` — stays green (25 routes, TypeScript clean).
2. `npm run lint` — no new errors.
3. **A1:** dev with no keys → form still succeeds (log path); `npm run build && npm run start` with no keys → form shows "email me directly" error, not false success.
4. **A2:** with `NEXT_PUBLIC_CONTACT_EMAIL` unset → no empty `mailto:` links on `/contact`, footer, or form.
5. **A3:** `/` at desktop + mobile → new ICP headline renders, no layout break.
6. **A4:** `/case-studies/automating-molecular-analysis` shows corrected text.
7. **A5:** `/blog` and `/blog/rdkit-workflows-for-chemists` still render after dep removal.
