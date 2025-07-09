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
}

export const ProductOption = ({ option, required, guide }: ProductOptionProps) => {
  const { setImage, resetCurrentImage, addImage } = useProduct()
  const [value, setValue] = useQueryState(getOptionSlug(option))

  if (!option) {
    return null
  }

  const handleClick = (optionValue: ProductOptionValue) => () => {
    // set current value
    const val = String(optionValue?.value)
    setValue((prev) => (prev === val && !required ? null : val))

    if (!optionValue?.image) {
      return
    }

    // update image list
    addImage(optionValue.image as Media, getOptionSlug(option))
  }

  const handleHover = (optionValue: ProductOptionValue) => () => {
    if (!optionValue.image) {
      return
    }

    setImage({ image: optionValue.image as Media, key: getOptionSlug(option) })
  }

  const handleOut = (optionValue: ProductOptionValue) => () => {
    if (!optionValue.image) {
      return
    }

    resetCurrentImage()
  }

  let title = <>{option.title}</>
  if (option.description) {
    title = (
      <Popover content={option.description} variant="dark">
        <div className="flex cursor-default items-center text-sm leading-3">
          {option.title}
          <Info className="ml-1 h-3 w-3" />
        </div>
      </Popover>
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

          // const optionRender = (

          // )

          // if (optionValue.image) {
          //   const optionImage = (
          //     <div className="rounded-xl bg-white p-2">
          //       <Image image={optionValue.image} className="rounded-xl max-w-52 max-h-52" />
          //     </div>
          //   )
          //   return (
          //     <Popover key={optionValue?._key} content={optionImage}>
          //       {optionRender}
          //     </Tooltip>
          //   )
          // }

          return (
            <div
              key={optionValue.value.value}
              onClick={handleClick(optionValue.value)}
              onMouseEnter={handleHover(optionValue.value)}
              onMouseLeave={handleOut(optionValue.value)}
            >
              <div
                className={cn(
                  "bg-blue-light hover:bg-blue-grey min-w-10 cursor-pointer rounded-md border-2 border-white px-2 py-1 text-center select-none md:px-4",
                  {
                    "ring-primary ring-[3px]": active,
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
