import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";

/* ------------------------------------------------------------------ *
 * Content
 * ------------------------------------------------------------------ */
const C = {
  name: "AKHMAD KHOLMURODOV",
  role: "Full-Stack & WebOps Engineer",
  // The two facts a Korean screener checks first, so they sit in the header
  // rather than three sections down.
  status: "E-7 visa holder  ·  Korean (Advanced) · English (Advanced) · Uzbek (Native)",
  where: "Gyeongsan, Gyeongbuk, South Korea",
  contact: "+82 10-3802-1005  ·  seehyuk2000@gmail.com",
  links: [
    { label: "github.com/AkhmadKholmurodov", href: "https://github.com/AkhmadKholmurodov" },
    { label: "linkedin.com/in/akhmadkholmurodov", href: "https://linkedin.com/in/akhmadkholmurodov" },
    { label: "eyaqin-app.vercel.app", href: "https://eyaqin-app.vercel.app" },
  ],

  summary:
    "Full-Stack & WebOps Engineer with 3+ years building and operating production web platforms in South Korea. " +
    "Next.js and React Native on the front, Node and Python behind them, Linux and Docker underneath — " +
    "and reviewed against the OWASP Top 10.",

  skills: [
    ["Languages", "TypeScript, JavaScript, Python, SQL"],
    ["Frontend", "React 19, Next.js (App Router), React Native (Expo), Tailwind CSS, Zustand, TanStack Query"],
    ["Backend", "Node.js, Prisma, FastAPI, REST, WebSocket (Socket.io), Stripe"],
    ["Data", "PostgreSQL (Neon, Supabase), MySQL / MariaDB, schema design"],
    ["DevOps", "Docker, Kubernetes (k8s / k3s), GitHub Actions, GitLab CI, Vercel, Linux (Ubuntu)"],
    ["Security", "OWASP Top 10, penetration testing, Burp Suite, Kali Linux, network & WLAN security"],
  ],

  experience: [
    {
      org: "SAMBU Co., Ltd.",
      title: "Full-Stack & WebOps Engineer",
      date: "Sep 2025 – Present",
      context: "Gyeongsan, South Korea  ·  Manufacturing & retail company running its own D2C channel",
      bullets: [
        "Design, build and operate lowshop.net, the company's official e-commerce platform — the full lifecycle from frontend to server operations, including automated payment and data synchronisation.",
        "Maintain 99.9% uptime and cut page load time by 60%, with zero critical downtime across every sales channel.",
        "Launched and manage the storefront across Coupang, Naver SmartStore and Toss — business profile setup, store build-out and sales system administration.",
      ],
    },
    {
      org: "Cloud Computing Lab, Daegu University",
      title: "Frontend / Full-Stack Developer",
      date: "May 2022 – Sep 2024",
      context: "Daegu, South Korea  ·  University research laboratory",
      bullets: [
        "Built a web and mobile prototype for remote control and telemetry monitoring of autonomous vehicles.",
        "Proposed and led the migration from Flutter to React + TypeScript, resolving the rendering and compatibility issues that had blocked the prototype; delivered ahead of deadline.",
        "Owned responsive UI and REST data synchronisation alongside the backend developer; ran code review across GitLab and GitHub.",
      ],
    },
  ],

  projects: [
    {
      // Web and mobile are one product, so they are one entry. Splitting them
      // inflates the project count and hides that the two clients share a
      // backend — which is the more interesting fact.
      name: "eYaqin",
      tag: "Location-based C2C marketplace  ·  web + React Native",
      date: "eyaqin-app.vercel.app",
      href: "https://eyaqin-app.vercel.app",
      stack:
        "Next.js · React 19 · TypeScript · Prisma · PostgreSQL (Neon) · Zustand · React Native (Expo SDK 54) · Socket.io · Vercel",
      bullets: [
        "Neighbourhood-first second-hand marketplace: district- and radius-based search ranks listings by real distance instead of a nationwide feed.",
        "Modelled the listing lifecycle as explicit, server-validated states (active → reserved → escrow_verification → sold → hidden), with real-time chat and moderation tooling on top.",
        "Extended it with a React Native client sharing one typed REST/WebSocket surface — camera upload, push notifications, geolocation and a nine-palette theme system.",
      ],
    },
    {
      name: "SmartGuard",
      tag: "AI-powered CCTV surveillance  ·  SuniyKoz",
      date: "Live in retail production",
      stack: "React 18 · Python · FastAPI · OpenCV · Claude Vision · PostgreSQL · Docker",
      bullets: [
        "Two-tier edge/cloud vision pipeline: local OpenCV motion filtering gates what reaches the Claude vision model, cutting vision-API cost roughly 100× while keeping alert generation under a second.",
        "Pushes a snapshot and a plain-language explanation to Telegram instead of footage to rewind; runs 24/7 on multi-threaded per-camera workers, deployed with Docker.",
      ],
    },
  ],

  security: [
    "HackerOne — reported a vulnerability in a live production web application; validated and triaged by the vendor's security team (closed as duplicate, validity confirmed).",
    "Secure Wireless LAN 7.6 Administrator — Fortinet Training Institute & ISC2, 2026 (CISSP domain: Communication and Network Security)  ·  Front End Development Libraries — freeCodeCamp, 2023.",
    "Ongoing practice on Hack The Box and TryHackMe: web application vulnerability analysis, infrastructure penetration testing, OWASP Top 10.",
  ],

  education: {
    org: "Daegu University",
    title: "B.S. Software Engineering",
    date: "Mar 2021 – Feb 2025",
    context: "Daegu, South Korea",
  },

  awards:
    "National Open Table Tennis Championship — 1st (2026), 2nd (2024)  ·  Table Tennis Champions League — 1st (2024)",
};

