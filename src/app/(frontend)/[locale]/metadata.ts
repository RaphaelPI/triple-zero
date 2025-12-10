import type { Metadata } from "next"
import { Robots } from "next/dist/lib/metadata/types/metadata-types"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import { env } from "@/env"
import { LOCALES } from "@/i18n/config"
import { OGImageConfig } from "payload"

export const DEFAULT_OG_IMAGE = {
  url: "https://triple-zero.vrcel.app/logo.webp",
  width: 446,
  height: 140,
}

export function getMetadata({
  locale = "fr",
  pathname,
  title,
  description = "Choisissez les sacs de couchage TRIPLEZERO pour vos expés et treks, légers et chauds grâce à leur système de compartiments étanches garnis pur duvet d'oie 800 cuin minimum.",
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
}): Metadata {
  const siteName = "TRIPLE ZERO pur duvet d'oie"
  const pageTitle = title ? `${siteName} - ${title}` : siteName

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
    description,
    openGraph: {
      siteName,
      type: "website",
      url: canonical,
      locale,
      images,
      title: pageTitle,
      description,
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
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
