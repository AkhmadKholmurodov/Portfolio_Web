/**
 * Language-neutral facts: links, numbers, dates, technology names. Nothing in
 * this file needs translating and nothing in it is a claim about quality —
 * every number here is one Akhmad can point at in a dashboard or a résumé.
 */

export const profile = {
  name: "Akhmad Kholmurodov",
  initials: "AK",
  email: "seehyuk2000@gmail.com",
  phone: "+82 10-3802-1005",
  phoneHref: "+821038021005",
  /** Country only. His town is deliberately not on this site. */
  country: "South Korea",
  visa: "E-7",
  resume: "/Akhmad_Kholmurodov_Resume.pdf",
  headshot: "/akhmad.jpeg",
  links: {
    github: "https://github.com/AkhmadKholmurodov",
    linkedin: "https://linkedin.com/in/akhmadkholmurodov",
    eyaqin: "https://eyaqin-app.vercel.app",
    lowshop: "https://lowshop.net",
  },
} as const;

export const socials = [
  { key: "github", label: "GitHub", handle: "AkhmadKholmurodov", href: profile.links.github },
  { key: "linkedin", label: "LinkedIn", handle: "akhmadkholmurodov", href: profile.links.linkedin },
  { key: "email", label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
  { key: "phone", label: "Phone", handle: profile.phone, href: `tel:${profile.phoneHref}` },
] as const;

/**
 * The four numbers on the first screen. All four are his own and all four are
 * checkable: three come off systems he operates, the fourth is a count of
 * things that are running.
 */
export const metrics = [
  { key: "uptime", value: 99.9, decimals: 1, suffix: "%", source: "lowshop" },
  { key: "loadTime", value: 60, decimals: 0, prefix: "−", suffix: "%", source: "lowshop" },
  { key: "visionCost", value: 100, decimals: 0, suffix: "×", source: "smartguard" },
  { key: "live", value: 3, decimals: 0, suffix: "", source: "all" },
] as const;

export type Metric = (typeof metrics)[number];

/**
 * The site's spine. Build, run, break is not a tagline — it is the literal
 * shape of the résumé, and it is the thing that separates him from every other
 * Next.js portfolio: most people do the first, some do the second, almost
 * nobody doing the first two also does the third.
 */
export const disciplines = [
  { key: "build", id: "build", index: "01", phase: 1 },
  { key: "run", id: "run", index: "02", phase: 2 },
  { key: "break", id: "break", index: "03", phase: 3 },
] as const;

export type Discipline = (typeof disciplines)[number];

/* ------------------------------------------------------------------ *
 * Work
 * ------------------------------------------------------------------ */

export type ProjectSlug = "lowshop" | "eyaqin" | "smartguard" | "eyaqin-mobile";

export type Shot = {
  src: string;
  width: number;
  height: number;
  /** Key into `t.shots` — the caption is translated, the file name is not. */
  caption: string;
};

export type Project = {
  slug: ProjectSlug;
  index: string;
  year: string;
  /** Drives the status dot. `live` is the only value that gets the accent. */
  status: "live" | "building";
  tech: string[];
  href?: string;
  /** Rendered instead of a screenshot grid where there are no screenshots. */
  diagram?: "channels";
  cover?: Shot;
  shots: Shot[];
  /** Two numbers per card. Keys resolve against `t.work.stats`. */
  stats: { key: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "lowshop",
    index: "01",
    year: "2025 — now",
    status: "live",
    href: profile.links.lowshop,
    tech: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Linux", "WebOps"],
    diagram: "channels",
    shots: [],
    stats: [
      { key: "uptime", value: "99.9%" },
      { key: "channels", value: "4" },
    ],
  },
  {
    slug: "eyaqin",
    index: "02",
    year: "2025",
    status: "live",
    href: profile.links.eyaqin,
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL (Neon)",
      "Zustand",
      "Tailwind",
      "Vercel",
    ],
    cover: { src: "/work/eyaqin-hero.webp", width: 1800, height: 1108, caption: "eyaqinHero" },
    shots: [
      { src: "/work/eyaqin-feed.webp", width: 1700, height: 923, caption: "eyaqinFeed" },
      { src: "/work/eyaqin-listing.webp", width: 1700, height: 922, caption: "eyaqinListing" },
      { src: "/work/eyaqin-profile.webp", width: 1700, height: 917, caption: "eyaqinProfile" },
      { src: "/work/eyaqin-schema.webp", width: 1273, height: 844, caption: "eyaqinSchema" },
    ],
    stats: [
      { key: "districts", value: "179" },
      { key: "states", value: "5" },
    ],
  },
  {
    slug: "smartguard",
    index: "03",
    year: "2025",
    status: "live",
    tech: [
      "React 18",
      "Python",
      "FastAPI",
      "OpenCV",
      "Claude Vision",
      "PostgreSQL",
      "Docker",
    ],
    cover: {
      src: "/work/smartguard-hero.webp",
      width: 1600,
      height: 962,
      caption: "sgHero",
    },
    shots: [
      { src: "/work/smartguard-console.webp", width: 2000, height: 1286, caption: "sgConsole" },
      { src: "/work/smartguard-how.webp", width: 1600, height: 941, caption: "sgHow" },
      { src: "/work/smartguard-cta.webp", width: 1600, height: 941, caption: "sgCta" },
    ],
    stats: [
      { key: "cost", value: "100×" },
      { key: "deployment", value: "1" },
    ],
  },
  {
    slug: "eyaqin-mobile",
    index: "04",
    year: "2026",
    status: "building",
    tech: [
      "React Native",
      "Expo SDK 54",
      "Expo Router v6",
      "TanStack Query",
      "Supabase",
      "Socket.io",
      "Reanimated",
    ],
    cover: { src: "/work/mobile-feed.webp", width: 434, height: 945, caption: "mbFeed" },
    shots: [
      { src: "/work/mobile-chat.webp", width: 434, height: 945, caption: "mbChat" },
      { src: "/work/mobile-third.webp", width: 434, height: 945, caption: "mbReview" },
    ],
    stats: [
      { key: "platforms", value: "2" },
      { key: "stage", value: "beta" },
    ],
  },
];

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** The five explicit listing states from eYaqin's lifecycle design. */
export const lifecycleStates = [
  "active",
  "reserved",
  "escrow_verification",
  "sold",
  "hidden",
] as const;

