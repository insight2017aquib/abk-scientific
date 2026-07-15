import { site } from "@/content/site";
import { heroCredentials } from "@/content/trust";
import { ButtonLink } from "./Button";
import { ProductMock } from "@/components/product/ProductMock";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Single, understated dot-grid texture — no gradients, no motion. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--navy-900) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy — the primary focal point */}
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              {site.role}
            </p>
            <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.07] tracking-tight text-navy-900 sm:text-5xl md:text-[3.5rem]">
              RDKit Pipelines and Custom Scientific Software for{" "}
              <span className="text-teal-600">Early-Stage Biotech</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              I&apos;m a medicinal chemist who ships production software. I help seed and early-stage
              biotech teams build cheminformatics pipelines and automate research workflows — without
              hiring a full-time computational-chemistry engineer.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={site.primaryCta.href} variant="primary" size="lg">
                {site.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={site.secondaryCta.href} variant="secondary" size="lg">
                {site.secondaryCta.label}
              </ButtonLink>
            </div>
            {/* Subtle credential-style trust indicators below the CTA */}
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-slate-100 pt-6 text-sm text-slate-500">
              {heroCredentials.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-teal-500/70" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Supporting product visual — illustrative Chemistry Companion mock */}
          <div className="relative animate-fade-up">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-teal-500/[0.06] blur-2xl"
            />
            <div className="rounded-xl shadow-xl ring-1 ring-navy-900/5">
              <ProductMock id="workspace" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
