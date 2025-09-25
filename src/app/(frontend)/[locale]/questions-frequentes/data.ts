import { getClient } from "@/lib/payload"
import { getLocale } from "next-intl/server"
import { cache } from "react"

export const getFaqData = cache(async () => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])
  const faq = await payload.findGlobal({
    slug: "faq",
    locale,
  })

  return faq
})
