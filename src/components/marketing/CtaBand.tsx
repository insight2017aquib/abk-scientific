import { ButtonLink } from "./Button";
import { site } from "@/content/site";

export function CtaBand({
  title = "Have a scientific workflow worth automating?",
  subtitle = "Tell me the task and the file formats. I'll tell you honestly whether software is the right fix — and if so, what it would take.",
  ctaLabel = site.primaryCta.label,
  ctaHref = site.primaryCta.href,
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-navy-900">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">{subtitle}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <ButtonLink href={ctaHref} variant="primary">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
