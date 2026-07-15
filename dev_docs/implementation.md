# Implementation: ABK Scientific Consulting Website

## Context

Build a **production-ready lead-generation website** for **Aquib Belal Khan** — a boutique scientific software consultancy positioning (medicinal chemistry + cheminformatics + AI automation), not a generic developer portfolio.

**Workspace state:** `C:\Users\Aquib Belal\Documents\abk-scientific` is empty (no git, no code, no assets). Full greenfield scaffold.

**Primary success metric:** clear consulting CTAs + credible scientific positioning that answers *“Why should a biotech company hire Aquib?”* on every page.

---

## Recommended approach

**Stack (as specified):**

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 15** (App Router) + **TypeScript** | SEO, SSR/SSG, production default |
| Styling | **Tailwind CSS** + **shadcn/ui** | Clean scientific UI, fast iteration |
| Motion | **Framer Motion** | Subtle professional entrance animations (not hype) |
| Content | **Typed content modules** + **MDX blog** | Editable, no CMS lock-in; easy later Sanity/Contentlayer swap |
| Forms | **API routes** + **Resend** (env-gated) + client validation (Zod + react-hook-form) | Production lead capture; graceful fallback if keys missing |
| Analytics | **@vercel/analytics** + optional **Plausible/GA** via env | Privacy-friendly default |
| Deploy | **Vercel** | Zero-config Next.js |

**Design system:**

- **Palette:** white (`#FFFFFF`), dark blue (`#0B1F3A` / `#0F2744`), teal accents (`#0D9488` / `#14B8A6`)
- **Typography:** Inter or Source Sans for UI; optional Source Serif for long-form About/blog
- **Tone:** research-lab clean — generous whitespace, sharp cards, restrained motion, no crypto/startup gradients
- **Imagery:** SVG/placeholder diagram components for product UI and workflow (no fake stock-scientist photos); `next/image` ready paths under `public/images/`

**Architecture principles:**

1. **Content as data** — services, projects, case studies, trust chips live in `src/content/*.ts` so copy changes never require hunting JSX.
2. **Shared marketing chrome** — `SiteHeader`, `SiteFooter`, sticky CTA band, mobile nav.
3. **Every page ends with a CTA block** (`CtaBand`) → Contact or Book Consultation.
4. **SEO first-class** — per-route `metadata`, JSON-LD (`Person` + `ProfessionalService` + `SoftwareApplication` for Chemistry Companion), `sitemap.ts`, `robots.ts`, Open Graph images.
5. **Accessibility** — semantic landmarks, focus rings, contrast-safe teal-on-white, form labels, reduced-motion respect for Framer.

---

## Site map & routes

| Route | Purpose |
|-------|---------|
| `/` | Hero, trust bar, services preview, flagship product teaser, projects strip, case-study teaser, final CTA |
| `/services` | 3 full service modules (problem / solution / deliverables / timeline / CTA) |
| `/chemistry-companion` | Flagship product deep-dive |
| `/projects` | Filterable project cards |
| `/projects/[slug]` | Optional detail pages for richer projects |
| `/case-studies` | Placeholder scientific consulting case studies |
| `/case-studies/[slug]` | Challenge / approach / tech / outcome |
| `/about` | Professional biography (no fluff) |
| `/blog` | Category-filtered article index |
| `/blog/[slug]` | MDX articles |
| `/contact` | Inquiry form, email, LinkedIn, GitHub, scheduling section |

**Header nav:** Home · Services · Chemistry Companion · Projects · Case Studies · About · Blog · Contact  
**Primary global CTA:** Book a Consultation → `/contact`

---

## Folder structure

