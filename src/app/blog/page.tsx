import { Section, SectionHeading } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { BlogCategoryFilter } from "@/components/blog/CategoryFilter";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Notes on RDKit, scientific software, research automation, drug discovery tooling, and AI in chemistry — from a medicinal chemist who builds production tools.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="Blog"
          title="Notes from the chemistry–software boundary"
          subtitle="Practical writing for scientific software buyers and builders. Categories span drug discovery, RDKit, automation, and computational chemistry."
        />
        <div className="mt-10">
          <BlogCategoryFilter posts={posts} />
        </div>
        <div className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-navy-900">Newsletter</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Occasional updates when new articles ship — no weekly noise.
          </p>
          <div className="relative mt-5 max-w-lg">
            <NewsletterForm compact />
          </div>
        </div>
      </Section>
      <CtaBand
        title="Prefer a conversation over an article?"
        subtitle="Book a consultation and bring a concrete workflow."
      />
    </>
  );
}
