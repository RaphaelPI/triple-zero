"use client"

import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { isTTCCountry } from "@/lib/price"
import { useCheckout } from "@/providers/checkout/checkout"

// Update the country used for shipping fees and VAT, notify user when tax regime changes
export const useShippingCountry = () => {
  const t = useTranslations()
  const { setShippingFeesCountry, shippingFeesCountry } = useCheckout()

  return (value: string) => {
    if (!value || value === shippingFeesCountry) return

    if (isTTCCountry(value) && shippingFeesCountry && !isTTCCountry(shippingFeesCountry)) {
      toast.info(t("delivery.ue-info"))
    } else if (
      !isTTCCountry(value) &&
      (!shippingFeesCountry || isTTCCountry(shippingFeesCountry))
    ) {
      toast.info(t("delivery.non-ue-info"))
    }

    setShippingFeesCountry(value)
  }
}
