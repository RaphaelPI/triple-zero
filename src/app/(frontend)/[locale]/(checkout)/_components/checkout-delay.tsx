"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useCheckout } from "@/providers/checkout/checkout"
import { formatDate } from "date-fns"
import { useTranslations } from "next-intl"

export const CheckoutDelay = () => {
  const t = useTranslations()
  const { isPendingDelay, delayDate } = useCheckout()

  if (isPendingDelay) {
    return <Skeleton className="h-20 w-full" />
  }

  if (!delayDate) {
    return null
  }

  return (
    <div className="border-blue rounded-lg border bg-white p-2 text-sm leading-tight italic">
      {t.rich("checkout.delay", {
        date: () => formatDate(delayDate, "dd/MM/yyyy"),
        strong: () => <strong>{formatDate(delayDate, "PPPP")}</strong>,
      })}
    </div>
  )
}
