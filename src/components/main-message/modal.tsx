"use client"

import { useCookieState } from "@/hooks/use-cookie-state"
import { useSessionStorageState } from "@/hooks/use-storage-state"
import { Media, Message } from "@/payload-types"
import { setDefaultOptions } from "date-fns"
import { enGB, fr } from "date-fns/locale"
import { useLocale, useTranslations } from "next-intl"
import { useCallback } from "react"
import { Image } from "../image"
import { RichText } from "../rich-text"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { getMainMessageByLocale } from "./action"

export const MainMessageModal = () => {
  const locale = useLocale()
  const t = useTranslations()

  // Set the locale for date-fns
  setDefaultOptions({ locale: locale === "fr" ? fr : enGB })

  const fetchMessage = useCallback(async () => {
    const m = await getMainMessageByLocale()
    return m
  }, [])

  const [message] = useSessionStorageState<{ locale: string; mainMessage: Message }[] | null>(
    "main-messages",
    null,
    fetchMessage,
  )
  const [shown, setShown] = useCookieState<boolean>("main-message-shown", false)

  if (!message) {
    return null
  }

  const localeMessage = message.find((m) => m.locale === locale)
  if (!localeMessage) {
    return null
  }

  const { mainMessage } = localeMessage

  return (
    <Dialog open={!shown} onOpenChange={(open) => setShown(!open)}>
      <DialogContent className="my-4 max-h-11/12 max-w-11/12 overflow-y-auto bg-white md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t("mainMessage")}</DialogTitle>
        </DialogHeader>
        <div className="h-full space-y-4">
          {mainMessage.image && (
            <Image
              media={mainMessage.image as Media}
              width={1000}
              className="max-h-72 w-full rounded-2xl object-cover max-sm:hidden"
            />
          )}
          <div>
            <RichText data={mainMessage?.message} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
