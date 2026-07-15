"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/marketing/ProjectCard";

const ALL = "All" as const;

type Filter = typeof ALL | Project["category"];

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return [ALL, ...Array.from(set)] as Filter[];
  }, [projects]);

  const [active, setActive] = useState<Filter>(ALL);

  const filtered = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {categories.map((cat) => {
          const selected = active === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(cat)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
                selected
                  ? "bg-navy-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-slate-500" aria-live="polite">
        Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
        {active !== ALL ? ` in ${active}` : ""}.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
