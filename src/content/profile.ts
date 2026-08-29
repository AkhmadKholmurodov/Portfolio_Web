/**
 * Language-neutral facts: links, numbers, dates, technology names. Nothing in
 * this file needs translating and nothing in it is a claim about quality —
 * every number here is one Akhmad can point at in a dashboard or a résumé.
 */

export const profile = {
  name: "Akhmad Kholmurodov",
  /**
   * The hero headline, one line per span. A name is not a translation, so it
   * lives here rather than in the three dictionaries — and it is pre-split
   * rather than broken by the browser, because the two lines are a typographic
   * decision, not a wrapping accident.
   */
  nameLines: ["Akhmad", "Kholmurodov"],
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
    medium: "https://medium.com/@seehyuk2000",
    // The CVE-2025-55182 (React2Shell) proof-of-concept. A real repository now,
    // so the Break card links to the exploit itself rather than to the profile.
    cve: "https://github.com/AkhmadKholmurodov/React2Shell_Exploit",
  },
} as const;

/**
 * The hero portrait — one value, deliberately.
 *
 * `null` drops the image and lets the type carry the first screen; a value
 * puts it back. Nothing else changes: the hero collapses to a single column
 * when this is null and yields the right-hand column when it is not.
 *
 * Swapping the picture is `src` and the two intrinsic dimensions, and nothing
 * else — the arch does its own cropping, so a replacement does not have to
 * match this one's aspect ratio.
 */
export type HeroPortrait = {
  /** The one-line swap. Drop a file in `/public` and point this at it. */
  src: string;
  /** Intrinsic size, so Next can reserve the box and avoid a layout shift. */
  width: number;
  height: number;
  /**
   * `object-position` inside the arch. The frame is a harder crop than a
   * rectangle — it takes the top off — so where the head sits is a per-image
   * decision rather than a constant.
   */
  focus: string;
  /**
   * How the image sits in the arch. A cutout — a figure on a transparent
   * background — wants `contain`, so the whole person stands against the arch's
   * own surface rather than being cropped into it. A full photograph wants
   * `cover`, the default, so it fills the frame edge to edge.
   */
  fit?: "cover" | "contain";
};

export const heroPortrait: HeroPortrait | null = {
  // The photograph as shot, background and all — the room, the light, the
  // frame. It fills the arch (`cover` is the default), and the arch itself is
  // now lifted off the page by a real drop shadow so the print reads as
  // *mounted* rather than pasted flat. `50% 16%` keeps the head clear of the
  // arch's rounded top.
  src: "/photos/portrait.webp",
  width: 901,
  height: 1280,
  focus: "50% 16%",
};

export const socials = [
  { key: "github", label: "GitHub", handle: "AkhmadKholmurodov", href: profile.links.github },
  { key: "linkedin", label: "LinkedIn", handle: "akhmadkholmurodov", href: profile.links.linkedin },
  { key: "email", label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
  { key: "phone", label: "Phone", handle: profile.phone, href: `tel:${profile.phoneHref}` },
] as const;

export type Metric = {
  key: string;
  /** Counts up when the number is a single figure. */
  value?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Thousands separators, so 2500 reads as 2,500. */
  grouped?: boolean;
  /** Rendered verbatim instead of counting. A range cannot count up to itself. */
  display?: string;
  source: string;
};

/**
 * The four numbers on the first screen. All four are his own and all four are
 * checkable: three come off systems he operates, the fourth is a count of
 * things that are running.
 */
export const metrics: Metric[] = [
  { key: "orders", value: 2500, decimals: 0, prefix: "~", grouped: true, source: "lowshop" },
  { key: "peakDay", display: "5,000–6,000", source: "lowshop" },
  { key: "visionCost", value: 100, decimals: 0, suffix: "×", source: "smartguard" },
  { key: "live", value: 3, decimals: 0, suffix: "", source: "all" },
];

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
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker", "Linux"],
    diagram: "channels",
    shots: [],
    stats: [
      { key: "orders", value: "~2,500" },
      { key: "channels", value: "3" },
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
      "PostgreSQL (Supabase)",
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
      { key: "cameras", value: "8" },
      { key: "sites", value: "2" },
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
      { key: "testers", value: "15" },
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

/**
 * Twenty-two, down from thirty-five. The old list read as padding — it named
 * things that appear in no project on this site and things nobody would ask a
 * follow-up question about. The rule for staying in: he has shipped something
 * with it, and he would be happy to be asked how it works.
 */
export const stackGroups = [
  {
    key: "languages",
    items: ["TypeScript", "Python", "SQL"],
  },
  {
    key: "frontend",
    items: ["Next.js", "React", "React Native", "Tailwind CSS"],
  },
  {
    key: "backend",
    items: ["NestJS", "Node.js", "FastAPI", "BullMQ", "pytest"],
  },
  {
    key: "data",
    items: ["PostgreSQL", "Redis", "MongoDB", "Supabase", "pandas"],
  },
  {
    key: "ops",
    items: ["Docker", "Linux", "Cafe24", "Sentry"],
  },
  {
    key: "security",
    items: ["OWASP Top 10", "Burp Suite", "Kali Linux"],
  },
] as const;

/**
 * The three that are work — things he did, with something to read at the end
 * of each. These get cards.
 */
export const securityWork = [
  { key: "cve", year: "2025", href: profile.links.cve },
  { key: "writing", year: "", href: profile.links.medium },
  { key: "platforms", year: "" },
] as const;

/**
 * Certifications. Deliberately a list rather than three more cards: a
 * freeCodeCamp certificate should not sit at the same visual weight as
 * reproducing an RCE.
 */
export const certifications = [
  { key: "google", year: "2026" },
  { key: "fortinet", year: "2026" },
  // Year deliberately blank: it is inconsistent across his own materials and
  // an unverified year is worse than no year.
  { key: "freecodecamp", year: "" },
] as const;

export const languages = [
  { key: "ko", code: "KO", level: 90 },
  { key: "en", code: "EN", level: 85 },
  { key: "uz", code: "UZ", level: 100 },
] as const;

/** Recognition for the work itself. */
export const recognition = [
  { key: "presidentTech", year: "2026" },
] as const;

/**
 * Kept because it is true and because it is the only thing on the page that
 * is not about software — which is exactly why an interviewer remembers it.
 */
export const awards = [
  { key: "samsunghyeonTeam", year: "2026", place: 1 },
  { key: "samsunghyeonSingles", year: "2026", place: 2 },
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
  // Reuses the probe formation rather than adding a sixth topology: reviewing
  // a model's output is the same posture as reviewing anyone else's, and the
  // field should not announce a change of subject that has not happened.
  { id: "ai", phase: 3 },
  // Stack has no number and no nav link, but it still needs a scroll trigger —
  // without one the nav readout stuck on "AI" the whole way through the
  // toolkit. It shares AI's formation; it is the same posture, still reviewing.
  { id: "stack", phase: 3 },
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
  { id: "ai", href: "/#ai" },
] as const;
