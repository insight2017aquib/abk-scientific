import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { VideoEmbed } from "@/components/case-studies/VideoEmbed";
import { DockingPoster } from "@/components/case-studies/DockingPoster";
import { Screenshot } from "@/components/product/Screenshot";
import { caseStudies, caseStudySections, getCaseStudy } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return pageMetadata({
    title: cs.title,
    description: cs.summary,
    path: `/case-studies/${cs.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const blocks = caseStudySections(cs);

  return (
    <>
      <Section className="pb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Case study</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
          {cs.title}
        </h1>
        {cs.badge && (
          <p className="mt-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 ring-1 ring-inset ring-teal-200">
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M10 1.5l2.6 1.6 3-.3 1 2.9 2.4 1.8-1.4 2.7.5 3-2.9.9-1.8 2.4-2.8-1.1-2.8 1.1-1.8-2.4-2.9-.9.5-3L2.2 7.5l2.4-1.8 1-2.9 3 .3L10 1.5zm3.7 6.3a.9.9 0 00-1.3-1.2l-3.4 3.5-1.4-1.4a.9.9 0 10-1.3 1.2l2 2.1c.4.4 1 .4 1.3 0l4.1-4.2z"
                  clipRule="evenodd"
                />
              </svg>
              {cs.badge}
            </span>
          </p>
        )}
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{cs.summary}</p>
        <p className="mt-3 max-w-2xl text-sm italic text-slate-500">{cs.framing}</p>

        {cs.screenshot && (
          <div className="mt-10 max-w-3xl">
            <Screenshot
              id={cs.screenshot.id}
              alt={cs.screenshot.alt}
              priority
              className="shadow-lg ring-1 ring-navy-900/5"
              fallback={<DockingPoster />}
            />
          </div>
        )}

        {cs.metrics && (
          <dl className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {cs.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {m.label}
                </dt>
                <dd className="mt-1.5 text-2xl font-bold tracking-tight text-navy-900">
                  {m.value}
                </dd>
                {m.note && (
                  <dd className="mt-1.5 text-xs leading-relaxed text-slate-500">{m.note}</dd>
                )}
              </div>
            ))}
          </dl>
        )}

        <div className="mt-12 space-y-10">
          {blocks.map((b) => (
            <div key={b.label}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                {b.label}
              </h2>
              {b.body.split("\n\n").map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="mt-2 max-w-3xl text-base leading-relaxed text-slate-700"
                >
                  {para}
                </p>
              ))}
              {b.bullets && (
                <ul className="mt-4 max-w-3xl space-y-2.5 border-l-2 border-slate-100 pl-5">
                  {b.bullets.map((item) => (
                    <li key={item} className="text-base leading-relaxed text-slate-600">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {cs.disclaimer && (
            <aside className="max-w-3xl rounded-xl border border-amber-200 bg-amber-50/60 p-6">
              <h2 className="text-base font-semibold text-navy-900">{cs.disclaimer.title}</h2>
              {cs.disclaimer.body.split("\n\n").map((para) => (
                <p key={para.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-slate-700">
                  {para}
                </p>
              ))}
              {cs.disclaimer.reference && (
                <p className="mt-4 border-t border-amber-200 pt-4 text-xs leading-relaxed text-slate-600">
                  <a
                    href={cs.disclaimer.reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-600"
                  >
                    {cs.disclaimer.reference.text}
                  </a>
                </p>
              )}
            </aside>
          )}

          {cs.video && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Video Demonstration
              </h2>
              <VideoEmbed
                className="mt-4 max-w-3xl"
                youtubeId={cs.video.youtubeId}
                title={cs.video.title}
                caption={cs.video.caption}
              />
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Technology
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cs.technology.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12">
          <Link href="/case-studies" className="text-sm font-semibold text-teal-600 hover:text-teal-500">
            ← All case studies
          </Link>
        </p>
      </Section>
      <CtaBand
        title="Working through a similar challenge?"
        subtitle="Tell me about the workflow. I'll map it to a realistic software approach — or say if you should not build yet."
        ctaLabel={cs.cta?.label}
        ctaHref={cs.cta?.href}
      />
    </>
  );
}
