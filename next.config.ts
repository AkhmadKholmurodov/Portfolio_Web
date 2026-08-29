import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables React's <ViewTransition> so a project card's cover can morph
    // into the case-study hero rather than the page swapping instantly. App
    // Router runs on a React canary that ships the component; nothing extra to
    // install. Browsers without the View Transitions API simply navigate with
    // no animation — the feature degrades to today's behaviour.
    viewTransition: true,
  },
};

export default nextConfig;
