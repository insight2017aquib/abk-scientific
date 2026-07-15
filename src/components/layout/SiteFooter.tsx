import Link from "next/link";
import { isPresentUrl, nav, site } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  const hasEmail = Boolean(site.email?.trim());
  const hasLinkedIn = isPresentUrl(site.socials.linkedin);
  const hasGithub = isPresentUrl(site.socials.github);

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo className="h-8" />
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {site.role}. {site.location}.
            </p>
          </div>
          <div className="flex gap-14">
            <div>
              <p className="text-sm font-semibold text-navy-900">Navigate</p>
              <ul className="mt-3 space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-slate-600 hover:text-teal-600">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-900">Connect</p>
              <ul className="mt-3 space-y-2">
                {hasEmail && (
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm text-slate-600 hover:text-teal-600"
                    >
                      Email
                    </a>
                  </li>
                )}
                {hasLinkedIn && (
                  <li>
                    <a
                      href={site.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:text-teal-600"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}
                {hasGithub && (
                  <li>
                    <a
                      href={site.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:text-teal-600"
                    >
                      GitHub
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {site.name} · {site.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
