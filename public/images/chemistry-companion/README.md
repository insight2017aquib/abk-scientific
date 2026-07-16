# Chemistry Companion screenshots

Real captures of the running application. **Drop the PNGs in this folder using
exactly these filenames** — the site picks them up automatically, no code change:

| Filename | What to capture | Used on |
|---|---|---|
| `docking-validation.png` | Protocol Validation panel showing the **PASS** card — reference ligand EST, RMSD 0.633 Å, best affinity −10.842 kcal/mol | Home hero, Docking Validation case study, Chemistry Companion |
| `docking-workspace.png` | Ligand prep + Grid Box + Live Structure Preview (Mol\*), including the blind-docking warning | Docking Validation case study, Chemistry Companion |
| `protein-analysis.png` | Step 2 — chains/residues/ligands/waters, Quality Badge, AI Expert Recommendation | Chemistry Companion |
| `pocket-selection.png` | Step 4 — ligand-defined pocket cards with centers and radii | Chemistry Companion |
| `dashboard.png` | Molecular Analysis & Docking Workbench dashboard | Chemistry Companion |

## Rules

- **PNG only**, named exactly as above (lowercase, hyphenated).
- Roughly 16:9 is ideal. Images are rendered with `object-contain`, so nothing is
  cropped and nothing is distorted — the numbers stay readable at any aspect ratio.
- **Check every capture before committing.** These are proof assets: no unpublished
  targets, client compounds, internal paths, or anything you would not put in a paper.

## Until they land

`Screenshot.tsx` checks for each file at build time. When one is missing it falls
back to the branded placeholder in `ProductMock.tsx`, which stays visibly labelled
as a placeholder. That labelling is deliberate — showing a mock *as if* it were a
screenshot would be fabricated proof, which `AGENTS.md` forbids. The label
disappears on its own the moment the real capture is in this folder.
