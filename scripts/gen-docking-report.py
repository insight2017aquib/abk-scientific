#!/usr/bin/env python3
"""Generate the downloadable Docking Protocol Validation report (PDF).

    python scripts/gen-docking-report.py

Writes: public/docs/docking-validation-report.pdf

This is an authoring tool, not a runtime dependency — the site links to the
committed PDF, so `reportlab` is never needed to build or deploy the site.
Install it only when regenerating:  pip install reportlab

⚠️  Content parity: the text below mirrors the `docking-workflow-validation`
entry in `src/content/case-studies.ts`. That file stays authoritative — if you
change the metrics, disclaimer, or reference there, re-run this script so the
PDF does not drift from the page. Every number here comes from the same real
run captured in public/images/chemistry-companion/docking-validation.png.
No value in this document is estimated.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
SHOT = ROOT / "public" / "images" / "chemistry-companion" / "docking-validation.png"
OUT = ROOT / "public" / "docs" / "docking-validation-report.pdf"

# Brand tokens — mirror :root in src/app/globals.css
NAVY_900 = colors.HexColor("#0b1f3a")
TEAL_600 = colors.HexColor("#0d9488")
SLATE_700 = colors.HexColor("#334155")
SLATE_500 = colors.HexColor("#64748b")
SLATE_400 = colors.HexColor("#94a3b8")
SLATE_200 = colors.HexColor("#e2e8f0")
SLATE_50 = colors.HexColor("#f8fafc")
AMBER_50 = colors.HexColor("#fffbeb")
AMBER_200 = colors.HexColor("#fde68a")

CONTACT_EMAIL = "aquibtheone@hotmail.com"

ss = getSampleStyleSheet()


def style(name, **kw):
    kw.setdefault("fontName", "Helvetica")
    return ParagraphStyle(name, parent=ss["Normal"], **kw)


S = {
    "title": style("t", fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=NAVY_900),
    "sub": style("s", fontSize=10.5, leading=15, textColor=SLATE_500),
    "h2": style("h2", fontName="Helvetica-Bold", fontSize=8.5, leading=11,
                textColor=SLATE_400, spaceAfter=5),
    "body": style("b", fontSize=9.5, leading=14.5, textColor=SLATE_700, alignment=TA_LEFT),
    "bullet": style("bu", fontSize=9, leading=13.5, textColor=SLATE_700,
                    leftIndent=9, bulletIndent=2),
    "cap": style("c", fontSize=7.5, leading=10.5, textColor=SLATE_500),
    "mlabel": style("ml", fontName="Helvetica-Bold", fontSize=6.5, leading=9, textColor=SLATE_500),
    "mvalue": style("mv", fontName="Helvetica-Bold", fontSize=14, leading=17, textColor=NAVY_900),
    "mnote": style("mn", fontSize=6.8, leading=9.2, textColor=SLATE_500),
    "disc": style("d", fontSize=8.5, leading=12.8, textColor=SLATE_700),
    "ref": style("r", fontSize=7.2, leading=10.2, textColor=SLATE_500),
}


def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    # Header rule + brand
    canvas.setFillColor(NAVY_900)
    canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawString(18 * mm, h - 12 * mm, "ABK Scientific")
    canvas.setFillColor(SLATE_400)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawRightString(w - 18 * mm, h - 12 * mm, "Docking Protocol Validation")
    canvas.setStrokeColor(SLATE_200)
    canvas.setLineWidth(0.5)
    canvas.line(18 * mm, h - 14.5 * mm, w - 18 * mm, h - 14.5 * mm)
    # Footer
    canvas.line(18 * mm, 14 * mm, w - 18 * mm, 14 * mm)
    canvas.setFillColor(SLATE_400)
    canvas.setFont("Helvetica", 7.2)
    canvas.drawString(18 * mm, 10 * mm, f"Aquib Belal Khan · {CONTACT_EMAIL}")
    canvas.drawRightString(w - 18 * mm, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


def metric_card(label, value, note):
    inner = Table(
        [[Paragraph(label.upper(), S["mlabel"])],
         [Paragraph(value, S["mvalue"])],
         [Paragraph(note, S["mnote"])]],
        colWidths=[80 * mm],
    )
    inner.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (0, 0), 7),
        ("BOTTOMPADDING", (0, -1), (0, -1), 7),
        ("TOPPADDING", (0, 1), (0, 2), 2),
        ("BACKGROUND", (0, 0), (-1, -1), SLATE_50),
        ("BOX", (0, 0), (-1, -1), 0.5, SLATE_200),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return inner


METRICS = [
    ("Redock RMSD", "0.633 Å",
     "MCS-exact, symmetry-corrected. Pass &lt; 2.0 Å, acceptable &lt; 3.0 Å — threshold set before the run."),
    ("Best affinity", "−10.842 kcal/mol", "Top-scoring pose of the redocked reference ligand."),
    ("Docking engine", "AutoDock Vina", "Vina scoring function at exhaustiveness 16."),
    ("Reference ligand", "EST — 17β-estradiol", "Native co-crystallized ligand, chain A, residue 600."),
    ("Structure quality", "88 / 100",
     "Scored before docking: 2.90 Å resolution, 3 chains, 905 residues, zero missing residues."),
    ("Poses generated", "2", "Full ensemble retained from the validation redock, not just the top hit."),
]

SECTIONS = [
    ("Objective",
     ["A docking setup that has never reproduced a known answer cannot be trusted on an unknown "
      "one. Before a docking result informs a decision — prioritizing a series, triaging a virtual "
      "library, justifying a synthesis — the workflow itself has to be shown to work on a case "
      "where the answer is already established. The objective was a docking protocol against "
      "estrogen receptor α whose correctness is demonstrated rather than assumed, and a "
      "demonstration the inheriting team can repeat without me."], []),
    ("Methodology",
     ["The workflow runs as explicit, inspectable stages rather than one opaque script. Each stage "
      "has defined inputs, defined outputs, and its own failure mode — so a bad result traces back "
      "to the step that produced it instead of surfacing three decisions later."],
     ["<b>Receptor preparation</b> — structure quality is scored before anything is docked: 3 chains, "
      "905 residues, 2.90 Å resolution, zero missing residues. Chain and pocket choices are recorded "
      "rather than improvised.",
      "<b>Ligand preparation</b> — IUPAC or common names resolve to structure offline, then "
      "standardize and generate the docking-ready file, with the canonical SMILES shown so the "
      "molecule can be checked before the run.",
      "<b>Search-space definition</b> — the grid box is seeded from the detected ligand site rather "
      "than eyeballed, and the workspace warns when a box has quietly become a whole-receptor "
      "blind-docking run at an exhaustiveness too low to support it.",
      "<b>Docking and scoring</b> — AutoDock Vina at exhaustiveness 16, with parameters recorded and "
      "the full pose ensemble retained rather than only the top hit.",
      "<b>Inspection</b> — poses open directly in Mol* or ChimeraX, because a good score on an "
      "implausible pose is a failure, not a result."]),
    ("Validation Process",
     ["Validation means redocking. Take the ligand whose binding pose was already determined "
      "experimentally — here EST, 17β-estradiol, the native ligand in chain A — remove it from the "
      "structure, and ask the protocol to find it again from scratch. Because the crystallographic "
      "pose is known, the prediction is measured against the experimental answer directly. RMSD "
      "between the predicted and observed pose is the acceptance criterion, computed MCS-exact and "
      "symmetry-corrected so that chemically equivalent atoms don't inflate the number. The "
      "threshold is fixed before the run — pass under 2.0 Å, acceptable under 3.0 Å — rather than "
      "chosen afterwards to flatter the result. A protocol that cannot recover a known pose is not "
      "pointed at novel compounds; it gets fixed first."], []),
    ("Results",
     ["The redock reproduced the crystal pose to 0.633 Å — comfortably inside the 2.0 Å pass "
      "threshold — with a best affinity of −10.842 kcal/mol. On this target, with this receptor "
      "preparation and this grid, the protocol recovers the known binding mode.",
      "The deliverable is that validated protocol, not the number: documented stages, recorded "
      "parameters, a stated acceptance criterion fixed in advance, and an explicit account of where "
      "its assumptions stop holding (below). Because the parameters are recorded rather than "
      "remembered, the run reproduces on another machine and a colleague can repeat it without "
      "reconstructing the reasoning first. Where validation shows a method is unreliable for a "
      "target or a chemotype, that is reported as the finding rather than smoothed over."], []),
]

DISCLAIMER_TITLE = "What this validates — and what it does not"
DISCLAIMER = [
    "Redocking the native ligand tests the protocol, not the chemistry that comes after it. "
    "Reproducing the crystallographic pose to 0.633 Å shows that receptor preparation, grid "
    "placement, and the scoring pipeline recover a binding mode that was already known. It does "
    "not show that the same protocol will rank an unseen ligand series correctly. Those are two "
    "different claims, and treating the first as evidence for the second is how docking gets "
    "oversold.",
    "That distinction has teeth on this target. Xue et al. compared AutoDock, AutoDock Vina, and "
    "Surflex-Dock across 22 weakly binding flavonoids against ERα and found that Vina and AutoDock "
    "overweight hydrogen bonding for that chemotype — producing incorrect binding modes — while "
    "Surflex-Dock balanced hydrogen-bond and hydrophobic terms more reliably. So for flavonoid-like "
    "series against ERα, a clean Vina redock is necessary but not sufficient: Vina's affinity "
    "ranking should be treated as unreliable for that chemotype and cross-checked against a program "
    "that handles it better. A validation run tells you which of those two situations you are in — "
    "which is the entire point of running one.",
]
REFERENCE = ("Xue Q, Liu X, Russell P, Li J, Pan W, Fu J, Zhang A. Evaluation of the binding "
             "performance of flavonoids to estrogen receptor alpha by Autodock, Autodock Vina and "
             "Surflex-Dock. Ecotoxicol Environ Saf. 2022;233:113323. "
             "https://doi.org/10.1016/j.ecoenv.2022.113323")


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUT), pagesize=A4,
        leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=20 * mm, bottomMargin=18 * mm,
        title="Docking Protocol Validation — ABK Scientific",
        author="Aquib Belal Khan",
        subject="Redocking validation of AutoDock Vina against the estradiol/ERα crystallographic pose",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="n")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=header_footer)])

    story = []
    story.append(Paragraph("Docking Protocol Validation", S["title"]))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "AutoDock Vina reproduced the crystallographic pose of estradiol in estrogen receptor α to "
        "<b>0.633 Å RMSD</b>. The protocol recovers a known binding mode before it is trusted on an "
        "unknown one.", S["sub"]))
    story.append(Spacer(1, 5 * mm))

    # Badge
    badge = Table([[Paragraph(
        '<font color="#0d9488" size="7.5"><b>VALIDATED AGAINST PUBLISHED DATA</b></font>',
        S["body"])]], colWidths=[58 * mm])
    badge.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f0fdfa")),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#99f6e4")),
        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(badge)
    story.append(Spacer(1, 7 * mm))

    # Screenshot — the actual capture of the run
    if SHOT.exists():
        from PIL import Image as PILImage
        iw, ih = PILImage.open(SHOT).size
        target_w = doc.width
        story.append(Image(str(SHOT), width=target_w, height=target_w * ih / iw))
        story.append(Spacer(1, 2 * mm))
        story.append(Paragraph(
            "Protocol Validation panel from Chemistry Companion — the actual run this report "
            "documents. Redocking of EST passed at 0.633 Å RMSD with a best affinity of "
            "−10.842 kcal/mol.", S["cap"]))
        story.append(Spacer(1, 7 * mm))

    # Metrics grid — 2 columns
    rows = []
    for i in range(0, len(METRICS), 2):
        pair = METRICS[i:i + 2]
        cells = [metric_card(*m) for m in pair]
        if len(cells) == 1:
            cells.append("")
        rows.append(cells)
    grid = Table(rows, colWidths=[doc.width / 2 - 2 * mm, doc.width / 2 - 2 * mm], hAlign="LEFT")
    grid.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(grid)
    story.append(Spacer(1, 8 * mm))

    for label, paras, bullets in SECTIONS:
        story.append(Paragraph(label.upper(), S["h2"]))
        for p in paras:
            story.append(Paragraph(p, S["body"]))
            story.append(Spacer(1, 2 * mm))
        for b in bullets:
            story.append(Paragraph(b, S["bullet"], bulletText="•"))
            story.append(Spacer(1, 1.5 * mm))
        story.append(Spacer(1, 4 * mm))

    # Disclaimer
    disc = [[Paragraph(f"<b>{DISCLAIMER_TITLE}</b>", S["disc"])]]
    for p in DISCLAIMER:
        disc.append([Paragraph(p, S["disc"])])
    disc.append([Paragraph(REFERENCE, S["ref"])])
    dt = Table(disc, colWidths=[doc.width - 8 * mm])
    dt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), AMBER_50),
        ("BOX", (0, 0), (-1, -1), 0.5, AMBER_200),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LINEABOVE", (0, -1), (-1, -1), 0.5, AMBER_200),
    ]))
    story.append(dt)
    story.append(Spacer(1, 6 * mm))

    story.append(Paragraph(
        f'<font color="#64748b" size="8">Prepared by Aquib Belal Khan — M.Pharm, Medicinal '
        f'Chemistry. Discuss a docking project: {CONTACT_EMAIL}</font>', S["body"]))

    doc.build(story)
    print(f"wrote {OUT}  ({OUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    build()
