import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
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

  const blocks = [
    { label: "Challenge", body: cs.challenge },
    { label: "Approach", body: cs.approach },
    { label: "Outcome", body: cs.outcome },
  ];

  return (
    <>
      <Section className="pb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Case study</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
          {cs.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{cs.summary}</p>
        <p className="mt-3 max-w-2xl text-sm italic text-slate-500">{cs.framing}</p>

        <div className="mt-12 space-y-10">
          {blocks.map((b) => (
            <div key={b.label}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                {b.label}
              </h2>
              <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-700">{b.body}</p>
            </div>
          ))}
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
      />
    </>
  );
}
