import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  type BlogPost,
  type BlogPostMeta,
  isBlogCategory,
} from "@/lib/blog-types";

export type { BlogCategory, BlogPost, BlogPostMeta } from "@/lib/blog-types";
export { BLOG_CATEGORIES } from "@/lib/blog-types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.description || !data.date || !isBlogCategory(data.category)) {
    return null;
  }

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    category: data.category,
    draft: Boolean(data.draft),
    ...(data.image ? { image: String(data.image) } : {}),
    ...(data.imageAlt ? { imageAlt: String(data.imageAlt) } : {}),
    content,
  };
}

export function getAllPosts(opts?: { includeDrafts?: boolean }): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => opts?.includeDrafts || !p.draft)
    .map(({ content, ...meta }) => {
      void content;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
