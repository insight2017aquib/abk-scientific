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
  /** Per-page social card. Falls back to the site-wide branded image. */
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const url = opts.path ? `${site.url}${opts.path}` : site.url;
  // Social crawlers do not resolve relative paths, so absolute URLs only.
  const images = opts.image
    ? [{ ...opts.image, url: `${site.url}${opts.image.url}` }]
    : ogImages;
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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: images.map((i) => i.url),
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
