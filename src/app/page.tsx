import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { ServicePreviewCard } from "@/components/marketing/FeatureCard";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ButtonLink } from "@/components/marketing/Button";
import { ProductMock } from "@/components/product/ProductMock";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { FeaturedCaseStudyCard } from "@/components/case-studies/FeaturedCaseStudyCard";
import { getFeaturedCaseStudy, listedCaseStudies } from "@/content/case-studies";
import { chemistryCompanion } from "@/content/chemistry-companion";
import { getAllPosts } from "@/lib/blog";
import { personJsonLd, serviceJsonLd } from "@/lib/seo";
import Link from "next/link";

export default function HomePage() {
  const featuredProjects = projects.slice(0, 2);
  const latestPosts = getAllPosts().slice(0, 2);
  const featuredCaseStudy = getFeaturedCaseStudy();

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={serviceJsonLd()} />
      <Hero />
      <TrustBar />

      <Section>
        <SectionHeading
          eyebrow="What I do"
          title="Software that understands the science"
          subtitle="Three focused services. Each starts from a real research problem — not a technology looking for a use."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <ServicePreviewCard
              key={s.slug}
              title={s.title}
              summary={s.summary}
              href={`/services#${s.slug}`}
              icon={s.icon}
            />
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/services" variant="secondary">
            View all services
          </ButtonLink>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
              Flagship tool
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              {chemistryCompanion.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {chemistryCompanion.tagline} A desktop toolkit that puts routine RDKit operations
              behind a chemist-friendly interface.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/chemistry-companion" variant="primary">
                Explore the tool
              </ButtonLink>
            </div>
          </div>
          <ProductMock id="workspace" />
        </div>
      </Section>

      <Section id="projects">
        <SectionHeading
          eyebrow="Selected work"
          title="Real projects, honestly described"
          subtitle="Tools built or in progress — no invented clients or metrics."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/projects" variant="secondary">
            View all projects
          </ButtonLink>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Case studies"
          title="How engagements are structured"
          subtitle="Methodology patterns for biotech and research teams — challenge, approach, technology, outcome."
        />
        {featuredCaseStudy && (
          <FeaturedCaseStudyCard study={featuredCaseStudy} className="mt-10" />
        )}
        <ul className={`grid gap-4 sm:grid-cols-2 ${featuredCaseStudy ? "mt-4" : "mt-10"}`}>
          {listedCaseStudies().map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                <h3 className="font-semibold text-navy-900">{cs.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{cs.summary}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-teal-600">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {latestPosts.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Blog"
            title="Recent notes"
            subtitle="RDKit, scientific software, and research automation."
          />
          <ul className="mt-10 space-y-4">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-xl border border-slate-200 p-5 hover:border-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                    {post.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-navy-900">{post.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/blog" variant="secondary">
              View all articles
            </ButtonLink>
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
