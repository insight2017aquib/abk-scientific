import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-abk">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-navy-900">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl font-semibold text-navy-900">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-4 text-base leading-relaxed text-slate-700">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-slate-700">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-navy-900">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-teal-600 underline-offset-2 hover:underline"
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              target={href?.startsWith("http") ? "_blank" : undefined}
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-navy-900">
              {children}
            </code>
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
