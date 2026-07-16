import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { DockingPoster } from "./DockingPoster";
import { cn } from "@/lib/utils";

/** Lead card for a featured case study — reused on home, projects, and case studies. */
export function FeaturedCaseStudyCard({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:p-6 md:grid-cols-2 md:items-center md:gap-8",
        className
      )}
    >
      <DockingPoster />

      <div>
        {study.badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
              <path
                fillRule="evenodd"
                d="M10 1.5l2.6 1.6 3-.3 1 2.9 2.4 1.8-1.4 2.7.5 3-2.9.9-1.8 2.4-2.8-1.1-2.8 1.1-1.8-2.4-2.9-.9.5-3L2.2 7.5l2.4-1.8 1-2.9 3 .3L10 1.5zm3.7 6.3a.9.9 0 00-1.3-1.2l-3.4 3.5-1.4-1.4a.9.9 0 10-1.3 1.2l2 2.1c.4.4 1 .4 1.3 0l4.1-4.2z"
                clipRule="evenodd"
              />
            </svg>
            {study.badge}
          </span>
        )}
        <h3 className="mt-3 text-xl font-semibold text-navy-900 sm:text-2xl">
          {study.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{study.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 group-hover:text-teal-500">
          Watch the walkthrough
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
