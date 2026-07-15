"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-types";
import { BLOG_CATEGORIES } from "@/lib/blog-types";

const ALL = "All";

export function BlogCategoryFilter({ posts }: { posts: BlogPostMeta[] }) {
  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () => (active === ALL ? posts : posts.filter((p) => p.category === active)),
    [active, posts]
  );

  const categories = [ALL, ...BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c))];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by category">
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
      <ul className="mt-10 space-y-6">
        {filtered.map((post) => (
          <li key={post.slug}>
            <article className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-sm">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-teal-600">
                <span>{post.category}</span>
                <time dateTime={post.date} className="font-medium normal-case tracking-normal text-slate-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-navy-900">
                <Link href={`/blog/${post.slug}`} className="hover:text-teal-600">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-teal-600 hover:text-teal-500"
              >
                Read article →
              </Link>
            </article>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-slate-500">No posts in this category yet.</p>
      )}
    </div>
  );
}
