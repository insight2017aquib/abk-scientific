import Image from "next/image";
import { site } from "@/content/site";
import { ButtonLink } from "./Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--navy-900) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            {site.role}
          </p>
          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-navy-900 sm:text-5xl md:text-[3.25rem]">
            RDKit Pipelines and Custom Scientific Software for{" "}
            <span className="text-teal-600">Early-Stage Biotech</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            I&apos;m a medicinal chemist who ships production software. I help seed and early-stage
            biotech teams build cheminformatics pipelines and automate research workflows — without
            hiring a full-time computational-chemistry engineer.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={site.primaryCta.href} variant="primary">
              {site.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={site.secondaryCta.href} variant="secondary">
              {site.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            RDKit · Python · FastAPI · Streamlit · Molecular docking · Drug discovery
          </p>
        </div>
        <div className="hidden justify-self-center animate-fade-up lg:block">
          <Image
            src="/logo/logo-circular.png"
            alt="ABK Scientific — flask, molecular structure and code emblem"
            width={1181}
            height={1181}
            priority
            className="h-auto w-full max-w-md"
          />
        </div>
      </div>
      </div>
    </section>
  );
}
