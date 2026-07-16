export const chemistryCompanion = {
  name: "Chemistry Companion",
  tagline: "Cheminformatics operations for chemists, without the scripting.",
  overview:
    "Chemistry Companion is a desktop toolkit that brings routine RDKit-powered operations — structure input, descriptor and property calculation, and molecular analysis — into a single interface designed around how medicinal and computational chemists actually work.",
  githubUrl: process.env.NEXT_PUBLIC_CC_GITHUB_URL || "",
  downloadUrl: process.env.NEXT_PUBLIC_CC_DOWNLOAD_URL || "",
  features: [
    {
      title: "Structure handling",
      body: "Load and standardize structures from common inputs (SMILES and file formats), so downstream steps start from clean molecules.",
    },
    {
      title: "Property & descriptor calculation",
      body: "Compute molecular properties and descriptors in batch — the numbers you reach for when triaging or comparing compounds.",
    },
    {
      title: "Molecular analysis",
      body: "Run common analysis operations through a clear interface instead of writing a script for each one.",
    },
    {
      title: "Chemist-first interface",
      body: "Designed around real medicinal-chemistry tasks, so the tool matches how you think about molecules.",
    },
  ],
  useCases: [
    {
      audience: "Medicinal chemists",
      body: "Self-serve routine molecular calculations without writing Python.",
    },
    {
      audience: "Computational chemists",
      body: "A quick front end for common RDKit operations and triage.",
    },
    {
      audience: "Teaching",
      body: "Demonstrate cheminformatics concepts interactively.",
    },
    {
      audience: "Research labs",
      body: "Standardize how the team handles structures and properties.",
    },
  ],
  installSteps: [
    {
      title: "Get a Windows build",
      body: "Download the latest release from GitHub Releases (or request access if a public build is not yet published).",
    },
    {
      title: "Run the installer",
      body: "Follow the guided install. No separate Python environment is required for the desktop package.",
    },
    {
      title: "Open a structure",
      body: "Paste SMILES or load a structure file, then run property calculation or analysis from the main workspace.",
    },
    {
      title: "Export results",
      body: "Export tables or cleaned structures for your notebook, report, or downstream docking/ML pipeline.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      label: "Input",
      body: "SMILES, SDF, or other common structure inputs enter a single workspace.",
    },
    {
      step: "02",
      label: "Standardize",
      body: "RDKit-backed cleanup so properties and analysis start from consistent molecules.",
    },
    {
      step: "03",
      label: "Compute",
      body: "Descriptors, properties, and analysis operations run in batch without scripting.",
    },
    {
      step: "04",
      label: "Export",
      body: "Results leave as tables or structure files ready for the rest of your workflow.",
    },
  ],
  architecture: [
    {
      title: "RDKit core",
      body: "Structure parsing, standardization, and property calculation are driven by RDKit — the same cheminformatics engine used in production discovery stacks.",
    },
    {
      title: "Desktop shell",
      body: "A chemist-facing UI wraps the scientific operations so common tasks do not require a notebook or CLI.",
    },
    {
      title: "Batch-friendly design",
      body: "Operations are built for sets of molecules, not only one-off clicks — closer to how library triage actually works.",
    },
    {
      title: "Export-first",
      body: "Outputs are plain, interoperable formats so the tool fits into existing lab and modelling pipelines.",
    },
  ],
  screenshots: [
    {
      id: "protein-analysis" as const,
      title: "Protein analysis",
      caption:
        "Structure quality is scored before anything is docked — chains, residues, ligands, waters, resolution, and missing residues, with a recommendation on which chain to keep.",
    },
    {
      id: "pocket-selection" as const,
      title: "Pocket selection",
      caption:
        "Ligand-defined pockets are detected with their centers and radii, ready to seed the grid box instead of placing it by eye.",
    },
    {
      id: "docking-workspace" as const,
      title: "Docking workspace",
      caption:
        "Ligand preparation and grid box beside a live Mol* view of the receptor — with a warning when the box has quietly become a blind-docking run.",
    },
  ],
  distributionNote:
    "Windows build is distributed via GitHub Releases. The download button links out to the latest release rather than hosting the installer on this site.",
};
