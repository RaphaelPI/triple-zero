import { getClient } from "@/lib/payload"
import { getLocale } from "next-intl/server"
import { cache } from "react"

export const getHomeCategoriesData = cache(async () => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])
  const category = await payload.find({
    collection: "category",
    select: {
      title: true,
      slug: true,
    },
    locale,
    limit: 999,
  })

  return category
})

export const getNavData = cache(async () => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])
  const nav = await payload.findGlobal({ slug: "nav", locale })
  return nav
})

export const getHomePromotionsData = cache(async () => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])
  const promotions = await payload.find({
    collection: "promotion",
    where: {
      active: {
        equals: true,
      },
    },
    depth: 2,
    limit: 3,
    locale,
  })
  return promotions
})

export const getHomeProductVariantsData = cache(async () => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])
  const variants = await payload.find({
    collection: "product-variant",
    depth: 2,
    locale,
    limit: 999,
  })
  return variants
})
