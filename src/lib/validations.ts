import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email"),
  organization: z.string().max(160).optional().or(z.literal("")),
  role: z.string().max(120).optional().or(z.literal("")),
  projectType: z
    .enum([
      "Scientific Software",
      "Cheminformatics",
      "AI Automation",
      "Not sure yet",
      "",
    ])
    .optional(),
  budget: z.enum(["<$5k", "$5k–$15k", "$15k–$50k", "$50k+", "Not sure", ""]).optional(),
  message: z.string().min(10, "Please add a few details").max(4000),
  // Honeypot: accept any length so bots that fill it still parse.
  company_website: z.string().max(500).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  company_website: z.string().max(500).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** Whitelisted download assets → resolver key used by /api/download */
export const DOWNLOAD_ASSETS = ["chemistry-companion-win"] as const;
export type DownloadAsset = (typeof DOWNLOAD_ASSETS)[number];

export function isDownloadAsset(value: string): value is DownloadAsset {
  return (DOWNLOAD_ASSETS as readonly string[]).includes(value);
}
