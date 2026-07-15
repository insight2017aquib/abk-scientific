/** Branded illustrative UI mocks for Chemistry Companion (placeholders for real screenshots). */

type MockId = "workspace" | "properties" | "batch";

const titles: Record<MockId, string> = {
  workspace: "Chemistry Companion — Workspace",
  properties: "Properties & descriptors",
  batch: "Batch analysis",
};

export function ProductMock({ id, className = "" }: { id: MockId; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
      role="img"
      aria-label={`${titles[id]} (illustrative mock)`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-navy-900 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
        <span className="ml-2 truncate text-xs font-medium text-slate-300">{titles[id]}</span>
      </div>

      {id === "workspace" && <WorkspaceBody />}
      {id === "properties" && <PropertiesBody />}
      {id === "batch" && <BatchBody />}
    </div>
  );
}

function WorkspaceBody() {
  return (
    <div className="grid min-h-[200px] sm:grid-cols-[1fr_1.2fr]">
      <div className="space-y-3 border-b border-slate-100 p-4 sm:border-b-0 sm:border-r">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Structure input</p>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-navy-900">
          CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded bg-teal-600 px-2 py-1 text-[10px] font-semibold text-white">Load</span>
          <span className="rounded border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-600">
            Clear
          </span>
        </div>
        <p className="text-[10px] text-slate-500">SMILES · SDF · MOL</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-slate-50 p-6">
        {/* Simple molecule-like hexagon cluster */}
        <svg viewBox="0 0 120 100" className="h-24 w-28 text-teal-600" aria-hidden>
          <polygon
            points="40,20 60,10 80,20 80,40 60,50 40,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polygon
            points="60,50 80,40 100,50 100,70 80,80 60,70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.7"
          />
          <circle cx="60" cy="50" r="3" fill="currentColor" />
          <circle cx="80" cy="40" r="3" fill="currentColor" />
          <text x="88" y="28" className="fill-navy-900" fontSize="10" fontFamily="system-ui">
            Ar
          </text>
        </svg>
        <p className="mt-2 text-[10px] font-medium text-slate-500">Structure preview</p>
      </div>
    </div>
  );
}

function PropertiesBody() {
  const rows = [
    ["MW", "206.28"],
    ["LogP", "3.97"],
    ["HBA", "2"],
    ["HBD", "1"],
    ["TPSA", "37.3"],
    ["RotB", "4"],
  ];
  return (
    <div className="p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        Calculated properties
      </p>
      <div className="overflow-hidden rounded-md border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">Descriptor</th>
              <th className="px-3 py-2 font-medium">Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-t border-slate-100">
                <td className="px-3 py-1.5 font-medium text-navy-900">{k}</td>
                <td className="px-3 py-1.5 font-mono text-slate-600">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BatchBody() {
  const molecules = [
    { id: "CMPD-001", status: "Done" },
    { id: "CMPD-002", status: "Done" },
    { id: "CMPD-003", status: "Running" },
    { id: "CMPD-004", status: "Queued" },
  ];
  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Batch queue</p>
        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
          4 molecules
        </span>
      </div>
      <ul className="space-y-2">
        {molecules.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
          >
            <span className="font-mono text-xs text-navy-900">{m.id}</span>
            <span
              className={`text-[10px] font-semibold ${
                m.status === "Done"
                  ? "text-teal-600"
                  : m.status === "Running"
                    ? "text-amber-600"
                    : "text-slate-400"
              }`}
            >
              {m.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
