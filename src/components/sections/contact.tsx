"use client";

import Image from "next/image";
import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/magicui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { profile, socials } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/site/icons";

const ICONS = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  phone: Phone,
} as const;

/** The ask. Two buttons and four rows, and no form. */
export function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact" className="pb-32 md:pb-44">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20">
        <div>
          <Reveal>
            <p className="label">{t.contact.label}</p>
            <h2 className="display-1 mt-6 text-ink-100">{t.contact.title}</h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-300 md:text-lg">
              {t.contact.lead}
            </p>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-3" y={16}>
            <Button asChild size="lg">
              <a href={`mailto:${profile.email}`}>
                <Mail />
                {t.contact.emailCta}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.resume} download>
                <Download />
                {t.contact.resumeCta}
              </a>
            </Button>
          </Reveal>

          <p className="mt-5 font-mono text-[0.6875rem] tracking-wide text-ink-600">
            {t.contact.responseTime}
          </p>
        </div>

        {/* The one candid photograph on the home page, and it is here on
            purpose: the section is asking a stranger to write to a person,
            and every other picture on this page is of a suit or a product.
            This is also the face that carries the phone layout, where the
            hero portrait is dropped. */}
        <Reveal y={22} className="w-full max-w-sm lg:w-80">
          <figure>
            <div className="media-frame lift-card rounded-2xl border border-line">
              <Image
                src="/photos/cafe.webp"
                alt={t.about.photos.cafe}
                width={960}
                height={1280}
                sizes="(max-width: 1024px) 24rem, 20rem"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[0.625rem] tracking-wide text-ink-700">
              {t.about.photos.cafe}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <RevealGroup className="mt-20 border-t border-line" stagger={0.06}>
        {socials.map((social) => {
          const Icon = ICONS[social.key];
          return (
            <RevealItem key={social.key}>
              <a
                href={social.href}
                target={social.key === "github" || social.key === "linkedin" ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="group flex items-center gap-5 border-b border-line py-5 transition-colors duration-400 ease-(--ease-out-expo) hover:border-line-hover"
              >
                <Icon className="size-4 shrink-0 text-ink-700 transition-colors duration-400 group-hover:text-ink-300" />
                <span className="label w-24 shrink-0">{social.label}</span>
                <span className="min-w-0 flex-1 truncate text-[0.9375rem] text-ink-200">
                  {social.handle}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-ink-700 transition-all duration-400 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-300" />
              </a>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
