# PROJECT-CONTEXT.md — business & decision context

Companion to `AGENTS.md`. That file covers *how the code works*; this file covers
*why the project exists and the decisions behind it* — the context an agent can't
infer from the code alone.

---

## The business

- **Owner:** Aquib Belal Khan — medicinal & analytical chemist (M.Pharm, Jamia Hamdard)
  who builds production software. Works in the overlap of lab science and code.
- **Entity:** currently "**ABK Scientific**" — a boutique / solo scientific-software
  consultancy. (Name is under review; see *Open questions* below.)
- **Offering:** custom scientific software, RDKit/cheminformatics pipelines, and AI
  automation for research workflows.
- **The site's one job:** generate qualified consulting inquiries. It is a lead-gen
  asset, not a portfolio for its own sake. Optimize copy and UX for *credibility with
  skeptical biotech/pharma/academic buyers* and *a clear path to the contact form*.

## Differentiation (the thing to protect in all copy)

The core pitch is **"a medicinal chemist who codes."** Most software agencies don't
understand the science; most scientists don't ship production software. Aquib sits in
the overlap and works with clients directly (no account managers). Any rewrite that
buries the personal-expert angle or makes this read like a generic dev shop is a
regression, even if it sounds slicker.

## Target buyer

Chosen positioning is **mixed/broad**: seed/early biotech, pharma teams, and academic
/research labs. Framing is problem-first: *research problem → scientific capability →
software outcome.*

> ⚠️ Known weakness: "mixed/broad" is the safe default but the **weakest for conversion**
> — biotech buyers self-select on specificity. Sharpening the hero/services into one
> concrete ICP statement (e.g. "RDKit pipelines for seed-stage biotechs without an
> in-house comp-chem hire") is the highest-leverage open improvement. Do not treat the
> current broad copy as final.

---

## Services (the three pillars)

Defined in `src/content/services.ts`:
1. **Scientific Software Development** — purpose-built desktop/web tools for labs.
2. **Cheminformatics Development** — RDKit pipelines: standardization, descriptors,
   fingerprints, filtering, docking prep.
3. **AI Automation for Research Workflows** — automating repetitive glue work with
   human-in-the-loop checkpoints.

## Flagship product

**Chemistry Companion** — a desktop toolkit wrapping routine RDKit operations behind a
chemist-friendly interface. Has its own page. GitHub/download URLs are env placeholders
until the repo/release exist. Distribution is via GitHub Releases, not bundled assets.

---

## Decision log (why things are the way they are)

| Decision | Rationale |
|----------|-----------|
| **Lean v1 scope** (5 pages) | Ship an outreach-ready site fast; more pages = later launch = less selling. Blog/newsletter/detail routes deferred. |
| **Next 16 / Tailwind v4 / React 19** (not the originally-planned Next 15) | Current latest at build time; same architecture, newer baseline. |
| **Dropped shadcn/ui + Framer Motion** | Simpler, smaller, no Tailwind-v4 setup friction. Hand-rolled components + CSS animation give the same look. |
| **Real projects only, zero fabrication** | Explicit client instruction. Skeptical biotech buyers punish fake case studies harder than an absence of them. Projects framed as problem/approach/intended-value. |
| **Content-as-data (`src/content/*.ts`)** | Non-technical owner can edit copy without touching JSX. |
| **Contact form works without email keys** | Site is deployable/testable before Resend is configured; graceful degradation. |
| **In-memory rate limiting kept (best-effort)** | Retained in `src/lib/rate-limit.ts` and used by the contact (5/15min) and newsletter (8/15min) API routes. It's per-instance, so on multi-instance serverless it's not a hard global guarantee — the honeypot + Resend's own limits remain the primary defense. Kept because it's a free burst-spam brake, not because it's authoritative. |

---

## Roadmap (priority order — business value first)

1. **Launch:** confirm green build (done), set `site.url` + public `email`, deploy to
   Vercel, wire Resend, **test the contact form end-to-end**. A working inbox is
   non-negotiable before outreach.
2. **Sharpen positioning** — one concrete ICP line in hero + services (see weakness above).
3. **One real proof asset** — a Chemistry Companion screenshot, a short demo, or one
   honestly-written workflow. Closes the "everything is in-development" credibility gap.
   Higher ROI than the entire phase-2 backlog.
4. **Blog (MDX)** — only if the owner commits to 2–3 genuinely technical posts. SEO +
   authority; dead weight if empty.
5. **Case-study / project detail routes** — once a real engagement exists to describe.
6. **CTA-click analytics** — "Book a Consultation" click is the primary funnel metric;
   page-view analytics alone misses it.

---

## Open questions / not yet decided

- **Company name.** "ABK Scientific" is felt to be vague. Candidates discussed:
  *Scaffold Scientific* (molecular scaffold + code scaffolding — recommended),
  *MolForge*, *Chiral*, *Tanimoto Labs*, *SynthCode*. None finalized. Any pick needs a
  **domain + trademark/company-name conflict check** before adoption. Note the tension:
  a "cooler" agency name can dilute the personal-expert advantage above.
- **Production domain** — not chosen; `site.url` is a placeholder.
- **Public contact email** — not chosen; a domain address reads more credibly than Gmail.
- **Scheduling** — `NEXT_PUBLIC_CAL_URL` empty; contact page falls back to an email CTA.

---

## Placeholders still to replace before launch

In `src/content/site.ts`: `url` (production domain), `email` (public inbox).
Already set: LinkedIn, GitHub. Full env list in `.env.example`.
