import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { cache } from "react"

export const getCategoryData = cache(async (slug: string, locale: Locale) => {
  const payload = await getClient()
  const category = await payload.find({
    collection: "category",
    where: { slug: { equals: slug } },
    select: {
      title: true,
      slug: true,
      description: true,
    },
    locale,
  })
  return category
})

export const getProductsData = cache(async (categorySlug: string, locale: Locale) => {
  const payload = await getClient()
  const products = await payload.find({
    collection: "product",
    where: {
      "category.slug": { equals: categorySlug },
    },
    locale,
    depth: 1,
    select: {
      title: true,
      slug: true,
      description: true,
      images: {
        image: true,
      },
    },
  })

  return products
})
