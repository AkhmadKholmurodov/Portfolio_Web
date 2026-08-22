import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import { LanguageProvider } from "@/components/providers/language-provider";
import { SectionProvider } from "@/components/providers/section-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SceneRoot } from "@/components/scene/scene-root";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { en } from "@/content/i18n/en";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: en.meta.title, template: `%s — ${profile.name}` },
  description: en.meta.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  keywords: [
    "Full-Stack Developer",
    "WebOps Engineer",
    "Next.js",
    "React Native",
    "TypeScript",
    "Application Security",
    "South Korea",
    "Seoul",
    "Akhmad Kholmurodov",
  ],
  // No `images` key on either: `app/opengraph-image.tsx` supplies a proper
  // 1200×630 card, and file-based metadata wins over this object. Naming a
  // portrait here is how sites end up with a letterboxed sliver in Slack.
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: en.meta.title,
    description: en.meta.description,
    siteName: profile.name,
    locale: "en_US",
    alternateLocale: ["ko_KR", "uz_UZ"],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Matches the ground colour exactly, so mobile browser chrome and the page
  // never show a seam at the top of the scroll.
  themeColor: "#020305",
  colorScheme: "dark",
};

/**
 * Structured data, so a search result shows the role rather than just a
 * title. Location is deliberately country-level only — the town he lives in
 * is not on this site anywhere, including here.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Full-Stack & WebOps Engineer",
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.links.github, profile.links.linkedin],
  address: { "@type": "PostalAddress", addressCountry: "KR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Daegu University" },
  knowsLanguage: ["ko", "en", "uz"],
  knowsAbout: [
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Docker",
    "Application Security",
    "OWASP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        {/* Scroll-triggered reveals are prerendered in their hidden state.
            Without JS nothing would ever reveal them, so a no-JS visitor gets
            the page with every element already in place. */}
        <noscript>
          <style>{`
            body *:not(svg):not(svg *) {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        <script
          type="application/ld+json"
          // A static object under our control; no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <LanguageProvider>
          <TooltipProvider delayDuration={200}>
            <SmoothScroll>
              <SectionProvider>
                <SceneRoot />
                <a
                  href="#home"
                  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-on-signal"
                >
                  {en.ui.skip}
                </a>
                <Nav />
                {/* Above the fixed WebGL layer — see the note in globals.css
                    about why the body itself cannot carry a background. */}
                <main className="relative z-10">{children}</main>
                <div className="relative z-10">
                  <Footer />
                </div>
              </SectionProvider>
            </SmoothScroll>
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
