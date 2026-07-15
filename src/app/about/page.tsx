import { Section, SectionHeading } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { capabilities } from "@/content/trust";
import { isPresentUrl, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Aquib Belal Khan — medicinal and analytical chemist turned scientific software developer. Background in drug discovery, computational chemistry, RDKit, and research automation.",
  path: "/about",
});

const bio = [
  "I'm a medicinal chemist who builds software. My training is in medicinal and analytical chemistry (M.Pharm, Jamia Hamdard), and my work sits where laboratory science meets code.",
  "That path — medicinal chemistry into drug discovery, then into computational chemistry, cheminformatics, and scientific software — is deliberate. It means I read a research problem in its own terms before I reach for a technical solution. When a team describes an assay, a compound library, or a file format, I don't need it translated.",
  "Most software agencies don't understand the science; most scientists don't ship production software. I work in the overlap: RDKit pipelines, molecular analysis tools, FastAPI back ends, Streamlit and desktop front ends, and automation that removes repetitive glue work from research days.",
  "I run this as a boutique consultancy, which means you work directly with the person building the tool. No account managers, no telephone game between your chemistry and the code.",
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="About"
          title="Chemistry first. Code in service of it."
        />
        <div className="mt-8 max-w-2xl space-y-5">
          {bio.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-slate-700">{p}</p>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50 py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Domain</h2>
            <ul className="mt-4 space-y-2 text-base text-slate-700">
              <li>Medicinal chemistry &amp; drug discovery</li>
              <li>Analytical chemistry</li>
              <li>Computational chemistry &amp; molecular docking</li>
              <li>Cheminformatics (RDKit)</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Technical</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <li key={c} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {(isPresentUrl(site.socials.linkedin) || isPresentUrl(site.socials.github)) && (
          <div className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Connect</h2>
            <ul className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
              {isPresentUrl(site.socials.linkedin) && (
                <li>
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-500"
                  >
                    LinkedIn →
                  </a>
                </li>
              )}
              {isPresentUrl(site.socials.github) && (
                <li>
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-500"
                  >
                    GitHub →
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </Section>

      <CtaBand
        title="Working on something at the chemistry–software boundary?"
        subtitle="That's exactly where I'm most useful. Tell me what you're trying to do."
      />
    </>
  );
}