```text
abk-scientific/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json                 # shadcn
├── .env.example
├── .gitignore
├── public/
│   ├── favicon.ico / icon.svg
│   ├── og-default.png              # generated or solid-brand placeholder
│   ├── images/
│   │   ├── chemistry-companion/    # screenshot placeholders
│   │   ├── projects/
│   │   └── diagrams/
│   └── downloads/                  # Windows installer placeholder path
├── content/blog/                   # MDX posts
│   ├── intro-to-rdkit-workflows.mdx
│   └── ...
├── dev_docs/
│   └── implementation.md           # this document
└── src/
    ├── app/
    │   ├── layout.tsx              # fonts, metadata base, analytics
    │   ├── page.tsx                # Home
    │   ├── globals.css
    │   ├── robots.ts
    │   ├── sitemap.ts
    │   ├── services/page.tsx
    │   ├── chemistry-companion/page.tsx
    │   ├── projects/page.tsx
    │   ├── projects/[slug]/page.tsx
    │   ├── case-studies/page.tsx
    │   ├── case-studies/[slug]/page.tsx
    │   ├── about/page.tsx
    │   ├── blog/page.tsx
    │   ├── blog/[slug]/page.tsx
    │   ├── contact/page.tsx
    │   └── api/
    │       ├── contact/route.ts    # consulting inquiry
    │       ├── newsletter/route.ts
    │       └── download/route.ts   # download click tracking stub
    ├── components/
    │   ├── layout/                 # Header, Footer, MobileNav
    │   ├── marketing/              # Hero, TrustBar, CtaBand, Section, FeatureCard
    │   ├── projects/               # ProjectCard, ProjectFilter
    │   ├── services/               # ServiceBlock
    │   ├── product/                # FeatureGrid, WorkflowDiagram, InstallSteps
    │   ├── forms/                  # ContactForm, NewsletterForm
    │   ├── blog/                   # PostCard, CategoryFilter, MDX components
    │   └── ui/                     # shadcn primitives
    ├── content/                    # typed site content
    │   ├── site.ts                 # name, titles, socials, CTAs
    │   ├── services.ts
    │   ├── projects.ts
    │   ├── case-studies.ts
    │   ├── trust.ts
    │   └── chemistry-companion.ts
    ├── lib/
    │   ├── utils.ts
    │   ├── seo.ts                  # helpers for metadata + JSON-LD
    │   ├── blog.ts                 # MDX load/parse
    │   └── validations.ts          # Zod schemas
    └── types/
        └── index.ts
```

---

## Page-level implementation notes

### Home
- Full-width hero with headline/subheadline from brief
- Primary: **Book a Consultation** · Secondary: **View Projects**
- Trust section chips: M.Pharm, Jamia Hamdard, Publications, Analytical Chemistry, Open Source, Drug Discovery
- 3-service preview cards → `/services`
- Chemistry Companion spotlight → product page
- Featured projects + case-study strip
- Bottom `CtaBand`

### Services
- Three long-form sections with shared schema: `problem`, `solution`, `deliverables[]`, `timeline`, `cta`
1. Scientific Software Development  
2. Cheminformatics Development  
3. AI Automation  

### Chemistry Companion (flagship)
- Overview, feature cards, workflow diagram (SVG/component), install steps, GitHub link (placeholder URL in `site.ts`), Windows download section (tracked link), architecture bullets, use-case grid (medicinal / computational / teaching / research labs)
- Closing CTA: *Need custom scientific software? Let’s talk.*

### Projects
- Cards from `projects.ts`: Chemistry Companion, Medicinal Chemistry Figure Designer, HawkEye, Future projects
- Client-side filter by tags (cheminformatics, desktop, AI, open-source)
- Fields: description, tech stack, screenshots (placeholders), GitHub, business value
- Detail routes for projects that have longer copy

### Case studies (placeholders, as requested)
1. Automating molecular analysis workflows  
2. Batch cheminformatics processing  
3. Scientific dashboard development  
4. Research workflow automation  
- Each: Challenge · Approach · Technology · Outcome (business-outcome focused, not vanity metrics)

### About
- Professional bio only: medicinal chemistry → drug discovery → computational chemistry → scientific software → research → open source
- Credibility markers + CTA to contact

### Blog
- MDX under `content/blog/`
- Categories: Drug Discovery, RDKit, Scientific Software, Research Automation, AI in Chemistry, Computational Chemistry
- 2–3 seed posts with realistic technical sample content (not empty shells)
- Category filter on index; full SEO on posts

