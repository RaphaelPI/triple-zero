import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { cache } from "react"

export const getProductData = cache(async (slug: string, locale: Locale) => {
  const payload = await getClient()
  const product = await payload.find({
    collection: "product",
    where: { slug: { equals: slug } },
    locale,
    depth: 2,
  })
  return product
})

// export const getCategoryData = cache(async (slug: string, locale: Locale) => {
//   const payload = await getClient()
//   const category = await payload.find({
//     collection: "category",
//     where: { slug: { equals: slug } },
//     select: {
//       title: true,
//       slug: true,
//     },
//     locale,
//   })
//   return category
// })
