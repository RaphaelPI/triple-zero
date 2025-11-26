"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product, ProductOption, ProductOptionValue } from "@/payload-types"
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

  const { value, setValue } = useField<[ProductOption, ProductOptionValue][]>({ path })
  const { value: discount } = useField<number>({ path: "value" })
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
    return <div>Cette promotion applique {discount}% sur tous les produits de la catégorie.</div>
  }

  if (!product) {
    return <div>Veuillez choisir une référence s’il vous plait....</div>
  }

  const handleChange = (option: ProductOption, selectedValue: string) => {
    if (selectedValue === "no-selection") {
      const newValue = value?.filter(([option]) => option.title !== option.title)
      setValue(newValue)
      return
    }

    const selectedOptionValue = option.values?.find(({ value }) => value.value === selectedValue)
    if (!selectedOptionValue) {
      return
    }

    // does the option already exist ?
    if (value?.some(([opt]) => opt.title === option.title)) {
      const newValue = value?.map(([opt, value]) =>
        opt.title === option.title ? [option, selectedOptionValue.value] : [opt, value],
      )

      setValue(newValue)
      return
    }

    setValue([...(value ?? []), [option, selectedOptionValue.value]])
  }

  const options = [
    ...(product.options?.map(({ option }) => option) ?? []),
    ...(product.advanced?.map(({ option }) => option) ?? []),
  ]

  return (
    <div className="mb-4 space-y-2">
      <div>{label}</div>
      {options.map((option) => {
        const selectedOptionValue = value?.find((args) => {
          const [opt] = args
          return opt.title === option.title
        })
        const selectedValue = selectedOptionValue?.[1].value
        const defaultOptionValue = option.values?.find(({ value }) => value.defaultValue)

        return (
          <div key={option.title} className="space-y-1">
            <div>
              {option.title} {defaultOptionValue && "*"}
            </div>
            <Select
              onValueChange={(value) => handleChange(option, value)}
              value={selectedValue}
              defaultValue={defaultOptionValue?.value.value}
            >
              <SelectTrigger className="bg-grey-light border-dark w-full flex-shrink-0 cursor-default rounded-lg border">
                <SelectValue placeholder="Sélectionner une valeur" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {!defaultOptionValue && (
                  <SelectItem value="no-selection">Aucune selection</SelectItem>
                )}
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
        )
      })}
    </div>
  )
}
