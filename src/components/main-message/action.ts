"use server"

import { getClient } from "@/lib/payload"
import { getLocale } from "next-intl/server"

export const getMainMessage = async () => {
  const [locale, payload] = await Promise.all([getLocale(), getClient()])

  const mainMessage = await payload.findGlobal({
    slug: "message",
    locale,
  })

  return mainMessage
}
