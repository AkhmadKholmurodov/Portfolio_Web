import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { en } from "@/content/i18n/en";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** eYaqin's real display face — the project journey renders its UI verbatim. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akhmad.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: en.meta.title,
    template: `%s — ${profile.name}`,
  },
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
    "South Korea",
    "Akhmad Kholmurodov",
  ],
  // `images` is deliberately absent from both: `app/opengraph-image.tsx`
  // supplies a 1200×630 card, and file-based metadata overrides this object.
  // The old entry pointed at the 413×531 portrait, which every platform
  // letterboxed or cropped to a sliver.
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
  // Matches the page background exactly, so the mobile browser chrome and the
  // page never show a seam.
  themeColor: "#0a0805",
  colorScheme: "dark",
};

/** Structured data so search results show the role, not just the title. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Full-Stack & WebOps Engineer",
  email: `mailto:${profile.email}`,
  url: siteUrl,
  image: `${siteUrl}${profile.photo}`,
  sameAs: [profile.links.github, profile.links.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gyeongsan",
    addressRegion: "Gyeongbuk",
    addressCountry: "KR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Daegu University",
  },
  knowsLanguage: ["ko", "en", "uz"],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "Application Security",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        {/* Entrance animations are prerendered in their hidden state. Without
            JS nothing would ever reveal them, so no-JS visitors get the page
            with every element already in place. */}
        <noscript>
          <style>{`
            body *:not(svg):not(svg *) {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
          `}</style>
        </noscript>
        <script
          type="application/ld+json"
          // Static object under our control — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
