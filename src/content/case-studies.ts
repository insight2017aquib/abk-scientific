export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  /** Methodology / pattern framing — not a named client claim */
  framing: string;
  challenge: string;
  approach: string;
  technology: string[];
  outcome: string;
};

/**
 * Illustrative engagement patterns for biotech / research buyers.
 * No fabricated client names, revenue, or testimonials.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "automating-molecular-analysis",
    title: "Automating molecular analysis workflows",
    summary:
      "Replace ad-hoc notebook scripts with a reproducible path from structure input to property tables and export.",
    framing:
      "Engagement pattern for discovery teams drowning in one-off RDKit scripts.",
    challenge:
      "Medicinal and computational chemists re-ran the same property and triage steps in personal notebooks. Results were hard to reproduce, and new hires could not run the same checks without tribal knowledge.",
    approach:
      "Captured the repeated analysis steps as a versioned pipeline: standardize structures, compute an agreed descriptor set, filter by project rules, and export consistent tables. Optional thin UI for non-scripters; full script retained for power users.",
    technology: ["Python", "RDKit", "FastAPI or CLI", "CSV/SDF export"],
    outcome:
      "Intended result: one documented workflow the team can re-run, hand over, and extend — without inventing a new process for every library dump.",
  },
  {
    slug: "batch-cheminformatics-processing",
    title: "Batch cheminformatics processing",
    summary:
      "Scale structure standardization and descriptor calculation from dozens of molecules to thousands, unattended.",
    framing:
      "Engagement pattern for compound libraries and virtual screening prep.",
    challenge:
      "Libraries arrived as mixed SMILES and file formats. Manual cleaning and descriptor calculation did not scale, and errors only showed up downstream in docking or ML prep.",
    approach:
      "Built a batch pipeline with clear stages (ingest → standardize → compute → validate → export), logging for failures, and a short validation note describing assumptions and limits.",
    technology: ["Python", "RDKit", "Batch CLI", "Structure files (SDF/SMILES)"],
    outcome:
      "Intended result: overnight runs on large sets with auditable logs, instead of multi-day manual cleanup.",
  },
  {
    slug: "scientific-dashboard-development",
    title: "Scientific dashboard development",
    summary:
      "Turn internal research data into a focused dashboard scientists will actually use — not a generic BI clone.",
    framing:
      "Engagement pattern for labs with instrument or assay outputs trapped in files.",
    challenge:
      "Key results lived in spreadsheets and instrument exports. Leadership and bench scientists needed shared views, but commercial dashboards did not understand the assay or chemistry context.",
    approach:
      "Scoped the minimum views that change decisions (status, outliers, trends). Built a FastAPI + Streamlit or web front end with import paths for existing formats, with domain labels written for chemists.",
    technology: ["Python", "FastAPI", "Streamlit or React", "Lab file formats"],
    outcome:
      "Intended result: a living internal tool owned by the science team, with source code and docs they can maintain.",
  },
  {
    slug: "research-workflow-automation",
    title: "Research workflow automation",
    summary:
      "Automate repetitive glue work between tools, documents, and reports — with human checkpoints where judgment matters.",
    framing:
      "Engagement pattern for teams losing hours to reformatting and triage.",
    challenge:
      "Scientists spent disproportionate time moving data between systems, renaming files, and assembling status reports. Automation demos often ignored auditability and failure modes.",
    approach:
      "Short audit of which tasks pay for automation. Scripted the highest-friction steps with logging, explicit inputs/outputs, and human-in-the-loop gates for anything that affects scientific decisions.",
    technology: ["Python", "Automation scripts", "Optional LLM-assisted steps", "Logging"],
    outcome:
      "Intended result: measurable time back on a specific workflow, without black-box AI where correctness cannot be checked.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
