import Image from "next/image";
import { ProductMock, type MockId } from "./ProductMock";
import { hasShot, shotSrc, type ShotId } from "@/lib/screenshots";
import { cn } from "@/lib/utils";

/** Nearest stand-in per capture, so a missing file doesn't show an unrelated
 *  panel. Override with `fallback` where a diagram fits better. */
const fallbackMock: Record<ShotId, MockId> = {
  dashboard: "workspace",
  "protein-analysis": "properties",
  "pocket-selection": "batch",
  "docking-workspace": "workspace",
  "docking-validation": "properties",
};

/**
 * Renders a real capture of the running application.
 *
 * Until the capture is on disk this falls back to a branded stand-in, which
 * stays explicitly labelled as one — an unlabelled mock presented as a
 * screenshot would be fabricated proof.
 */
export function Screenshot({
  id,
  alt,
  priority,
  className,
  fallback,
}: {
  id: ShotId;
  alt: string;
  priority?: boolean;
  className?: string;
  fallback?: React.ReactNode;
}) {
  if (!hasShot(id)) {
    return <>{fallback ?? <ProductMock id={fallbackMock[id]} className={className} />}</>;
  }

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-50",
        className
      )}
    >
      <Image
        src={shotSrc(id)}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}
