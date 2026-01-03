"use server"

import { LOCALES } from "@/i18n/config"
import { getClient } from "@/lib/payload"

export const getMainMessageByLocale = async () => {
  const payload = await getClient()

  const actions = LOCALES.map(async (locale) => {
    const mainMessage = await payload.findGlobal({
      slug: "message",
      locale,
    })
    return { locale, mainMessage }
  })

  return Promise.all(actions)
}
