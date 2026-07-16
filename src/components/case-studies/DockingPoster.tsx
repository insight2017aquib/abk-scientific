/** Branded poster for the docking case study — stands in for a video thumbnail
 *  without depending on an external image host. Same idiom as ProductMock. */

export function DockingPoster({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
      role="img"
      aria-label="Molecular docking validation walkthrough (illustrative poster)"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-navy-900 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
        <span className="ml-2 truncate text-xs font-medium text-slate-300">
          Docking validation — redock &amp; compare
        </span>
      </div>

      <div className="relative aspect-video bg-slate-50">
        {/* Dot-grid texture, matching the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--navy-900) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />

        <svg
          viewBox="0 0 320 180"
          className="absolute inset-0 h-full w-full"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Binding pocket — an open protein cleft */}
          <path
            d="M40 138 C 40 96, 62 62, 96 50 C 130 38, 168 42, 196 60"
            fill="none"
            stroke="var(--navy-700)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M56 142 C 56 104, 76 76, 104 66 C 132 56, 164 60, 188 76"
            fill="none"
            stroke="var(--navy-700)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.2"
          />
          <path
            d="M262 140 C 268 104, 254 74, 226 58"
            fill="none"
            stroke="var(--navy-700)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Reference (crystallographic) pose — dashed outline */}
          <g opacity="0.5">
            <polygon
              points="128,96 148,86 168,96 168,116 148,126 128,116"
              fill="none"
              stroke="var(--navy-900)"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <line
              x1="168"
              y1="96"
              x2="188"
              y2="86"
              stroke="var(--navy-900)"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </g>

          {/* Predicted pose — solid teal, slightly offset: the RMSD being measured */}
          <g>
            <polygon
              points="132,92 152,82 172,92 172,112 152,122 132,112"
              fill="none"
              stroke="var(--teal-600)"
              strokeWidth="2.5"
            />
            <line
              x1="172"
              y1="92"
              x2="192"
              y2="82"
              stroke="var(--teal-600)"
              strokeWidth="2.5"
            />
            <circle cx="152" cy="82" r="3" fill="var(--teal-600)" />
            <circle cx="172" cy="112" r="3" fill="var(--teal-600)" />
            <circle cx="192" cy="82" r="3" fill="var(--teal-600)" />
          </g>

          {/* Legend */}
          <g fontFamily="system-ui" fontSize="7">
            <line
              x1="40"
              y1="164"
              x2="54"
              y2="164"
              stroke="var(--navy-900)"
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity="0.5"
            />
            <text x="59" y="167" fill="var(--slate-500)">
              Published pose
            </text>
            <line
              x1="132"
              y1="164"
              x2="146"
              y2="164"
              stroke="var(--teal-600)"
              strokeWidth="2.5"
            />
            <text x="151" y="167" fill="var(--slate-500)">
              Redocked pose
            </text>
          </g>
        </svg>

        {/* Play badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900/90 shadow-lg ring-1 ring-white/10 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
