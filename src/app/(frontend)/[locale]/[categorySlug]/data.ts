import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"

export const getCategoryData = async (slug: string, locale: Locale) => {
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
}
