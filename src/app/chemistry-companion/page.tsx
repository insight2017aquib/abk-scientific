import { Section, SectionHeading } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ButtonLink } from "@/components/marketing/Button";
import { JsonLd } from "@/components/JsonLd";
import { ProductMock } from "@/components/product/ProductMock";
import { WorkflowDiagram } from "@/components/product/WorkflowDiagram";
import { InstallSteps } from "@/components/product/InstallSteps";
import { ArchitectureGrid } from "@/components/product/ArchitectureGrid";
import { chemistryCompanion as cc } from "@/content/chemistry-companion";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Chemistry Companion",
  description:
    "Chemistry Companion — a desktop cheminformatics toolkit that brings RDKit structure handling, property calculation, and molecular analysis into a chemist-friendly interface.",
  path: "/chemistry-companion",
});

function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: cc.name,
    applicationCategory: "ScienceApplication",
    operatingSystem: "Windows",
    description: cc.overview,
    author: { "@type": "Person", name: site.name },
  };
}

export default function ChemistryCompanionPage() {
  const hasDownload = Boolean(cc.downloadUrl);
  const hasGithub = Boolean(cc.githubUrl);

  return (
    <>
      <JsonLd data={softwareJsonLd()} />

      <Section className="pb-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
              Flagship tool
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {cc.name}
            </h1>
            <p className="mt-4 text-xl text-slate-600">{cc.tagline}</p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{cc.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {hasDownload ? (
                <ButtonLink href="/api/download?asset=chemistry-companion-win" variant="primary">
                  Download for Windows
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact" variant="primary">
                  Request access
                </ButtonLink>
              )}
              {hasGithub && (
                <ButtonLink href={cc.githubUrl} variant="secondary">
                  View on GitHub
                </ButtonLink>
              )}
            </div>
            <p className="mt-4 text-xs text-slate-500">{cc.distributionNote}</p>
          </div>
          <ProductMock id="workspace" />
        </div>
      </Section>

      <Section className="bg-slate-50 py-16">
        <SectionHeading
          eyebrow="Interface"
          title="What it looks like"
          subtitle="Illustrative UI mocks until production screenshots ship. Drop real captures into public/images/chemistry-companion/ when ready."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cc.screenshots.map((shot) => (
            <div key={shot.id}>
              <ProductMock id={shot.id as "workspace" | "properties" | "batch"} />
              <p className="mt-3 text-sm font-semibold text-navy-900">{shot.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{shot.caption}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Capabilities" title="What it does" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {cc.features.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-navy-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Workflow"
          title="From structure to export"
          subtitle="A simple path designed around how chemists triage molecules day to day."
        />
        <div className="mt-10">
          <WorkflowDiagram steps={cc.workflowSteps} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Get started" title="Installation" />
            <div className="mt-8">
              <InstallSteps steps={cc.installSteps} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Design" title="Technical architecture" />
            <div className="mt-8">
              <ArchitectureGrid items={cc.architecture} />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for people who think in molecules"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cc.useCases.map((u) => (
            <div key={u.audience} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="font-semibold text-navy-900">{u.audience}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{u.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Need custom scientific software?"
        subtitle="Chemistry Companion started as a way to remove friction from everyday cheminformatics. If your team has a similar friction point, let's talk."
      />
    </>
  );
}
