export type Project = {
  slug: string;
  title: string;
  category: "Cheminformatics" | "Desktop" | "AI / Automation" | "Research";
  status: "Open source" | "In development" | "Research";
  summary: string;
  // Honest, non-fabricated framing. "value" describes intended value, not measured claims.
  challenge: string;
  approach: string;
  tech: string[];
  value: string;
  /** External or internal links. Omit or leave empty — UI hides the row. */
  links?: { label: string; href: string; external?: boolean }[];
  /** Secondary CTA when no public repo yet */
  walkthroughCta?: boolean;
};

// Real/in-progress projects only. No invented clients, revenue, or benchmarks.
export const projects: Project[] = [
  {
    slug: "chemistry-companion",
    title: "Chemistry Companion",
    category: "Desktop",
    status: "In development",
    summary:
      "A desktop toolkit that brings common cheminformatics operations — structure handling, property calculation, and molecular analysis — into a single, chemist-friendly interface.",
    challenge:
      "Many bench and computational chemists need routine RDKit operations but don't want to write Python for every task. The gap between 'I know what I want chemically' and 'I can script it' slows everyday work.",
    approach:
      "Built a Python application wrapping RDKit behind a clean interface, so structure input, descriptor calculation, and molecular analysis are a few clicks rather than a script. Designed around real medicinal-chemistry workflows rather than a generic feature list.",
    tech: ["Python", "RDKit", "Desktop UI", "Cheminformatics"],
    value:
      "Aims to remove the scripting barrier for routine molecular work, so chemists can self-serve common tasks.",
    links: [{ label: "Product page", href: "/chemistry-companion", external: false }],
    walkthroughCta: true,
  },
  {
    slug: "medchem-figure-designer",
    title: "Medicinal Chemistry Figure Designer",
    category: "Cheminformatics",
    status: "In development",
    summary:
      "A tool for producing clean, consistent molecular figures and SAR-style layouts for reports, papers, and presentations.",
    challenge:
      "Publication- and report-ready molecular figures are fiddly to make consistently. Manual layout in drawing tools is slow and hard to keep uniform across a document.",
    approach:
      "Programmatic figure generation from structures, with consistent styling and layout rules, so a set of molecules renders uniformly without per-figure hand-tuning.",
    tech: ["Python", "RDKit", "Data visualization"],
    value:
      "Intended to cut the time spent formatting molecular figures and keep a consistent visual style across scientific documents.",
    walkthroughCta: true,
  },
  {
    slug: "hawkeye",
    title: "HawkEye",
    category: "AI / Automation",
    status: "In development",
    summary:
      "A workflow-automation project focused on reducing repetitive document and data handling in a research context.",
    challenge:
      "Repetitive triage and reformatting of documents/data consumes time that should go to analysis.",
    approach:
      "Automating the repetitive steps with scripted logic and human checkpoints where correctness matters, keeping the pipeline auditable.",
    tech: ["Python", "Automation", "AI-assisted processing"],
    value:
      "Aims to reclaim time from repetitive handling while keeping a human in the loop for judgment calls.",
    walkthroughCta: true,
  },
  {
    slug: "research-workflows",
    title: "Academic & Research Workflows",
    category: "Research",
    status: "Research",
    summary:
      "Background spanning medicinal chemistry, analytical chemistry, and computational chemistry — the domain grounding behind the software work.",
    challenge:
      "Good scientific software depends on understanding the science it serves. Tools built without domain grounding tend to solve the wrong problem.",
    approach:
      "Formal training in medicinal and analytical chemistry plus hands-on computational work informs every tool: file formats, assay logic, and what a result actually means to a chemist.",
    tech: ["Medicinal Chemistry", "Analytical Chemistry", "Molecular Docking", "Drug Discovery"],
    value:
      "The reason the software fits the science: requirements are understood in chemical terms, not just as software tickets.",
    links: [{ label: "About Aquib", href: "/about", external: false }],
  },
];
