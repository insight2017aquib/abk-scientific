# Remediation Plan — ABK Scientific Website

**Source review:** Strict review scored the repo **5.5 / 10** as a production boutique lead-gen site.  
**Goal of this document:** Prioritized fix plan only (no code executed by this document alone).  
**Target after full remediation:** **8.5–9 / 10** launch-ready consultancy site.

---

## Current baseline (what exists)

| Area | Status |
|------|--------|
| Pages | `/`, `/services`, `/chemistry-companion`, `/about`, `/contact` |
| Lead capture | Contact form + Zod + Resend-gated API; honeypot partially broken |
| SEO | Per-page metadata, sitemap, robots, JSON-LD (partial) |
| Content model | Strong typed modules under `src/content/*` |
| Missing vs original brief | Projects page, case studies, blog/MDX, newsletter, analytics, download API, visuals, timelines |
| Hygiene | No git, no tests, package name `abk-build`, empty `public/images/` |

---

## Priority legend

| P | Meaning | Rule |
|---|--------|------|
| **P0** | Ship blockers / trust damage | Must fix before any public deploy |
| **P1** | Conversion & credibility | Required for serious biotech lead-gen |
| **P2** | Spec completeness | Restore original brief structure |
| **P3** | Polish & scale | Differentiating / long-term SEO |

---

## P0 — Ship blockers (do first)

### P0.1 Fix or remove Chemistry Companion download CTA

**Problem:** Page links to `/api/download?asset=chemistry-companion-win` but `src/app/api/download/route.ts` does not exist → 404 when download URL is configured.

**Remediation:**

1. Add `src/app/api/download/route.ts`:
   - Accept `asset` query param (whitelist only, e.g. `chemistry-companion-win`).
   - Resolve target URL from `NEXT_PUBLIC_CC_DOWNLOAD_URL` / content module.
   - Log event (console or structured log; optional analytics later).
   - `302` redirect to external GitHub Releases URL.
   - Return `404` if asset unknown or URL empty.
2. Keep UI fallback: if no download URL, show **Request access** → `/contact` (already present).
3. Smoke-test both states (URL set / unset).

**Done when:** Primary product CTA never 404s.

---

### P0.2 Fix honeypot (silent drop, not 422)

**Problem:** `company_website` validated with `z.string().max(0)` → bots that fill the field get validation **422**. Route “silent success” path never runs for filled honeypots.

**Remediation:**

1. Accept honeypot as optional string of any length in schema (or strip before Zod).
2. **Before** business logic: if honeypot non-empty → `return NextResponse.json({ ok: true })` (no email, no log of content).
3. Optionally log only that a honeypot was tripped (no payload).
4. Keep empty honeypot for real users.

**Done when:** Bot-filled forms return 200 `{ ok: true }` without sending email; real forms still validate name/email/message.

---

### P0.3 Placeholder social / email URLs (trust risk)

**Problem:** Defaults `linkedin.com/in/`, `github.com/`, and a possibly unverified email render as live links.

**Remediation:**

1. Set empty-string defaults when env unset (not half-URLs).
2. In footer/contact/header: **omit** LinkedIn/GitHub links when empty; show email only if set.
3. Document required env vars in `.env.example` (already present — enforce usage in UI).
4. Operator checklist: set `NEXT_PUBLIC_CONTACT_EMAIL`, LinkedIn, GitHub, `site.url` before launch.

**Done when:** No broken profile links ship to production.

---

### P0.4 Production identity cleanup

| Item | Action |
|------|--------|
| `package.json` name | Rename `abk-build` → `abk-scientific` |
| `site.url` | Require production domain via env or single source of truth |
| Git | `git init`, sensible `.gitignore` (already has env ignore), first commit |
| README | Align verification section with reality (`.next` build exists; re-verify `npm run build`) |

**Done when:** Repo identity matches brand; version control exists.

---

## P1 — Conversion & credibility

### P1.1 Visual proof assets (highest marketing ROI after P0)

**Problem:** `public/images/` empty; no product screenshots, no OG image; default Next SVGs still in `public/`.

**Remediation:**

