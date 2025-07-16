"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Color, ColorWithImage, Product } from "@/payload-types"
import { useField } from "@payloadcms/ui"
import { ValueWithRelation } from "payload"
import { useEffect, useState } from "react"
import { getProduct } from "./action"

interface Props {
  field: { label: string; required?: boolean }
  path: string
}

export const ProductColorInput = (props: Props) => {
  const { label } = props.field
  const { path } = props

  const { value, setValue } = useField<ColorWithImage>({ path })
  const { value: reference } = useField<ValueWithRelation>({
    path: "reference",
  })
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    if (!reference || reference.relationTo !== "product") {
      return
    }

    getProduct(reference.value).then(setProduct)
  }, [reference])

  if (!reference) {
    return <div>Veuillez choisir une référence....</div>
  }

  if (reference.relationTo === "category") {
    return null
  }

  if (!product) {
    return <div>Veuillez choisir une référence valide s’il vous plait....</div>
  }

  const handleChange = (selectedValue: string) => {
    console.log(selectedValue)
    if (selectedValue === "no-selection") {
      setValue(null)
      return
    }

    const selectedColorValue = product.colors?.find(
      ({ color }) => (color.color as Color).color === selectedValue,
    )
    if (!selectedColorValue) {
      return
    }

    setValue(selectedColorValue.color)
  }

  const selectedValue = String((value.color as Color)?.color)
  console.log(selectedValue)
  return (
    <div className="space-y-2">
      <div>Couleur</div>
      <Select onValueChange={handleChange} value={selectedValue}>
        <SelectTrigger className="bg-grey-light border-dark w-full flex-shrink-0 cursor-default rounded-lg border">
          <SelectValue placeholder="Sélectionner une valeur" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="no-selection">Aucune selection</SelectItem>
          {product.colors?.map(({ color }) => {
            const obj = color.color as Color
            return (
              <SelectItem key={obj.color} value={obj.color}>
                {obj.name}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
