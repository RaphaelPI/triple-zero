import "server-only"

import { lightFormat } from "date-fns"
import type { MetadataRoute } from "next"

import { env } from "@/env"
import { Locale, LOCALES } from "@/i18n/config"
import { routing } from "@/i18n/routing"
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types"

export const SITEMAP_PAGE_LIMIT = 10000

export const indexingEnabled = () => env.SERVER_INDEXING_ENABLED

export function getLastMod(date: string | number | Date = new Date()) {
  return date ? lightFormat(date, "yyyy-MM-dd") : undefined
}

interface SitemapItem extends Record<string, any> {
  updatedAt?: string | number | Date
}

type Sitemap = MetadataRoute.Sitemap[0]

export function getSitemap<T extends SitemapItem>(
  item: T,
  getUrl: (item: T, locale: Locale) => string,
  options?: Pick<Sitemap, "priority" | "changeFrequency">,
): Sitemap {
  const languages: Languages<string> = {}

  for (const locale of LOCALES) {
    languages[locale] = getUrl(item, locale)
  }
  return {
    url: getUrl(item, routing.defaultLocale),
    alternates: { languages },
    lastModified: getLastMod(item.updatedAt),
    ...options,
  }
}
