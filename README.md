# Akhmad Kholmurodov — Portfolio

3D, trilingual portfolio site. Next.js 16 (App Router) · React 19 · TypeScript ·
Tailwind CSS v4 · Motion · React Three Fiber.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
npm run lint
```

## Structure

```
src/
  app/               layout, page, metadata, JSON-LD, sitemap
  content/
    profile.ts       language-neutral facts: links, tech names, dates, colours
    i18n/            en.ts (master shape) · ko.ts · uz.ts · index.ts
  components/
    portfolio.tsx    the single client boundary; composes every section
    nav.tsx          header, scroll-spy, language switcher, mobile sheet
    sections/        hero · about · stack · experience · projects · security · contact
    three/           hero-scene.tsx (canvas) + blob-material.ts (GLSL)
    ui/              reveal · magnetic · spotlight-card · marquee · cursor ·
                     smooth-scroll · section
  hooks/             use-media (matchMedia store) · use-deferred-mount
```

## Editing content

All copy lives in `src/content/i18n/`. `en.ts` defines the shape — its `Dict`
type is exported, and `ko.ts` / `uz.ts` are typed `Dict`, so adding a key to
English makes TypeScript demand it in the other two. That is the intended
workflow: edit `en.ts` first, then let `tsc` tell you what is missing.

Facts that do not need translating — URLs, tech names, dates, project accent
colours — live in `src/content/profile.ts` so they are written once.

## Language switching

Client-side, no routing. The locale is resolved from `localStorage` and then
`navigator.languages`, defaulting to English. `LanguageProvider` reads it
through `useSyncExternalStore`, so the server renders English and the client
reconciles without a hydration mismatch.

## The 3D hero

`hero-scene.tsx` renders an icosahedron displaced in a custom vertex shader
(`blob-material.ts` — two octaves of simplex noise, normals rebuilt from
neighbouring samples), plus a wireframe shell and an additive point cloud.
There is no HDRI or external asset: lighting is two fixed key lights and a
fresnel rim computed in the fragment shader.

Three guards keep it cheap:

- the canvas mounts only once the browser is idle (`useDeferredMount`), so it
  never competes with the headline for first paint;
- `frameloop` drops to `never` as soon as the hero leaves the viewport;
- `prefers-reduced-motion` stops the animation loop, and Lenis and the custom
  cursor disable themselves entirely.

## Deploying

```bash
npx vercel            # preview
npx vercel --prod     # production
```

Set `NEXT_PUBLIC_SITE_URL` to the real domain — it feeds `metadataBase`, the
canonical URL, the Open Graph tags, the JSON-LD and the sitemap.

## Assets

`public/akhmad.jpeg` (portrait) and `public/Akhmad_Kholmurodov_Resume.pdf`
(linked from the header and the mobile menu). Originals are kept in `_assets/`.
