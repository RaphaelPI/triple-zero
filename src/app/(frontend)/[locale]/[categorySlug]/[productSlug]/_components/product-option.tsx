"use client"

import { useQueryState } from "nuqs"
import { ReactNode } from "react"
import Info from "src/assets/info.svg"

import { Popover } from "@/components/popover"
import { cn } from "@/lib/utils"
import type { Media, ProductOption as ProductOptionType, ProductOptionValue } from "@/payload-types"
import { getOptionSlug } from "../utils"
import { useProduct } from "./product-provider"

interface ProductOptionProps {
  option: ProductOptionType
  required?: boolean
  guide?: ReactNode
  readOnly?: boolean
}

export const ProductOption = ({
  option,
  required,
  guide,
  readOnly = false,
}: ProductOptionProps) => {
  const { setImage, activeOptions } = useProduct()
  const [_, setValue] = useQueryState(getOptionSlug(option))
  const value = activeOptions.find(([o]) => getOptionSlug(o) === getOptionSlug(option))?.[1]?.value

  if (!option) {
    return null
  }

  const handleClick = (optionValue: ProductOptionValue) => () => {
    if (readOnly) {
      return
    }

    // set current value
    const val = String(optionValue?.value)
    setValue((prev) => (prev === val && !required ? null : val))

    if (optionValue?.image) {
      setImage((optionValue.image as Media).id)
    }
  }

  let title = <>{option.title}</>
  if (option.description) {
    title = (
      <div className="flex items-center gap-1">
        <Popover content={option.description} variant="dark">
          <div className="flex cursor-default items-center gap-1 leading-4">
            <Info className="size-4 shrink-0 md:size-3" />
          </div>
        </Popover>
        {option.title}
      </div>
    )
  }

  return (
    <div
      className="w-full items-center gap-1 space-y-2 py-3 md:gap-2 xl:flex"
      key={getOptionSlug(option)}
    >
      <label className="block self-baseline leading-4 lg:w-32">{title}</label>
      <div className="flex flex-1 flex-wrap gap-2">
        {option.values?.map((optionValue) => {
          const active = Boolean(
            value ? optionValue.value.value === value : optionValue.value.defaultValue,
          )

          return (
            <div key={optionValue.value.value} onClick={handleClick(optionValue.value)}>
              <div
                className={cn(
                  "bg-blue-light min-w-10 rounded-md border-2 border-white px-2 py-1 text-center select-none md:px-4",
                  {
                    "ring-primary ring-[3px]": active,
                    "cursor-pointer": !readOnly,
                    "hover:bg-blue-grey": !readOnly || (Boolean(optionValue.value.image) && active),
                  },
                )}
              >
                {optionValue.value.title}
              </div>
            </div>
          )
        })}
        {guide}
      </div>
    </div>
  )
}
