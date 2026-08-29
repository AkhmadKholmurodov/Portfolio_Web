/**
 * English — the source dictionary. `Dict` is inferred from this object, so
 * `ko.ts` and `uz.ts` are checked against it structurally: add a key here and
 * the other two stop compiling until they have it.
 */
export const en = {
  meta: {
    title: "Akhmad Kholmurodov — Full-Stack & WebOps Engineer",
    description:
      "I build production web platforms in South Korea, operate the servers they run on, and practise the attacks I would rather find in my own code. Next.js, React Native, Python, Docker. E-7 visa, open to roles in Seoul and across Korea.",
  },

  ui: {
    menu: "Menu",
    close: "Close",
    language: "Language",
    scroll: "Scroll",
    back: "Back",
    backHome: "Back to home",
    allWork: "All work",
    next: "Next project",
    external: "Opens in a new tab",
    skip: "Skip to content",
    notFound: "That page does not exist.",
  },

  nav: {
    build: "Build",
    run: "Run",
    break: "Break",
    ai: "AI",
    about: "About",
    contact: "Contact",
    resume: "Résumé",
    work: "Work",
  },

  hero: {
    label: "Web platforms · Server operations · Security",
    /** Under the name. The name itself is in `profile.nameLines` — it is the
     *  one string on this page that is the same in all three languages. */
    role: "Full-Stack Engineer",
    lead: "Three years building web platforms in South Korea. Right now I build and run a company's e-commerce system with one other engineer.",
    ctaWork: "See the work",
    ctaResume: "Download résumé",
    availability: "Open to roles in Seoul, or anywhere in Korea",
    visa: "E-7 visa · no sponsorship needed",
    languages: "Korean · English · Uzbek",
  },

  metrics: {
    orders: { label: "Orders / day", source: "across three sales channels" },
    peakDay: { label: "Peak day", source: "설날 and 추석 gift-set season" },
    visionCost: { label: "Cheaper vision", source: "SmartGuard edge routing" },
    live: { label: "Products live", source: "In front of real users" },
  },

  build: {
    label: "01 — Build",
    title: "I build whole products.",
    lead: "Database schema through to deployment. Three of these are live right now.",
  },

  work: {
    caseStudy: "Read the case study",
    visit: "Visit site",
    role: "Role",
    year: "Year",
    stack: "Stack",
    payments: "Payments",
    status: { live: "Live", building: "In development" },
    problem: "The problem",
    decisions: "Decisions that mattered",
    outcome: "Where it landed",
    nextUp: "What I would do next",
    stats: {
      orders: "Orders / day",
      channels: "Sales channels",
      districts: "Districts in the schema",
      states: "Listing states",
      cost: "Cheaper than naïve",
      cameras: "Cameras live",
      sites: "Sites in production",
      platforms: "Platforms",
      testers: "Closed-test users",
    },
  },

  run: {
    label: "02 — Run",
    title: "I run what I build.",
    lead: "Launching is the easy part. I am the one responsible for the deploys, the payment sync and the Linux servers underneath.",
    timeline: "Track record",
    present: "Present",
  },

  experience: {
    sambu: {
      company: "SAMBU Co., Ltd.",
      role: "Full-Stack Engineer (Web Operations)",
      context:
        "D2C e-commerce platform selling through its own storefront, Coupang and Naver SmartStore · two-engineer team",
      bullets: [
        "Build and operate the platform end to end as one of two engineers — Next.js storefront, NestJS API, payments, deployment and server operations on Cafe24.",
        "Designed the order and inventory pipeline as an asynchronous NestJS + BullMQ/Redis service: storefront orders enqueue on write, a five-minute cron poller pulls orders from the Coupang and Naver SmartStore APIs, and workers deduct stock under SELECT FOR UPDATE before fanning the new quantity out to every channel.",
        "Stopped overselling during a holiday gift-set promotion within 30 minutes of live traffic — diagnosed the race condition, made stock deduction atomic at the queue and database level with Redis Redlock and pessimistic row locks, then wrote parallel integration tests so the regression cannot return.",
        "Made payment state recoverable: every request carries an idempotency key and a PENDING record, and a background job reconciles against the PG provider every 10–15 minutes, auto-cancelling or restoring orders left inconsistent by a dropped callback.",
        "Built the daily settlement reconciliation pipeline in Python/pandas — pulls the provider's settlement file, diffs it against the payments table, logs discrepancies to an audit table and alerts the team in Slack.",
        "Integrated the Korean payment rails end to end — card PG (Toss Payments, KG Inicis), Toss Pay, Naver Pay, Kakao Pay — with full and partial refunds made safe by idempotency keys and row-level locking.",
        "Monitor production with Sentry, Cafe24 server logs and Slack alerts.",
      ],
    },
    ccl: {
      company: "Cloud Computing Lab, Daegu University",
      role: "Frontend / Full-Stack Developer",
      context: "University research laboratory",
      bullets: [
        "Web and app prototype for remote control and telemetry of autonomous vehicles.",
        "Proposed and led the migration from Flutter to React and TypeScript, fixing the rendering and compatibility problems that had blocked the prototype.",
        "Delivered ahead of deadline — my first lesson in choosing the right architecture over the convenient one.",
      ],
    },
    daegu: {
      company: "Daegu University",
      role: "B.Sc. Software Engineering",
      context: "Daegu, South Korea",
      bullets: [],
    },
  },

  break: {
    label: "03 — Break",
    title: "I find the holes before someone else does.",
    lead: "I write code with an attacker's checklist open next to the editor. What I practise breaking is what I check for in my own work.",
    certsTitle: "Certifications",
    read: "Read it",
    items: {
      cve: {
        title: "CVE-2025-55182 — React2Shell",
        body: "Reproduced the unsafe-deserialisation RCE in the React Server Components Flight protocol to working code execution in an isolated lab, and published the proof-of-concept — at a time when most public PoCs did not trigger the underlying flaw. Audited and patched every Next.js application under my control inside the disclosure window. Testing was confined to lab targets throughout.",
      },
      writing: {
        title: "Technical writing",
        body: "I publish exploitation walkthroughs of Hack The Box and TryHackMe machines — Kobold, Smol, Chill Hack, Basic Pentesting — covering enumeration, web exploitation and privilege escalation. In Uzbek, a language with almost no security material.",
      },
      platforms: {
        title: "Hack The Box · TryHackMe",
        body: "Web application vulnerability analysis, infrastructure penetration testing, OWASP Top 10.",
      },
      google: {
        title: "Google Cybersecurity Certificate",
        body: "Google, 2026.",
      },
      fortinet: {
        title: "Secure Wireless LAN 7.6 Administrator",
        body: "Fortinet Training Institute, 2026. Wireless LAN security administration.",
      },
      freecodecamp: {
        title: "Front End Development Libraries",
        body: "freeCodeCamp certification.",
      },
    },
  },

  ai: {
    label: "04 — AI",
    title: "I review AI code like any other pull request.",
    // TODO(model-name): Akhmad is supplying the exact name of the self-hosted
    // open-weight model. It is deliberately unnamed until he does.
    lead: "I work with Claude alongside a self-hosted open-weight model I have tuned to my own workflow.",
    body: "What matters is not generating the code. It is reviewing it — structure, quality, security and maintainability — before it reaches a branch. Model output arrives as a proposal, and a proposal gets read the same way any pull request does: I have to be able to explain every line of it before it merges, and the lines I cannot explain do not merge.",
  },

  stack: {
    label: "Toolkit",
    title: "What I work with",
    groups: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      data: "Data",
      ops: "Operations",
      security: "Security",
    },
  },

  contact: {
    label: "05 — Contact",
    title: "Let's talk.",
    lead: "Full-stack or platform work — Seoul, or anywhere in Korea. I hold an E-7 visa, so there is no sponsorship to arrange. Korean, English or Uzbek.",
    emailCta: "Write to me",
    resumeCta: "Download résumé (PDF)",
    responseTime: "I answer email within a day.",
  },

  footer: {
    built: "Next.js, GSAP and a canvas. Type is Archivo, Pretendard and Geist Mono.",
    rights: "All rights reserved.",
  },

  about: {
    label: "About",
    title: "Why I came to Korea, and why I stayed.",
    intro: [
      "I came to Korea for a software engineering degree and stayed because the work got interesting. It started in a university Cloud Computing Lab: an autonomous-vehicle prototype written in Flutter that would not render on mobile. After a few weeks of patching around it I argued we should rebuild the front end in React and TypeScript. I was allowed to lead that, and we shipped ahead of deadline.",
      "That is still how I work. I would rather spend a week on the architecture that makes the next six months boring than a day on the workaround that makes this afternoon easier.",
      "Today I build and run a company's e-commerce platform at SAMBU as one of two engineers, and keep building my own products alongside it. eYaqin started because buying something second-hand at home meant crossing a city for an item worth almost nothing. SmartGuard started because a shop owner told me he had stopped watching his own CCTV — there was too much of it. Alongside that I practise application security: same instinct as the architecture argument. I would rather find the hole in my own code first.",
    ],
    photos: {
      graduation:
        "Graduation, Daegu University — B.Sc. Software Engineering, February 2025.",
      cafe: "A cafe in Daegu, winter.",
      studio: "Studio portrait.",
      portrait: "Portrait.",
    },
    languagesTitle: "Languages",
    languagesNote:
      "All three, daily — Korean at SAMBU, English for documentation and clients, Uzbek with the people eYaqin is actually built for.",
    languageLevels: { ko: "Advanced", en: "Advanced", uz: "Native" },
    recognitionTitle: "Recognition",
    recognitionNote: "Recognition for the work itself.",
    recognition: {
      presidentTech:
        "President Tech Award, Uzbekistan — team lead, with eYaqin",
    },
    awardsTitle: "Away from the keyboard",
    awardsNote: "I play competitive table tennis.",
    awards: {
      samsunghyeonTeam:
        "Samsunghyeon National Open Table Tennis, South Korea — 1st place, team",
      samsunghyeonSingles:
        "Samsunghyeon National Open Table Tennis, South Korea — 2nd place, singles",
      championsLeague: "Table Tennis Champions League — 1st place",
      openChampionship2: "National Open Table Tennis Championship — 2nd place",
    },
    place: "Based in South Korea · Seoul or anywhere in Korea",
  },

  shots: {
    lowshopStorefront:
      "lowshop.net's storefront. The brand grid at the top is the customer's shortest route in; the banner under it is whatever is running that week.",
    lowshopGiftSets:
      "The gift-set catalogue — the pages that carry the 설날 and 추석 peaks, and the ones where an inaccurate stock count costs the most.",
    lowshopBrand:
      "The brand story page. The building is SAMBU's own: the storefront sits in front of a real warehouse.",
    eyaqinHero:
      "eYaqin's landing page. Location is the first thing the product says about itself.",
    eyaqinFeed:
      "The discovery feed, bounded by neighbourhood, by district, or by radius.",
    eyaqinListing:
      "A listing. The seller's manner temperature sits next to their name, not buried in a profile.",
    eyaqinProfile:
      "The seller's own view: every listing with its explicit state, and the buyer attached to it.",
    eyaqinSchema:
      "The schema in Prisma Studio. District and Region are seeded tables — 179 and 14 rows — not free text on a listing.",
    sgHero: "SmartGuard's landing page. The scene is the shop, after closing.",
    sgConsole:
      "The operator console. Every alert carries the model's reasoning and exactly two buttons: real event, or false alarm.",
    sgHow: "How it works, written for a shop owner rather than for an engineer.",
    sgCta:
      "The footer states the limit out loud: a system conclusion is not legal evidence.",
    mbFeed: "The native feed. Location and category filters sit under the thumb.",
    mbChat: "Buyer and seller agreeing a price — in this case, in Korean.",
    mbReview:
      "Review-gated completion. A sale only closes once the review is written, and the review moves the seller's temperature.",
  },

  projects: {
    lowshop: {
      name: "lowshop.net",
      tagline:
        "A company's own storefront, the two marketplaces beside it, and the pipeline that keeps stock honest across all three.",
      summary:
        "SAMBU's official D2C e-commerce platform. I build and operate it as one of two engineers, and I am one of the two people who gets told when it stops answering.",
      role: "Full-Stack Engineer (Web Operations) · two-engineer team",
      problem: {
        title: "The system",
        body: "Three sales channels — the company's own storefront, Coupang and Naver SmartStore — and behind all three, one stock table. Around 2,500 orders a day pass through it, rising to 5,000–6,000 on a 설날 or 추석 gift-set day. Storefront orders enqueue on write; a five-minute cron poller pulls orders from the Coupang and Naver SmartStore APIs. Every one of them ends at the same rows, and every one of them has to leave those rows telling the truth.",
      },
      decisions: {
        title: "The overselling incident",
        items: [
          {
            title: "What broke",
            body: "During a gift-set promotion, concurrent order writes from all three channels raced on the same stock rows, and the platform oversold. This is the failure mode a stock table has: each write reads a quantity, decides it is sufficient, and writes back a decrement — and between the read and the write, another channel has done the same thing against the same row. Under normal traffic the window is too narrow to hit. A promotion is precisely the condition that widens it.",
          },
          {
            title: "The fix, in 30 minutes",
            body: "Atomicity at both levels, because either one alone still leaves a gap. Redis Redlock at the queue level, so two workers cannot hold the same stock item at the same time; SELECT FOR UPDATE at the database level, so even if they somehow did, the second one waits for the first to commit rather than reading a quantity that is already spent. Thirty minutes from the first oversold order to deduction being atomic under live promotion traffic.",
          },
          {
            title: "Why it cannot come back",
            body: "A unit test cannot catch a race condition. It calls the function once, gets the right answer, and passes — which is exactly what the code did before the promotion. So the regression test is a parallel integration test: it fires simultaneous orders at the same stock rows and asserts on what the table holds afterwards. If the locking is ever removed or weakened, that test fails in CI rather than during 설날.",
          },
        ],
      },
      outcome: {
        title: "What else the pipeline does now",
        body: "Payment state is recoverable rather than merely logged: every request carries an idempotency key and a PENDING record, and a background job reconciles against the PG provider every 10–15 minutes, auto-cancelling or restoring orders left inconsistent by a dropped callback. A daily settlement reconciliation pipeline in Python and pandas pulls the provider's settlement file, diffs it against the payments table, writes discrepancies to an audit table and alerts the team in Slack. The Korean payment rails are integrated end to end — card PG through Toss Payments and KG Inicis, plus Toss Pay, Naver Pay and Kakao Pay — with full and partial refunds made safe by the same idempotency keys and row-level locks. Production is watched with Sentry, Cafe24 server logs and Slack alerts.",
      },
      next: {
        title: "What I would do next",
        // Emptied deliberately: both previous items describe work that has
        // since been done. TODO — Akhmad to supply two forward-looking items.
        items: [] as string[],
      },
    },

    eyaqin: {
      name: "eYaqin",
      tagline: "A second-hand marketplace where the whole point is that the seller is nearby.",
      summary:
        "A neighbourhood-first C2C marketplace, built solo in three months for web, iOS and Android: schema, API surface, real-time chat, moderation tooling and deploy.",
      role: "Full-stack · solo",
      problem: {
        title: "The problem",
        body: "Buying something second-hand meant scrolling a nationwide feed and then driving across a city for an item worth almost nothing. The distance was not shown, it was not sortable, and it was the single fact that decided whether the trade was worth making at all. A marketplace that treats location as a filter you may apply is solving a different problem from one that treats it as the ranking.",
      },
      decisions: {
        title: "Decisions that mattered",
        items: [
          {
            title: "Location is a table, not a string",
            body: "Regions and districts are seeded rows — 14 and 179 of them — with real relationships, rather than free text typed onto a listing. That one choice is what makes “my neighbourhood”, “my district” and “within N kilometres” three bounds on a single query instead of three separate features, and it is why the feed can be ranked by proximity rather than merely filtered by it.",
          },
          {
            title: "Five listing states, not a boolean",
            body: "A listing moves through active → reserved → escrow_verification → sold → hidden. An is_sold boolean cannot express an item being held for a buyer, a payment under dispute, or a listing pulled by moderation, so it forces the interface to invent an answer. Transitions are validated server-side, which means a client cannot put a listing into a state the business does not have.",
          },
          {
            title: "Reputation is a number both sides can see",
            body: "Every trader carries a manner temperature that moves with completed trades and reviews, and it sits next to their name on the listing rather than buried in a profile nobody opens. A sale is only confirmed once a review has been written, so the number cannot be farmed by trading constantly and never being rated.",
          },
          {
            title: "Moderation has one place to intervene",
            body: "Reports, moderation flags and rate-limit events are first-class tables rather than an administrator's inbox. Trust and safety on a C2C platform is not a feature you bolt on once there is abuse; it is a shape the schema either has or does not.",
          },
        ],
      },
      outcome: {
        title: "Where it landed",
        body: "Deployed and running: location-aware discovery, the full listing lifecycle, real-time buyer–seller chat with read status, likes and saved items, reporting and moderation, and session and profile handling. Built solo in three months across web, iOS and Android, on Next.js and Prisma against PostgreSQL, with preview builds per branch and environment-separated database branches, so a schema migration could not take production down with it. The production database was later migrated from Neon to Supabase under a capacity deadline, with zero records lost.",
      },
      next: {
        title: "What I would do next",
        items: [
          "Move image storage to object storage with signed URLs, instead of serving uploads through the application.",
          "Add a search index, so radius queries stay fast once the listing count outgrows a sequential scan.",
        ],
      },
    },

    smartguard: {
      name: "SmartGuard",
      tagline: "CCTV that reads itself, for shops that stopped watching the footage.",
      summary:
        "An AI surveillance platform that watches cameras in real time and sends the owner a Telegram alert with a snapshot and an explanation. Eight cameras live across two working sites.",
      role: "Full-stack & vision pipeline · solo",
      problem: {
        title: "The problem",
        body: "A small shop loses stock and has fourteen hours of footage to prove it. Nobody watches fourteen hours of footage. The cameras were already installed and already recording — the missing piece was never more video, it was somebody to look at it, and that job is unaffordable for a single shop.",
      },
      decisions: {
        title: "Decisions that mattered",
        items: [
          {
            title: "Do not send the video to the model",
            body: "The obvious build streams frames to a vision model and produces a bill no corner shop will pay. Instead the pipeline has two tiers: OpenCV motion and person detection runs locally against every frame, and only candidate key frames are forwarded to Claude Vision. That is the whole ballgame — it cut inference cost by more than 100× and it is the difference between a demo and something a shop can actually run.",
          },
          {
            title: "Rules a shop owner can check",
            body: "The owner marks zones — till, shelf, exit — and detections are about the paths between them: reached the exit zone without passing the till, movement outside opening hours, someone standing in one place for two minutes. Each of those is a sentence the owner can read and disagree with, which matters far more here than a score on a benchmark nobody in the shop has heard of.",
          },
          {
            title: "The output is a decision, not a feed",
            body: "An alert arrives on Telegram with a snapshot and two to four sentences of reasoning in the owner's own language, and the console offers exactly two buttons: real event, or false alarm. That feedback is the only thing that makes the system get better at that particular shop.",
          },
          {
            title: "State the limit inside the product",
            body: "The footer says, in plain language, that a system conclusion is not legal evidence and that the final judgement is always a person's. A surveillance product that does not say that is making a promise it cannot keep.",
          },
        ],
      },
      outcome: {
        title: "Where it landed",
        body: "Eight cameras across two sites — a retail shop and a vehicle-service centre — running unattended for six weeks and surfacing six real incidents to the owners by Telegram. Continuous feeds are processed across multi-threaded workers with sub-second alert generation, and any ONVIF or RTSP camera works, so neither site had to replace hardware. React 18 on the front, Python and FastAPI behind it, PostgreSQL for events, deployed with Docker.",
      },
      next: {
        title: "What I would do next",
        items: [
          "Use the operator's real/false labels to tune per-shop thresholds automatically rather than by hand.",
          "Move key-frame batching behind a queue, so a network drop delays alerts instead of losing them.",
        ],
      },
    },

    "eyaqin-mobile": {
      name: "eYaqin Mobile",
      tagline: "The same marketplace, where the trade actually happens.",
      summary:
        "The native client for eYaqin, in React Native. A second-hand trade happens on a phone, between strangers — so upload speed and trust both had to live there.",
      role: "Mobile · solo",
      problem: {
        title: "The problem",
        body: "The web app proved the idea, but the two moments that decide whether a marketplace works are both phone moments: photographing an item well enough to sell it, and deciding whether to meet a stranger. A responsive website does the first badly and cannot really do the second at all — no camera worth the name, no push, and no reason for anyone to open it twice.",
      },
      decisions: {
        title: "Decisions that mattered",
        items: [
          {
            title: "Native where native earns it",
            body: "Camera and gallery upload, push notifications, geolocation and native sharing are the reason this is an app rather than a bookmark. Everything else — feed, filters, listing pages — is the same product as the web, sharing typed endpoints through TanStack Query so the two clients cannot drift apart.",
          },
          {
            title: "Trust is built into the completion flow",
            body: "A sale is not marked complete until a review has been written, and that review moves the seller's manner temperature. It puts the reputation system on the critical path instead of beside it, which is the only way a rating system in a C2C app gets used at all.",
          },
          {
            title: "The neighbourhood is part of the product",
            body: "Residents post local requests and find work nearby, in the same app as the listings. What makes a neighbourhood marketplace work is not inventory — it is that the people in it already have reasons to talk to each other.",
          },
          {
            title: "A feedback channel is product research",
            body: "Structured feature requests are built into the app. It is the cheapest research instrument available to a solo developer, and it is how the roadmap stopped being a guess.",
          },
        ],
      },
      outcome: {
        title: "Where it landed",
        body: "In closed testing with 15 users, on Expo SDK 54 with Expo Router v6, over a shared REST and WebSocket backend with Supabase behind it, Socket.io for live chat events and Reanimated for the interaction work. Real-time chat, camera upload, community posts, manner temperature and review-gated completion are all in.",
      },
      next: {
        title: "What I would do next",
        items: [
          "Offline-first listing drafts, so a photo taken with no signal is not a photo lost.",
          "Group push notifications per conversation, before the notification tray becomes the reason people uninstall.",
        ],
      },
    },
  },
};

/**
 * Deliberately not `as const`. With literal types every string in `ko` and
 * `uz` would have to be character-identical to the English one to satisfy
 * this, which is the exact opposite of what a translation is.
 */
export type Dict = typeof en;
