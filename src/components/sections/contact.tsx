"use client";

import Image from "next/image";
import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import { Section } from "@/components/site/section";
import { Button, buttonStack } from "@/components/ui/button";
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
    <Section id="contact" className="pb-20 md:pb-44">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20">
        <div>
          <Reveal>
            <p className="label">{t.contact.label}</p>
            <h2 className="display-1 mt-6 text-ink-100">{t.contact.title}</h2>
            <p className="lede measure mt-8">
              {t.contact.lead}
            </p>
          </Reveal>

          {/* Stacked and full width on a phone, for the same reason as the
              hero's pair — see the note there. */}
          <Reveal
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            y={16}
          >
            <Button asChild size="lg" className={buttonStack}>
              <a href={`mailto:${profile.email}`}>
                <Mail />
                {t.contact.emailCta}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className={buttonStack}>
              <a href={profile.resume} download>
                <Download />
                {t.contact.resumeCta}
              </a>
            </Button>
          </Reveal>

          <p className="mt-5 font-mono text-label tracking-label text-ink-400">
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
            <figcaption className="mt-3 caption font-mono tracking-label">
              {t.about.photos.cafe}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 border-t border-line md:mt-20" stagger={0.06}>
        {socials.map((social) => {
          const Icon = ICONS[social.key];
          return (
            <RevealItem key={social.key}>
              <a
                href={social.href}
                target={social.key === "github" || social.key === "linkedin" ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="group flex items-center gap-5 border-b border-line py-5 transition-colors duration-400 ease-(--ease-out-expo) hover:border-line-hover hover:bg-signal-soft"
              >
                <Icon className="size-4 shrink-0 text-ink-500 transition-colors duration-400 group-hover:text-signal" />
                {/* Label over handle on a phone, label beside handle from
                    `sm`. Side by side, a 96px label column plus the icon and
                    the arrow left 190px for the handle on a 390px screen —
                    which truncated the email address, on the row whose entire
                    job is to show the email address. Stacked, it has the width.
                    
                    The row also leans a couple of pixels towards the arrow on
                    hover: the smallest gesture that says the whole row is the
                    target rather than the handle inside it. `transform` only,
                    so nothing reflows under the pointer. */}
                <span className="flex min-w-0 flex-1 flex-col gap-0.5 transition-transform duration-400 ease-(--ease-out-expo) group-hover:translate-x-1 sm:flex-row sm:items-center sm:gap-5">
                  <span className="label sm:w-24 sm:shrink-0">{social.label}</span>
                  <span className="min-w-0 truncate text-body text-ink-200 sm:flex-1">
                    {social.handle}
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-ink-500 transition-all duration-400 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-300" />
              </a>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