### Contact
- Consulting inquiry form: name, email, organization, role, project type, message, budget band (optional), preferred contact
- Email / LinkedIn / GitHub from `site.ts` (env-overridable placeholders)
- “Schedule a call” section (Cal.com/Calendly embed URL via env, or link-out button if unset)
- Newsletter optional block (same visual language, secondary)

---

## Bonus features (included, production-shaped)

| Feature | Implementation |
|---------|----------------|
| Consulting inquiry | `/api/contact` + Zod; Resend if `RESEND_API_KEY`; else logs + success UX in dev |
| Lead capture | Form fields structured for CRM handoff; honeypot + basic rate limit headers |
| Newsletter | `/api/newsletter` stub (Resend audience or store) |
| Project filtering | Client component on `/projects` |
| GitHub integration | Static repo links first; optional server fetch of stars if `GITHUB_TOKEN` set |
| Blog CMS | File-based MDX (authorable in-repo); documented path to headless CMS |
| Analytics | `@vercel/analytics`; optional `NEXT_PUBLIC_GA_ID` / Plausible |
| Download tracking | `/api/download?asset=chemistry-companion-win` logs event then redirects |

---

## Content strategy (sample but credible)

All copy written in **consultant voice**: problem → scientific capability → software outcome for biotech buyers.

Placeholders clearly centralized:
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_CAL_URL`
- Chemistry Companion GitHub/download URLs in `src/content/chemistry-companion.ts`

No invented peer-reviewed paper DOIs; “Publications” trust chip links to an About subsection or external Scholar URL when provided.

---

## Critical files to create (implementation order)

1. **Scaffold** — Next.js 15 + TS + Tailwind + ESLint; init shadcn; Framer Motion; MDX deps  
2. **Design tokens** — `globals.css` + Tailwind theme (colors, radii, container)  
3. **Content modules** — `src/content/*`  
4. **Layout shell** — header/footer/nav/CTA  
5. **Marketing components** — Hero, TrustBar, cards, motion wrappers  
6. **Pages** — all routes above  
7. **Forms + API** — contact, newsletter, download  
8. **Blog MDX pipeline** — `lib/blog.ts` + seed posts  
9. **SEO** — metadata, sitemap, robots, JSON-LD  
10. **README + `.env.example` + deploy docs**

---

## Existing code to reuse

None — empty workspace. Use only framework/community defaults (shadcn primitives, Next conventions).

---

## SEO & production checklist

- [ ] Unique `title` / `description` per page  
- [ ] Open Graph + Twitter cards  
- [ ] `sitemap.xml` + `robots.txt`  
- [ ] JSON-LD Person + ProfessionalService  
- [ ] Lighthouse-oriented: font subsetting, image sizes, no layout thrash  
- [ ] Keyboard-accessible nav & forms  
- [ ] `prefers-reduced-motion` for animations  
- [ ] Typecheck + production build clean  

---

## Verification

1. `npm install` && `npm run dev` — all routes render  
2. `npm run build` && `npm run start` — production build succeeds  
3. Manual: mobile nav, forms (with/without Resend key), project filter, blog category filter, Chemistry Companion download redirect  
4. Spot-check metadata via browser view-source / Next metadata  
5. Optional: Lighthouse on Home + Contact + Chemistry Companion  

---

## Deployment instructions (README section)

1. Push repo to GitHub  
2. Import to Vercel  
3. Set env vars from `.env.example`  
4. Custom domain → production  
5. Optional: wire Resend domain for contact emails  

---

## Out of scope / deferred

- Real product screenshots (placeholders + drop-in paths documented)  
- Live payment/booking backend beyond Cal.com link  
- Headless CMS admin UI (MDX is the v1 CMS)  
- Multi-language  

---

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Missing real contact/social URLs | Env + `site.ts` placeholders; README “replace these” list |
| Chemistry Companion assets unavailable | Branded SVG mock UI + `public/images/...` slots |
| Scope creep on CMS | Ship MDX; document upgrade path |
| Form spam | Honeypot field + simple IP rate limiting on API route |

---

## Implementation estimate (execution phase)

Large single PR / monorepo drop: scaffold → content → pages → forms → SEO → README. Prefer one cohesive vertical slice (layout + home + contact) early, then remaining pages using shared components.
