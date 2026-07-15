import { NextResponse } from "next/server";
import { chemistryCompanion } from "@/content/chemistry-companion";
import { isDownloadAsset } from "@/lib/validations";

/**
 * Download tracking + redirect.
 * Whitelisted assets only. Installers are never hosted in this repo —
 * we 302 to the external URL (typically GitHub Releases).
 */
const ASSETS: Record<string, () => string | undefined> = {
  "chemistry-companion-win": () => chemistryCompanion.downloadUrl || undefined,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const asset = searchParams.get("asset") ?? "";

  if (!asset || !isDownloadAsset(asset) || !(asset in ASSETS)) {
    return NextResponse.json({ error: "Unknown asset." }, { status: 404 });
  }

  const target = ASSETS[asset]();
  if (!target) {
    return NextResponse.json(
      { error: "Download is not available yet. Request access via the contact form." },
      { status: 404 }
    );
  }

  console.log(
    JSON.stringify({
      event: "download",
      asset,
      target,
      ts: new Date().toISOString(),
      ua: req.headers.get("user-agent") ?? undefined,
    })
  );

  return NextResponse.redirect(target, 302);
}
