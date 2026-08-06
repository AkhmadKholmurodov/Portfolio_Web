import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { en } from "@/content/i18n/en";
import { profile } from "@/content/profile";

/**
 * The link preview — the first thing a recruiter sees when this URL lands in
 * KakaoTalk, LinkedIn or an email. It is the headline, verbatim.
 */

export const alt = `${profile.name} — Full-Stack & WebOps Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori cannot parse `oklch()`, so these are the sRGB values of the same
 * tokens. Mirrors `globals.css` and `lib/palette.ts` — all three move
 * together or the preview stops looking like the site.
 */
const VOID = "#020305";
const INK = "#F5F6F8";
const MUTED = "#8A8C91";
const DIM = "#585B60";
const SIGNAL = "#F5AD58";
const LINE = "rgba(255,255,255,0.10)";

const FACTS = ["99.9% uptime", "100× cheaper vision", "E-7 visa", "Seoul"];

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
          background: VOID,
          color: INK,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* The one warm light, top right — the same composition as the page. */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 700,
            height: 700,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(245,173,88,0.16), rgba(245,173,88,0) 68%)",
          }}
        />

        <div style={{ display: "flex", height: 4, width: "100%", background: SIGNAL }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 76px",
            gap: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                letterSpacing: 5,
                color: SIGNAL,
                textTransform: "uppercase",
              }}
            >
              Full-stack &amp; WebOps engineer
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 26,
                fontSize: 60,
                fontWeight: 600,
                letterSpacing: -2.6,
                lineHeight: 1.08,
              }}
            >
              <span>{en.hero.line1}</span>
              <span>{en.hero.line2}</span>
              <span style={{ color: SIGNAL }}>{en.hero.line3}</span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 26,
                marginTop: 38,
                paddingTop: 26,
                borderTop: `1px solid ${LINE}`,
                fontSize: 20,
                color: MUTED,
              }}
            >
              {FACTS.map((fact, i) => (
                <div key={fact} style={{ display: "flex", gap: 26 }}>
                  <span>{fact}</span>
                  {i < FACTS.length - 1 && <span style={{ color: DIM }}>·</span>}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <img
              src={photoSrc}
              width={220}
              height={283}
              alt=""
              style={{ borderRadius: 18, border: `1px solid ${LINE}`, objectFit: "cover" }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: -0.6,
              }}
            >
              {profile.name}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
