"use client"

import { getAmountFromCountry, isTTCCountry } from "@/lib/price"
import { formatAmount } from "@/lib/text"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout/checkout"
import { useCountry } from "@/providers/country"

interface Props {
  amount: number
  className?: string
  raw?: boolean
  quantity?: number
}

export const Amount = ({ amount, className, raw = false, quantity = 1 }: Props) => {
  const { shippingFeesCountry } = useCheckout()
  const { country } = useCountry()
  const { amount: amountFromCountry, tax } = getAmountFromCountry(amount, shippingFeesCountry)
  const amountToDisplay = (raw ? amount : amountFromCountry) * quantity

  if (!tax) {
    return (
      <span className={cn("relative inline-block", className)}>
        {formatAmount(amountToDisplay)} HT
      </span>
    )
  }

  const isTTC = !country || isTTCCountry(shippingFeesCountry || country)
  return (
    <span className={cn("relative inline-block", className)}>
      {formatAmount(amountToDisplay)}
      TTC
      {!isTTC && (
        <div className="absolute right-0 -bottom-3 text-xs text-gray-500">
          {formatAmount(amountToDisplay / 1.2)} HT
        </div>
      )}
    </span>
  )
}
