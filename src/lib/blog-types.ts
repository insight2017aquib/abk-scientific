export const BLOG_CATEGORIES = [
  "Drug Discovery",
  "RDKit",
  "Scientific Software",
  "Research Automation",
  "AI in Chemistry",
  "Computational Chemistry",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  draft?: boolean;
  /** Public path to the featured image, e.g. "/images/blog/foo.png". */
  image?: string;
  imageAlt?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export function isBlogCategory(value: unknown): value is BlogCategory {
  return typeof value === "string" && (BLOG_CATEGORIES as readonly string[]).includes(value);
}
