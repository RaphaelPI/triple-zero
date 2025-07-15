import { ProductOption, ProductOptionValue } from "@/payload-types"

export type TechnicalValue = "temperature" | "volume" | "weight" | "price"

// All compression bags values and their associated weight
// [volume, weight]
const COMPRESSION_BAGS = [
  [6, 30],
  [7.5, 34],
  [9, 38],
  [10.5, 42],
  [12, 46],
  [13.5, 50],
]

// Pourcentages per size to apply to down weight on roducts
const DOWN_WEIGHT_MODIFICATORS: Record<string, number> = {
  s: -10,
  l: 10,
}

export const getTechnicalValues = (
  optionValues: [ProductOption, ProductOptionValue][],
): Record<TechnicalValue, number> => {
  const stats: TechnicalValue[] = ["temperature", "volume", "weight", "price"]
  const technicalValues: Record<TechnicalValue, number> = {
    temperature: 0,
    volume: 0,
    weight: 0,
    price: 0,
  }
  const pourcentages: Record<TechnicalValue, number> = {
    temperature: 0,
    volume: 0,
    weight: 0,
    price: 0,
  }

  // Find size option
  const sizeOption = optionValues.find(([option]) => option.size)

  // for each selected values
  optionValues.forEach(([option, value]) => {
    if (!value) {
      return
    }

    // for each delta (impacts)
    // get total of all fixed values
    // get total of all pourcentages values
    value.delta?.forEach(({ delta }) => {
      if (delta?.unit === "%") {
        stats.forEach((type) => {
          if (delta?.type === type) {
            pourcentages[type] += Number(delta.value)
          }
        })
        return
      }

      // Add all fixed values together
      stats.forEach((type) => {
        if (delta?.type === type) {
          let deltaValue = Number(delta.value)

          // If we're dealing with the down weight option, we need to apply a modificator
          if (option.weight && delta?.type == "weight" && sizeOption) {
            const sizeValue = String(sizeOption[1]?.value)
            const modificator = DOWN_WEIGHT_MODIFICATORS[sizeValue]
            if (modificator) {
              deltaValue = deltaValue + (deltaValue * modificator) / 100
            }
          }

          technicalValues[type] += deltaValue
        }
      })
    })
  })

  // apply pourcentages to total
  stats.forEach((type) => {
    technicalValues[type] =
      technicalValues[type] + (technicalValues[type] * pourcentages[type]) / 100
  })

  // Get real volume
  COMPRESSION_BAGS.forEach(([volumeReference], index) => {
    if (COMPRESSION_BAGS.length < index + 1) {
      return COMPRESSION_BAGS[index - 1]
    }

    // protect index outside array
    const bagIndex = Math.min(index + 1, COMPRESSION_BAGS.length - 1)
    if (
      technicalValues.volume > volumeReference &&
      technicalValues.volume <= COMPRESSION_BAGS[bagIndex][0]
    ) {
      technicalValues.volume = COMPRESSION_BAGS[bagIndex][0]
      technicalValues.weight += COMPRESSION_BAGS[bagIndex][1]
    }
  })

  technicalValues.volume = Math.max(
    Math.min(technicalValues.volume, COMPRESSION_BAGS[COMPRESSION_BAGS.length - 1][0]),
    COMPRESSION_BAGS[0][0],
  )
  technicalValues.price = Math.round(technicalValues.price)
  technicalValues.weight = Math.round(technicalValues.weight)
  technicalValues.temperature = Math.round(technicalValues.temperature)

  return technicalValues
}

export const getStartingPrice = (options: ProductOption[]) => {
  // Get size and weight option
  const sizeOption = options.find((option) => option.size)
  const sizeOptionValue = sizeOption?.values?.[0]
  const weightOption = options.find((option) => option.weight)
  const weightOptionValue = weightOption?.values?.[0]

  const usedOptions: [ProductOption, ProductOptionValue][] = []
  if (sizeOption && sizeOptionValue) {
    usedOptions.push([sizeOption, sizeOptionValue.value])
  }
  if (weightOption && weightOptionValue) {
    usedOptions.push([weightOption, weightOptionValue.value])
  }

  if (usedOptions.length > 0) {
    return getTechnicalValues(usedOptions).price
  }

  throw new Error("No starting price found")
}
