import Link from "next/link";
import { iconMap } from "./Icons";

export function ServicePreviewCard({
  title,
  summary,
  href,
  icon,
}: {
  title: string;
  summary: string;
  href: string;
  icon: keyof typeof iconMap;
}) {
  const Icon = iconMap[icon];
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-teal-500/50 hover:shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-600">
        Learn more
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
