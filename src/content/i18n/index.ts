import { en, type Dict } from "./en";
import { ko } from "./ko";
import { uz } from "./uz";

export const locales = ["en", "ko", "uz"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const dictionaries: Record<Locale, Dict> = { en, ko, uz };

export const localeLabels: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  ko: { short: "KO", full: "한국어" },
  uz: { short: "UZ", full: "O'zbekcha" },
};

/** BCP-47 tag for the <html lang> attribute. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  ko: "ko-KR",
  uz: "uz-Latn-UZ",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export type { Dict };
