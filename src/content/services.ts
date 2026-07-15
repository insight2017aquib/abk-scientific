export type Service = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  deliverables: string[];
  timeline: string;
  goodFit: string;
  icon: "flask" | "network" | "bot";
};

// Consultant framing: problem -> capability -> outcome. No invented metrics.
export const services: Service[] = [
  {
    slug: "scientific-software",
    title: "Scientific Software Development",
    summary:
      "Custom desktop and web tools that fit how your lab actually works — not generic dashboards.",
    problem:
      "Research teams lose hours to manual data wrangling and brittle spreadsheets. Off-the-shelf software rarely matches a specific assay, workflow, or file format, and general software agencies don't understand the science.",
    solution:
      "I design and build purpose-built scientific applications — Python back ends (FastAPI), interactive front ends (Streamlit or web), and desktop tools — by someone who reads the chemistry and the code. Requirements are captured in scientific terms, not translated through a project manager.",
    deliverables: [
      "Requirements captured in scientific terms, with a written spec you approve",
      "Working application (desktop, web, or internal tool) with source code you own",
      "Data import/export for your existing instrument and file formats",
      "Documentation and a short handover session for your team",
    ],
    timeline:
      "Typically 4–10 weeks for an MVP internal tool, depending on data sources and UI depth. A scoped prototype can land in 2–3 weeks.",
    goodFit:
      "Labs and small biotechs that have a repetitive analysis or reporting task and no dedicated software engineer.",
    icon: "flask",
  },
  {
    slug: "cheminformatics",
    title: "Cheminformatics Development",
    summary:
      "RDKit-based pipelines for molecular processing, property calculation, and structure handling at scale.",
    problem:
      "Compound datasets arrive as messy SMILES, mixed file formats, and inconsistent identifiers. Standardizing structures, computing descriptors, filtering by drug-likeness, and preparing molecules for docking or ML is slow and error-prone by hand.",
    solution:
      "I build reproducible cheminformatics pipelines in Python and RDKit: structure standardization, descriptor and fingerprint generation, substructure and similarity search, property filtering, and batch preparation for downstream modelling or docking. Pipelines are scripted, versioned, and re-runnable.",
    deliverables: [
      "Reproducible pipeline (script or service) for your compound workflow",
      "Structure standardization, descriptor/fingerprint calculation, filtering rules",
      "Batch processing that runs on thousands of molecules unattended",
      "Validation notes: what the pipeline does, its assumptions, and its limits",
    ],
    timeline:
      "Typically 2–6 weeks for a focused pipeline (standardize → descriptors → filter → export). Multi-stage docking-prep systems take longer.",
    goodFit:
      "Discovery teams handling compound libraries who need RDKit expertise without hiring a full-time cheminformatician.",
    icon: "network",
  },
  {
    slug: "ai-automation",
    title: "AI Automation for Research Workflows",
    summary:
      "Automate the repetitive glue work between your tools, data, and reports — with sensible, auditable logic.",
    problem:
      "Scientists spend a large share of their time on repetitive coordination: reformatting instrument output, moving data between systems, compiling reports, and triaging documents. This is expensive, and it pulls trained scientists away from science.",
    solution:
      "I identify the highest-friction repetitive tasks and automate them with Python and, where it genuinely helps, LLM-assisted steps — always with clear inputs, outputs, and a human checkpoint. The goal is reliable time savings, not a demo. I am explicit about where automation is and isn't appropriate.",
    deliverables: [
      "A short audit of which tasks are worth automating (and which aren't)",
      "Automation scripts or a small service with logging and error handling",
      "Human-in-the-loop checkpoints where correctness matters",
      "Handover so your team can run and adjust it",
    ],
    timeline:
      "Audit in about 1 week; first automation slice often 2–5 weeks. Scope grows only where the workflow clearly pays for the build.",
    goodFit:
      "Teams with a clear, repeated manual workflow (data reformatting, report generation, document triage) they want to reclaim time from.",
    icon: "bot",
  },
];
