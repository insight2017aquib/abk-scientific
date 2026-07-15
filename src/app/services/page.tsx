import { Section, SectionHeading } from "@/components/marketing/Section";
import { ServiceBlock } from "@/components/marketing/ServiceBlock";
import { CtaBand } from "@/components/marketing/CtaBand";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Scientific software development, cheminformatics pipelines, and AI automation for drug-discovery and research teams. Problem-first consulting from a medicinal chemist who codes.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="Services"
          title="Consulting that starts with your problem"
          subtitle="I don't sell a fixed product. I look at a specific research workflow, decide honestly whether software is the right fix, and build only what earns its keep."
        />
      </Section>
      <Section className="pt-0">
        <div>
          {services.map((s, i) => (
            <ServiceBlock key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
