import type { Metadata } from "next"
import { Robots } from "next/dist/lib/metadata/types/metadata-types"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import { env } from "@/env"
import { LOCALES } from "@/i18n/config"
import { getTranslations } from "next-intl/server"
import { OGImageConfig } from "payload"

export const DEFAULT_OG_IMAGE = {
  url: "https://triple-zero.vrcel.app/logo.webp",
  width: 446,
  height: 140,
}

export const getMetadata = async ({
  locale = "fr",
  pathname,
  title,
  description,
  robots = {
    index: env.SERVER_INDEXING_ENABLED,
    follow: env.SERVER_INDEXING_ENABLED,
  },
  openGraph = {},
  more = {},
  images,
}: {
  locale?: string
  pathname?: string
  title?: string
  description?: string
  robots?: Robots
  openGraph?: OpenGraph
  images?: OGImageConfig[]
  more?: Metadata
}): Promise<Metadata> => {
  const t = await getTranslations()
  const siteName = t("seo_title")
  // No fallback to the home description: pages without an explicit description
  // (editorial pages with empty meta) must not inherit the generic homepage meta.
  const desc = description
  let pageTitle = title ? title : siteName

  if (!pageTitle.includes(" | Triple Zéro")) {
    pageTitle += " | Triple Zéro"
  }

  if (!pathname) {
    return {
      title: pageTitle,
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  if (!images) {
    images = [DEFAULT_OG_IMAGE]
  }

  const canonical = new URL(`/${locale}${pathname}`, env.NEXT_PUBLIC_URL).toString()
  return {
    title: pageTitle,
    description: desc,
    openGraph: {
      siteName,
      type: "website",
      url: canonical,
      locale,
      images,
      title: pageTitle,
      description: desc,
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
    },
    robots,
    alternates: {
      canonical,
      languages: {
        "x-default": pathname || "/",
        ...Object.fromEntries(LOCALES.map((lang) => [lang, `/${lang}${pathname}`])),
      },
    },
    ...more,
  }
}
