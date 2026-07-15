import type { Service } from "@/content/services";
import { iconMap } from "./Icons";
import { ButtonLink } from "./Button";
import { site } from "@/content/site";

export function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  return (
    <div id={service.slug} className="scroll-mt-24 border-t border-slate-200 py-14 first:border-t-0 first:pt-0">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <Icon className="h-7 w-7" />
          </span>
          <p className="mt-4 text-sm font-semibold text-slate-400">0{index + 1} — Service</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-navy-900">{service.title}</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{service.summary}</p>
          <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
            <span className="font-semibold text-navy-900">Good fit: </span>
            {service.goodFit}
          </p>
          <p className="mt-3 rounded-lg border border-teal-100 bg-teal-50/50 p-4 text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-navy-900">Typical timeline: </span>
            {service.timeline}
          </p>
          <div className="mt-6">
            <ButtonLink href={site.primaryCta.href} variant="primary">
              Discuss this
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">The problem</h3>
            <p className="mt-2 text-base leading-relaxed text-slate-700">{service.problem}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">The solution</h3>
            <p className="mt-2 text-base leading-relaxed text-slate-700">{service.solution}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Deliverables
            </h3>
            <ul className="mt-3 space-y-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-base text-slate-700">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                    className="mt-0.5 shrink-0 text-teal-600"
                  >
                    <path
                      d="M4 10.5l3.5 3.5L16 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
