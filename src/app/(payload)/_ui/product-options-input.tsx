"use client"

import { getOptionSlug } from "@/app/(frontend)/[locale]/[categorySlug]/[productSlug]/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product, ProductOption } from "@/payload-types"
import { useField } from "@payloadcms/ui"
import { ValueWithRelation } from "payload"
import { useEffect, useState } from "react"
import { getProduct } from "./action"

interface Props {
  field: { label: string; required?: boolean }
  path: string
}

export const ProductOptionsInput = (props: Props) => {
  const { label } = props.field
  const { path } = props

  const { value, setValue } = useField<Record<string, string>>({ path })
  const { value: discount } = useField<number>({ path: "value" })
  const { value: reference } = useField<ValueWithRelation>({
    path: "reference",
  })
  const [product, setProduct] = useState<Product>()

  console.log(reference)

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
    return <div>Cette promotion applique {discount}% sur tous les produits de la catégorie.</div>
  }

  if (!product) {
    return <div>Veuillez choisir une référence s’il vous plait....</div>
  }

  const handleChange = (option: ProductOption, selectedValue: string) => {
    if (selectedValue === "no-selection") {
      delete value?.[getOptionSlug(option)]
      setValue(value)
      return
    }

    setValue({
      ...(value ?? {}),
      [getOptionSlug(option)]: selectedValue,
    })
  }

  const options = [
    ...(product.options?.map(({ option }) => option) ?? []),
    ...(product.advanced?.map(({ option }) => option) ?? []),
  ]

  return (
    <div className="space-y-2">
      <div>{label}</div>
      {options.map((option) => (
        <div key={option.title} className="space-y-1">
          <div>{option.title}</div>
          <Select
            onValueChange={(value) => handleChange(option, value)}
            value={value?.[getOptionSlug(option)]}
          >
            <SelectTrigger className="bg-grey-light border-dark w-full flex-shrink-0 cursor-default rounded-lg border">
              <SelectValue placeholder="Sélectionner une valeur" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="no-selection">Aucune selection</SelectItem>
              {option.values?.map(({ value }) => {
                return (
                  <SelectItem key={value.value} value={value.value}>
                    {value.title}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}
