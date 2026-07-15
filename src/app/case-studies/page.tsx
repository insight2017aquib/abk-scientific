import Link from "next/link";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { caseStudies } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Methodology-focused case studies in molecular analysis automation, batch cheminformatics, scientific dashboards, and research workflow automation.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="Case studies"
          title="How scientific software engagements look"
          subtitle="Illustrative methodology patterns for biotech and research teams — not named-client testimonials. Each study covers challenge, approach, technology, and intended outcome."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {caseStudies.map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  Methodology pattern
                </p>
                <h2 className="mt-2 text-lg font-semibold text-navy-900">{cs.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{cs.summary}</p>
                <span className="mt-4 text-sm font-semibold text-teal-600">Read case study →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
