# PROBE.md — website audit

**Date:** 2026-07-15
**Scope:** Full audit of the ABK Scientific marketing site (`src/`, `content/`, config, dev_docs).
**Method:** Static read of every route, component, content module, API handler, and config file, plus `npm run build` and `npm run lint`.
**Follow-up:** the fixes for these findings are tracked in [implementation_plan.md](implementation_plan.md). Findings A1–A5 and B1–B3 there have been implemented; C1–C5 remain owner actions.

## Verdict

The site is **technically healthy and honest, but not launch-ready** and its **documentation no longer matches the code**. The build is green (25 routes, TypeScript clean, zero lint errors) and the "no fabricated proof" hard rule is fully respected. Two things block a real launch: **the contact form silently drops inquiries when email isn't configured**, and **`site.url` / `site.email` are still placeholders** wired into live links, canonicals, and OG tags. Separately, the dev_docs describe a "lean v1" that the codebase has already outgrown — several "phase 2 / deferred" features are, in fact, shipping.

Severity legend: 🔴 blocker · 🟠 should-fix before outreach · 🟡 polish / follow-up.

---

## Build & tooling health (baseline)

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Compiled successfully, TypeScript clean, 25/25 static pages generated |
| `npm run lint` | ✅ No errors or warnings |
| Routes generated | Home, Services, Chemistry Companion, Projects, Case Studies (+4 slugs), Blog (+3 posts), About, Contact, 3 API routes, sitemap/robots/OG/twitter images |
| Accessibility | ✅ Skip link, `focus-visible` rings, semantic landmarks, labelled fields, `prefers-reduced-motion`, honeypot `aria-hidden` |
| Honesty rule | ✅ No invented clients, metrics, or testimonials; projects/case-studies framed as intended value; screenshots labelled "illustrative UI mock" |

---

## 🔴 Blockers (fix before any outreach or deploy)

### 1. Contact form reports success even when no email is delivered
`src/app/api/contact/route.ts` sends via Resend only if `RESEND_API_KEY` + `CONTACT_INBOX` + `CONTACT_FROM` are all set. Otherwise it `console.log`s the inquiry and **still returns `{ ok: true }`**. The UI (`ContactForm.tsx`) then shows *"Thanks — message received. I read every inquiry personally and will reply within two business days."*

If the site is deployed before Resend is wired, **every inquiry is lost** while the visitor is told it was received. This is the single highest-risk issue: the site's one job is generating inquiries, and the failure is invisible. Wire Resend and send a real end-to-end test before publishing (this is literally step 1 of the roadmap in `PROJECT-CONTEXT.md`).

