"use client"

import { useCookieState } from "@/hooks/use-cookie-state"
import { useSessionStorageState } from "@/hooks/use-storage-state"
import { Media, Message } from "@/payload-types"
import { format, setDefaultOptions } from "date-fns"
import { enGB, fr } from "date-fns/locale"
import { useLocale, useTranslations } from "next-intl"
import { useCallback } from "react"
import { Image } from "../image"
import { RichText } from "../rich-text"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { getMainMessage } from "./action"

export const MainMessageModal = () => {
  const locale = useLocale()
  const t = useTranslations()

  // Set the locale for date-fns
  setDefaultOptions({ locale: locale === "fr" ? fr : enGB })

  const fetchMessage = useCallback(async () => {
    const m = await getMainMessage()
    return m
  }, [locale])

  const [message] = useSessionStorageState<Message | null>("main-message", null, fetchMessage)
  const [shown, setShown] = useCookieState<boolean>("main-message-shown", false)

  if (!message || !message.active || !message.modal) {
    return null
  }

  return (
    <Dialog open={!shown} onOpenChange={(open) => setShown(!open)}>
      <DialogContent className="max-h-screen max-w-4xl overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>{t("mainMessage")}</DialogTitle>
        </DialogHeader>
        <div className="h-full space-y-4">
          {message.image && (
            <Image
              media={message.image as Media}
              width={1000}
              className="max-h-72 w-full rounded-2xl object-cover max-sm:hidden"
            />
          )}
          <div>
            {message.updatedAt && (
              <div className="text-blue text-sm">{format(new Date(message.updatedAt), "PPp")}</div>
            )}
            <RichText data={message?.message} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
