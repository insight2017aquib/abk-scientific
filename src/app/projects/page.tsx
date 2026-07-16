import { Section, SectionHeading } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { FeaturedCaseStudyCard } from "@/components/case-studies/FeaturedCaseStudyCard";
import { projects } from "@/content/projects";
import { getFeaturedCaseStudy } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected scientific software and cheminformatics projects by Aquib Belal Khan — Chemistry Companion, figure tools, automation, and research workflows. Honestly described, no invented metrics.",
  path: "/projects",
});

export default function ProjectsPage() {
  const featuredCaseStudy = getFeaturedCaseStudy();

  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle="Tools built or in progress. Filter by category. No fabricated clients or benchmarks — challenge, approach, and intended value only."
        />

        {featuredCaseStudy && (
          <div className="mt-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-600">
              Featured walkthrough
            </p>
            <FeaturedCaseStudyCard study={featuredCaseStudy} />
          </div>
        )}

        <div className="mt-10">
          <ProjectFilter projects={projects} />
        </div>
      </Section>
      <CtaBand
        title="Want something like this for your lab?"
        subtitle="Describe the workflow and formats. I'll tell you whether a custom tool is the right investment."
      />
    </>
  );
}
