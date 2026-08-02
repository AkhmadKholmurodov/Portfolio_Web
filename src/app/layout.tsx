import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: en.meta.title,
    description: en.meta.description,
    siteName: profile.name,
    locale: "en_US",
    alternateLocale: ["ko_KR", "uz_UZ"],
    images: [{ url: profile.photo, width: 412, height: 527, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
    images: [profile.photo],
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
