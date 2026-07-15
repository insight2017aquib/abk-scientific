# AGENTS.md — working guide for AI agents on this repo

Canonical agent instructions for the **ABK Scientific** consulting website.
Read this **and** `dev_docs/PROJECT-CONTEXT.md` before making changes.

---

## What this project is

A lead-generation marketing site for a boutique scientific-software consultancy
(medicinal chemistry + cheminformatics + AI automation). The business goal is
**booking paying consulting clients** — every change should serve credibility and
conversion, not technical novelty. See `PROJECT-CONTEXT.md` for the business framing.

---

## Stack (as actually built — verified by a passing `npm run build`)

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js 16** (App Router, Turbopack) | `next.config.ts` |
| Language | **TypeScript** (strict) | alias `@/*` → `src/*` |
| UI | **React 19** | Server Components by default |
| Styling | **Tailwind CSS v4** | CSS-based config in `globals.css` — **there is no `tailwind.config.ts`** |
| Validation | **zod** ^3 | `src/lib/validations.ts` |
| Fonts | `next/font` (Inter) | exposed as `--font-inter` |
| Email | **Resend** REST (env-gated) | `src/app/api/contact/route.ts`, `.../newsletter/route.ts` |
| Blog | **Markdown** via `gray-matter` + `react-markdown` + `remark-gfm` | posts in `content/blog/*.mdx`, rendered by `MdxContent` |
| Analytics | **@vercel/analytics** | `<Analytics />` in `layout.tsx` |
| Tests | **Vitest** | `npm test` — `*.test.ts` under `src/lib` |
| Deploy target | **Vercel** | env vars set in dashboard, not committed |

**Runtime:** Node.js **20.9+** (or 18.18+).
**Deliberately NOT used:** shadcn/ui and Framer Motion were dropped in favor of
hand-rolled components + CSS animation (smaller bundle, no Tailwind-v4 setup friction).
Do not reintroduce them without a reason.

---

## Commands

```bash
npm install       # first-time setup (node_modules is gitignored, never committed)
npm run dev       # local dev at http://localhost:3000
npm run build     # production build — MUST pass before any deploy/PR
npm run start     # serve the production build
npm run lint      # ESLint (flat config, eslint.config.mjs)
```

Always run `npm run build` after non-trivial changes; it runs the TypeScript check too.

---

## Directory map

```
src/
├── app/                  # routes (App Router). One folder per route.
│   ├── layout.tsx        # root shell: fonts, metadata base, header/footer, analytics
│   ├── page.tsx          # Home
│   ├── services/         # /services
│   ├── chemistry-companion/
│   ├── projects/         # /projects (client-side ProjectFilter)
│   ├── case-studies/     # /case-studies + [slug] detail routes
│   ├── blog/             # /blog + [slug] (reads content/blog/*.mdx)
│   ├── about/
│   ├── contact/
│   ├── api/contact/route.ts     # inquiry endpoint (POST)
│   ├── api/newsletter/route.ts  # newsletter signup (POST)
│   ├── api/download/route.ts    # whitelisted asset redirect (GET → GitHub Releases)
│   ├── opengraph-image.tsx / twitter-image.tsx  # generated social images
│   ├── sitemap.ts / robots.ts   # SEO
│   └── globals.css       # design tokens (@theme) + base styles
├── components/
│   ├── layout/           # SiteHeader, SiteFooter, MobileNav
│   ├── marketing/        # Hero, TrustBar, CtaBand, Section, Button, cards, Icons
│   ├── product/          # ProductMock, WorkflowDiagram, InstallSteps, ArchitectureGrid
│   ├── projects/         # ProjectFilter (client component)
│   ├── blog/             # MdxContent, CategoryFilter
│   └── forms/            # ContactForm, NewsletterForm (client components)
├── content/              # ⭐ ALL COPY LIVES HERE as typed data — edit words here
│   ├── site.ts           # name, role, tagline, nav, socials, CTAs, url, email
│   ├── services.ts       # the 3 service offerings
│   ├── projects.ts       # selected work (see honesty rule below)
│   ├── case-studies.ts   # illustrative engagement patterns (no named clients)
│   ├── chemistry-companion.ts
│   └── trust.ts          # credibility chips + tech list
└── lib/
    ├── seo.ts            # pageMetadata() + JSON-LD helpers
    ├── validations.ts    # zod schemas
    ├── rate-limit.ts     # best-effort in-memory limiter (see rule below)
    ├── blog.ts / blog-types.ts  # markdown post loading + types
    └── utils.ts          # cn() classname helper

content/blog/*.mdx        # blog posts (frontmatter + markdown body), at repo root
```