/* ------------------------------------------------------------------ *
 * Layout
 * ------------------------------------------------------------------ */
const F = "/usr/share/fonts/truetype/lato/";
const FONT = {
  regular: F + "Lato-Regular.ttf",
  medium: F + "Lato-Medium.ttf",
  semi: F + "Lato-Semibold.ttf",
  bold: F + "Lato-Bold.ttf",
  italic: F + "Lato-Italic.ttf",
};

const INK = "#1a1d21";
const MUTED = "#5c6166";
const ACCENT = "#00706b"; // the site's light-mode accent, dark enough to photocopy
const RULE = "#c9ced3";

const M = { left: 40, right: 40, top: 34, bottom: 26 };
const PAGE = { w: 595.28, h: 841.89 };
const W = PAGE.w - M.left - M.right;

const S = {
  body: 8.45,
  lead: 10.4,
  bulletGap: 1.1,
  section: 8,
  sectionGap: 5,
  entryGap: 5.5,
};

const doc = new PDFDocument({
  size: "A4",
  margins: { top: M.top, bottom: M.bottom, left: M.left, right: M.right },
  info: {
    Title: "Akhmad Kholmurodov — Full-Stack & WebOps Engineer",
    Author: "Akhmad Kholmurodov",
    Subject: "Résumé",
    Keywords:
      "Full-Stack, WebOps, Next.js, React, React Native, TypeScript, Node.js, Python, FastAPI, Docker, Kubernetes, PostgreSQL, OWASP, South Korea, E-7",
  },
  autoFirstPage: true,
});
doc.pipe(createWriteStream(process.argv[2]));

// pdfkit breaks a page the moment text crosses the bottom margin, which fights
// the manual cursor this layout depends on. Zeroing the margin hands
// pagination entirely to `newPage()`.
doc.page.margins.bottom = 0;

let y = M.top;
const USABLE = PAGE.h - M.top - M.bottom;

function newPage() {
  doc.addPage();
  doc.page.margins.bottom = 0;
  y = M.top;
}

function report(label) {
  const used = y - M.top;
  const over = used - USABLE;
  console.error(
    "  " + label + ": " + used.toFixed(0) + " / " + USABLE.toFixed(0) + " pt" +
      (over > 0 ? "  ← " + over.toFixed(0) + "pt TOSHDI" : "  (bo'sh " + (-over).toFixed(0) + "pt)"),
  );
}

/** Draws text and advances the cursor, wrapping inside `width`. */
function line(text, opts = {}) {
  const {
    font = FONT.regular,
    size = S.body,
    color = INK,
    x = M.left,
    width = W,
    lead = S.lead,
    align = "left",
    link,
  } = opts;
  doc.font(font).fontSize(size).fillColor(color);
  const h = doc.heightOfString(text, { width, lineGap: lead - size, align });
  doc.text(text, x, y, { width, lineGap: lead - size, align, link, underline: false });
  y += h;
  return h;
}

function sectionHead(label) {
  y += S.sectionGap;
  doc.font(FONT.bold).fontSize(S.section).fillColor(ACCENT).text(label.toUpperCase(), M.left, y, {
    characterSpacing: 1.5,
    width: W,
  });
  y += S.section + 3;
  doc.moveTo(M.left, y).lineTo(M.left + W, y).lineWidth(0.7).strokeColor(ACCENT).stroke();
  y += 5.5;
}

/** Bold left label, right-aligned date, on one baseline. */
function titleRow(left, leftMuted, right, opts = {}) {
  const size = opts.size ?? 9.7;
  doc.font(FONT.bold).fontSize(size).fillColor(INK);
  const lw = doc.widthOfString(left);
  doc.text(left, M.left, y, { lineBreak: false });

  if (leftMuted) {
    doc.font(FONT.regular).fontSize(size).fillColor(INK);
    doc.text(" — " + leftMuted, M.left + lw, y, { lineBreak: false });
  }
  if (right) {
    doc.font(opts.rightBold ? FONT.semi : FONT.medium).fontSize(8.2).fillColor(opts.rightColor ?? MUTED);
    // Positioned by measurement rather than `align: "right"` — pdfkit cannot
    // derive a link rectangle from an aligned, non-breaking run.
    const rw = doc.widthOfString(right);
    const rx = M.left + W - rw;
    const ry = y + (size - 8.2) * 0.55;
    doc.text(right, rx, ry, { lineBreak: false });
    if (opts.rightLink) doc.link(rx, ry - 1, rw, 10, opts.rightLink);
  }
  y += size + 3.2;
}

