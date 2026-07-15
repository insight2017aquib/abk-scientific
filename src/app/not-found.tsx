import Link from "next/link";
import { Section } from "@/components/marketing/Section";

export default function NotFound() {
  return (
    <Section className="py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy-900">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-slate-600">
        That page doesn&apos;t exist. Head back home or get in touch.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-500">
          Go home
        </Link>
        <Link href="/contact" className="rounded-md px-5 py-2.5 text-sm font-semibold text-navy-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
          Contact
        </Link>
      </div>
    </Section>
  );
}
