"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not subscribe. Try again later.");
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
      <p className="rounded-md bg-teal-50 px-4 py-3 text-sm text-navy-900" role="status">
        Thanks — you&apos;re on the list. Occasional notes on scientific software and RDKit,
        no spam.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`relative ${compact ? "space-y-3" : "space-y-4"}`}>
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className={compact ? "flex flex-col gap-2 sm:flex-row" : "space-y-2"}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email for newsletter
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 sm:min-w-[220px]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-md bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-500 disabled:opacity-60"
        >
          {status === "submitting" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs text-slate-500">
        Occasional notes on RDKit, scientific software, and research automation. Unsubscribe
        anytime.
      </p>
    </form>
  );
}
