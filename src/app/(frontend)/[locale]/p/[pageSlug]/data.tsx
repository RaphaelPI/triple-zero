import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { getLocale } from "next-intl/server"
import { cache } from "react"

export const getPageData = cache(async (slug: string) => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])

  const page = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug }, isPublished: { equals: true } },
    locale,
  })

  return page.docs[0]
})

export const getPagesData = cache(async (locale: Locale) => {
  const payload = await getClient()

  const pages = await payload.find({
    collection: "pages",
    where: { isPublished: { equals: true } },
    locale,
  })
  return pages.docs
})
