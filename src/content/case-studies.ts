import type { ShotId } from "@/lib/screenshots";

/** A titled block on the detail page. Use `sections` when the default
 *  Challenge/Approach/Outcome shape doesn't fit the study. */
export type CaseStudySection = {
  label: string;
  body: string;
  bullets?: string[];
};

/** A measured result. Only ever populated from a run we can point at. */
export type CaseStudyMetric = {
  label: string;
  value: string;
  note?: string;
};

/** Scope limits on the evidence above — what it does and does not establish. */
export type CaseStudyDisclaimer = {
  title: string;
  body: string;
  reference?: { text: string; href: string };
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
  /** Measured results from an actual run. Never estimates. */
  metrics?: CaseStudyMetric[];
  /** What the metrics do not prove. Shown directly beneath them. */
  disclaimer?: CaseStudyDisclaimer;
  /** Real capture of the run, from public/images/chemistry-companion/. */
  screenshot?: { id: ShotId; alt: string };
  /** Overrides the closing CtaBand copy for this study. */
  cta?: { label: string; href: string };
};

/**
 * The docking study reports a real, measured run. The rest are engagement
 * patterns. No fabricated client names, revenue, or testimonials anywhere.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "docking-workflow-validation",
    title: "Docking Workflow Validation",
    featured: true,
    badge: "Validated Against Published Data",
    summary:
      "AutoDock Vina reproduced the crystallographic pose of estradiol in estrogen receptor α to 0.633 Å RMSD. The protocol recovers a known binding mode before it is trusted on an unknown one.",
    framing:
      "Methodology walkthrough for teams whose docking results have to survive scrutiny.",
    technology: [
      "Python",
      "RDKit",
      "AutoDock Vina",
      "Receptor & ligand prep",
      "Redocking / RMSD validation",
      "Mol* / ChimeraX",
    ],
    screenshot: {
      id: "docking-validation",
      alt: "Chemistry Companion protocol validation panel: redocking of EST passed with 0.633 Å RMSD and best affinity −10.842 kcal/mol.",
    },
    metrics: [
      {
        label: "Redock RMSD",
        value: "0.633 Å",
        note: "MCS-exact, symmetry-corrected. Pass < 2.0 Å, acceptable < 3.0 Å — threshold set before the run.",
      },
      {
        label: "Best affinity",
        value: "−10.842 kcal/mol",
        note: "Top-scoring pose of the redocked reference ligand.",
      },
      {
        label: "Docking engine",
        value: "AutoDock Vina",
        note: "Vina scoring function at exhaustiveness 16.",
      },
      {
        label: "Reference ligand",
        value: "EST — 17β-estradiol",
        note: "Native co-crystallized ligand, chain A, residue 600.",
      },
    ],
    disclaimer: {
      title: "What this validates — and what it does not",
      body: "Redocking the native ligand tests the protocol, not the chemistry that comes after it. Reproducing the crystallographic pose to 0.633 Å shows that receptor preparation, grid placement, and the scoring pipeline recover a binding mode that was already known. It does not show that the same protocol will rank an unseen ligand series correctly. Those are two different claims, and treating the first as evidence for the second is how docking gets oversold.\n\nThat distinction has teeth on this target. Xue et al. compared AutoDock, AutoDock Vina, and Surflex-Dock across 22 weakly binding flavonoids against ERα and found that Vina and AutoDock overweight hydrogen bonding for that chemotype — producing incorrect binding modes — while Surflex-Dock balanced hydrogen-bond and hydrophobic terms more reliably. So for flavonoid-like series against ERα, a clean Vina redock is necessary but not sufficient: Vina's affinity ranking should be treated as unreliable for that chemotype and cross-checked against a program that handles it better. A validation run tells you which of those two situations you are in — which is the entire point of running one.",
      reference: {
        text: "Xue Q, Liu X, Russell P, Li J, Pan W, Fu J, Zhang A. Evaluation of the binding performance of flavonoids to estrogen receptor alpha by Autodock, Autodock Vina and Surflex-Dock. Ecotoxicol Environ Saf. 2022;233:113323.",
        href: "https://doi.org/10.1016/j.ecoenv.2022.113323",
      },
    },
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
        body: "A docking setup that has never reproduced a known answer cannot be trusted on an unknown one. Before a docking result informs a decision — prioritizing a series, triaging a virtual library, justifying a synthesis — the workflow itself has to be shown to work on a case where the answer is already established. The objective was a docking protocol against estrogen receptor α whose correctness is demonstrated rather than assumed, and a demonstration the inheriting team can repeat without me.",
      },
      {
        label: "Methodology",
        body: "The workflow runs as explicit, inspectable stages rather than one opaque script. Each stage has defined inputs, defined outputs, and its own failure mode — so a bad result traces back to the step that produced it instead of surfacing three decisions later.",
        bullets: [
          "Receptor preparation — structure quality is scored before anything is docked: 3 chains, 905 residues, 2.90 Å resolution, zero missing residues. Chain and pocket choices are recorded rather than improvised.",
          "Ligand preparation — IUPAC or common names resolve to structure offline, then standardize and generate the docking-ready file, with the canonical SMILES shown so the molecule can be checked before the run.",
          "Search-space definition — the grid box is seeded from the detected ligand site rather than eyeballed, and the workspace warns when a box has quietly become a whole-receptor blind-docking run at an exhaustiveness too low to support it.",
          "Docking and scoring — AutoDock Vina at exhaustiveness 16, with parameters recorded and the full pose ensemble retained rather than only the top hit.",
          "Inspection — poses open directly in Mol* or ChimeraX, because a good score on an implausible pose is a failure, not a result.",
        ],
      },
      {
        label: "Validation Process",
        body: "Validation means redocking. Take the ligand whose binding pose was already determined experimentally — here EST, 17β-estradiol, the native ligand in chain A — remove it from the structure, and ask the protocol to find it again from scratch. Because the crystallographic pose is known, the prediction is measured against the experimental answer directly. RMSD between the predicted and observed pose is the acceptance criterion, computed MCS-exact and symmetry-corrected so that chemically equivalent atoms don't inflate the number. The threshold is fixed before the run — pass under 2.0 Å, acceptable under 3.0 Å — rather than chosen afterwards to flatter the result. A protocol that cannot recover a known pose is not pointed at novel compounds; it gets fixed first.",
      },
      {
        label: "Results",
        body: "The redock reproduced the crystal pose to 0.633 Å — comfortably inside the 2.0 Å pass threshold — with a best affinity of −10.842 kcal/mol. On this target, with this receptor preparation and this grid, the protocol recovers the known binding mode.\n\nThe deliverable is that validated protocol, not the number: documented stages, recorded parameters, a stated acceptance criterion fixed in advance, and an explicit account of where its assumptions stop holding (below). Because the parameters are recorded rather than remembered, the run reproduces on another machine and a colleague can repeat it without reconstructing the reasoning first. Where validation shows a method is unreliable for a target or a chemotype, that is reported as the finding rather than smoothed over.",
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
