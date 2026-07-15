type Step = { step: string; label: string; body: string };

export function WorkflowDiagram({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.step} className="relative rounded-xl border border-slate-200 bg-white p-5">
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-2 top-1/2 z-10 hidden h-0.5 w-4 -translate-y-1/2 bg-teal-200 lg:block"
            />
          )}
          <span className="font-mono text-xs font-bold text-teal-600">{s.step}</span>
          <h3 className="mt-2 text-base font-semibold text-navy-900">{s.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
