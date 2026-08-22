/**
 * English — the source dictionary. `Dict` is inferred from this object, so
 * `ko.ts` and `uz.ts` are checked against it structurally: add a key here and
 * the other two stop compiling until they have it.
 */
export const en = {
  meta: {
    title: "Akhmad Kholmurodov — Full-Stack & WebOps Engineer",
    description:
      "I build production web platforms in South Korea, operate the servers they run on, and practise the attacks I would rather find in my own code. Next.js, React Native, Python, Docker. E-7 visa, open to roles in Seoul.",
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
    about: "About",
    contact: "Contact",
    resume: "Résumé",
    work: "Work",
  },

  hero: {
    label: "Full-stack & WebOps engineer · South Korea",
    line1: "I build the product.",
    line2: "I run the server.",
    line3: "I break both first.",
    lead: "Three years shipping production platforms in South Korea. Right now: a company's e-commerce stack, built and run by two of us.",
    ctaWork: "See the work",
    ctaResume: "Download résumé",
    availability: "Open to roles in Seoul",
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
    title: "I ship whole products, not tickets.",
    lead: "Schema to deploy. Three are in front of real users right now.",
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
      stage: "Stage",
    },
  },

  run: {
    label: "02 — Run",
    title: "Shipping is the easy half.",
    lead: "A platform that is down is not a platform. I am on the hook for the deploys, the payment sync and the Linux boxes underneath.",
    timeline: "Track record",
    present: "Present",
  },

  experience: {
    sambu: {
      company: "SAMBU Co., Ltd.",
      role: "Full-Stack & WebOps Engineer",
      context: "Manufacturing and retail company running its own D2C channel",
      bullets: [
        "Designed, built and operate lowshop.net — frontend implementation through to server operations.",
        "Launched and run the storefronts on Coupang and Naver SmartStore.",
        "Rebuilt the payment and stock synchronisation so the pipeline runs without anyone touching it.",
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
    title: "I would rather find it myself.",
    lead: "I develop with an attacker's checklist open beside the editor. The categories I practise on are the categories I review my own code for.",
    items: {
      platforms: {
        title: "Hack The Box · TryHackMe",
        body: "Web application vulnerability analysis, infrastructure penetration testing, OWASP Top 10.",
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

  stack: {
    label: "Toolkit",
    title: "What I reach for",
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
    label: "04 — Contact",
    title: "Let's talk.",
    lead: "Full-stack or platform work in Seoul. I hold an E-7 visa, so there is no sponsorship to arrange. Korean, English or Uzbek.",
    emailCta: "Write to me",
    resumeCta: "Download résumé (PDF)",
    responseTime: "I answer email within a day.",
  },

  footer: {
    built: "Next.js, GSAP and a canvas. Type is Inter Tight and Geist Mono.",
    rights: "All rights reserved.",
  },

  about: {
    label: "About",
    title:
      "From Qashqadaryo to Gyeongbuk, by way of a Flutter codebase that would not render.",
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
    awardsTitle: "Away from the keyboard",
    awardsNote:
      "I play competitive table tennis. It is the only thing I do that has a scoreboard somebody else keeps.",
    awards: {
      openChampionship1: "National Open Table Tennis Championship — 1st place",
      championsLeague: "Table Tennis Champions League — 1st place",
      openChampionship2: "National Open Table Tennis Championship — 2nd place",
    },
    place: "Based in South Korea · applying in Seoul",
  },

  shots: {
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
        title: "The problem",
        body: "SAMBU manufactures and sells, and in Korea selling means selling through Coupang and Naver SmartStore — two marketplaces with two admin consoles, two product schemas and two ideas of what a price is. The company also wanted its own storefront, which makes three places where a product's stock, price and description have to agree. Nobody was going to keep three places in agreement by hand.",
      },
      decisions: {
        title: "Decisions that mattered",
        items: [
          {
            title: "Two engineers own the whole lifecycle",
            body: "There are two of us, and between us we hold the frontend, the API and the server. That is deliberate: the fastest way to make a slow page fast is to be allowed to change both the component and the machine serving it, without filing a ticket across a team boundary.",
          },
          {
            title: "Synchronisation runs without a human in it",
            body: "The payment and data-synchronisation workflows were reworked so the selling pipeline does not need anyone to press anything. A manual step in a sales pipeline is not a process — it is an outage waiting for a public holiday.",
          },
          {
            title: "Monitoring before features",
            body: "Sentry, Cafe24 server logs and Slack alerts went in early. If the way you find out that a sales channel has stopped answering is a customer telling you, you do not have a platform — you have a website and a phone number.",
          },
        ],
      },
      outcome: {
        title: "Where it landed",
        body: "Around 2,500 orders a day flow through the pipeline across the three channels, rising to 5,000–6,000 on a 설날 or 추석 gift-set day. The storefront and the two marketplaces have not disagreed about a price since the sync was rebuilt.",
      },
      next: {
        title: "What I would do next",
        items: [
          "Move channel synchronisation onto a queue with dead-letter handling, so a marketplace API outage delays a sync instead of dropping it.",
          "Add per-channel reconciliation reports, so a disagreement is caught by a scheduled job rather than by a customer.",
        ],
      },
    },

    eyaqin: {
      name: "eYaqin",
      tagline: "A second-hand marketplace where the whole point is that the seller is nearby.",
      summary:
        "A neighbourhood-first C2C marketplace. Solo build: schema, API surface, real-time chat, moderation tooling and deploy.",
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
        body: "Deployed and running: location-aware discovery, the full listing lifecycle, real-time buyer–seller chat with read status, likes and saved items, reporting and moderation, and session and profile handling. Built solo on Next.js and Prisma against PostgreSQL, with preview builds per branch and environment-separated database branches, so a schema migration could not take production down with it.",
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
        "An AI surveillance platform that watches retail cameras in real time and sends the owner a Telegram alert with a snapshot and an explanation. Live in a working shop.",
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
        body: "Running in production in a retail store, processing continuous camera feeds across multi-threaded workers with sub-second alert generation. Any ONVIF or RTSP camera works, so the shop did not have to replace hardware. React 18 on the front, Python and FastAPI behind it, PostgreSQL for events, deployed with Docker.",
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
        body: "In active development on Expo SDK 54 with Expo Router v6, over a shared REST and WebSocket backend with Supabase behind it, Socket.io for live chat events and Reanimated for the interaction work. Real-time chat, camera upload, community posts, manner temperature and review-gated completion are all in.",
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
