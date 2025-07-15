import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { cache } from "react"

export const getFaqData = cache(async (locale: Locale) => {
  const payload = await getClient()
  const faq = await payload.findGlobal({
    slug: "faq",
    locale,
  })

  return faq
})
