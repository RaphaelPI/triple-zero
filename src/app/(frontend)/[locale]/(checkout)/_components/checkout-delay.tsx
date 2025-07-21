"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useServerActionQuery } from "@/hooks/use-server-action-query"
import { formatDate } from "date-fns"
import { useTranslations } from "next-intl"
import { getDelay } from "../actions"

export const CheckoutDelay = () => {
  const t = useTranslations()
  const { isPending, data: delayDate } = useServerActionQuery(getDelay)

  if (isPending) {
    return <Skeleton className="h-20 w-full" />
  }

  if (!delayDate) {
    return null
  }

  return (
    <div className="border-blue rounded-lg border bg-white p-2 text-sm leading-tight italic">
      {t.rich("checkout.delay", {
        date: () => formatDate(delayDate, "dd/MM/yyyy"),
        strong: (chunks) => <strong>{formatDate(delayDate, "PPPP")}</strong>,
      })}
    </div>
  )
}
