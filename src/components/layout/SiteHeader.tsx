import Link from "next/link";
import { nav, site } from "@/content/site";
import { ButtonLink } from "@/components/marketing/Button";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";

/** Compact nav on large screens: primary items + more room for CTA */
const primaryNav = nav.filter((item) =>
  ["Services", "Projects", "Chemistry Companion", "Blog", "Contact"].includes(item.label)
);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.brand} home`}>
          <Logo priority className="h-9 sm:h-10" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden shrink-0 md:block">
          <ButtonLink href={site.primaryCta.href} variant="primary">
            {site.primaryCta.label}
          </ButtonLink>
        </div>
        {/* md: show mobile-style menu when primary nav is hidden between md-lg */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
