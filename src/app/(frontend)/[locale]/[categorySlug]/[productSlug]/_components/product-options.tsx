"use client"

import { ReactNode, useState } from "react"
import Info from "src/assets/info.svg"
import Triangle from "src/assets/triangle.svg"

import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout"
import { ProductOption } from "./product-option"

import { Button } from "@/components/ui/button"
import type { ProductOption as ProductOptionType, SizeGuide } from "@/payload-types"
import { useTranslations } from "next-intl"
import { useProduct } from "./product-provider"
import { ProductSizeGuide } from "./product-size-guide"

interface ProductOptionsProps {
  options?: ProductOptionType[]
  advanced?: ProductOptionType[]
  children?: ReactNode
  sizeGuide?: SizeGuide
}

export const ProductOptions = ({ options, advanced, sizeGuide, children }: ProductOptionsProps) => {
  const { addItem } = useCheckout()
  const [open, setOpen] = useState(false)
  const { technicalValues, activeOptions, activeColors, product } = useProduct()
  const t = useTranslations("product")

  if (!options) {
    return null
  }

  const handleAdvanced = () => setOpen((prev) => !prev)
  return (
    <>
      <div className="px-panel py-panel">
        <div className="mb-2 text-lg font-bold">{t("options")}</div>
        {children}
        <div>
          {options?.map((option) => (
            <ProductOption
              option={option}
              key={option.title}
              required
              guide={
                option.size && sizeGuide ? <ProductSizeGuide sizeGuide={sizeGuide} /> : undefined
              }
            />
          ))}
        </div>
        <div className="link mt-6 mb-2 cursor-pointer text-lg font-bold" onClick={handleAdvanced}>
          {t("advancedOptions")}
          <Triangle
            className={cn(`ml-2 inline w-3 transition-transform`, {
              "rotate-90": open,
            })}
          />
        </div>
        {open && (
          <div>
            {advanced?.map((option) => (
              <ProductOption option={option} key={option?.title} />
            ))}
          </div>
        )}
      </div>
      <div className="px-panel py-panel flex flex-wrap items-center gap-4">
        <div className="text-4xl font-bold">{technicalValues?.price}€</div>
        <Button
          className="button"
          onClick={() =>
            addItem({
              product,
              options: activeOptions,
              colors: activeColors,
              price: Number(technicalValues?.price),
            })
          }
        >
          Ajouter au panier
        </Button>
        <div className="hidden cursor-default items-center text-xs lg:flex">
          <Info className="mr-1 h-3 w-3" /> Guide des frais de port
        </div>
      </div>
    </>
  )
}
