"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/magicui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { awards, languages, profile } from "@/content/profile";

const PHOTOS = [
  { src: "/photos/graduation.webp", width: 1280, height: 960, key: "graduation", wide: true },
  { src: "/photos/cafe.webp", width: 960, height: 1280, key: "cafe", wide: false },
  { src: "/photos/portrait.webp", width: 901, height: 1280, key: "portrait", wide: false },
] as const;

/**
 * The page where he is allowed to be a person. Everything else on the site is
 * evidence; this is context.
 */
export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-36">
      <div className="shell">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-600 uppercase transition-colors duration-300 hover:text-ink-200"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-400 ease-(--ease-out-expo) group-hover:-translate-x-0.5" />
          {t.ui.backHome}
        </Link>

        <Reveal className="mt-10">
          <p className="label">{t.about.label}</p>
          <h1 className="display-2 mt-6 max-w-4xl">{t.about.title}</h1>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-20">
          <Reveal className="max-w-2xl">
            <div className="flex flex-col gap-6">
              {t.about.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg leading-relaxed text-ink-200 md:text-xl"
                      : "text-[0.9375rem] leading-relaxed text-ink-300 md:text-base"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal y={26}>
            <figure>
              <div className="media-frame lift-card rounded-2xl border border-line bg-void">
                <Image
                  src="/photos/studio.webp"
                  alt={t.about.photos.studio}
                  width={1174}
                  height={1280}
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  priority
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 font-mono text-[0.6875rem] tracking-wide text-ink-700">
                {t.about.photos.studio}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* ---- photographs ---- */}
        <div className="mt-24 grid gap-6 md:mt-36 md:grid-cols-2">
          {PHOTOS.map((photo, i) => (
            <Reveal
              key={photo.src}
              y={22}
              className={photo.wide ? "md:col-span-2" : ""}
            >
              <figure>
                <div className="media-frame lift-card rounded-2xl border border-line bg-void">
                  <Image
                    src={photo.src}
                    alt={t.about.photos[photo.key as keyof typeof t.about.photos]}
                    width={photo.width}
                    height={photo.height}
                    sizes={photo.wide ? "(max-width: 768px) 100vw, 84rem" : "(max-width: 768px) 100vw, 42rem"}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-4 font-mono text-[0.6875rem] leading-relaxed tracking-wide text-ink-700">
                  {t.about.photos[photo.key as keyof typeof t.about.photos]}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---- languages ---- */}
        <section className="mt-24 grid gap-14 md:mt-36 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="label">{t.about.languagesTitle}</p>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-ink-300">
              {t.about.languagesNote}
            </p>
          </Reveal>

          <RevealGroup className="flex flex-col gap-6" stagger={0.08}>
            {languages.map((lang) => (
              <RevealItem key={lang.key}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-sm tracking-[0.12em] text-ink-200">
                    {lang.code}
                  </span>
                  <span className="text-[0.8125rem] text-ink-500">
                    {t.about.languageLevels[lang.key as keyof typeof t.about.languageLevels]}
                  </span>
                </div>
                {/* A meter, not a bar chart — it is labelled with a word as
                    well as a length, because "85%" of a language is not a
                    thing anyone can actually verify. */}
                <div
                  role="meter"
                  aria-valuenow={lang.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={lang.code}
                  className="mt-3 h-px w-full bg-line"
                >
                  <div
                    className="h-px bg-ink-500"
                    style={{ width: `${lang.level}%` }}
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* ---- away from the keyboard ---- */}
        <section className="mt-24 grid gap-14 md:mt-36 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="label">{t.about.awardsTitle}</p>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-ink-300">
              {t.about.awardsNote}
            </p>
          </Reveal>

          <RevealGroup className="flex flex-col border-t border-line" stagger={0.07}>
            {awards.map((award) => (
              <RevealItem key={`${award.key}-${award.year}`}>
                <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span className="text-[0.9375rem] text-ink-200">
                    {t.about.awards[award.key as keyof typeof t.about.awards]}
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-wide text-ink-600">
                    {award.year}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <Reveal className="mt-24 flex flex-wrap gap-3 md:mt-36">
          <Button asChild size="lg">
            <a href={`mailto:${profile.email}`}>
              <Mail />
              {t.contact.emailCta}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#build">{t.nav.work}</Link>
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
