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

export type ProjectMeta = {
  key: "eyaqin" | "smartguard" | "eyaqinMobile";
  index: string;
  year: string;
  href?: string;
  repo?: string;
  tech: string[];
  /** Two accent stops used for the card's gradient wash. */
  hue: [string, string];
};

export const projectsMeta: ProjectMeta[] = [
  {
    key: "eyaqin",
    index: "01",
    year: "2025",
    href: "https://eyaqin-app.vercel.app",
    tech: ["Next.js", "React 19", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Zustand", "Tailwind", "Vercel"],
    hue: ["oklch(0.72 0.15 195)", "oklch(0.62 0.19 265)"],
  },
  {
    key: "smartguard",
    index: "02",
    year: "2025",
    tech: ["React 18", "Python", "FastAPI", "OpenCV", "Claude Vision", "PostgreSQL", "Docker"],
    hue: ["oklch(0.74 0.17 85)", "oklch(0.62 0.2 25)"],
  },
  {
    key: "eyaqinMobile",
    index: "03",
    year: "2026",
    tech: ["React Native", "Expo SDK 54", "Expo Router v6", "TanStack Query", "Supabase", "Socket.io", "Reanimated"],
    hue: ["oklch(0.72 0.17 300)", "oklch(0.68 0.16 200)"],
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
