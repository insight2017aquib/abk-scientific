import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { MdxContent } from "@/components/blog/MdxContent";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image
      ? {
          url: post.image,
          width: 1536,
          height: 1024,
          alt: post.imageAlt ?? post.title,
        }
      : undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      <Section className="pb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
          {post.category}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{post.description}</p>
        <time dateTime={post.date} className="mt-3 block text-sm text-slate-400">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <article className="mt-10 max-w-3xl">
          {post.image && (
            <Image
              src={post.image}
              alt={post.imageAlt ?? post.title}
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 768px) 48rem, 100vw"
              className="mb-10 h-auto w-full rounded-xl border border-slate-200"
            />
          )}
          <MdxContent source={post.content} />
        </article>
        {related.length > 0 && (
          <div className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Related
            </h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="text-base font-medium text-teal-600 hover:text-teal-500"
                  >
                    {r.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-10">
          <Link href="/blog" className="text-sm font-semibold text-teal-600 hover:text-teal-500">
            ← All articles
          </Link>
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
