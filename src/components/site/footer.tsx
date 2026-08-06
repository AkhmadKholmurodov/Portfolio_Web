"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "./icons";

/**
 * Deliberately thin. The contact section directly above it already made the
 * ask; a footer that repeats it is a page that does not trust its own layout.
 */
export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-void/40">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <Link href="/" className="text-sm font-medium text-ink-200">
            {profile.name}
          </Link>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-600">
            {t.footer.built}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="flex size-10 items-center justify-center rounded-full border border-line text-ink-500 transition-colors duration-400 ease-(--ease-out-expo) hover:border-line-hover hover:text-ink-100"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="flex size-10 items-center justify-center rounded-full border border-line text-ink-500 transition-colors duration-400 ease-(--ease-out-expo) hover:border-line-hover hover:text-ink-100"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href="#home"
            aria-label={t.ui.backHome}
            className="flex size-10 items-center justify-center rounded-full border border-line text-ink-500 transition-colors duration-400 ease-(--ease-out-expo) hover:border-line-hover hover:text-ink-100"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line py-6 font-mono text-[0.6875rem] tracking-wide text-ink-700 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {profile.name}. {t.footer.rights}
        </span>
        <span>{t.about.place}</span>
      </div>
    </footer>
  );
}
