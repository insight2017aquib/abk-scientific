/** A titled block on the detail page. Use `sections` when the default
 *  Challenge/Approach/Outcome shape doesn't fit the study. */
export type CaseStudySection = {
  label: string;
  body: string;
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  /** Methodology / pattern framing — not a named client claim */
  framing: string;
  technology: string[];
  /** Default detail-page blocks. Omit when `sections` is supplied instead. */
  challenge?: string;
  approach?: string;
  outcome?: string;
  /** Surfaces the study as the lead card on home, projects, and case studies. */
  featured?: boolean;
  /** Short claim pill shown on the card and above the detail title. */
  badge?: string;
  video?: { youtubeId: string; title: string; caption?: string };
  /** When present, replaces the default Challenge/Approach/Outcome blocks. */
  sections?: CaseStudySection[];
  /** Overrides the closing CtaBand copy for this study. */
  cta?: { label: string; href: string };
};

/**
 * Illustrative engagement patterns for biotech / research buyers.
 * No fabricated client names, revenue, or testimonials.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "docking-workflow-validation",
    title: "Docking Workflow Validation",
    featured: true,
    badge: "Validated Against Published Data",
    summary:
      "A molecular docking workflow validated the only way that counts — by reproducing a binding pose that was already experimentally determined, before it is trusted on anything new.",
    framing:
      "Methodology walkthrough for teams whose docking results have to survive scrutiny.",
    technology: [
      "Python",
      "RDKit",
      "Molecular docking",
      "Receptor & ligand prep",
      "Redocking / RMSD validation",
    ],
    video: {
      youtubeId: "qsmhmpY74Vc",
      title: "Validated Molecular Docking Workflow for Drug Discovery",
      caption: "The validated docking workflow, demonstrated end to end.",
    },
    cta: {
      label: "Discuss a Docking Project",
      href: "/contact?topic=Docking%20Workflow%20Validation",
    },
    sections: [
      {
        label: "Objective",
        body: "A docking setup that has never reproduced a known answer cannot be trusted on an unknown one. Before a docking result is allowed to inform a decision — prioritizing a series, triaging a virtual library, justifying a synthesis — the workflow itself has to be shown to work on a case where the answer is already established. The objective was a docking workflow whose correctness is demonstrated rather than assumed, and a demonstration the inheriting team can repeat themselves.",
      },
      {
        label: "Methodology",
        body: "The workflow is built as explicit, inspectable stages rather than one opaque script. Each stage has defined inputs, defined outputs, and its own failure mode — so a bad result can be traced back to the step that produced it instead of being discovered three decisions later.",
        bullets: [
          "Receptor preparation — clean the structure, resolve the binding site, and settle the protonation and tautomer choices that quietly change the outcome.",
          "Ligand preparation — standardize structures, assign protonation at the working pH, and generate sensible starting conformers.",
          "Search-space definition — place and size the docking box against the known site rather than by eye, and record it so the run can be reproduced.",
          "Docking and scoring — run the engine with recorded parameters, keeping the pose ensemble and scores rather than only the top hit.",
          "Inspection — look at the poses. A good score on an implausible pose is a failure, not a result.",
        ],
      },
      {
        label: "Validation Process",
        body: "Validation here means redocking. Take a ligand whose binding pose has already been determined experimentally and published, remove it from the structure, and ask the workflow to find it again from scratch. Because the crystallographic pose is known, the prediction can be measured against the experimental answer directly: RMSD between the predicted and observed pose is the acceptance criterion, and the threshold is agreed before the run rather than chosen afterwards to flatter the result. A workflow that cannot recover a published pose does not get pointed at novel compounds — it gets fixed first. The walkthrough below runs this process end to end.",
      },
      {
        label: "Results",
        body: "Intended result: a docking setup the team can defend. The deliverable is the validated workflow itself — documented stages, recorded parameters, a stated acceptance criterion, and an explicit note of where the method's assumptions stop holding. Because parameters are recorded rather than remembered, the run reproduces on another machine and a colleague can re-run it without reconstructing the reasoning first. Where validation shows the method is unreliable for a given target, that is reported as the finding rather than smoothed over.",
      },
    ],
  },
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

/** The study promoted as the lead card on home, projects, and case studies. */
export function getFeaturedCaseStudy(): CaseStudy | undefined {
  return caseStudies.find((c) => c.featured);
}

/** Studies shown in the standard listing grids — the featured one leads separately. */
export function listedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => !c.featured);
}

/** Detail-page blocks: explicit `sections` when given, else the default three. */
export function caseStudySections(cs: CaseStudy): CaseStudySection[] {
  if (cs.sections?.length) return cs.sections;
  return [
    { label: "Challenge", body: cs.challenge },
    { label: "Approach", body: cs.approach },
    { label: "Outcome", body: cs.outcome },
  ].filter((b): b is CaseStudySection => Boolean(b.body));
}
