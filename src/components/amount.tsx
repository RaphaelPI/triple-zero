"use client"

import { isTaxFreeCountry } from "@/app/(frontend)/[locale]/(checkout)/coordonnees/utils"
import { useSessionStorageState } from "@/hooks/useStorageState"
import { formatAmount } from "@/lib/text"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout"

interface Props {
  amount: number
  taxIncluded?: boolean
}

export const Amount = ({ amount, taxIncluded = false }: Props) => {
  const { shippingFeesCountry } = useCheckout()
  const [country] = useSessionStorageState("country", "FR", async () => {
    try {
      const response = await fetch("https://ipapi.co/json", {
        method: "GET",
      })
      const data = await response.json()

      return data.country_code
    } catch (error) {
      console.error(error)
      return "FR"
    }
  })

  if (!isTaxFreeCountry(shippingFeesCountry)) {
    return <>{formatAmount(amount / 1.2)} HT</>
  }

  const isFrench = (shippingFeesCountry || country) === "FR"
  return (
    <span className={cn("relative inline-block")}>
      {formatAmount(amount)}
      {taxIncluded && " TTC"}
      {!isFrench && (
        <div className="absolute right-0 -bottom-3 text-xs text-gray-500">
          {formatAmount(amount / 1.2)} HT
        </div>
      )}
    </span>
  )
}
