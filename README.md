# ABK Scientific — consulting website

Lead-generation site for **Aquib Belal Khan**, boutique scientific software consultancy
(medicinal chemistry + cheminformatics + AI automation).

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Requires **Node.js 20.9+**. Production:

```bash
npm run build
npm run start
```

Tests / CI:

```bash
npm test
npm run lint
```

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home |
| `/services` | Consulting services |
| `/chemistry-companion` | Flagship product |
| `/projects` | Filterable project portfolio |
| `/case-studies` | Methodology case studies |
| `/blog` | File-based articles (`content/blog/*.mdx`) |
| `/about` | Professional bio |
| `/contact` | Inquiry form + scheduling |

---

## Content (no JSX hunting)

- `src/content/site.ts` — brand, nav, socials, CTAs  
- `src/content/services.ts` — services + timelines  
- `src/content/projects.ts` — projects  
- `src/content/case-studies.ts` — case studies  
- `src/content/chemistry-companion.ts` — product page  
- `content/blog/*.mdx` — blog posts (frontmatter: title, description, date, category)

---

## Env checklist

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email |
| `NEXT_PUBLIC_LINKEDIN_URL` | `https://www.linkedin.com/in/aquib-belal-khan-33631914b` |
| `NEXT_PUBLIC_GITHUB_URL` | `https://github.com/insight2017aquib` |
| `NEXT_PUBLIC_CAL_URL` | Scheduling link |
| `NEXT_PUBLIC_CC_GITHUB_URL` / `CC_DOWNLOAD_URL` | Chemistry Companion |
| `RESEND_API_KEY` + `CONTACT_INBOX` + `CONTACT_FROM` | Contact email |
| `RESEND_AUDIENCE_ID` | Newsletter (optional) |

Without Resend keys, contact and newsletter log to the server console and still return success in the UI.

---

## APIs

- `POST /api/contact` — inquiry (Zod, honeypot, rate limit, Resend)  
- `POST /api/newsletter` — signup (honeypot, rate limit, Resend audience or log)  
- `GET /api/download?asset=chemistry-companion-win` — track + 302 to Releases  

---

## Deploy (Vercel)

1. Push to GitHub  
2. Import on Vercel  
3. Set env vars  
4. Custom domain  
5. Optional: Resend domain + audience  

GitHub Actions CI: lint, test, build (`.github/workflows/ci.yml`).

---

## Docs

- `dev_docs/implementation.md` — original architecture plan  
- `dev_docs/remediation-plan.md` — Waves A–C (all implemented)  

## Notes

- No fabricated clients, revenue, or testimonials  
- Blog is file-based MDX/Markdown (upgrade to headless CMS later if needed)  
- OG images generated via `opengraph-image.tsx`  
