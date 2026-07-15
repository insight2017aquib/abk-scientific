import { Section } from "@/components/marketing/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/marketing/Button";
import { isPresentUrl, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a conversation about scientific software, cheminformatics, or research automation. Describe your workflow and I'll tell you honestly whether and how I can help.",
  path: "/contact",
});

export default function ContactPage() {
  const hasCal = isPresentUrl(site.calUrl);
  const hasEmail = Boolean(site.email?.trim());
  const hasLinkedIn = isPresentUrl(site.socials.linkedin);
  const hasGithub = isPresentUrl(site.socials.github);

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Contact</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Let&apos;s talk about your workflow
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            The more concretely you describe the task — the inputs, the file formats, what a good
            outcome looks like — the more useful my first reply will be. No obligation, and I&apos;ll
            tell you if software isn&apos;t the right answer.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-base font-semibold text-navy-900">Direct</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {hasEmail && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-teal-600 hover:text-teal-500"
                  >
                    {site.email}
                  </a>
                </li>
              )}
              {hasLinkedIn && (
                <li>
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-teal-600"
                  >
                    LinkedIn →
                  </a>
                </li>
              )}
              {hasGithub && (
                <li>
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-teal-600"
                  >
                    GitHub →
                  </a>
                </li>
              )}
              {!hasEmail && !hasLinkedIn && !hasGithub && (
                <li className="text-slate-500">Use the form — I&apos;ll reply by email.</li>
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-semibold text-navy-900">Prefer a call?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {hasCal
                ? "Book a 30-minute intro call at a time that works for you."
                : "Send a note and we'll find a time that works across time zones."}
            </p>
            <div className="mt-4">
              {hasCal ? (
                <ButtonLink href={site.calUrl} variant="secondary">
                  Book a call
                </ButtonLink>
              ) : hasEmail ? (
                <ButtonLink href={`mailto:${site.email}`} variant="secondary">
                  Email to schedule
                </ButtonLink>
              ) : (
                <p className="text-sm text-slate-500">Use the inquiry form to schedule.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-navy-900 p-6">
            <p className="text-sm leading-relaxed text-slate-300">
              I read every inquiry personally. Expect a reply within two business days.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
