"use client"

import { ReactNode, useState } from "react"
import Triangle from "src/assets/triangle.svg"

import { cn } from "@/lib/utils"
import { ProductOption } from "./product-option"

import type { ProductOption as ProductOptionType, SizeGuide } from "@/payload-types"
import { useTranslations } from "next-intl"
import { ProductSizeGuide } from "./product-size-guide"

interface ProductOptionsProps {
  options?: ProductOptionType[]
  advanced?: ProductOptionType[]
  children?: ReactNode
  sizeGuide?: SizeGuide
  readOnly?: boolean
}

export const ProductOptions = ({
  options,
  advanced,
  sizeGuide,
  children,
  readOnly = false,
}: ProductOptionsProps) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  if (!options) {
    return null
  }

  const handleAdvanced = () => setOpen((prev) => !prev)
  return (
    <div className="px-panel py-panel">
      <div className="mb-2 text-lg font-bold">{t("product.options")}</div>
      {children}
      <div>
        {options?.map((option) => (
          <ProductOption
            readOnly={readOnly}
            option={option}
            key={option.title}
            required
            guide={
              option.size && sizeGuide ? <ProductSizeGuide sizeGuide={sizeGuide} /> : undefined
            }
          />
        ))}
      </div>
      {advanced && advanced.length > 0 && (
        <>
          <div className="link mt-6 mb-2 cursor-pointer text-lg font-bold" onClick={handleAdvanced}>
            {t("product.advancedOptions")}
            <Triangle
              className={cn(`ml-2 inline w-3 transition-transform`, {
                "rotate-90": open,
              })}
            />
          </div>
          {open && (
            <div>
              {advanced?.map((option) => (
                <ProductOption option={option} key={option?.title} readOnly={readOnly} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
