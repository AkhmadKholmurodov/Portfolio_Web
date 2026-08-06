import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/work/case-study";
import { en } from "@/content/i18n/en";
import { profile, projectBySlug, projects } from "@/content/profile";

type Params = { params: Promise<{ slug: string }> };

/**
 * Four routes, all known at build time, so all four are prerendered. Nothing
 * on a case study page depends on a request.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  // Metadata is served to crawlers, which do not run the language switcher —
  // so it is always English, matching the prerendered HTML.
  const copy = en.projects[project.slug];
  const title = `${copy.name} — ${copy.tagline}`;

  return {
    title: copy.name,
    description: copy.summary,
    openGraph: {
      type: "article",
      title,
      description: copy.summary,
      url: `/work/${project.slug}`,
      siteName: profile.name,
    },
    twitter: { card: "summary_large_image", title, description: copy.summary },
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return <CaseStudy slug={project.slug} />;
}
