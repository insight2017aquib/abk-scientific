import fs from "node:fs";
import path from "node:path";

/**
 * Real product screenshots live in `public/images/chemistry-companion/`.
 * They are captures of the running application — not mocks.
 *
 * Files are checked at build time so a missing capture degrades to the branded
 * placeholder instead of shipping a broken image. Same posture as
 * `isPresentUrl()` in `content/site.ts`: never ship a reference we can't honour.
 */
export const SHOTS_DIR = "/images/chemistry-companion";

export type ShotId =
  | "dashboard"
  | "protein-analysis"
  | "pocket-selection"
  | "docking-workspace"
  | "docking-validation";

/** True when the real capture exists on disk. Evaluated at build time. */
export function hasShot(id: ShotId): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", SHOTS_DIR.slice(1), `${id}.png`));
  } catch {
    return false;
  }
}

export function shotSrc(id: ShotId): string {
  return `${SHOTS_DIR}/${id}.png`;
}
