import { ProductOption, ProductOptionValue } from "@/payload-types"
import { addDays, format, setDay } from "date-fns"

export const NB_WEEKS_PLANNING = 20

export const getNextWeeks = (nbWeeks = NB_WEEKS_PLANNING) => {
  const nextSaturday = setDay(new Date(), 6)
  return Array.from({ length: nbWeeks }).map((_, index) => {
    const current = addDays(nextSaturday, index * 7)
    return format(current, "dd/MM/yyyy")
  })
}

export const getWorktime = (options: [ProductOption, ProductOptionValue][]) => {
  return options.reduce((acc, [_, optionValue]) => {
    const delta = optionValue.delta?.find((delta) => delta.delta.type === "time")?.delta

    if (!delta) {
      return acc
    }

    const wortimeValue = delta.value ?? 0
    return acc + wortimeValue
  }, 0)
}

export const formatMinutesToHours = (minutes: number) => {
  const totalHours = Math.abs(Math.floor(minutes / 60))
  const remainingMinutes = Math.abs(minutes % 60)

  if (totalHours === 0) {
    return `${remainingMinutes}m`
  }

  if (remainingMinutes === 0) {
    return `${totalHours}h`
  }

  return `${totalHours}h ${remainingMinutes}m`
}
