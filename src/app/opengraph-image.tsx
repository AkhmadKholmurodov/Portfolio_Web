import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { en } from "@/content/i18n/en";
import { profile } from "@/content/profile";

/**
 * The link preview — the first thing a recruiter sees when this URL lands in
 * KakaoTalk, LinkedIn or an email.
 *
 * It is a typographic card rather than a photograph, because a preview is
 * rendered at roughly 300–500px wide: a face at that size says nothing, while
 * four short facts say everything a screener needs before deciding to click.
 * The facts themselves are read from the site's own content files, so the card
 * cannot drift out of sync with the page.
 */

export const alt = `${profile.name} — ${en.hero.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The signal ramp, as hex — Satori cannot parse `oklch()`. */
const RAMP = ["#4B4B5C", "#616172", "#31313E"];
const BG = "#F0F0F2";
const FG = "#18181E";
const MUTED = "#6B6B73";
const LINE = "#D6D6DB";

/** Three decision-relevant facts. Short enough to stay on one line each — a
 *  wrapped pill reads as a layout bug at preview size. */
const FACTS = [
  en.about.facts.find((f) => f.label === "Work status")?.value ?? "E-7 visa",
  `Korean · ${en.security.languageLevels.ko}`,
  "Daegu, South Korea",
];

const STACK = ["Next.js", "TypeScript", "Node", "Python", "Docker"];

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public", "akhmad.jpeg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: FG,
          fontFamily: "sans-serif",
        }}
      >
        {/* The site's accent ramp, as a signature stripe. */}
        <div
          style={{
            height: 6,
            width: "100%",
            background: `linear-gradient(90deg, ${RAMP[0]}, ${RAMP[1]}, ${RAMP[2]})`,
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 72px",
            gap: 56,
          }}
        >
          {/* ---- the facts ---- */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 6,
                color: RAMP[0],
                textTransform: "uppercase",
              }}
            >
              Portfolio
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
                fontSize: 68,
                fontWeight: 600,
                letterSpacing: -2.5,
                lineHeight: 1.06,
              }}
            >
              <span>Akhmad</span>
              <span>Kholmurodov</span>
            </div>

            <div style={{ display: "flex", marginTop: 20, fontSize: 30, color: MUTED }}>
              {en.hero.role}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 34 }}>
              {FACTS.map((fact, i) => (
                <div
                  key={fact}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    padding: "10px 20px",
                    borderRadius: 999,
                    fontSize: 21,
                    color: RAMP[i],
                    border: `1px solid ${RAMP[i]}55`,
                    background: `${RAMP[i]}14`,
                  }}
                >
                  {fact}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 32,
                paddingTop: 26,
                borderTop: `1px solid ${LINE}`,
                fontSize: 21,
                color: MUTED,
                letterSpacing: 1,
              }}
            >
              {STACK.join("   ·   ")}
            </div>
          </div>

          {/* ---- the person ---- */}
          <div style={{ display: "flex", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -26,
                borderRadius: 40,
                background: `radial-gradient(circle, ${RAMP[0]}22, transparent 70%)`,
              }}
            />
            <img
              src={photoSrc}
              width={252}
              height={324}
              alt=""
              style={{ borderRadius: 22, border: `1px solid ${LINE}`, objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
