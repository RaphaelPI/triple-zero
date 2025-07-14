"use server"

import { Locale } from "@/i18n/config"
import { getClient } from "@/lib/payload"

export const getMainMessage = async (locale: Locale) => {
  const payload = await getClient()

  const mainMessage = await payload.findGlobal({
    slug: "message",
    locale,
  })

  return mainMessage
}
