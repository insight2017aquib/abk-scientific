import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-teal-600 text-white hover:bg-teal-500 shadow-sm",
  secondary:
    "bg-white text-navy-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50",
  ghost: "text-navy-900 hover:text-teal-600",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const external = href.startsWith("http");
  const cls = cn(
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors",
    styles[variant],
    className
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
