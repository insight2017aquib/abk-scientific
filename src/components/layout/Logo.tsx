import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

// Horizontal brand lockup (flask mark + "ABK Scientific" wordmark). The image
// already contains the name, so it is used on its own — no adjacent text.
// Source file is produced by `npm run logo:gen` from public/logo/_src/.
// Intrinsic size matches the 2000×515 master (ratio ~3.88) so w-auto keeps it
// undistorted; display height is set via className.
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo/logo-horizontal.png"
      alt={`${site.brand} home`}
      width={2000}
      height={515}
      priority={priority}
      className={cn("w-auto", className)}
    />
  );
}
