/**
 * Language-neutral facts: links, numbers, tech names, dates.
 * Anything that needs translating lives in `src/content/i18n/*`.
 */

export const profile = {
  name: "Akhmad Kholmurodov",
  initials: "AK",
  email: "seehyuk2000@gmail.com",
  phone: "+82 10-3802-1005",
  photo: "/akhmad.jpeg",
  resume: "/Akhmad_Kholmurodov_Resume.pdf",
  links: {
    github: "https://github.com/AkhmadKholmurodov",
    linkedin: "https://linkedin.com/in/akhmadkholmurodov",
    live: "https://eyaqin-app.vercel.app",
  },
} as const;

export const socials = [
  { key: "github", label: "GitHub", handle: "AkhmadKholmurodov", href: profile.links.github },
  { key: "linkedin", label: "LinkedIn", handle: "akhmadkholmurodov", href: profile.links.linkedin },
  { key: "email", label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
] as const;

export const stackGroups = [
  {
    key: "frontend",
    items: ["React 19", "Next.js 14/15/16", "TypeScript", "Tailwind CSS", "shadcn/ui", "MUI", "Zustand", "TanStack Query"],
  },
  {
    key: "backend",
    items: ["Node.js", "Prisma", "FastAPI", "REST", "GraphQL", "Socket.io", "Clerk", "Stripe"],
  },
  {
    key: "data",
    items: ["PostgreSQL", "Neon", "Supabase", "MySQL", "MariaDB", "Schema design"],
  },
  {
    key: "devops",
    items: ["Docker", "Kubernetes (k8s/k3s)", "GitHub Actions", "GitLab CI", "Vercel", "Linux (Ubuntu)"],
  },
  {
    key: "security",
    items: ["OWASP Top 10", "Penetration testing", "Kali Linux", "Network & WLAN security", "Burp Suite"],
  },
  {
    key: "practice",
    items: ["Git flow", "Code review", "Agile sprints", "Figma hand-off", "Observability"],
  },
] as const;

/** Rendered in the infinite marquee under the hero. */
export const marqueeTech = [
  "TypeScript", "Next.js", "React 19", "React Native", "Node.js", "Python",
  "FastAPI", "Prisma", "PostgreSQL", "Docker", "Kubernetes", "Tailwind CSS",
  "Vercel", "Supabase", "Socket.io", "OWASP",
] as const;

export type ExperienceMeta = {
  key: "sambu" | "ccl";
  period: string;
  site?: string;
};

export const experienceMeta: ExperienceMeta[] = [
  { key: "sambu", period: "2025.09 — Present", site: "https://lowshop.net" },
  { key: "ccl", period: "2022.05 — 2024.09" },
];

/**
 * The journey's entire colour budget: one ramp, three stops.
 *
 * The three products look nothing alike in real life — a warm gold
 * marketplace, a lime-marker paper report, a neumorphic phone app. Reproducing
 * their real palettes side by side turns the section into a fruit salad, so
 * each scene keeps its *form* (surfaces, type, motion, layout) and borrows its
 * *colour* from here. Matched chroma and a gentle lightness fall mean any two
 * stops still look related mid cross-fade.
 *
 * Stop 1 is `--color-accent` exactly, so the journey never leaves the site
 * palette. Each stop carries a hex per theme because the scenes build colours
 * by concatenating alpha, which `var()` cannot do.
 */
export const signalRamp = [
  { css: "var(--color-signal-1)", dark: "#3ADFD7", light: "#007F79" },
  { css: "var(--color-signal-2)", dark: "#51BEFF", light: "#0076BB" },
  { css: "var(--color-signal-3)", dark: "#AD8DFD", light: "#7E5DC8" },
] as const;

export type Signal = (typeof signalRamp)[number];

/**
 * The stop to paint with, for the theme currently on screen.
 *
 * Consumers concatenate alpha onto these (`${hex}44`), which a `var()` cannot
 * support — so the hex has to be resolved in JS rather than left to CSS. The
 * light values are each darkened to the lightness that clears 4.5 : 1 on the
 * light page; the neon originals are invisible on white.
 */
export function signalHex(signal: Signal, isDark: boolean) {
  return isDark ? signal.dark : signal.light;
}

export type ProjectMeta = {
  key: "eyaqin" | "smartguard" | "eyaqinMobile";
  /** Which scene the journey stage renders for this project. */
  scene: "web" | "surveillance" | "mobile";
  index: string;
  year: string;
  href?: string;
  repo?: string;
  tech: string[];
  /** Stop on `signalRamp` — the scene's single accent. */
  signal: Signal;
  /**
   * Captures of the product actually running, shown in the case study.
   * The walkthrough scenes are reconstructions; these are the proof that the
   * thing exists. File names only — their captions are translated.
   */
  shots?: string[];
};

export const projectsMeta: ProjectMeta[] = [
  {
    key: "eyaqin",
    scene: "web",
    index: "01",
    year: "2025",
    href: "https://eyaqin-app.vercel.app",
    tech: ["Next.js", "React 19", "TypeScript", "Prisma", "PostgreSQL (Supabase)", "Zustand", "Tailwind", "Vercel"],
    signal: signalRamp[0],
  },
  {
    key: "smartguard",
    scene: "surveillance",
    index: "02",
    year: "2025",
    tech: ["React 18", "Python", "FastAPI", "OpenCV", "Claude Vision", "PostgreSQL", "Docker"],
    signal: signalRamp[1],
    shots: ["smartguard-hero", "smartguard-system"],
  },
  {
    key: "eyaqinMobile",
    scene: "mobile",
    index: "03",
    year: "2026",
    tech: ["React Native", "Expo SDK 54", "Expo Router v6", "TanStack Query", "Supabase", "Socket.io", "Reanimated"],
    signal: signalRamp[2],
  },
];

/** The five explicit listing states from the eYaqin lifecycle design. */
export const lifecycleStates = [
  "active",
  "reserved",
  "escrow_verification",
  "sold",
  "hidden",
] as const;

export const certifications = [
  {
    key: "fortinet",
    name: "Secure Wireless LAN 7.6 Administrator",
    issuer: "Fortinet Training Institute & ISC2",
    year: "2026",
  },
  {
    key: "fcc",
    name: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    year: "2023",
  },
] as const;

export const languages = [
  { key: "ko", code: "KO", level: 90 },
  { key: "en", code: "EN", level: 85 },
  { key: "uz", code: "UZ", level: 100 },
] as const;

export const sectionIds = [
  "home",
  "about",
  "stack",
  "work",
  "projects",
  "security",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
