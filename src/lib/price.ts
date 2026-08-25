export const getAmountFromCountry = (
  amount: number,
  country?: string,
): { amount: number; tax: boolean } => {
  if (country && !isTTCCountry(country)) {
    return { amount: amount / 1.2, tax: false }
  }
  return { amount, tax: true }
}

export const isTTCCountry = (country: string) => {
  return [
    "FR",
    "DE",
    "IT",
    "ES",
    "PT",
    "BE",
    "NL",
    "AT",
    "SE",
    "FI",
    "DK",
    "RO",
    "PL",
    "SI",
    "SK",
    "LU",
    "LT",
    "LV",
    "EE",
    "HU",
    "IE",
    "CY",
    "MT",
    "GR",
    "BG",
    "HR",
    "CZ",
  ].includes(country.toUpperCase())
}
