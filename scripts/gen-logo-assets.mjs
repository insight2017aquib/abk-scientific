// Generate every derived logo asset from a few high-res masters.
//
// Drop these masters into public/logo/_src/ (transparent bg unless noted):
//   abk-logo-horizontal.png  flask mark + "ABK Scientific" wordmark, side by side  -> header/footer
//   abk-logo-circular.png    full circular lockup as designed                       -> hero
//   abk-logo-disc.png        full circular lockup on the cream disc                 -> OG/social
//   abk-mark.png             flask symbol only, square                              -> favicon/app icon/PWA
//
// Then run:  npm run logo:gen
//
// Missing masters are skipped with a warning, so you can run it with a partial set.
// Requires `sharp`, which is already installed (Next.js image optimization dep).

import sharp from "sharp";
import { existsSync, mkdirSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "public", "logo", "_src");
const PUB_LOGO = join(root, "public", "logo");
const APP = join(root, "src", "app");

const master = (name) => join(SRC, name);
const has = (name) => existsSync(master(name));

function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}

async function fromMark(name, out, size) {
  ensureDir(out);
  await sharp(master(name))
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  console.log("  ✓", out.replace(root + "\\", "").replace(root + "/", ""));
}

async function appleIcon(name, out, size = 180) {
  ensureDir(out);
  // iOS icons must not be transparent. Flatten onto white — works whether the
  // mark master is transparent or already has an opaque background.
  await sharp(master(name))
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png()
    .toFile(out);
  console.log("  ✓", out.replace(root + "\\", "").replace(root + "/", ""));
}

async function resizeMaster(name, out, { height, width } = {}) {
  ensureDir(out);
  const pipeline = sharp(master(name));
  if (height || width) {
    pipeline.resize({ height, width, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }
  await pipeline.png().toFile(out);
  console.log("  ✓", out.replace(root + "\\", "").replace(root + "/", ""));
}

function removePlaceholder(p) {
  if (existsSync(p)) {
    rmSync(p, { force: true });
    console.log("  ✗ removed placeholder", p.replace(root + "\\", "").replace(root + "/", ""));
  }
}

async function main() {
  if (!existsSync(SRC)) {
    mkdirSync(SRC, { recursive: true });
    console.error(
      `\nNo masters found. Created ${SRC.replace(root + "\\", "")}.\n` +
        "Add abk-logo-horizontal.png, abk-logo-circular.png, abk-logo-disc.png, abk-mark.png there, then re-run.\n"
    );
    return;
  }

  console.log("Generating logo assets…");

  // Favicon + app icons + PWA (from the flask mark)
  if (has("abk-mark.png")) {
    await fromMark("abk-mark.png", join(APP, "icon.png"), 32);
    await appleIcon("abk-mark.png", join(APP, "apple-icon.png"), 180);
    await fromMark("abk-mark.png", join(PUB_LOGO, "mark-192.png"), 192);
    await fromMark("abk-mark.png", join(PUB_LOGO, "mark-512.png"), 512);
    // New mark supersedes the placeholder favicons.
    removePlaceholder(join(APP, "icon.svg"));
    removePlaceholder(join(APP, "favicon.ico"));
  } else {
    console.warn("  … skipped icons — missing abk-mark.png");
  }

  // Header/footer wordmark (retina height for ~32–40px display)
  if (has("abk-logo-horizontal.png")) {
    await resizeMaster("abk-logo-horizontal.png", join(PUB_LOGO, "logo-horizontal.png"), { height: 160 });
  } else {
    console.warn("  … skipped logo-horizontal — missing abk-logo-horizontal.png");
  }

  // Hero circular emblem
  if (has("abk-logo-circular.png")) {
    await resizeMaster("abk-logo-circular.png", join(PUB_LOGO, "logo-circular.png"), { height: 1024 });
  } else {
    console.warn("  … skipped logo-circular — missing abk-logo-circular.png");
  }

  // disc master is read directly by the OG image routes; nothing to generate here,
  // but warn if it's absent so social cards fall back to the text tile.
  if (!has("abk-logo-disc.png")) {
    console.warn("  … OG/social will use the text fallback — missing abk-logo-disc.png");
  }

  // Remove orphaned placeholder art (safe: code no longer references these).
  for (const f of [
    "logo-mark.svg",
    "logo-mark-white.svg",
    "logo-horizontal.svg",
    "logo-emblem.svg",
    "logo-emblem-white.svg",
  ]) {
    removePlaceholder(join(root, "public", f));
  }
  for (const f of [
    "mark-256.png",
    "icon-512.png",
    "favicon-32.png",
    "favicon-16.png",
    "mark-white-512.png",
    "horizontal-940.png",
    "emblem-800.png",
    "emblem-1200.png",
    "emblem-white-1200.png",
  ]) {
    removePlaceholder(join(PUB_LOGO, f));
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
