"use client"

import { isTTCCountry } from "@/app/(frontend)/[locale]/(checkout)/coordonnees/utils"
import { formatAmount } from "@/lib/text"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout"
import { useCountry } from "@/providers/country"

interface Props {
  amount: number
  taxIncluded?: boolean
  className?: string
}

export const Amount = ({ amount, taxIncluded = false, className }: Props) => {
  const { shippingFeesCountry } = useCheckout()
  const { country } = useCountry()

  if (shippingFeesCountry && !isTTCCountry(shippingFeesCountry)) {
    return <>{formatAmount(amount / 1.2)} HT</>
  }

  const isTTC = !country || isTTCCountry(shippingFeesCountry || country)
  return (
    <span className={cn("relative inline-block", className)}>
      {formatAmount(amount)}
      {taxIncluded && " TTC"}
      {!isTTC && (
        <div className="absolute right-0 -bottom-3 text-xs text-gray-500">
          {formatAmount(amount / 1.2)} HT
        </div>
      )}
    </span>
  )
}
