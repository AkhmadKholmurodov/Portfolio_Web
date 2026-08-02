"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { profile, socials } from "@/content/profile";
import { Container, Section } from "@/components/ui/section";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link below still works.
    }
  }

  return (
    <Section id="contact" className="noise relative overflow-hidden pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 55% at 50% 100%, color-mix(in oklch, var(--color-accent) 11%, transparent), transparent 72%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-50" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70" />
              <span className="eyebrow">{t.contact.eyebrow}</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/70" />
            </div>
          </Reveal>

          <h2 className="mt-7 text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            <SplitWords text={t.contact.title} />
          </h2>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-ink-300">
              {t.contact.lead}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${profile.email}`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-100 px-7 py-3.5 text-sm font-medium text-ink-950"
                >
                  <span className="relative z-10">{t.contact.emailCta}</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={t.contact.copy}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 font-mono text-[13px] text-ink-300 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? t.contact.copied : profile.email}
                </button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mt-8 max-w-md text-pretty text-[13px] leading-relaxed text-ink-500">
              {t.contact.availability}
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target={social.key === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[13px] text-ink-300 transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500 transition-colors group-hover:text-accent/70">
                    {social.label}
                  </span>
                  {social.handle}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.07]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
          <p className="text-[12px] text-ink-500">
            © {year} {profile.name}. {t.footer.rights}
          </p>

          <p className="order-3 text-[12px] text-ink-700 sm:order-none">
            {t.footer.built}
          </p>

          <a
            href="#home"
            className="group flex items-center gap-2 text-[12px] text-ink-500 transition-colors hover:text-accent"
          >
            {t.footer.backToTop}
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
