import { describe, expect, it } from "vitest";
import {
  contactSchema,
  isDownloadAsset,
  newsletterSchema,
  DOWNLOAD_ASSETS,
} from "./validations";

describe("contactSchema", () => {
  it("accepts a valid inquiry", () => {
    const result = contactSchema.safeParse({
      name: "Ada Chem",
      email: "ada@lab.example",
      message: "We need an RDKit batch pipeline for library triage.",
      company_website: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short messages", () => {
    const result = contactSchema.safeParse({
      name: "Ada",
      email: "ada@lab.example",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("allows honeypot strings of any length (route handles silent drop)", () => {
    const result = contactSchema.safeParse({
      name: "Bot",
      email: "bot@spam.example",
      message: "Buy cheap services now please",
      company_website: "https://spam.example",
    });
    expect(result.success).toBe(true);
  });
});

describe("newsletterSchema", () => {
  it("accepts email", () => {
    expect(newsletterSchema.safeParse({ email: "you@biotech.example" }).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(newsletterSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
  });
});

describe("download assets", () => {
  it("whitelists chemistry-companion-win", () => {
    expect(isDownloadAsset("chemistry-companion-win")).toBe(true);
    expect(DOWNLOAD_ASSETS).toContain("chemistry-companion-win");
  });

  it("rejects unknown assets", () => {
    expect(isDownloadAsset("evil-payload")).toBe(false);
    expect(isDownloadAsset("")).toBe(false);
  });
});
