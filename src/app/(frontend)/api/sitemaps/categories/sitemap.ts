import { MetadataRoute } from "next"

import { env } from "@/env"
import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { getSitemap } from "@/lib/sitemap"

export const revalidate = 86400

function getPageUrl(category: { slug: string }, locale: Locale) {
  return `${env.NEXT_PUBLIC_URL}/${locale}/c/${category.slug}`
}

export async function generateSitemaps() {
  return [{ id: 0 }]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getClient()
  const categories = await payload.find({
    collection: "category",
    depth: 1,
    select: {
      slug: true,
    },
    limit: 999,
  })

  return categories.docs.map((category) => getSitemap(category, getPageUrl))
}
