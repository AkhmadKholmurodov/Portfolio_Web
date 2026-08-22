import type { MetadataRoute } from "next";
import { projects } from "@/content/profile";
import { siteUrl } from "@/lib/site";

/**
 * Six URLs, generated from the same project list the pages are. Adding a fifth
 * case study should never mean remembering to come back here, which is the
 * only reason a hand-written sitemap ever goes stale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
