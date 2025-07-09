import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"

export const getProductData = async (slug: string, locale: Locale) => {
  const payload = await getClient()
  const product = await payload.find({
    collection: "product",
    where: { slug: { equals: slug } },
    locale,
  })
  return product
}

export const getCategoryData = async (slug: string, locale: Locale) => {
  const payload = await getClient()
  const category = await payload.find({
    collection: "category",
    where: { slug: { equals: slug } },
    select: {
      title: true,
      slug: true,
    },
    locale,
  })
  return category
}
