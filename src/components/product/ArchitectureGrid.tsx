type Item = { title: string; body: string };

export function ArchitectureGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-3 h-1 w-10 rounded-full bg-teal-500" aria-hidden />
          <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
