import { MetadataRoute } from "next"

import { env } from "@/env"
import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { getSitemap } from "@/lib/sitemap"
import { Category } from "@/payload-types"

export const revalidate = 86400

function getPageUrl(
  product: { id: string; category: string | Category; slug: string },
  locale: Locale,
) {
  return `${env.NEXT_PUBLIC_URL}/${locale}/${(product.category as Category).slug}/${product.slug}`
}

export async function generateSitemaps() {
  return [{ id: 0 }]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getClient()
  const products = await payload.find({
    collection: "product",
    depth: 2,
    select: {
      slug: true,
      category: true,
    },
    limit: 999,
  })

  return products.docs.map((product) => getSitemap(product, getPageUrl))
}
