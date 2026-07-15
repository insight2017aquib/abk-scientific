import { trustChips } from "@/content/trust";

export function TrustBar() {
  return (
    <div className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          Grounded in real scientific training
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {trustChips.map((chip) => (
            <li
              key={chip.label}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700"
            >
              {chip.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