function bullets(items) {
  for (const item of items) {
    const bx = M.left + 3.2;
    const tx = M.left + 11;
    const tw = W - 11;
    doc.font(FONT.regular).fontSize(S.body).fillColor(INK);
    const h = doc.heightOfString(item, { width: tw, lineGap: S.lead - S.body });
    doc.circle(bx, y + S.body * 0.52, 1.25).fillColor(MUTED).fill();
    doc.fillColor(INK).text(item, tx, y, { width: tw, lineGap: S.lead - S.body });
    y += h + S.bulletGap;
  }
}

/* ---- header ---- */
const PHOTO = { w: 66, h: 84 };
const px = M.left + W - PHOTO.w;
try {
  // Korean hiring convention expects a portrait; it is cropped to 3:4 and
  // boxed so it reads as a document photo rather than a floating cut-out.
  doc.save();
  doc.roundedRect(px, y, PHOTO.w, PHOTO.h, 3).clip();
  doc.image(process.argv[3], px, y, { cover: [PHOTO.w, PHOTO.h], align: "center", valign: "top" });
  doc.restore();
  doc.roundedRect(px, y, PHOTO.w, PHOTO.h, 3).lineWidth(0.6).strokeColor(RULE).stroke();
} catch {
  // A missing portrait must not cost the whole document.
}

const headW = W - PHOTO.w - 18;
doc.font(FONT.bold).fontSize(20).fillColor(INK).text(C.name, M.left, y + 2, {
  characterSpacing: 0.9,
  width: headW,
});
y += 26;
doc.font(FONT.semi).fontSize(10.6).fillColor(ACCENT).text(C.role, M.left, y, { width: headW });
y += 15;

doc.font(FONT.regular).fontSize(8.3).fillColor(MUTED);
doc.text(C.status, M.left, y, { width: headW });
y += 11;
doc.text(`${C.where}  ·  ${C.contact}`, M.left, y, { width: headW });
y += 11;

// Links, laid out inline so each stays individually clickable.
let lx = M.left;
doc.fontSize(8.3);
C.links.forEach((l, i) => {
  if (i) {
    doc.fillColor(MUTED).text("  ·  ", lx, y, { lineBreak: false });
    lx += doc.widthOfString("  ·  ");
  }
  const lw = doc.widthOfString(l.label);
  doc.fillColor(ACCENT).text(l.label, lx, y, { lineBreak: false });
  doc.link(lx, y - 1, lw, 10, l.href);
  lx += lw;
});
y = Math.max(y + 11, M.top + PHOTO.h + 4);

/* ---- summary ---- */
// A lead paragraph rather than a titled section: at this length a heading
// costs more vertical space than the label is worth.
y += 9;
line(C.summary, { color: MUTED });

/* ---- skills ---- */
sectionHead("Technical skills");
const LABEL_W = 58;
for (const [label, value] of C.skills) {
  doc.font(FONT.semi).fontSize(S.body).fillColor(INK).text(label, M.left, y, { width: LABEL_W, lineBreak: false });
  doc.font(FONT.regular).fontSize(S.body).fillColor(INK);
  const h = doc.heightOfString(value, { width: W - LABEL_W, lineGap: S.lead - S.body });
  doc.text(value, M.left + LABEL_W, y, { width: W - LABEL_W, lineGap: S.lead - S.body });
  y += h + 1.2;
}

/* ---- experience ---- */
sectionHead("Professional experience");
C.experience.forEach((e, i) => {
  if (i) y += S.entryGap;
  titleRow(e.org, e.title, e.date);
  line(e.context, { font: FONT.italic, size: 8.2, color: MUTED, lead: 10 });
  y += 2.5;
  bullets(e.bullets);
});

/* ---- projects ---- */
sectionHead("Selected projects");
C.projects.forEach((p, i) => {
  if (i) y += S.entryGap;
  titleRow(p.name, p.tag, p.date, {
    rightLink: p.href,
    rightColor: p.href ? ACCENT : MUTED,
    rightBold: !!p.href,
  });
  line(p.stack, { font: FONT.italic, size: 8.2, color: MUTED, lead: 10 });
  y += 2.5;
  bullets(p.bullets);
});

/* ---- security ---- */
sectionHead("Security practice & certifications");
bullets(C.security);

/* ---- education & awards ---- */
sectionHead("Education & awards");
titleRow(C.education.org, C.education.title, C.education.date);
line(C.education.context + "  \u00b7  " + C.awards, {
  font: FONT.italic,
  size: 8.2,
  color: MUTED,
  lead: 10.4,
});

report("sahifa");

doc.end();