1. Remove unused Next starter assets (`next.svg`, `vercel.svg`, etc.) or leave only brand assets.
2. Add:
   - `public/images/chemistry-companion/` — at least 2–3 UI placeholders (real screenshots preferred; branded mock UI acceptable interim).
   - `public/og-default.png` (1200×630) — navy/teal, name + role + one-line value prop.
3. Wire OG image in root + page metadata (`openGraph.images`).
4. Chemistry Companion page: screenshot gallery section using `next/image`.

**Done when:** Homepage + CC page show product-like visuals; social shares show branded card.

---

### P1.2 Rate limiting on contact API

**Problem:** No rate limit → spam risk once email is live.

**Remediation (minimal production-grade):**

1. In-memory sliding window per IP (acceptable on single-region Vercel for v1), **or** Upstash Redis if multi-instance.
2. Return `429` after N requests / window (e.g. 5 / 15 min).
3. Document serverless multi-instance limitation (in-memory is best-effort).

**Done when:** Burst spam is throttled; real users rarely hit limit.

---

### P1.3 Align hero + CTAs with approved brief (or consciously override)

**Brief headline:** Building Scientific Software for Drug Discovery and Research Automation  

**Brief secondary CTA:** View Projects  

**Current:** Different hero framing; secondary CTA points to `/services`.

**Remediation:**

1. Decide: match brief copy **or** document intentional brand override in `dev_docs`.
2. Secondary CTA: **View Projects** → `/#projects` or future `/projects`.
3. Ensure every page still ends with strong CTA (already mostly true via `CtaBand`).

**Done when:** Messaging is consistent with launch positioning.

---

### P1.4 Services: add timeline + explicit CTA block

**Brief requires per service:** Problem · Solution · Deliverables · **Typical timeline** · CTA.

**Remediation:**

1. Extend `Service` type with `timeline: string` (e.g. “2–6 weeks for an MVP pipeline”).
2. Update `services.ts` copy for three services.
3. Render timeline in `ServiceBlock`.
4. Keep per-service CTA → contact (optional `?type=` prefill later).

**Done when:** Services page matches commercial consulting structure.

---

### P1.5 Project links & honesty polish

**Remediation:**

1. Add real GitHub/demo URLs when available; hide “links” row when empty (already partial).
2. Do not invent stars/metrics.
3. Optional: status badge + “Request a walkthrough” CTA per project.

**Done when:** Cards either link out or clearly invite contact — never dead external roots.

---

## P2 — Spec completeness (original brief structure)

### P2.1 Dedicated `/projects` page + filtering

1. Add `src/app/projects/page.tsx`.
2. Client filter by category tags.
3. Reuse `ProjectCard`; home shows featured subset only.
4. Nav: add **Projects**.
5. Optional later: `/projects/[slug]`.

**Done when:** Full project inventory is browsable and filterable.

---

### P2.2 Case studies section

1. Add `src/content/case-studies.ts` (4 placeholders from brief; **no fake clients** — methodology framing if needed).
2. Routes: `/case-studies`, `/case-studies/[slug]`.
3. Home teaser strip + nav entry.

**Done when:** Trust section exists for procurement-minded buyers.

---

### P2.3 Chemistry Companion deep-dive (flagship completeness)

1. Extend content: `installSteps`, `architecture[]`, `workflowSteps[]`.
2. Components: `InstallSteps`, `WorkflowDiagram`, `ArchitectureGrid`.
3. Screenshots section (P1.1 assets).
4. Closing CTA: *Need custom scientific software? Let’s talk.*

**Done when:** CC page can stand alone as a product landing page.

---

### P2.4 Blog (MDX) structure

1. `content/blog/*.mdx` with frontmatter (title, description, date, category, draft).
2. Categories: Drug Discovery, RDKit, Scientific Software, Research Automation, AI in Chemistry, Computational Chemistry.
3. `src/lib/blog.ts` + `/blog` + `/blog/[slug]` + category filter.
4. Seed 2–3 real technical posts.
5. Include blog routes in `sitemap.ts`.

**Done when:** Content marketing pipeline exists without external CMS.

---

### P2.5 Newsletter + analytics + download tracking

| Feature | Approach |
|---------|----------|
| Newsletter | `/api/newsletter` + small form; Resend audience or log stub |
| Analytics | `@vercel/analytics`; optional GA/Plausible via env |
| Download tracking | P0.1 structured log; optional analytics event |

