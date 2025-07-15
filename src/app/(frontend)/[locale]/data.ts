import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { cache } from "react"

export const getCategoriesData = cache(async (locale: Locale) => {
  const payload = await getClient()
  const category = await payload.find({
    collection: "category",
    select: {
      title: true,
      slug: true,
    },
    locale,
  })
  return category
})

export const getNavData = cache(async (locale: Locale) => {
  const payload = await getClient()
  const nav = await payload.findGlobal({ slug: "nav", locale })
  return nav
})

export const getPromotionsData = cache(async (locale: Locale) => {
  const payload = await getClient()
  const promotions = await payload.find({
    collection: "promotion",
    depth: 2,
    locale,
  })
  return promotions
})

export const getProductVariantsData = cache(async (locale: Locale) => {
  const payload = await getClient()
  const variants = await payload.find({
    collection: "product-variant",
    depth: 2,
    locale,
  })
  return variants
})
