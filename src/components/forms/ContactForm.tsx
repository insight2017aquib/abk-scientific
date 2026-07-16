"use client";
import { useState } from "react";
import { isPresentUrl, site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Direct route to a human when the form can't deliver. Never renders a bare
 * "email me directly" with no address: falls back to LinkedIn until
 * NEXT_PUBLIC_CONTACT_EMAIL is set.
 */
function DirectContact({ className = "" }: { className?: string }) {
  const email = site.email?.trim();
  if (email) {
    return (
      <span className={className}>
        Reach me directly at{" "}
        <a href={`mailto:${email}`} className="font-medium text-teal-600 hover:text-teal-500">
          {email}
        </a>
        .
      </span>
    );
  }
  if (isPresentUrl(site.socials.linkedin)) {
    return (
      <span className={className}>
        You can also reach me on{" "}
        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-teal-600 hover:text-teal-500"
        >
          LinkedIn
        </a>
        .
      </span>
    );
  }
  return null;
}

const projectTypes = ["Scientific Software", "Cheminformatics", "AI Automation", "Not sure yet"];
const budgets = ["<$5k", "$5k–$15k", "$15k–$50k", "$50k+", "Not sure"];

const field =
  "mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500";
const label = "text-sm font-medium text-navy-900";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please email me directly.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-navy-900">Thanks — message received.</h3>
        <p className="mt-2 text-sm text-slate-600">
          I read every inquiry personally and will reply within two business days.{" "}
          <DirectContact />
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      {/* Honeypot: hidden from users, tempting to bots */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name <span className="text-teal-600">*</span></label>
          <input id="name" name="name" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email <span className="text-teal-600">*</span></label>
          <input id="email" name="email" type="email" required className={field} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="organization" className={label}>Organization</label>
          <input id="organization" name="organization" className={field} placeholder="Company / lab / university" />
        </div>
        <div>
          <label htmlFor="role" className={label}>Your role</label>
          <input id="role" name="role" className={field} placeholder="e.g. Head of Chemistry, PI" />
        </div>
        <div>
          <label htmlFor="projectType" className={label}>Project type</label>
          <select id="projectType" name="projectType" className={field} defaultValue="">
            <option value="" disabled>Select one</option>
            {projectTypes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={label}>Budget (optional)</label>
          <select id="budget" name="budget" className={field} defaultValue="">
            <option value="">Prefer not to say</option>
            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>What are you trying to do? <span className="text-teal-600">*</span></label>
        <textarea id="message" name="message" required rows={5} className={field}
          placeholder="Describe the workflow, the file formats involved, and what a good outcome looks like." />
      </div>

      {status === "error" && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{error}</p>
          <DirectContact className="mt-1.5 block text-red-700" />
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-500 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send inquiry"}
      </button>
      <DirectContact className="block text-xs text-slate-500" />
      <p className="text-xs text-slate-500">
        Your name, email, and message are used only to respond to this inquiry. They are not sold
        or used for unrelated marketing.
      </p>
    </form>
  );
}