---

## P3 — Polish & production hardening

| Item | Notes |
|------|--------|
| Accessibility pass | Focus order, mobile menu focus trap, contrast audit |
| Performance | LCP with images/OG; lazy below-fold |
| Tests | Unit: contact schema + download whitelist; Playwright smoke: home, contact, CC |
| CI | GitHub Action: lint + build on PR |
| shadcn / Framer | Optional — hand-rolled UI is fine if visuals improve |
| Types folder | Populate shared types or delete empty `src/types/` |
| Legal | Privacy one-liner on contact form |

---

## Suggested execution waves

### Wave A — Launch safety → expected **~6.5 / 10** ✅ DONE

1. P0.1 Download API — `src/app/api/download/route.ts`  
2. P0.2 Honeypot — silent 200 before Zod fail  
3. P0.3 Placeholder links — `isPresentUrl` + conditional footer/contact  
4. P0.4 Package name `abk-scientific` + `git init` + `NEXT_PUBLIC_SITE_URL`  
5. P1.2 Rate limit — 5 / 15 min in-memory  
6. Verify: `npm run lint` + `npm run build` green (includes `/api/download`)  

### Wave B — Credibility → expected **~7.5 / 10** ✅ DONE

1. P1.1 Visuals + OG — `opengraph-image.tsx`, `ProductMock`, removed Next starter SVGs  
2. P1.3 Hero/CTA — brief headline + “View Projects”  
3. P1.4 Service timelines — `timeline` field + ServiceBlock  
4. P1.5 Project links — product page / about / walkthrough CTAs  
5. P2.3 CC deep-dive — install, workflow, architecture, mock screenshots  

### Wave C — Full brief → expected **~8.5–9 / 10** ✅ DONE

1. P2.1 `/projects` + category filter + nav  
2. P2.2 Case studies index + `[slug]` + home teaser  
3. P2.4 `content/blog/*.mdx` + category filter + 3 seed posts  
4. P2.5 Newsletter API/form + `@vercel/analytics`  
5. P3 Vitest + GitHub Actions CI + mobile focus trap + privacy note  

---

## Explicit non-goals

- Fabricating client names, revenue, or publication DOIs  
- Hosting Windows installers inside this repo  
- Full headless CMS in v1 (MDX is enough)  
- Multi-language  
- Live payment processing  

---

## Acceptance checklist (launch)

- [ ] `npm run build` green on clean install  
- [ ] All nav routes 200  
- [ ] Contact email path tested (Resend) or mailto-only fallback documented  
- [ ] Honeypot returns silent success  
- [ ] No broken social links  
- [ ] CC download never 404s  
- [ ] OG image present  
- [ ] At least one product visual on CC page  
- [ ] Services show timeline  
- [ ] Projects page and/or case studies for trust  
- [ ] Privacy one-liner on form  
- [ ] Production domain + env set on host  
- [ ] Git remote + CI preferred  

---

## File map (expected new/changed)

```text
# P0
src/app/api/download/route.ts          # NEW
src/lib/validations.ts                 # honeypot fix
src/app/api/contact/route.ts           # rate limit + honeypot order
src/content/site.ts                    # empty defaults, link guards
src/components/layout/SiteFooter.tsx
src/app/contact/page.tsx
package.json                           # rename

# P1
public/og-default.png                  # NEW
public/images/chemistry-companion/*    # NEW
src/app/layout.tsx / lib/seo.ts
src/content/services.ts                # timeline
src/components/marketing/ServiceBlock.tsx
src/components/marketing/Hero.tsx

# P2
src/app/projects/page.tsx              # NEW
src/app/case-studies/...               # NEW
src/content/case-studies.ts            # NEW
src/app/blog/...                       # NEW
content/blog/*.mdx                     # NEW
src/lib/blog.ts                        # NEW
src/components/product/*
src/app/api/newsletter/route.ts        # NEW
```

---

## How to use this document

1. Execute **Wave A** before any public deploy.
2. Execute **Wave B** before positioning this as a serious biotech lead-gen site.
3. Execute **Wave C** to close the original product brief.
4. Application code should only change when an implementation pass is explicitly requested for a wave.

