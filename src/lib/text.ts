import { getAmountFromCountry } from "./price"

export const formatAmount = (amount: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount)

export const formatAmountForStripe = (
  amount: number,
  currency: string,
  country?: string,
): number => {
  const { amount: amountFromCountry } = getAmountFromCountry(amount, country)
  amount = amountFromCountry

  const numberFormat = new Intl.NumberFormat(["fr-FR"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true

  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false
    }
  }

  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}
