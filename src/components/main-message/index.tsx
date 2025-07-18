"use client"

import { useSessionStorageState } from "@/hooks/use-storage-state"
import { Media, Message } from "@/payload-types"
import { format } from "date-fns"
import { useLocale, useTranslations } from "next-intl"
import { useCallback } from "react"
import { Image } from "../image"
import { RichText } from "../rich-text"
import { Skeleton } from "../ui/skeleton"
import { getMainMessage } from "./action"

export const MainMessage = () => {
  const locale = useLocale()
  const t = useTranslations()

  const fetchMessage = useCallback(async () => {
    const m = await getMainMessage()
    return m
  }, [locale])

  const [message] = useSessionStorageState<Message | null>("main-message", null, fetchMessage)

  if (message == null) {
    return (
      <section className="section space-y-4">
        <Skeleton className="h-12 w-1/2 rounded-2xl bg-white lg:h-20" />
        <Skeleton className="h-60 w-full rounded-2xl bg-white" />
      </section>
    )
  }

  if (!message || !message.active) {
    return null
  }

  return (
    <section className="section space-y-4">
      <div className="text-h1 font-bold italic">{t("mainMessage")}</div>
      <div className="panel flex flex-col-reverse lg:flex-row">
        <div className="flex flex-col justify-center p-8 lg:w-2/3">
          {message.updatedAt && (
            <div className="text-blue text-sm">{format(new Date(message.updatedAt), "PPp")}</div>
          )}
          <RichText data={message?.message} />
        </div>
        {message.image && (
          <Image
            media={message.image as Media}
            width={1000}
            className="max-h-72 w-full rounded-t-2xl object-cover lg:max-h-none lg:w-1/3 lg:rounded-tl-none lg:rounded-r-2xl"
          />
        )}
      </div>
    </section>
  )
}
