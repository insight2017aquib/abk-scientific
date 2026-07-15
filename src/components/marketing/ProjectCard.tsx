import Link from "next/link";
import type { Project } from "@/content/projects";

const statusColor: Record<Project["status"], string> = {
  "Open source": "bg-teal-50 text-teal-700",
  "In development": "bg-amber-50 text-amber-700",
  Research: "bg-slate-100 text-slate-600",
};

export function ProjectCard({ project }: { project: Project }) {
  const links = project.links?.filter((l) => Boolean(l.href?.trim())) ?? [];
  const showLinks = links.length > 0 || project.walkthroughCta;

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
          {project.category}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[project.status]}`}
        >
          {project.status}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-navy-900">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.summary}</p>

      <dl className="mt-5 flex-1 space-y-3 border-t border-slate-100 pt-5 text-sm">
        <div>
          <dt className="font-semibold text-navy-900">Challenge</dt>
          <dd className="mt-1 text-slate-600">{project.challenge}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy-900">Approach</dt>
          <dd className="mt-1 text-slate-600">{project.approach}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy-900">Intended value</dt>
          <dd className="mt-1 text-slate-600">{project.value}</dd>
        </div>
      </dl>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            {t}
          </li>
        ))}
      </ul>

      {showLinks && (
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4">
          {links.map((l) =>
            l.external === false || l.href.startsWith("/") ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-teal-600 hover:text-teal-500"
              >
                {l.label} →
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-teal-600 hover:text-teal-500"
              >
                {l.label} →
              </a>
            )
          )}
          {project.walkthroughCta && (
            <Link
              href={`/contact?topic=${encodeURIComponent(project.title)}`}
              className="text-sm font-semibold text-navy-900 hover:text-teal-600"
            >
              Request a walkthrough →
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
