/**
 * The one place the site's own origin is written down.
 *
 * It is an env var because the domain has moved before and will move again:
 * `metadataBase`, the canonical link, the OG/Twitter card URLs and the sitemap
 * all resolve through this, so a wrong value here is every social share
 * preview broken at once — silently, because nothing on the site itself looks
 * different.
 *
 * The default is the domain the site is actually served from today. Set
 * `NEXT_PUBLIC_SITE_URL` in the environment to point it somewhere else (a
 * custom domain, a preview deployment) without touching code.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://seehyuk.vercel.app";
