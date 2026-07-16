// Central site configuration. Prefer env vars for production; empty socials hide their links.
function env(name: string): string {
  return (process.env[name] || "").trim();
}

export const site = {
  name: "Aquib Belal Khan",
  brand: "ABK Scientific",
  role: "Scientific Software & Cheminformatics Consultant",
  tagline:
    "Custom scientific software for drug discovery — RDKit pipelines, cheminformatics tools, and lab automation, built by a medicinal chemist who codes.",
  description:
    "Boutique scientific software consultancy. I build cheminformatics pipelines, molecular analysis tools, and AI-driven lab automation for biotech, pharma, and academic research teams.",
  // Override with NEXT_PUBLIC_SITE_URL in production.
  url: env("NEXT_PUBLIC_SITE_URL") || "https://abk-scientific.com",
  // Empty when unset → UI hides every mailto if blank, so we never ship a link to
  // an unowned/bouncing address. Set NEXT_PUBLIC_CONTACT_EMAIL before launch.
  email: env("NEXT_PUBLIC_CONTACT_EMAIL"),
  location: "Remote · Working with teams worldwide",
  socials: {
    // Canonical profiles (override via env if needed).
    linkedin:
      env("NEXT_PUBLIC_LINKEDIN_URL") ||
      "https://www.linkedin.com/in/aquib-belal-khan-33631914b",
    github:
      env("NEXT_PUBLIC_GITHUB_URL") || "https://github.com/insight2017aquib",
    scholar: env("NEXT_PUBLIC_SCHOLAR_URL") || "",
  },
  calUrl: env("NEXT_PUBLIC_CAL_URL") || "",
  primaryCta: { label: "Book a Consultation", href: "/contact" },
  secondaryCta: { label: "View Projects", href: "/projects" },
} as const;

/** Confidentiality and IP terms. Standard, and stated up front because biotech
 *  buyers ask before they share a structure — not after. */
export const confidentiality = {
  title: "Confidentiality & IP",
  points: [
    "Happy to sign your NDA before you send anything. If you'd rather not share structures up front, describe the workflow in general terms — that's usually enough for a first conversation.",
    "You own the output. Source code, pipelines, and documentation I deliver are yours, along with the IP in them.",
    "Your data stays yours. Compound structures, assay data, and unpublished results are never reused for other clients, added to a public example, or used as training data.",
  ],
} as const;

/** True when a URL is non-empty and not a known incomplete stub. */
export function isPresentUrl(url: string | undefined | null): boolean {
  if (!url || !url.trim()) return false;
  const u = url.trim().toLowerCase();
  if (u === "https://www.linkedin.com/in/" || u === "https://linkedin.com/in/") return false;
  if (u === "https://github.com/" || u === "https://github.com") return false;
  return true;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Chemistry Companion", href: "/chemistry-companion" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