### 2. `site.url` and `site.email` are placeholders baked into live output
`src/content/site.ts` defaults to `https://abk-scientific.com` and `hello@abk-scientific.com`. These are not inert — they feed:
- **Canonical URLs, OG `url`, `metadataBase`, sitemap, robots `sitemap:`** → all point at `abk-scientific.com`. If the real deploy domain differs, every canonical and social preview is wrong.
- **`mailto:` links** in the contact page, contact form (×2), and footer. If `abk-scientific.com` isn't a registered/owned domain with a working inbox, those links go nowhere.

Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` (or a real domain address) before launch. **Confirm the domain is actually owned** — a Gmail address that works beats a domain address that bounces.

---

## 🟠 Should-fix before outreach

### 3. dev_docs are stale — "deferred phase 2" features are already shipping
`AGENTS.md` → *Scope status* claims:
> **Shipped (lean v1):** Home, Services, Chemistry Companion, About, Contact + SEO + contact API.
> **Deferred to phase 2:** MDX blog, newsletter, case-study detail routes, project detail routes, CTA analytics.

Reality in the code: `/projects`, `/case-studies` + `[slug]`, `/blog` + `[slug]`, `/api/newsletter`, `/api/download`, `@vercel/analytics`, an MDX blog with 3 posts in `content/blog/`, and a full blog pipeline (`gray-matter`, `react-markdown`, `remark-gfm`) are **all built and in the sitemap**. An agent trusting the docs would try to "build" features that already exist. Update the Scope status, directory map, and stack table in `AGENTS.md`.

### 4. Decision log contradicts the code: rate limiting was NOT removed
`PROJECT-CONTEXT.md` decision log says *"In-memory rate limiting removed."* But `src/lib/rate-limit.ts` exists and is **actively used** in both `/api/contact` (5/15min) and `/api/newsletter` (8/15min), and the route header comment still advertises it. The limiter's own docstring admits it's per-instance and unreliable on multi-instance serverless — which is exactly why the decision log said to drop it. Decide: either genuinely remove it (and rely on honeypot + Resend limits, per the logged decision) or keep it and correct the docs. Right now code and docs disagree.

### 5. Positioning still "mixed/broad" — the flagged conversion weakness is unaddressed
`PROJECT-CONTEXT.md` explicitly calls the broad hero the *"weakest for conversion"* and the *"highest-leverage open improvement."* The hero (`Hero.tsx`) and home still read generically: *"Helping researchers, biotech startups, and scientific teams automate workflows, accelerate analysis…"* No concrete ICP line yet. This is a known, documented gap — worth sharpening into one specific ICP statement (e.g. "RDKit pipelines for seed-stage biotechs without an in-house comp-chem hire") before spending on outreach.

### 6. No real proof asset
Every project is "In development," every case study is an "illustrative methodology pattern," and every product screenshot is a labelled mock. This is honest and rule-compliant — but roadmap item 3 (one real Chemistry Companion screenshot, demo, or honestly-written workflow) is still open, and it's the credibility gap a skeptical biotech buyer will notice first.

---

## 🟡 Polish / follow-up

### 7. Copy typo in a case study
`src/content/case-studies.ts:28` — *"compute **a agreed** descriptor set"* → should be *"an agreed"*. Live on `/case-studies/automating-molecular-analysis`.

### 8. Unused dependency: `next-mdx-remote`
`package.json` lists `next-mdx-remote` (and `@types/mdx`), but the blog renders through `react-markdown` in `MdxContent.tsx`. `next-mdx-remote` appears unused — drop it to shrink the dependency surface, or switch to it if MDX-in-markdown features are actually wanted.

### 9. Scheduling (`NEXT_PUBLIC_CAL_URL`) empty
Contact page correctly falls back to an email CTA (graceful, working as designed). Just noting it's still an open item from `PROJECT-CONTEXT.md` — a booking link converts better than "email to schedule."

### 10. Company name still under review
`ABK Scientific` is flagged in `PROJECT-CONTEXT.md` as vague / under review. Not a bug — a pending business decision that touches brand, OG image, logo mark ("AB"), and domain. Any rename needs a domain + trademark conflict check first.

---

## What's genuinely solid (no action needed)

- **Honesty discipline** is excellent and consistent — the hardest rule to keep is being kept everywhere.
- **Accessibility** is above average for a marketing site: skip-to-content, focus-visible outlines, reduced-motion, proper labels, honeypot hidden from AT.
- **Security posture** is reasonable: honeypot on both forms, no secrets in the repo, `/api/download` only redirects to whitelisted env-controlled asset keys (no open-redirect), `rel="noopener noreferrer"` on external links.
- **SEO plumbing** is complete: per-page metadata, canonicals, JSON-LD (Person / ProfessionalService / SoftwareApplication), sitemap, robots, OG + Twitter images generated at build.
- **Content-as-data** convention is followed throughout — copy edits stay out of JSX.

---

## Suggested order of operations

1. Wire Resend + real inbox, send a live test inquiry, confirm it lands (#1). **Non-negotiable before outreach.**
2. Set `NEXT_PUBLIC_SITE_URL` + a verified contact email; confirm the domain is owned (#2).
3. Reconcile dev_docs with reality — scope status, rate-limit decision, dependency list (#3, #4, #8).
4. Sharpen the hero to one concrete ICP (#5).
5. Land one real proof asset (#6).
6. Housekeeping: typo fix (#7), Cal link (#9), name decision (#10).
