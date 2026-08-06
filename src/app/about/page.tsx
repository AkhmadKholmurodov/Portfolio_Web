import type { Metadata } from "next";
import { AboutPage } from "@/components/site/about-page";
import { en } from "@/content/i18n/en";

export const metadata: Metadata = {
  title: en.about.label,
  description: en.about.intro[0],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: `${en.about.label} — Akhmad Kholmurodov`,
    description: en.about.intro[0],
    url: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
