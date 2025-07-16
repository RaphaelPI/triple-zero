import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { cache } from "react"

export const getPromotionData = cache(async (slug: string, locale: Locale) => {
  const payload = await getClient()
  const promotion = await payload.find({
    collection: "promotion",
    where: { slug: { equals: slug } },
    locale,
    depth: 2,
  })
  return promotion
})
