import { MetadataRoute } from "next"

import { env } from "@/env"
import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { getSitemap } from "@/lib/sitemap"

export const revalidate = 86400

function getPageUrl(page: { slug: string }, locale: Locale) {
  return `${env.NEXT_PUBLIC_URL}/${locale}/p/${page.slug}`
}

export async function generateSitemaps() {
  return [{ id: 0 }]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getClient()
  const pages = await payload.find({
    collection: "pages",
    depth: 1,
    select: {
      slug: true,
    },
    limit: 999,
  })

  return pages.docs.map((page) => getSitemap(page, getPageUrl))
}
