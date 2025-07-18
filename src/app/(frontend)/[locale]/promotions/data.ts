import { getClient } from "@/lib/payload"
import { getLocale } from "next-intl/server"
import { cache } from "react"

export const getPromotionsData = cache(async () => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])
  const promotions = await payload.find({
    collection: "promotion",
    where: {
      active: {
        equals: true,
      },
    },
    depth: 2,
    locale,
  })

  return promotions
})
