import { getClient } from "@/lib/payload"
import { getLocale } from "next-intl/server"
import { Where } from "payload"
import { cache } from "react"

export const getCategoryData = cache(async (slug: string) => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])
  const category = await payload.find({
    collection: "category",
    where: { slug: { equals: slug } },
    select: {
      title: true,
      slug: true,
      description: true,
      order: true,
    },
    locale,
    limit: 999,
  })
  return category
})

export const getProductsData = cache(async (categorySlug: string, exludeSlug?: string) => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])

  const where: Where = {
    "category.slug": { equals: categorySlug },
  }

  if (exludeSlug) {
    where.slug = { not_equals: exludeSlug }
  }

  const products = await payload.find({
    collection: "product",
    where,
    locale,
    depth: 1,
    select: {
      title: true,
      slug: true,
      description: true,
      images: {
        image: true,
      },
      options: true,
      advanced: true,
    },
    limit: 999,
  })

  return products
})
