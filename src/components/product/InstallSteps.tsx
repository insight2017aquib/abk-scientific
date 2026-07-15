type Step = { title: string; body: string };

export function InstallSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
            {i + 1}
          </span>
          <div>
            <h3 className="text-base font-semibold text-navy-900">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
