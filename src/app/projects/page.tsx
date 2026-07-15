import { Section, SectionHeading } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected scientific software and cheminformatics projects by Aquib Belal Khan — Chemistry Companion, figure tools, automation, and research workflows. Honestly described, no invented metrics.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle="Tools built or in progress. Filter by category. No fabricated clients or benchmarks — challenge, approach, and intended value only."
        />
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
