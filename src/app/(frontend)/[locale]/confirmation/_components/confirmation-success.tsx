"use client"

import { useCheckout } from "@/providers/checkout/checkout"
import { formatDate } from "date-fns"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

interface Props {
  delay?: string
}

export const ConfirmationSuccess = ({ delay }: Props) => {
  const t = useTranslations()

  const { clearCart } = useCheckout()

  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="section space-y-8 py-32 max-md:py-8">
      <div className="text-h1 font-semibold">{t("payment.confirmation.title")}</div>

      <div className="space-y-4">
        <div className="text-lg whitespace-pre-line">{t("payment.confirmation.description")}</div>
        {delay && (
          <div className="border-blue rounded-lg border bg-white p-2 text-sm leading-tight italic">
            {t.rich("checkout.confirmation-delay", {
              date: () => formatDate(delay, "dd/MM/yyyy"),
              strong: () => <strong>{formatDate(delay, "PPPP")}</strong>,
            })}
          </div>
        )}
      </div>
    </div>
  )
}
