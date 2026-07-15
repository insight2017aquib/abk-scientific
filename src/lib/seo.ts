import type { Metadata } from "next";
import { site } from "@/content/site";

const ogImages = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${site.name} — ${site.brand}`,
  },
];

export function pageMetadata(opts: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = opts.path ? `${site.url}${opts.path}` : site.url;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.brand,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: ["/opengraph-image"],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    sameAs: [site.socials.linkedin, site.socials.github].filter(
      (u) => Boolean(u) && !u.endsWith("linkedin.com/in/") && u !== "https://github.com/"
    ),
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.brand,
    description: site.description,
    url: site.url,
    areaServed: "Worldwide",
    provider: { "@type": "Person", name: site.name },
  };
}
