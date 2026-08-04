export const en = {
  meta: {
    title: "Akhmad Kholmurodov — Full-Stack & WebOps Engineer",
    description:
      "Full-Stack & WebOps Engineer in South Korea. I build and operate production web platforms with Next.js, React Native and Python — and I review my own code with an attacker's checklist.",
  },

  nav: {
    home: "Home",
    about: "About",
    stack: "Stack",
    work: "Work",
    projects: "Projects",
    security: "Security",
    contact: "Contact",
    resume: "Résumé",
  },

  hero: {
    available: "Open to opportunities",
    role: "Full-Stack & WebOps Engineer",
    tagline:
      "I build web products end to end — and then I keep them running.",
    intro:
      "Three years of production platforms in South Korea. Next.js on the front, Node and Python behind it, Linux and Docker underneath — and an attacker's checklist over all of it.",
    ctaWork: "See the work",
    ctaContact: "Get in touch",
    scroll: "Scroll",
    stats: [
      { value: "3+", label: "Years in production" },
      { value: "99.9%", label: "Uptime on lowshop.net" },
      { value: "100×", label: "Vision API cost cut" },
      { value: "3", label: "Languages spoken" },
    ],
  },

  about: {
    eyebrow: "01 · Introduction",
    title: "About me",
    lead: "I build and run web products end to end.",
    body: [
      "My path into development started in a university Cloud Computing Lab, where I rebuilt an autonomous-vehicle control prototype from Flutter to React + TypeScript — my first lesson in choosing the right architecture instead of the convenient one.",
      "Today at SAMBU I own the company's e-commerce platform from the first component to server uptime, and I keep shipping my own products on the side. Alongside development I practise application security — OWASP Top 10, penetration testing and bug bounty — because I would rather find the hole in my own code first.",
      "I work in Korean, English and Uzbek, and I like problems that sit between a clean interface and a system that has to stay up.",
    ],
    facts: [
      { label: "Based in", value: "Daegu · Gyeongsan, South Korea" },
      { label: "Experience", value: "3+ years, production web platforms" },
      { label: "Focus", value: "Next.js · Node · TypeScript · WebOps" },
      { label: "Also", value: "Application security & bug bounty" },
      { label: "Education", value: "Daegu University — Software Engineering" },
      { label: "Work status", value: "E-7 visa holder" },
    ],
    photoCaption: "Daegu, South Korea",
  },

  stack: {
    eyebrow: "02 · Capabilities",
    title: "Tech stack",
    lead: "The tools I reach for, grouped by where they sit in the system.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      data: "Databases",
      devops: "DevOps",
      security: "Security",
      practice: "Ways of working",
    },
  },

  experience: {
    eyebrow: "03 · Track record",
    title: "Experience",
    lead: "Two places where I owned real systems that other people depended on.",
    present: "Present",
    roles: {
      sambu: {
        company: "SAMBU Co., Ltd.",
        role: "Full-Stack & WebOps Engineer",
        location: "Gyeongsan, South Korea",
        context: "Manufacturing & retail company operating its own D2C channel",
        bullets: [
          "Designed, built and operate lowshop.net — the company's official e-commerce platform — owning the full lifecycle from frontend implementation through to server operations.",
          "Launched and manage the storefront across Korea's major commerce channels — Coupang, Naver SmartStore and Toss — covering business profile setup, store build-out and sales system administration.",
          "Maintained 99.9% uptime and cut page load time by 60%, with zero critical downtime across all sales channels.",
          "Optimised the payment and data-synchronisation workflows so the online selling pipeline runs without manual intervention.",
        ],
      },
      ccl: {
        company: "Cloud Computing Lab, Daegu University",
        role: "Frontend / Full-Stack Developer",
        location: "Daegu, South Korea",
        context: "University research laboratory",
        bullets: [
          "Developed a web/app prototype for remote control and telemetry monitoring of autonomous vehicles.",
          "Proposed and led a full migration from a Flutter codebase to ReactJS + TypeScript, resolving the mobile rendering and compatibility issues that blocked the prototype.",
          "Delivered the migration ahead of deadline alongside the Node.js backend developer; owned responsive UI and REST data synchronisation.",
          "Handled version control and code review across GitLab and GitHub within the team workflow.",
        ],
      },
    },
  },

  projects: {
    eyebrow: "04 · Selected work",
    title: "Projects",
    lead: "Three builds I took from an empty repository to something people use.",
    viewLive: "Visit live site",
    privateRepo: "Private repository",
    caseStudy: "Read the detail",
    featuresTitle: "Main features",
    shotsTitle: "The product running",
    close: "Close",
    /** Copy for the scroll-driven walkthrough. `beats` label what the stage
     *  is showing at each phase, in the order the scene plays them. */
    journey: {
      hint: "Keep scrolling",
      beats: {
        eyaqin: [
          "The neighbourhood feed",
          "Radius search on the map",
          "Buyer and seller talking",
          "The listing changes state",
        ],
        smartguard: [
          "A shop, after closing",
          "The camera locks on",
          "The day becomes a sheet of paper",
          "A human signs it off",
        ],
        eyaqinMobile: [
          "The same feed, in the hand",
          "Pins, and a sheet you drag up",
          "Chat that arrives as a push",
          "Nine palettes, one you keep",
        ],
      },
    },
    items: {
      eyaqin: {
        name: "eYaqin",
        subtitle: "Location-based C2C marketplace",
        status: "Live",
        summary:
          "A neighbourhood-first second-hand marketplace. Instead of a nationwide feed, it ranks and filters listings by how close they actually are to you — by district and by radius — so a trade stays a short walk away.",
        role: "Solo full-stack build: schema design, API surface, real-time chat, moderation tooling and deployment.",
        highlights: [
          { value: "Solo", label: "Full-stack build" },
          { value: "5-state", label: "Listing lifecycle" },
          { value: "Real-time", label: "Buyer–seller chat" },
        ],
        features: [
          { title: "Location-aware discovery", body: "District and radius based search and filtering." },
          { title: "Listing lifecycle", body: "Explicit states from active through to sold." },
          { title: "Real-time chat", body: "Buyer–seller messaging with read status." },
          { title: "Trust & safety", body: "Reporting and moderation workflow." },
          { title: "Engagement", body: "Likes, saved items, nearby discovery feed." },
          { title: "Auth & accounts", body: "Session handling and profile management." },
        ],
        deepDive: {
          title: "Listing lifecycle design",
          body: "Every listing moves through explicit states, so both sides always know where a trade stands — and moderation has a single place to intervene.",
          states: {
            active: "Listed and visible in local search",
            reserved: "Buyer agreed, item held",
            escrow_verification: "Payment held and checked",
            sold: "Trade complete",
            hidden: "Withdrawn or moderated",
          },
          whyTitle: "Why states, not booleans",
          why: [
            "A boolean is_sold cannot express a held item, a disputed payment or a removed listing.",
            "Transitions are validated server-side, so the UI can never invent an impossible state.",
          ],
        },
        architecture: [
          {
            title: "Frontend",
            body: "Next.js App Router with React 19 and TypeScript. Zustand for client state, Tailwind for styling, server components for listing pages.",
          },
          {
            title: "Backend & data",
            body: "Route handlers over Prisma against PostgreSQL, migrated from Neon to Supabase under a capacity deadline. API grouped by concern: auth, listings, engagement, nearby discovery.",
          },
          {
            title: "Delivery",
            body: "Deployed on Vercel with preview builds per branch; environment-separated database branches for safe schema migration.",
          },
        ],
        nextTitle: "What I would do next",
        next: [
          "Move image storage to object storage with signed URLs.",
          "Add search indexing so radius queries stay fast at scale.",
        ],
      },

      smartguard: {
        name: "SmartGuard",
        subtitle: "AI-powered CCTV surveillance · SuniyKoz",
        status: "Live pilot in a shop",
        summary:
          "Small retail stores lose inventory to theft and waste hours reviewing CCTV footage. SmartGuard links IP cameras to Claude Vision to auto-detect suspicious activity and send instant Telegram alerts with snapshots.",
        role: "Engineered the entire platform end to end, including multi-threaded camera pipelines, AI routing logic and the web UI.",
        highlights: [
          { value: "100×", label: "Lower VLM API cost" },
          { value: "Sub-second", label: "Alert generation" },
          { value: "24/7", label: "Multi-threaded workers" },
        ],
        shots: [
          {
            alt: "SmartGuard's landing page: a 3D convenience store at night, seen through camera KAM-03, with a detection box tracking a person in the aisle",
            caption: "The landing page puts you behind the camera — a real-time 3D shop you walk through as you scroll, with the detector locking on.",
          },
          {
            alt: "SmartGuard's feature section on cold paper stock, with the day-strip marking two events across an 8:00 to 23:00 ruler",
            caption: "Below it, the design system the whole product runs on: paper stock, one highlighter accent, and a day compressed into a single strip.",
          },
        ],
        features: [
          { title: "Hybrid edge/cloud pipeline", body: "Local OpenCV motion detection filters routine frames before the cloud." },
          { title: "Selective VLM routing", body: "Only key frames reach Claude Vision — the source of the 100× cost cut." },
          { title: "Instant Telegram alerts", body: "Owners get a snapshot and a description, not a timeline to scrub." },
          { title: "Multi-camera workers", body: "Independent threads per camera feed, resilient to single-stream failure." },
          { title: "Event history", body: "PostgreSQL-backed log of detections for later review." },
          { title: "Containerised deploy", body: "Docker on-site, so a store runs it without a DevOps team." },
        ],
        deepDive: {
          title: "Two-tier vision pipeline",
          body: "The expensive part of an AI surveillance system is the model call. So the model only sees frames that already cleared a cheap local filter.",
          steps: [
            { label: "IP camera", body: "Continuous RTSP feed per store camera." },
            { label: "OpenCV filter", body: "Local motion detection discards routine frames." },
            { label: "Frame router", body: "Only candidate key frames are promoted." },
            { label: "Claude Vision", body: "Describes the scene and classifies suspicion." },
            { label: "Telegram alert", body: "Snapshot plus description to the owner's phone." },
          ],
          whyTitle: "Why it matters",
          why: [
            "Sending every frame to a VLM is financially impossible for a corner shop.",
            "Filtering locally cut API cost by over 100× while keeping sub-second alerts.",
          ],
        },
        architecture: [
          {
            title: "Edge",
            body: "Python workers with OpenCV, one thread per camera, handling RTSP decoding and motion gating on the store's own hardware.",
          },
          {
            title: "Cloud",
            body: "FastAPI service that routes candidate frames to Claude Vision, persists detections to PostgreSQL and dispatches Telegram alerts.",
          },
          {
            title: "Interface",
            body: "React 18 dashboard for camera status, detection history and alert configuration. Whole stack shipped as Docker containers.",
          },
        ],
        nextTitle: "What I would do next",
        next: [
          "On-device model for a first-pass classification before any network call.",
          "Per-store tuning so sensitivity adapts to layout and footfall.",
        ],
      },

      eyaqinMobile: {
        name: "eYaqin Mobile",
        subtitle: "Cross-platform native client · React Native",
        status: "Active development",
        summary:
          "The native client for eYaqin. A second-hand trade happens on the phone and between strangers — so upload speed and trust both had to live there.",
        role: "Built with React Native on Expo, sharing a unified REST/WebSocket backend and a single Prisma-managed schema with the web app.",
        highlights: [
          { value: "Expo 54", label: "SDK / Router v6" },
          { value: "Shared", label: "Typed API layer" },
          { value: "Native", label: "Camera, push, geo" },
        ],
        features: [
          { title: "Camera & gallery upload", body: "List an item straight from the camera or the photo library." },
          { title: "Listing sharing", body: "Send any listing to people outside the app." },
          { title: "Real-time chat", body: "Buyer–seller messaging while the trade is being agreed." },
          { title: "Neighbourhood community", body: "Residents post local requests and find work nearby." },
          { title: "Manner temperature", body: "A reputation score that makes a trading history visible." },
          { title: "Review-gated completion", body: "A sale is only confirmed once a review has been written." },
        ],
        deepDive: {
          title: "Trust, made visible",
          body: "Strangers trading in person need a reason to believe each other. Two mechanics carry that weight.",
          steps: [
            { label: "Manner temperature", body: "A running reputation score attached to every profile." },
            { label: "Review gate", body: "A trade is not closed until the counterpart writes a review." },
            { label: "Reporting", body: "Any listing or user can be escalated to moderation." },
            { label: "Feedback channel", body: "Structured in-app feature requests — direct product research." },
          ],
          whyTitle: "Why gate the completion",
          why: [
            "If a review is optional, only angry users write one and the score stops meaning anything.",
            "Gating completion on a review keeps the reputation signal dense and honest.",
          ],
        },
        architecture: [
          {
            title: "App",
            body: "React Native with Expo SDK 54 and Expo Router v6. Reanimated and Moti for fluid interaction, native modules for camera, notifications, location and sharing.",
          },
          {
            title: "Data",
            body: "TanStack Query over typed REST endpoints, Socket.io for live chat events, Supabase (PostgreSQL) with a centralised Prisma schema shared with the web client.",
          },
          {
            title: "Delivery",
            body: "Expo build pipeline with over-the-air updates, so fixes reach users without an app-store round trip.",
          },
        ],
        nextTitle: "What I would do next",
        next: [
          "Offline-first listing drafts so a poor connection never loses an upload.",
          "Background image compression before upload to cut mobile data use.",
        ],
      },
    },
  },

  security: {
    eyebrow: "05 · Beyond the stack",
    title: "Security practice",
    lead: "I develop with an attacker's checklist in mind — the same OWASP categories I practise against on training platforms are the ones I review my own code for.",
    cards: [
      {
        tag: "HackerOne",
        title: "Triaged vulnerability report",
        body: "Submitted a valid vulnerability report against a live production web application. Technically validated and triaged by the vendor's security team — closed as a duplicate, but validity officially confirmed.",
      },
      {
        tag: "HTB & TryHackMe",
        title: "Ongoing practice",
        body: "Regular work on web application vulnerability analysis, infrastructure penetration testing and OWASP Top 10 exercises.",
      },
      {
        tag: "Certified",
        title: "Network & wireless security",
        body: "Secure Wireless LAN 7.6 Administrator — Fortinet Training Institute & ISC2 (2026), covering the CISSP domain Communication and Network Security.",
      },
    ],
    certsTitle: "Certifications",
    languagesTitle: "Languages",
    languageNames: { ko: "Korean", en: "English", uz: "Uzbek" },
    languageLevels: { ko: "KIIP Level 5", en: "Advanced", uz: "Native" },
    awardsTitle: "Outside the terminal",
    awards: [
      "National Open Table Tennis Championship — 1st place (2026)",
      "National Open Table Tennis Championship — 2nd place (2024)",
      "Table Tennis Champions League — 1st place (2024)",
    ],
  },

  contact: {
    eyebrow: "06 · Contact",
    title: "Let's talk",
    lead: "I would be glad to talk about how I can contribute to your team.",
    emailCta: "Write to me",
    copied: "Copied",
    copy: "Copy email",
    availability: "Currently open to full-stack, frontend and WebOps roles in South Korea and remote.",
  },

  footer: {
    built: "Built with Next.js, React Three Fiber and Motion.",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  a11y: {
    languageSwitcher: "Change language",
    menu: "Menu",
    closeMenu: "Close menu",
  },
};

/** Every other locale must satisfy exactly this shape. */
export type Dict = typeof en;
