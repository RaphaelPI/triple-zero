import { getClient } from "@/lib/payload"
import { getLocale } from "next-intl/server"
import { cache } from "react"

export const getProductData = cache(async (slug: string) => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])
  const product = await payload.find({
    collection: "product",
    where: { slug: { equals: slug } },
    locale,
    depth: 2,
  })
  return product
})
