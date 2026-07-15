import { ImageResponse } from "next/og";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

export const alt = "Aquib Belal Khan — ABK Scientific | Scientific software for drug discovery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Embed the real logo (cream disc reads well on navy) if the master is present;
// otherwise fall back to the text tile so the build never breaks pre-asset.
function discLogo(): string | null {
  const p = join(process.cwd(), "public", "logo", "_src", "abk-logo-disc.png");
  if (!existsSync(p)) return null;
  return `data:image/png;base64,${readFileSync(p).toString("base64")}`;
}

export default function OpenGraphImage() {
  const logo = discLogo();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1f3a",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} width={72} height={72} alt="" />
          ) : (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: "#0d9488",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              AB
            </div>
          )}
          <span style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 600 }}>ABK Scientific</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div style={{ color: "#14b8a6", fontSize: 22, fontWeight: 600, letterSpacing: 1 }}>
            Scientific Software Consultancy
          </div>
          <div
            style={{
              color: "white",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            Building scientific software for drug discovery and research automation
          </div>
          <div style={{ color: "#94a3b8", fontSize: 24, lineHeight: 1.4 }}>
            RDKit · Cheminformatics · Python · Lab automation
          </div>
        </div>

        <div style={{ display: "flex", color: "#64748b", fontSize: 20 }}>
          Aquib Belal Khan · Medicinal chemist who codes
        </div>
      </div>
    ),
    { ...size }
  );
}