---

## Core conventions (follow these)

1. **Content as data.** Never hardcode marketing copy in JSX. Add/edit it in
   `src/content/*.ts`. Pages and components read from those modules. This is the
   single most important convention in the repo.
2. **Server Components by default.** Add `"use client"` **only** to files that use
   hooks or browser events (currently just `MobileNav` and `ContactForm`).
3. **Every marketing page ends with `<CtaBand />`** → drives to `/contact`.
4. **Tailwind v4 theming.** Custom colors are defined in `globals.css` under
   `@theme inline`: `navy-700/800/900`, `teal-500/600`. Other shades
   (`teal-50/200/700`, `slate-*`, `amber-*`, `red-*`) come from Tailwind's default
   palette. If you use a **new** `navy-*` or `teal-*` shade, define it in `@theme`
   first or the utility class silently won't apply.
5. **SEO on every page.** Use `pageMetadata()` from `lib/seo.ts` for `metadata`, and
   add `<JsonLd />` where a structured-data type applies. Update `sitemap.ts` when
   adding a route.
6. **Accessibility:** semantic landmarks, labelled form fields, focus-visible rings,
   `prefers-reduced-motion` is respected in `globals.css`. Keep it that way.

---

## Hard rules (do not violate)

- **No fabricated proof.** Projects and case studies must not invent clients, revenue,
  benchmarks, performance numbers, or testimonials. Real/in-progress work is framed as
  *problem → approach → intended value*. This is a standing client instruction, not a
  stylistic preference. See `projects.ts` for the established pattern.
- **No secrets in the repo.** `.env*` is gitignored. Server secrets (`RESEND_API_KEY`,
  `CONTACT_INBOX`, `CONTACT_FROM`) go in the Vercel dashboard. Never hardcode keys or
  commit `.env.local`.
- **Do not host the Chemistry Companion installer in `public/`.** The download button
  points at a **GitHub Releases** URL (`NEXT_PUBLIC_CC_DOWNLOAD_URL`). Vercel has file-size
  limits and no versioning for binaries.
- **Never commit `node_modules` or `.next`.**

---

## Contact form / API contract

- `POST /api/contact` validates with `contactSchema` (zod).
- Honeypot field `company_website` must be empty; if filled, the request is silently
  dropped (returns ok) — anti-bot.
- If `RESEND_API_KEY` + `CONTACT_INBOX` + `CONTACT_FROM` are all set, it emails via
  Resend. Otherwise it logs to the server console and still returns success, so the
  flow is testable in dev without email configured.
- When changing form fields: update **both** `ContactForm.tsx` (UI) and
  `validations.ts` (schema) and the email body in `route.ts`.

---

## Environment variables

Public (browser-safe, `NEXT_PUBLIC_*`): contact email, LinkedIn, GitHub, Cal link,
Chemistry Companion GitHub/download URLs. Defaults live in `site.ts`.
Server-only: `RESEND_API_KEY`, `CONTACT_INBOX`, `CONTACT_FROM`.
Full list with descriptions is in `.env.example`.

**Still placeholder as of last edit:** `site.url` (production domain) and `email` in
`site.ts`. LinkedIn and GitHub are already set to real values.

---

## Scope status

**Shipped:** Home, Services, Chemistry Companion, Projects (+ category filter),
Case Studies (+ `[slug]` detail routes), Blog (Markdown pipeline + `[slug]` posts),
About, Contact, Newsletter signup, Download redirect, plus SEO (sitemap/robots/OG/Twitter),
`@vercel/analytics`, and the contact/newsletter/download API routes.
**Still deferred:** project detail routes and CTA-click funnel analytics. See
`PROJECT-CONTEXT.md` → Roadmap before building these.

---

## When you finish a change

1. `npm run build` must pass (TypeScript + build clean).
2. Manually check the affected route in `npm run dev`, including mobile width.
3. If you added a route, update `sitemap.ts` and the nav in `site.ts`.
4. Keep this file and `PROJECT-CONTEXT.md` accurate if you change architecture or scope.