/* ------------------------------------------------------------------ *
 * History
 * ------------------------------------------------------------------ */

export const experience = [
  { key: "sambu", period: "2025.09 — Present", href: profile.links.lowshop },
  { key: "ccl", period: "2022.05 — 2024.09" },
  { key: "daegu", period: "2021.03 — 2025.02" },
] as const;

export const stackGroups = [
  {
    key: "languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    key: "frontend",
    items: ["React 19", "Next.js 16", "React Native", "Expo", "Tailwind CSS", "shadcn/ui", "Zustand", "TanStack Query"],
  },
  {
    key: "backend",
    items: ["Node.js", "FastAPI", "Prisma", "REST", "GraphQL", "Socket.io", "Clerk", "Stripe"],
  },
  {
    key: "data",
    items: ["PostgreSQL", "Neon", "Supabase", "MySQL", "MariaDB", "Schema design"],
  },
  {
    key: "ops",
    items: ["Docker", "Kubernetes (k8s/k3s)", "GitHub Actions", "GitLab CI", "Vercel", "Linux (Ubuntu)", "Uptime monitoring"],
  },
  {
    key: "security",
    items: ["OWASP Top 10", "Penetration testing", "Burp Suite", "Kali Linux", "Network & WLAN security"],
  },
] as const;

export const security = [
  { key: "hackerone", year: "", href: "https://hackerone.com" },
  { key: "platforms", year: "" },
  { key: "fortinet", year: "2026" },
  { key: "freecodecamp", year: "2023" },
] as const;

export const languages = [
  { key: "ko", code: "KO", level: 90 },
  { key: "en", code: "EN", level: 85 },
  { key: "uz", code: "UZ", level: 100 },
] as const;

/**
 * Kept because it is true and because it is the only thing on the page that
 * is not about software — which is exactly why an interviewer remembers it.
 */
export const awards = [
  { key: "openChampionship1", year: "2026", place: 1 },
  { key: "championsLeague", year: "2024", place: 1 },
  { key: "openChampionship2", year: "2024", place: 2 },
] as const;

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

/**
 * Section ids in document order, with the 3D formation each one asks for.
 * `SectionProvider` is the only consumer — it drives both the nav's current
 * item and `sceneState.targetPhase` from this one list.
 */
export const sections = [
  { id: "home", phase: 0 },
  { id: "build", phase: 1 },
  { id: "run", phase: 2 },
  { id: "break", phase: 3 },
  { id: "contact", phase: 4 },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/**
 * What the nav actually shows. `home` is the logo, so it is not in here — and
 * neither is `contact`, which has its own button on the right-hand side.
 */
export const navItems = [
  { id: "build", href: "/#build" },
  { id: "run", href: "/#run" },
  { id: "break", href: "/#break" },
] as const;
