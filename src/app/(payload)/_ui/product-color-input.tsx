"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Color } from "@/payload-types"
import { useField } from "@payloadcms/ui"
import { ValueWithRelation } from "payload"
import { useEffect, useState } from "react"
import { getColors } from "./action"

interface Props {
  field: { label: string; required?: boolean }
  path: string
}

export const ProductColorInput = (props: Props) => {
  const { path } = props

  const { value, setValue } = useField<Color>({ path })
  const { value: reference } = useField<ValueWithRelation>({
    path: "reference",
  })
  const [colors, setColors] = useState<Color[]>([])

  useEffect(() => {
    getColors().then(setColors)
  }, [])

  if (!reference) {
    return <div>Veuillez choisir une référence....</div>
  }

  if (reference.relationTo === "category") {
    return null
  }

  const handleChange = (selectedValue: string) => {
    const selectedColorValue = colors.find(({ color }) => color === selectedValue)
    if (!selectedColorValue) {
      return
    }

    setValue(selectedColorValue)
  }

  const selectedValue = value?.color
  return (
    <div className="mb-4 space-y-2">
      <div>Couleur</div>
      <Select onValueChange={handleChange} value={selectedValue}>
        <SelectTrigger className="bg-grey-light border-dark w-full flex-shrink-0 cursor-default rounded-lg border">
          <SelectValue placeholder="Sélectionner une valeur" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {colors.map(({ color, name }) => {
            return (
              <SelectItem key={color} value={color}>
                {name}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
